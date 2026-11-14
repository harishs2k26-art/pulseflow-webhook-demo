# PulseFlow release audit and alignment report

**Audit date:** 14 November 2026 (UTC)  
**Primary property:** `pulseflow-webhook-demo` and its GitHub Pages site  
**Comparison baseline:** `pulseflow-docs-portal` and its GitHub Pages site  
**Delivery branch:** `release/audit-and-alignment`  
**Change scope:** report only; remediation is proposed, not implemented.

> This report records a source, deployment, live-link, documentation, and simulator audit. It does not certify production security, accessibility compliance, availability, or release completion. Both properties explicitly describe a fictional educational/benchmark environment, not an operating SaaS product.

## 1. Executive decision

**Recommendation: hold a customer-facing aligned release until the high-priority link and navigation issues are resolved and the remaining acceptance checks are completed.** The existing benchmark fixture can intentionally retain its seeded defects, but that is a different release target and must be identified explicitly.

The two properties already agree on the event envelope, raw-body HMAC principles, timestamp freshness, workspace/event identity, and the distinction between durable production behavior and local simulation. Both audited sites are published over HTTPS, and all ten required HTML pages returned HTTP 200 and matched the audited source bytes.

The principal findings are:

1. The webhook demo has **three confirmed broken local sublinks** and **five different primary-navigation variants**. Its README explicitly identifies these as seeded benchmark defects. They are intentional fixture behavior, not evidence that the audit should silently repair or ignore them. See [the demo README][w-readme].
2. The portal has consistent local navigation, but it is **not a completely healthy live benchmark**: both properties link to the unavailable status microsite. Three distinct status URLs returned 404; the status repository reported `has_pages: false`, and its Pages API returned 404. See [the status repository][status-repo] and [status site][status-home].
3. A sandbox test harness executed **62 checks: 59 passed and three edge-case assertions failed**. The failures concern delimiter-based deduplication keys, reset during asynchronous signing, and invalid calendar dates. The documented default scenarios and Node/browser signature interoperability passed.
4. A source-derived accessibility finding affects the demo's launch CTA: its hover text becomes white on a light mint background, producing approximately **1.568:1 contrast**. Other sampled core text/control color combinations were substantially stronger.
5. Both repositories lack an in-repository automated documentation-quality gate, published GitHub Releases, and several release-governance artifacts. A successful Pages deployment is not proof of documentation correctness.

### Execution boundary of this change

This change adds only `AUDIT_AND_ALIGNMENT_REPORT.md` on the named release branch. It does not repair links, change HTML/JavaScript/CSS, edit the portal or status repository, change Pages settings, open a pull request, merge to `main`, or deploy a release. All recommendations below remain pending unless separately implemented and verified.

## 2. Audited snapshots and deployment evidence

The two `main` references were checked again before creating the release branch and still matched these audited snapshots.

| Evidence | Webhook demo | Docs portal |
| --- | --- | --- |
| Repository | [pulseflow-webhook-demo][w-repo] | [pulseflow-docs-portal][p-repo] |
| Audited commit | [`e4f3986b74bd009633338acbd6d63731a55578c3`][w-commit] | [`973656d5863c523f23e1550da9c9cba1c1b30fe0`][p-commit] |
| Source commit time | 2026-11-14 08:00:26 UTC | 2026-11-14 07:56:12 UTC |
| Published entry point | [Webhook lab][w-live] | [Documentation hub][p-live] |
| Pages source | `main` -> repository root | `main` -> repository root |
| Pages build type/status | `legacy` / `built` | `legacy` / `built` |
| Latest reported build commit | Matches audited `main` | Matches audited `main` |
| Latest build completion | 2026-11-14 08:03:31 UTC | 2026-11-14 08:03:25 UTC |
| Deployment workflow | [Pages run: success][w-run] | [Pages run: success][p-run] |
| HTTPS enforcement | Enabled | Enabled |
| Custom domain | None | None |
| Custom 404 configured | No | No |

These are point-in-time observations, not an uptime history. The release branch starts at the webhook snapshot above; the audit report itself is the only planned addition.

## 3. Coverage, method, and limitations

### Work performed

- Enumerated both complete recursive file trees; neither response was truncated.
- Read every substantive file at the pinned commits, including both READMEs, all ten HTML pages, both stylesheets, and the simulator JavaScript. The two empty `.nojekyll` markers were accounted for in the inventories.
- Checked Pages configuration, latest build records, available repository workflows, workflow outcomes, and GitHub Releases.
- Fetched the public landing pages, all required HTML pages, referenced CSS/JavaScript, linked sister-site destinations, fragment targets, and selected discovery/error URLs using read-only HTTP requests.
- Compared the ten live HTML documents byte-for-byte with their corresponding audited source files: **10/10 matched**.
- Compared primary menus, metadata, headings, labels, language declarations, shared visual rules, and protocol statements.
- Executed the actual simulator source in Node v24.22.1 with native Web Crypto, a minimal DOM shim, and a fixed clock. Extracted and executed the actual documented Node verification function. Tested three documented event payloads against both implementations.
- Calculated contrast from the declared CSS colors and CSS specificity; no screenshot-based contrast measurement was performed.

### Explicit limits

