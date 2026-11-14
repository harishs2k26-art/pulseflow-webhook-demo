'use strict';
const form = document.querySelector('#delivery-form');
const output = document.querySelector('#delivery-output');
const historyOutput = document.querySelector('#delivery-history');
const submit = document.querySelector('#simulate');
const processed = new Set();
let history = [];
let attempt = 0;
const encoder = new TextEncoder();
const hex = (buffer) => Array.from(new Uint8Array(buffer), b => b.toString(16).padStart(2, '0')).join('');
form.addEventListener('submit', async (event) => {
  event.preventDefault();
  submit.disabled = true;
  try {
    if (!globalThis.crypto?.subtle) throw new Error('Web Crypto is unavailable. Use HTTPS or http://localhost in a current browser.');
    const rawBody = document.querySelector('#payload').value;
    if (encoder.encode(rawBody).length > 16384) throw new Error('Demo input is limited to 16 KiB.');
    const payload = JSON.parse(rawBody);
    if (!payload || Array.isArray(payload) || typeof payload !== 'object') throw new Error('Payload must be a JSON object.');
    if (typeof payload.id !== 'string' || !payload.id || payload.id.length > 128) throw new Error('id must be a nonempty string of at most 128 characters.');
    if (!['workflow.succeeded', 'workflow.failed', 'api.threshold_breached'].includes(payload.type)) throw new Error('Choose one of the three documented event types.');
    if (payload.schema_version !== '2026-10-01' || typeof payload.workspace_id !== 'string' || !payload.workspace_id || payload.workspace_id.length > 80) throw new Error('Use schema_version 2026-10-01 and a nonempty workspace_id of at most 80 characters.');
    if (typeof payload.occurred_at !== 'string' || !payload.occurred_at.endsWith('Z') || !Number.isFinite(Date.parse(payload.occurred_at))) throw new Error('occurred_at must be a valid UTC timestamp ending in Z.');
    if (!payload.data || typeof payload.data !== 'object' || Array.isArray(payload.data)) throw new Error('data must be an object.');
    const secret = document.querySelector('#demo-secret').value;
    if (secret.length < 8 || secret.length > 128) throw new Error('Use a fictional demo secret of 8–128 characters. Never enter a real key.');
    const offset = Number(document.querySelector('#timestamp-offset').value);
    if (!Number.isInteger(offset) || Math.abs(offset) > 3600) throw new Error('Timestamp offset must be an integer between -3600 and 3600 seconds.');
    const requestedStatus = Number(document.querySelector('#receiver-status').value);
    if (![200, 429, 500].includes(requestedStatus)) throw new Error('Unsupported simulated receiver status.');
    const timestamp = Math.floor(Date.now() / 1000) + offset;
    const key = await crypto.subtle.importKey('raw', encoder.encode(secret), {name: 'HMAC', hash: 'SHA-256'}, false, ['sign', 'verify']);
    const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(timestamp + '.' + rawBody));
    const deliveredBody = rawBody + (document.querySelector('#tamper').checked ? '\n' : '');
    const signatureValid = await crypto.subtle.verify('HMAC', key, signature, encoder.encode(timestamp + '.' + deliveredBody));
    const fresh = Math.abs(Math.floor(Date.now() / 1000) - timestamp) <= 300;
    const dedupKey = payload.workspace_id + ':' + payload.id;
    const duplicate = processed.has(dedupKey);
    const status = !signatureValid || !fresh ? 401 : duplicate ? 200 : requestedStatus;
    if (status === 200) processed.add(dedupKey);
    attempt += 1;
    const result = {
      mode: 'local-only', network_requests: 0,
      attempt_id: 'attempt_demo_' + attempt, event_id: payload.id,
      headers: {'Content-Type': 'application/json', 'PulseFlow-Signature': 't=' + timestamp + ',v1=' + hex(signature)},
      delivered_raw_body: deliveredBody,
      checks: {signature_valid: signatureValid, timestamp_fresh: fresh, already_processed: duplicate},
      requested_receiver_status: requestedStatus, simulated_http_status: status,
      outcome: status === 200 ? (duplicate ? 'duplicate acknowledged; side effect skipped' : 'processed successfully') : status === 401 ? 'rejected before processing' : 'receiver failure; retry manually with the same event ID',
      retry_after_seconds: status === 429 ? 5 : null,
      automatic_retries: false
    };
    output.textContent = JSON.stringify(result, null, 2);
    history.unshift({attempt, event_id: payload.id, http_status: status, signature_valid: signatureValid, fresh, duplicate});
    history = history.slice(0, 10);
    historyOutput.textContent = JSON.stringify(history, null, 2);
  } catch (error) {
    output.textContent = 'Validation or simulation error: ' + error.message;
  } finally {
    submit.disabled = false;
  }
});
document.querySelector('#reset-inspector').addEventListener('click', () => {
  form.reset(); processed.clear(); history = []; attempt = 0;
  output.textContent = 'Ready. Simulate a delivery; no requests leave this browser.';
  historyOutput.textContent = 'No attempts yet.';
});
