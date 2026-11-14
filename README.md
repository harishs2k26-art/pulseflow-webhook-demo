# PulseFlow Cloud — Webhook Inspector Demo

**Live GitHub Pages entry point:** [https://harishs2k26-art.github.io/pulseflow-webhook-demo/](https://harishs2k26-art.github.io/pulseflow-webhook-demo/)

**Main documentation hub:** [https://harishs2k26-art.github.io/pulseflow-docs-portal/](https://harishs2k26-art.github.io/pulseflow-docs-portal/)

A realistic fictional webhook documentation site with an implemented **local-only** payload and delivery simulator. The lab uses Web Crypto HMAC-SHA256 to demonstrate raw-body verification, timestamp freshness, transient receiver failures and duplicate acknowledgments. It is not a live inbound webhook service.

## Pages and implementation

| File | Purpose |
| --- | --- |
| [index.html](index.html) | Delivery model, reference schedule and inspector entry point |
| [payload-examples.html](payload-examples.html) | Three rich event examples and schema-evolution guidance |
| [signature-verification.html](signature-verification.html) | Raw-body HMAC contract, Node.js reference and rotation practices |
| [live-sandbox.html](live-sandbox.html) | Working local signing, tampering, clock-offset and replay inspector |
| [faq.html](faq.html) | Static-hosting limitations, privacy, security and retry behavior |
| [assets/sandbox.js](assets/sandbox.js) | Local simulation, validation, Web Crypto and in-memory inbox/history |
| [assets/style.css](assets/style.css) | Responsive layout, accessible labels and focus states |
| [.nojekyll](.nojekyll) | Static branch-root publication without Jekyll |

## Run locally

```sh
git clone https://github.com/harishs2k26-art/pulseflow-webhook-demo.git
cd pulseflow-webhook-demo
python3 -m http.server 8000
```

Visit `http://localhost:8000/live-sandbox.html` in a current browser. Web Crypto requires HTTPS or localhost. There are no npm packages or external scripts to install.

## Suggested test session

1. Submit the default payload with response 200, then submit it unchanged to see deduplication.
2. Reset, select 500, submit and then switch to 200 using the same event ID.
3. Reset and select 429; inspect the retry hint without expecting an automatic timer.
4. Enable body tampering; even an appended newline fails exact-byte verification.
5. Set the timestamp offset to -600; signature validity and timestamp freshness are separate checks.
6. Paste another documented envelope, test malformed JSON and inspect the latest ten attempts.

No request leaves the browser. The demo asks for **fictional secrets only**, uses no persistent storage and renders output as text. Reset/reload clears deduplication; a production receiver requires a durable inbox and event-specific validation. The 16 KiB demo input cap is intentionally smaller than the fictional platform's 256 KiB event cap.

## Intentional benchmark defects

This is the **only** PulseFlow repository with deliberately broken navigation/content links. Its starting fixture contains **three broken sublinks** spanning a missing legacy target, wrong filename case and an incorrect nested directory. The five primary navigation bars also intentionally differ in labels, ordering and included destinations. Preserve this state until the benchmark's remediation task begins. Do not add redirects or missing files that silently repair the seeded failures.

All assets, required HTML pages, README entry points and sister-site links are otherwise intended to work. The four sister sites should not inherit these path or navigation defects.

## Deployment and boundaries

GitHub Pages publishes **main → / (root)**. The site cannot accept webhook POSTs or proxy delivery requests. Reference schema: `2026-10-01`; freshness tolerance: ±300 seconds; recommended durable dedup retention: at least 72 hours. The illustrative delivery schedule is not implemented as background work.

Return to the [central architecture guide](https://harishs2k26-art.github.io/pulseflow-docs-portal/architecture.html) for platform semantics and the [status microsite](https://harishs2k26-art.github.io/pulseflow-status-dashboard/) for synthetic incidents. All services, users, metrics and examples are fictional.