- **No rendered-browser, mobile viewport, screen-reader, axe, Lighthouse, or field Core Web Vitals run completed.** Responsive CSS inspection and the DOM-shim tests are not substitutes for these checks.
- Simulator tests exercise application logic, not browser form validation, visual layout, focus behavior, or real network delivery.
- The fictional `.example` API requests were not sent, no live webhook POSTs were made, and no production credentials or customer data were used.
- Sister sites were checked only as dependencies of the two audited properties; this is not a full audit of the SDK, CLI, or status repositories.
- Branch protection/rulesets and organization-wide policy inheritance were not audited. Statements about missing quality gates refer to the inspected repository files and workflow inventory.
- Runtime harnesses and raw audit output are not added by this single-file change. The results below are point-in-time audit evidence, not an existing repository-maintained test suite.
- Two Instant crawler attempts were rejected because the team wallet was exhausted. No paid crawl completed, no funds were added, and a charge total was not returned. The audit continued through the connected GitHub account and direct public HTTP checks.

## 4. Side-by-side property and documentation comparison

| Dimension | Webhook demo | Docs portal | Release alignment implication |
| --- | --- | --- | --- |
| Primary role | Local webhook inspector, event catalog, receiver-security teaching | Central onboarding, architecture, plans, and cross-site discovery | Keep complementary roles; do not turn the static demo into a claimed webhook endpoint |
| Required HTML pages | 5 | 5 | All ten exist and were live |
| Baseline tracked files | 9, including `.nojekyll` | 8, including `.nojekyll` | Counts are before adding this report |
| Runtime implementation | One local script, `assets/sandbox.js` | No application script in the five inspected pages | Preserve the portal's low-complexity static model |
| Dependencies/build | No npm packages or build step | No npm packages or build step | Local Python static-server instructions are appropriate |
| Local run instructions | `python3 -m http.server 8000`; open `/live-sandbox.html` | Same server; open `/` | Test localhost and the GitHub project-site prefix |
| Required page HTTP health | 5/5 returned 200 | 5/5 returned 200 | Deployment is healthy for the primary pages |
| Live/source consistency | 5/5 HTML byte matches | 5/5 HTML byte matches | No primary-page publication drift observed |
| Navigation | Five distinct variants; some omit destinations | One shared five-link sequence | Use the portal's consistency pattern, not its page names |
| Central-hub/source backlinks | Present in every page footer | Present in every page footer | Preserve valid absolute cross-project URLs |
| Localization | English | Four English pages plus a substantive Spanish guide | Partial localization is explicit; define any broader release requirement |
| Fictional/demo boundaries | Strong local-only and invented-data warnings | Strong fictional API/product/price warnings | Preserve these warnings and do not imply a real service |
| Event/security depth | Detailed payload, HMAC, freshness, retry, and dedup examples | Broader architecture and onboarding context | Keep one shared protocol vocabulary |
| Release edition | Schema date and synthetic examples; no common page-wide release marker | Reference edition on landing page and localized edition text | Add a coordinated release/version convention if required |
| Published GitHub Releases | None returned | None returned | Publish release evidence only when actual release scope is approved |
| In-repo QA workflow | None found beyond Pages publication | None found beyond Pages publication | Add a real release-quality gate |

Sources: [demo README][w-readme], [portal README][p-readme], the [demo snapshot][w-commit], and the [portal snapshot][p-commit].

### Page and content inventory

| Property | Page | Audited purpose | Alignment note |
| --- | --- | --- | --- |
| Demo | [index.html][w-home] | Delivery lifecycle, reference schedule, inspector entry | Contains the missing legacy sublink |
| Demo | [payload-examples.html][w-payload] | Three event families, envelope fields, schema evolution | Contains wrong-case catalog sublink |
| Demo | [signature-verification.html][w-signature] | HMAC contract, Node verifier, rotation, receiver order | Contains incorrect nested handbook sublink |
| Demo | [live-sandbox.html][w-sandbox] | Local signing, tampering, freshness, failures, replay | Core behavior works; three edge cases require hardening |
| Demo | [faq.html][w-faq] | Static hosting, privacy, validation, retries, deduplication | Explicitly describes fixture limitations |
| Portal | [index.html][p-home] | Product context, learning path, all sister entry points | Status entry is unavailable; webhook card describes seeded defects |
| Portal | [getting-started.html][p-start] | Workspace, scopes, example event, safe limits | API examples are explicitly illustrative |
| Portal | [architecture.html][p-architecture] | Durable acceptance, tenancy, consistency, delivery | Incident-history dependency is unavailable |
| Portal | [pricing-tiers.html][p-pricing] | Synthetic quotas, billing rules, worked estimate | SLA dependency is unavailable |
| Portal | [translations-es.html][p-spanish] | Spanish concepts, glossary, operational summary | `lang="es"` is present; English global UI needs language-of-parts review |

## 5. Protocol and semantic alignment: preserve the distinctions

| Contract area | Webhook demo | Docs portal | Assessment / action |
| --- | --- | --- | --- |
| Envelope version | `2026-10-01` | `2026-10-01` | Aligned |
| Core fields | `id`, `type`, `schema_version`, `occurred_at`, `workspace_id`, `data` | Same envelope in overview, quickstart, and Spanish guide | Aligned; richer catalog `data` examples are additive, not contradictory |
| Event identity | Stable logical event ID across attempts | Event ID differs from run ID and trace ID; retries retain event ID | Aligned |
| Workspace boundary | Include workspace in receiver dedup key; independently authorize it | Workspace derived from validated credentials, then checked against envelope | Aligned conceptually; local lab is not an authorization implementation |
| Acceptance versus acknowledgment | Simulated receiver acknowledgment is 200 | Ingestion acceptance is 202 after durable acceptance | Different boundaries, not a mismatch; label them distinctly |
| HMAC input | UTF-8 timestamp prefix plus exact raw body bytes, HMAC-SHA256 | Timestamp plus exact raw request bytes | Aligned |
| Signing header | `PulseFlow-Signature: t=...,v1=...` | Delegates detailed contract to webhook guide | Keep the webhook guide as the detailed reference |
| Signing-time freshness | +/-300 seconds | Guidance to check freshness and maintain synchronized clocks | Aligned; do not reject old business events merely because `occurred_at` is historical |
| Ordering/delivery | No global ordering guarantee; replay preserves identity | At least once, no global ordering guarantee | Aligned |
| Retry model | Seven illustrative target ages: 0, 5 seconds, 1 minute, 5 minutes, 30 minutes, 2 hours, 24 hours | Backpressure, bounded delivery queue, dead-letter state, explicit operator replay | Complementary; further specify permanent response handling before claiming a complete production contract |
| Automatic retries | None; each browser attempt is manual | Describes a fictional service design, not a browser scheduler | Intentional scope distinction |
| Ingestion idempotency | Not implemented as a service in the lab | Identical request key/body result cached for 24 hours | Do not confuse this with receiver inbox retention |
| Receiver dedup retention | At least 72 hours recommended; actual lab set is memory-only | Durable transactional receiver deduplication recommended | 72-hour receiver retention and 24-hour ingestion caching solve different problems |
| Payload cap | 16 KiB demo input, measured as UTF-8 bytes | Fictional single-envelope cap 256 KiB; batch cap 100 events or 1 MiB | Explicit, documented scope distinction; do not blindly equalize caps |
| Validation | Shared envelope only; event-specific validation is out of scope | Required fields, numeric durations, scope/workspace checks | Add tests without representing the local lab as a complete production validator |
| Durability | Reset/reload clears inbox/history; latest ten attempts shown | Durable event log and transactional inbox are design requirements | Intentional contrast and useful teaching point |
| Billing | No billing implementation | Synthetic accepted-event counting; idempotent resubmissions and outbound attempts do not count again | No conflict; worked Team example correctly totals $67 before taxes |
| Production service availability | No inbound endpoint, proxy, or actual delivery | Reserved `api.pulseflow.example` is not operational | Preserve this boundary throughout release copy |

Sources: [demo overview][w-home], [verification guide][w-signature], [simulator implementation][w-js], [portal quickstart][p-start], [architecture][p-architecture], and [pricing][p-pricing].

## 6. Broken local sublinks: exact inventory

All five required demo HTML pages exist. The failures below are **secondary content links**, not missing required top-level pages. The complete source tree corroborates the missing/case-mismatched targets. All three resolved to HTTP 404, with the latter two confirmed on targeted recheck after transient upstream 503 responses.

| ID | Source page and link label | Broken href / resolved target | Cause | Proposed remediation, not yet applied |
| --- | --- | --- | --- | --- |
| L1 | [Overview][w-home]: Archived first-generation Events API guide | [`./api-v1-legacy.html`](https://harishs2k26-art.github.io/pulseflow-webhook-demo/api-v1-legacy.html) | Legacy file is absent | Remove obsolete guidance or supply an approved, real archive destination; do not invent a working legacy reference |
| L2 | [Payload examples][w-payload]: print-friendly payload catalog | [`./Payload-Examples.html`](https://harishs2k26-art.github.io/pulseflow-webhook-demo/Payload-Examples.html) | Case differs from existing `payload-examples.html` | Use the canonical lowercase page if the same catalog is intended and relabel honestly; otherwise implement a deliberate print view rather than claiming one exists |
| L3 | [Signature verification][w-signature]: receiver authentication handbook | [`./docs/signature-verification.html`](https://harishs2k26-art.github.io/pulseflow-webhook-demo/docs/signature-verification.html) | Incorrect nested directory; guide is at repository root | Consolidate/link real extended notes or remove the unsupported handbook claim; do not create an empty file merely to silence a checker |

The [README's intentional-defect section][w-readme] describes exactly three seeded broken sublinks and inconsistent navigation. Preserve the original benchmark baseline when required. For a clean release variant, repair intentionally and update all associated explanatory copy rather than leaving contradictory benchmark claims behind.

### Reference counts and interpretation

| Measure across the five HTML pages | Webhook demo | Docs portal |
| --- | --- | --- |
| Parsed reference occurrences | 60 | 67 |
| Unique normalized HTTP targets | 15 | 17 |
| Required local HTML pages unavailable | 0 | 0 |
| Broken local content targets | 3 | 0 |
| Failed linked status-site targets | Incident history | Status root, incident history, SLA policy |
| Primary-navigation variants | 5 | 1 |

Reference counts include repeated navigation, fragment links, and referenced assets; they are not counts of unique broken pages. README destinations and extra discovery/error probes were checked separately.

## 7. Shared cross-site failure: status publication

The status repository exists, but the repository metadata reported `has_pages: false`; its Pages lookup returned 404. This is consistent with no active Pages publication, not proof that the audited portal's local paths are wrong.

| Unavailable destination | Where it is referenced | Live result | Required follow-up |
| --- | --- | --- | --- |
| [Status root][status-home] | Portal overview; both READMEs | 404, GitHub Pages "Site not found" | Approve and restore status-site publication or clearly revise unavailable entry points |
| [Incident history][status-incidents] | Demo overview and portal architecture | 404, GitHub Pages "Site not found" | Verify the exact page after the status site is published |
| [SLA policy][status-sla] | Portal pricing | 404, GitHub Pages "Site not found" | Restore the policy dependency before presenting it as supporting release material |

The SDK root and linked CLI root/CI-CD/troubleshooting pages returned 200 during dependency checks. All ten inspected page footers retain reachable links to the central documentation hub and their source repositories.

**Operational caution:** several missing-path probes initially received GitHub's generic 503 "Unicorn" response. Targeted rechecks confirmed the two uncertain seeded sublinks as 404. Do not count transient hosting 503s as additional authored path defects or use a one-shot external check as a release verdict.

## 8. Navigation discrepancies: complete primary-menu comparison

The following sequences are taken directly from the five demo pages. Each destination is shown in order.

| Demo page | Current primary-menu labels and destinations | Missing primary destinations / discrepancy |
| --- | --- | --- |
| [Overview][w-home] | Overview -> `index.html`; Payload library -> `payload-examples.html`; Verify signatures -> `signature-verification.html`; Open inspector -> `live-sandbox.html`; Help -> `faq.html` | Full five-page set, but labels differ from other pages |
| [Payload examples][w-payload] | Home -> `index.html`; Sandbox -> `live-sandbox.html`; Examples -> `payload-examples.html` | Omits signature verification and FAQ; different labels and ordering |
| [Signature verification][w-signature] | Verify -> `signature-verification.html`; Home -> `index.html`; Payloads -> `payload-examples.html`; FAQ -> `faq.html` | Omits inspector; starts with current page rather than overview |
| [Live sandbox][w-sandbox] | Inspector -> `live-sandbox.html`; Payloads -> `payload-examples.html`; Overview -> `index.html` | Omits signature verification and FAQ; different ordering |
| [FAQ][w-faq] | Overview -> `index.html`; FAQ -> `faq.html`; Signature verification -> `signature-verification.html`; Payload library -> `payload-examples.html`; Sandbox -> `live-sandbox.html` | Full set, but reordered and differently labeled |

| Navigation behavior | Webhook demo | Docs portal | Proposed aligned convention |
| --- | --- | --- | --- |
| Destination set | Varies by page | Same five destinations on all pages | Each property's full local page set appears everywhere |
| Order | Five variants | Overview, Getting started, Architecture, Pricing tiers, Espanol | One canonical sequence per property |
| Local naming | Home/Overview; Payloads/Examples/Payload library; Verify/Verify signatures; Inspector/Sandbox/Open inspector; FAQ/Help | Stable labels | Demo: Overview, Payload library, Signature verification, Inspector, FAQ |
| Current-page semantics | No `aria-current="page"` in any primary menu | Also absent in all five menus | Mark exactly the current destination and style it without relying on color alone |
| Hub handoff | Footer backlink on every page | Hub is the central property | Retain the shared hub/source footer; consider a consistent header handoff if product requirements call for it |
| Spanish global navigation | Not applicable | English labels intentionally retained on the Spanish page | Keep destination order stable; mark English language parts or adopt an explicit localization policy |

The portal's [overview][p-home] demonstrates the shared menu pattern; its Spanish page explicitly explains the retained English labels. Missing a destination from a primary menu is a discoverability inconsistency even when a contextual body link still reaches that destination.

## 9. Simulator and reference-code verification

### Executed test summary

| Test group | Checks | Passed | Failed | What the result establishes |
| --- | --- | --- | --- | --- |
| Simulator documented scenarios and validation boundaries | 43 | 43 | 0 | Default flow, all three documented event families, replay, failure/retry, freshness, size limits, and documented envelope-only scope behave as tested |
| Documented Node verification function | 13 | 13 | 0 | Valid signatures, tampering, wrong secret, stale/future boundaries, malformed headers, and multiple `v1` values behave as tested |
| Simulator/Node signature interoperability | 3 | 3 | 0 | Each documented event family produces a signature accepted by the extracted Node reference |
| Additional desired edge-case invariants | 3 | 0 | 3 | Three hardening gaps were reproduced |
| **Total** | **62** | **59** | **3** | Logic tests only; not a browser or production-server certification |

The harness used Node v24.22.1 native Web Crypto and a fixed signing clock. It executed [the actual simulator][w-js] and [the extracted Node reference][w-signature], rather than a rewritten approximation of the cryptographic logic.

### Successful scenarios checked

- Default 200 processing; unchanged replay acknowledged with side effect skipped; a processed duplicate still returns 200 when 500 is selected afterward.
- A 500 attempt does not mark an event processed, and a manual retry of the same event can succeed.
- A 429 result exposes a five-second hint and `automatic_retries: false`.
- Appending a newline invalidates the exact-byte signature and yields simulated 401.
- Offsets +/-600 and +/-301 fail freshness; +/-300 pass under the controlled clock. Signature validity remains distinct from freshness.
- Normal distinct workspace/event pairs do not collide; history retains the latest ten attempts; reset after a completed attempt clears state.
- Malformed JSON, scalar/array/null envelopes, unsupported event type/schema, invalid field shapes/lengths, invalid secret lengths, fractional/out-of-range offsets, and unsupported selected statuses are rejected by the tested JavaScript paths.
- Exactly 16 KiB of UTF-8 input is accepted; one byte more and oversized multibyte content are rejected. Unicode content signs consistently.
- Empty event-specific `data` remains accepted, consistently with the documented envelope-only validation scope. This was not misclassified as an undocumented production validator.

### Reproduced edge-case findings

| ID / priority | Expected invariant | Observed result and evidence | Proposed fix |
| --- | --- | --- | --- |
| R1 / P2 | Different `(workspace_id, id)` tuples remain distinct | `['ws:alpha', 'evt']` and `['ws', 'alpha:evt']` both become `ws:alpha:evt`; the second is incorrectly acknowledged as already processed. Current validation permits these values. See [deduplication key construction][w-js]. | Use an unambiguous tuple representation such as `JSON.stringify([workspace_id, id])`, or a nested map; real receivers should use an authorized durable composite key |
| R2 / P2 | Reset leaves the inspector cleared even if signing is pending | Deferring the native signing promise, invoking reset, then allowing signing to finish repopulated output/history with the pre-reset delivery. See [async submit and reset handlers][w-js]. | Invalidate pending work with a generation/cancellation token and check it before mutating inbox/output/history, or explicitly prevent reset while pending |
| R3 / P3 | A claimed valid UTC timestamp rejects nonexistent dates | `2026-02-30T07:00:00Z` passed the finite `Date.parse` check and was processed successfully. See [timestamp validation][w-js]. | Validate RFC 3339 syntax and calendar validity, not merely parseability and a trailing `Z`; add invalid leap-day/month/day cases |

These findings affect the local educational simulator. They do not establish a production cross-tenant vulnerability, because no production receiver or authorization service exists here.

### Minimal reproduction notes

For R1, submit a valid envelope with `workspace_id: "ws:alpha"` and `id: "evt"`, then a second envelope with `workspace_id: "ws"` and `id: "alpha:evt"`; keep the documented schema, event type, UTC occurrence field, and object-shaped `data`. The second event should not be a duplicate.

For R2, use a test-controlled delay around `crypto.subtle.sign`, start submission, reset before resolving signing, then resolve the pending operation. A clean reset should not restore the previous result or inbox entry. The controlled delay makes the race deterministic; ordinary browser timing was not measured.

For R3, replace a valid payload's occurrence timestamp with `2026-02-30T07:00:00Z`. The remaining envelope is unchanged. A strict valid-date check should reject it.

## 10. Accessibility, localization, and visual alignment

| Area | Webhook demo | Docs portal | Result / remediation |
| --- | --- | --- | --- |
| Main structure | One `main`, one H1 on each page | Same | Positive source check |
| Heading order | No skipped-level jumps found | Same | Positive source check, not a screen-reader audit |
| Skip link | `#main` target exists on every page | Same, localized skip text on Spanish page | Positive source check; browser focus behavior still needs testing |
| Form labels | All five simulator controls have explicit or wrapping labels | No interactive form in inspected pages | Positive source check |
| Output announcements | Latest result and history use polite live regions | Not applicable | Review announcement verbosity with a screen reader |
| Focus styling | Visible-focus CSS for links and controls | Same | Source support present; keyboard walkthrough not completed |
| Core color palette | Strong sampled body, muted text, links, and input-border contrast | Same palette | Keep shared tokens; see ratios below |
| Launch CTA hover | White text overrides dark CTA text on mint background | Shared risky selector exists, but no equivalent `a.button` was found on the five portal pages | Demo has a source-derived low-contrast state; fix shared rule proactively |
| Current-page indication | `aria-current` absent on all five menus | Same | Add current-page semantics and visible state |
| Language declaration | `lang="en"` | Spanish document correctly uses `lang="es"` | Preserve document language |
| Language of English UI on Spanish page | Not applicable | English nav/footer text lacks explicit English language marking | Mark English parts or localize them consistently; preserve protocol field names |
| Responsive layout | Flex wrapping, grid, media query, scrolling table/code wrappers | Same overall system | Actual narrow-screen, zoom, touch, and keyboard-scroll tests remain open |

### Calculated CSS contrast samples

| Foreground / background use | Calculated ratio | Interpretation |
| --- | --- | --- |
| Body text `#e7edf7` on `#0b1220` | 15.919:1 | Strong |
| Muted text `#b4c3d8` on `#0b1220` | 10.466:1 | Strong |
| Muted text on panel `#142136` | 9.026:1 | Strong |
| Accent link `#69e2d0` on body | 11.938:1 | Strong |
| Accent link on panel | 10.296:1 | Strong |
| Default CTA text `#06241f` on `#69e2d0` | 10.462:1 | Strong |
| Hover CTA text `#ffffff` on `#69e2d0` | **1.568:1** | Fails normal-text and large-text AA contrast thresholds |
| Input border `#687d99` on `#070d17` | 4.617:1 | Strong sampled control-boundary contrast |

The hover issue follows from `a:hover { color: #fff }` having higher specificity than the `.button` text-color rule. It affects [the demo launch link][w-home] with [the demo stylesheet][w-css]. Add an explicit accessible `.button:hover` rule or change its hover background/text pair. The [portal stylesheet][p-css] shares the selector pattern, so align the reusable rule even though no matching portal CTA was present in this snapshot.

### Shared-style drift

Both stylesheets use the same dark palette, spacing system, focus color, grid pattern, and responsive breakpoint. Small differences are deliberate or manageable: the portal constrains H1 and lead-line widths, the demo adds a disabled-button state, and the demo textarea is taller. Keep legitimate interactive overrides, but maintain shared design tokens/rules from a controlled source or a consistency check instead of accidental copy drift.

## 11. Security, privacy, and hosting hardening

| Topic | Webhook demo | Docs portal | Assessment / release action |
| --- | --- | --- | --- |
| Credential handling | Fictional-secret warning, demo value, no real endpoint | Placeholder tokens and explicit `.example` warnings | Positive; retain warnings |
| Application network/storage | Inspected simulator has no `fetch`, persistent storage, or analytics calls | No application runtime script or analytics found | Positive source evidence; normal page/asset GETs and hosting logs are separate concerns |
| Rendering untrusted event text | Results use `textContent` | Static examples | Positive; do not replace with unsafe HTML rendering |
| Signature verification | Web Crypto HMAC; Node raw-Buffer and constant-time comparison example | Describes raw-byte verification and freshness | Positive tested examples, not a complete server review |
| Production persistence | Explicitly warns memory-only inbox is not durable | Requires transactional durable inbox | Aligned |
| HTTPS / HSTS | Enforced HTTPS; observed `Strict-Transport-Security: max-age=31556952` on primary HTML | Same | Positive hosting baseline |
| CSP on successful primary HTML | Not observed | Not observed | Evaluate an appropriate policy for the actual release threat model |
| `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy` on primary HTML | Not observed | Not observed | Shared hosting-hardening opportunity; no exploit is established by header absence alone |
| Security/reuse policy files | No `SECURITY` or license file in inspected tree | Same | Assign approved disclosure and reuse policies before inviting broader adoption |

GitHub Pages does not provide arbitrary response-header control through a normal static repository file. If release policy requires header-level CSP/frame controls or other headers, choose a supported delivery layer rather than claiming that adding a repository configuration file automatically sets them. A meta CSP cannot provide every header CSP capability.

The Node reference explicitly assumes a finite, trusted server clock. No claim is made that passing the tested vectors proves the surrounding middleware, authorization, secret management, or transactional processing implementation is secure.

## 12. SEO, discoverability, error recovery, and performance

| Area | Webhook demo | Docs portal | Recommendation |
| --- | --- | --- | --- |
| Unique page titles | 5/5 present and distinct | 5/5 present and distinct | Preserve |
| Meta descriptions / viewport / charset | Present across inspected pages | Same | Preserve |
| Canonical URLs | Absent | Absent | Decide indexing policy; if indexed, canonicalize root/index aliases and each page |
| Sitemap in repository | Absent | Absent | Provide one for an indexable release; not a prerequisite for serving the site |
| Robots policy in repository | Absent | Absent | Decide deliberately; absence is not itself a broken site or indexing prohibition |
| Open Graph / Twitter / structured-data layer | Not present in inspected markup | Same | Optional release polish, lower priority than correctness |
| Branded 404/recovery | No custom 404 configured or tracked | Same | Add an honest recovery page with local/hub links for a clean release variant |
| HTML volume, five pages total | 25,277 uncompressed source bytes | 26,969 uncompressed source bytes | Lightweight baseline; not a performance score |
| HTML plus referenced CSS/JS | 33,079 uncompressed source bytes | 29,786 uncompressed source bytes | Demo's extra script is justified by its local interaction |
| Third-party fonts/scripts | None in inspected pages | None | Positive simplicity and supply-chain posture |
| Script loading | Local simulator script uses `defer` | No application script | Appropriate source pattern |
| Observed primary HTML compression/cache | gzip; `Cache-Control: max-age=600` | Same | Recheck source/deployment after releases and account for caching |
| LCP / INP / CLS / Lighthouse | Not measured | Not measured | Run matched mobile/desktop lab tests; do not invent comparative scores |

Because these are explicitly fictional fixtures, decide whether they should be discoverable as public documentation or excluded from indexing. Do not strip fictional warnings or publish commercial-looking metadata merely to improve search appearance.

## 13. Release governance and automation comparison

| Control | Webhook demo baseline | Docs portal baseline | Alignment action |
| --- | --- | --- | --- |
| Static publication marker | `.nojekyll` present | Present | Keep |
| In-repo Pages workflow file | None; GitHub-managed dynamic Pages workflow is active | Same | Publication works, but is not a QA gate |
| Automated link/case checks | None found | None found | Validate relative links under project-site prefixes and case-sensitive paths |
| Navigation consistency test | None found | None found | Assert a canonical destination/label/order set per property |
| Automated simulator/reference tests | None found | Not applicable to portal runtime; sample consistency still matters | Promote audit vectors into maintained tests |
| HTML/accessibility checks | No maintained checker found | Same | Add structural validation and browser-based accessibility checks |
| Published GitHub Releases | None returned | None returned | Tie release evidence to approved commit/version when ready |
| Changelog / contribution / ownership artifacts | No CHANGELOG, CONTRIBUTING, or CODEOWNERS in inspected tree | Same | Define proportionate documentation ownership and review expectations |
| License/disclosure policy | No license or SECURITY file found | Same | Make an explicit approved policy choice; public visibility alone is not a reuse license |
| Existing manual acceptance guidance | Detailed simulator session in README | Five-step navigation/cross-site/responsiveness checklist | Combine into one coordinated release checklist |

This report does not assert that repository or organization branch protections are absent; they were outside the audit coverage. Require the proposed checks in the actual release process rather than assuming that adding a workflow file alone makes it mandatory.

### Recommended quality gate

1. Validate HTML, internal links, case-sensitive paths, asset paths, and fragment targets against the actual project-site prefix.
2. Compare normalized primary-menu DOMs across all local pages; require current-page markers.
3. Execute HMAC raw-byte/tamper/freshness vectors, the three payload examples, input-size limits, duplicate handling, and the three newly reproduced edge cases.
4. Run real browser checks at narrow and desktop widths with keyboard navigation, visible focus, zoom, form submission, reset, and horizontal code/table scrolling.
5. Run automated accessibility checks plus manual screen-reader review of the live regions and mixed-language page.
6. Check sibling-site dependencies with bounded retries and distinguish transient hosting failures from authored broken links. Treat the status publication outage as an owned dependency, not a hidden allowlist exception.
7. Compare shared schema/constants and fixture metadata across repositories; retain the intentional differences documented in section 5.
8. Record deployment commit, content consistency, and release sign-off evidence.

For the intentional benchmark variant, encode the **exact expected three seeded failures** as explicit fixture assertions. For a clean release variant, require zero unintended local failures. A broad "ignore all external links" or "ignore all 404s" rule would conceal real regressions and the currently unavailable status dependency.

## 14. Prioritized remediation register

Priorities below are recommendations for a clean aligned release, not statements that changes have been made. Owners are suggested roles, not assigned people.

| ID | Priority | Scope / proposed owner | Finding | Acceptance evidence |
| --- | --- | --- | --- | --- |
| F01 | P1 for clean release | Demo / documentation owner | Three seeded local sublinks fail | Approved destinations or removed obsolete claims; case-sensitive link check passes; benchmark copy matches chosen variant |
| F02 | P1 for clean release | Demo / frontend-documentation owner | Five inconsistent primary menus | All five pages expose one canonical ordered menu, with correct current-page marking |
| F03 | P1 | Cross-site / publishing owner | Status site is unavailable to both properties | Status root, incident history, and SLA policy return intended content; Pages publication state is verified, or references are transparently revised |
| F04 | P2 | Shared design / accessibility owner | Launch CTA hover contrast is 1.568:1 | Actual hovered and focused CTA text passes relevant contrast checks in a browser; shared selector is safe |
| F05 | P2 | Demo / JavaScript owner | Delimiter-based dedup key can collide | Distinct permitted tuples remain distinct; real receiver guidance retains durable authorized composite identity |
| F06 | P2 | Demo / JavaScript owner | Pending signing can undo reset | Deterministic pending-work test leaves output/history/inbox cleared after reset |
| F07 | P3 | Demo / validation owner | Nonexistent calendar dates are accepted | Invalid calendar and nonconforming timestamp cases are rejected consistently with the stated rule |
| F08 | P2 | Both / release engineering | Publication has no inspected in-repo quality gate | Maintained link/nav/contract/browser checks run and are required by the approved release process |
| F09 | P2 | Both / accessibility and localization owners | Current-page semantics absent; English parts of Spanish page need markup review | Correct `aria-current`; tested language-of-parts behavior and keyboard/screen-reader walkthrough |
| F10 | P3 | Both / documentation platform owner | Indexing policy, canonical aliases, custom 404, and metadata are incomplete | Explicit indexing decision; appropriate canonical/discovery/recovery behavior for the chosen variant |
| F11 | P2 policy review | Both / maintainers and security owner | Release ownership, reuse/disclosure policy, and hosting-header requirements are undefined in inspected files | Approved proportionate policies; header requirements implemented through a capable hosting layer if required |
| F12 | P2 before sign-off | Both / QA owner | No completed rendered-browser/mobile/performance validation | Recorded real-browser and matched performance/accessibility results with stated limitations |

P1 does not mean a seeded benchmark should be silently changed. First decide whether the release is the original intentionally imperfect fixture or a remediated derivative. This branch currently contains the report, not either set of fixes.

## 15. Coordinated implementation sequence

### Phase A: choose the release target

- Preserve the pinned benchmark baseline when its known defects are part of the exercise.
- Define whether the release branch is intended to become a clean derivative, and approve actual remediation separately.
- Confirm release ownership, acceptance criteria, and whether Spanish webhook material is in scope; do not treat the existing Spanish summary as a full translation of every page.

### Phase B: repair navigation and dependencies

- Resolve L1-L3 with truthful content destinations, not empty placeholder files.
- Apply one canonical demo menu and current-page indication; retain each property's own appropriate page names.
- Restore or honestly revise the status dependency through an approved cross-repository publishing change.
- Keep working absolute hub/sister URLs intact; root-relative links can break under GitHub project-site paths.

### Phase C: harden the simulator and shared UI

- Replace ambiguous dedup keys, invalidate stale pending work on reset, and validate timestamps strictly.
- Correct CTA hover contrast; preserve focus styling and safe text rendering.
- Add mixed-language markup and verify live-region behavior in a real browser and screen reader.

### Phase D: reconcile explanatory copy

A clean demo would contradict existing text unless it is updated deliberately. Review:

| Location | Existing implication | Required decision if defects are removed |
| --- | --- | --- |
| [Demo README][w-readme], intentional-defects section | Three seeded failures should remain in the fixture | Preserve baseline instructions in the fixture; describe the remediated variant accurately |
| [Demo FAQ][w-faq], benchmark-maintainer notice | Path/navigation inconsistencies intentionally remain | Update or scope the notice to the original fixture |
| [Portal overview][p-home], webhook card | Sister site deliberately contains navigation defects | Coordinate a portal copy update after the clean variant exists; do not change the portal in this report-only commit |
| [Portal README][p-readme], conventions | Intentional path/menu defects are confined to the webhook fixture | Keep the fixture/release distinction explicit rather than spreading defects elsewhere |

### Phase E: validate and publish only after approval

Run the quality gate against localhost and published project prefixes; recheck deployment/source parity and sister URLs; record all approvals and remaining known limitations. A report commit is not a release artifact or a substitute for this sign-off.

## 16. Release acceptance checklist and current result

| Gate | Current audit result | Required state for a clean aligned release |
| --- | --- | --- |
| Primary Pages builds point to audited `main` | PASS, both properties | Verify again for release commit |
| Ten required HTML pages and three referenced CSS/JS assets are available | PASS at audit time | All intended pages/assets return correct content |
| Live HTML matches source | PASS, 10/10 | Same check for approved release snapshot |
| Intended local sublinks work | FAIL in demo: three seeded targets; portal local links pass | Zero unintended failures; explicit fixture assertions if retaining benchmark defects |
| Primary navigation is consistent | FAIL in demo; portal consistent | One approved menu per property and correct current-page state |
| Status/SLA/incident dependency works | FAIL for both properties | Available intended destinations or approved transparent alternatives |
| Documented HMAC scenarios and interoperability | PASS in sandbox harness | Maintained tests plus appropriate browser/server review |
| Additional simulator edge cases | FAIL: three desired invariants | Tuple, pending-reset, and strict-calendar checks pass |
| CTA interaction contrast | FAIL by source-derived calculation | Accessible hover/focus/disabled states verified in browser |
| Keyboard, screen reader, mobile, zoom | NOT COMPLETED | Evidence recorded; issues resolved or explicitly accepted |
| Comparative Lighthouse/Core Web Vitals | NOT MEASURED | Matched lab evidence if required; no invented scores |
| In-repo quality gates and release governance | GAPS FOUND | Approved checks, owners, and release process are in place |
| Indexing/recovery/header policy | DECISION/HARDENING OPEN | Explicit requirements appropriate to a fictional public fixture or clean derivative |
| Actual remediation implementation | NOT PERFORMED by this change | Separate approved changes and verification |

**Bottom line:** keep the portal as the local-navigation/content-consistency reference, but do not mistake it for a fully healthy live release baseline. Restore the shared status dependency, choose the fixture-versus-clean-release target, and complete actual remediation and browser validation before claiming end-to-end release alignment.

## 17. Evidence links

All source links below are pinned to the audited commits. Public-site and workflow links are point-in-time supporting evidence and may change after this report.

[w-repo]: https://github.com/harishs2k26-art/pulseflow-webhook-demo
[p-repo]: https://github.com/harishs2k26-art/pulseflow-docs-portal
[w-commit]: https://github.com/harishs2k26-art/pulseflow-webhook-demo/commit/e4f3986b74bd009633338acbd6d63731a55578c3
[p-commit]: https://github.com/harishs2k26-art/pulseflow-docs-portal/commit/973656d5863c523f23e1550da9c9cba1c1b30fe0
[w-live]: https://harishs2k26-art.github.io/pulseflow-webhook-demo/
[p-live]: https://harishs2k26-art.github.io/pulseflow-docs-portal/
[w-run]: https://github.com/harishs2k26-art/pulseflow-webhook-demo/actions/runs/43573929468
[p-run]: https://github.com/harishs2k26-art/pulseflow-docs-portal/actions/runs/43573928881
[w-readme]: https://github.com/harishs2k26-art/pulseflow-webhook-demo/blob/e4f3986b74bd009633338acbd6d63731a55578c3/README.md
[p-readme]: https://github.com/harishs2k26-art/pulseflow-docs-portal/blob/973656d5863c523f23e1550da9c9cba1c1b30fe0/README.md
[w-home]: https://github.com/harishs2k26-art/pulseflow-webhook-demo/blob/e4f3986b74bd009633338acbd6d63731a55578c3/index.html
[w-payload]: https://github.com/harishs2k26-art/pulseflow-webhook-demo/blob/e4f3986b74bd009633338acbd6d63731a55578c3/payload-examples.html
[w-signature]: https://github.com/harishs2k26-art/pulseflow-webhook-demo/blob/e4f3986b74bd009633338acbd6d63731a55578c3/signature-verification.html
[w-sandbox]: https://github.com/harishs2k26-art/pulseflow-webhook-demo/blob/e4f3986b74bd009633338acbd6d63731a55578c3/live-sandbox.html
[w-faq]: https://github.com/harishs2k26-art/pulseflow-webhook-demo/blob/e4f3986b74bd009633338acbd6d63731a55578c3/faq.html
[w-js]: https://github.com/harishs2k26-art/pulseflow-webhook-demo/blob/e4f3986b74bd009633338acbd6d63731a55578c3/assets/sandbox.js
[w-css]: https://github.com/harishs2k26-art/pulseflow-webhook-demo/blob/e4f3986b74bd009633338acbd6d63731a55578c3/assets/style.css
[p-home]: https://github.com/harishs2k26-art/pulseflow-docs-portal/blob/973656d5863c523f23e1550da9c9cba1c1b30fe0/index.html
[p-start]: https://github.com/harishs2k26-art/pulseflow-docs-portal/blob/973656d5863c523f23e1550da9c9cba1c1b30fe0/getting-started.html
[p-architecture]: https://github.com/harishs2k26-art/pulseflow-docs-portal/blob/973656d5863c523f23e1550da9c9cba1c1b30fe0/architecture.html
[p-pricing]: https://github.com/harishs2k26-art/pulseflow-docs-portal/blob/973656d5863c523f23e1550da9c9cba1c1b30fe0/pricing-tiers.html
[p-spanish]: https://github.com/harishs2k26-art/pulseflow-docs-portal/blob/973656d5863c523f23e1550da9c9cba1c1b30fe0/translations-es.html
[p-css]: https://github.com/harishs2k26-art/pulseflow-docs-portal/blob/973656d5863c523f23e1550da9c9cba1c1b30fe0/assets/style.css
[status-repo]: https://github.com/harishs2k26-art/pulseflow-status-dashboard
[status-home]: https://harishs2k26-art.github.io/pulseflow-status-dashboard/
[status-incidents]: https://harishs2k26-art.github.io/pulseflow-status-dashboard/incident-log.html
[status-sla]: https://harishs2k26-art.github.io/pulseflow-status-dashboard/sla-policy.html
