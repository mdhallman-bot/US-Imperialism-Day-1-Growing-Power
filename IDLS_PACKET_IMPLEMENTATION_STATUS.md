# IDLS Imperialism Day 2 — unified investigation packet release ledger
Date: November 22, 2026
Status: BUILT / SOURCE-AUDITED / STATIC JS CHECKED — BROWSER ACCEPTANCE OPEN

## Preview only
- Preview: `pilot-preview.html` (local-only assignment saving; mock local Learning Check scoring).
- Production `index.html` and `app.js`, including classroom saving endpoint, were not edited.
- `pilot-unified-packets.js` moves existing DOM elements, preserving their field IDs and glossary nodes. It adds six short direct-answer fields and the optional cartoon activity.
- Each required packet contains numbered context paragraphs, a context main-idea check, direct writing, initial judgment, linked readings/documents, evidence analysis, and revised judgment. Original source excerpts keep their independent source labels.
- Optional China is now a single packet with John Hay's Open Door excerpt and the user-supplied 1900 cartoon; two or three observations plus two brief inference prompts.

## Source
- China cartoon: Emil Flohri, *Judge*, March 21, 1900, “And, After All, the Philippines Are Only the Stepping-Stone to China.”
- Local image: `assets/china-stepping-stone.jpg` (72,014 bytes), uploaded from teacher-supplied image; embedded without an external CDN.
- Citation/description: MIT Visualizing Cultures, https://visualizingcultures.mit.edu/boxer_uprising/bx_essay03.html ; Wikimedia Commons source link remains available from the page.
- Cartoon represents artist's view of American trade ambitions, not what all Chinese, Filipinos or Americans believed.

## Static checks completed
- GitHub files verified after commit, preview script included, local cartoon asset in repo.
- JavaScript syntax passed for new packet script and preview scoring scripts.
- Production `index.html` and `app.js` unchanged.
- Runtime `window.IDLS_PACKET_AUDIT` checks six packet containers, unique field IDs, registered response fields, two frames per textarea, local cartoon reference, and previously identified glossary-definition leak. This audit must be executed in the actual browser before treating its result as verified.

## Required live browser acceptance
- Open with fake alias; navigate all sections, including optional China; verify scrolling, page tabs, reveal sequences and embedded sources.
- Check packet paragraph numbers and main-idea/direct-answer placement; evidence genuinely reads as one story and source cards remain attributable.
- Verify cartoon renders from repository asset, enlarges and closes, and is legible on student Chromebooks.
- Answer new direct-response and three cartoon textareas; verify local save, refresh/restore, completion grade, full Assignment PDF and Emergency PDF responses.
- Check glossary hover/tap/focus no longer exposes hidden definitions inline.
- Learning Check must remain on final submission page and mock score remain independent from completion grade.
- Confirm total student writing/time remains feasible; there is still a brief MC main-idea check alongside the new direct answer in required episodes. Teacher may decide after walkthrough whether both are worth the time.
- Separate annual learning-evidence Apps Script deployment and actual spreadsheet reporting remain unverified/unconnected.

## Rollout constraint
Do not copy this preview into the live classroom assignment or claim classroom-ready until teacher approves flow and browser/PDF, state and asset checks pass. Preserve existing student work and existing cloud save architecture.

## November 22 scope reduction — teacher clarification
- Teacher identified three adjacent overlapping items: **10-second historical context MC**, **one-sentence Quick response**, and **initial prediction**. Keep the *initial prediction* as the single immediate judgment in Oregon, Economy, Hawaiʻi, Panama, and Dominican Republic. Remove context MC and Quick response from active registry/UI; preserve existing response-state keys rather than deleting saved work. Later distinct source analysis and revised judgments remain.
- China is **required**, approximately five minutes, and **cartoon-only**. Retired optional China prediction, reading, document excerpt, reveal and other responses are absent from active registry/UI, but original saved data are not erased. Student faces 3 response boxes: observations, stepping-stone inference and China-market inference; both inference answers require cartoon details.
- Preview-only `pilot-revamp.js` replaces the script reference `revamp.js` only on `pilot-preview.html`, enforcing China navigation completion and labeling it as a required tab. Original production `revamp.js` is unchanged.
- Preview-only `pilot-consolidation.js` loads after packet, ranking and vocabulary scripts. Audit available at `window.IDLS_CONSOLIDATION_AUDIT` (runtime test still required). Source citation is included in both PDF report functions.
- GitHub updated and JavaScript syntax checked, standards updated to master/spec/log v1.0 and general history standard v1.7. **Still not browser-tested or classroom ready.** Before release, verify China completion gating, answer persistence, rankings, both PDFs, and independent Learning Check. Teacher's full walkthrough is still pending.

## November 22 evening: teacher walkthrough findings and remediation
- Earlier consolidation retired the main-idea MC and context one-sentence fields, but an obsolete blank containing panel remained. Latest `pilot-final-edit.js` removes the *entire* visible legacy card and leaves historical saved keys intact.
- Generic ranking headings above the real historical question were removed. Motive choices, ranking IDs, arrow controls, first and second motive rankings, and explanation fields remain.
- Earlier generic background close-reading questions were too far from their source paragraphs. All five were replaced by two specific short-answer questions directly under the two original historical source excerpts (`<section>_source_a`, `<section>_source_b`), then the existing higher-order comparison. The old `<section>_close` data keys are **preserved but no longer credited or printed under the new questions**.
- The passive Source-reading move panel is removed where these actual Source A/B questions now teach the skill. The more demanding analysis and power questions remain.
- Two-term vocabulary requirement now applies only to `synthesis_1`, not every writing box; glossaries and two sentence frames remain available.
- The Economy analysis now asks for two plausible reasons exports increased and the evidence needed to investigate them. Its power question names business owners, U.S. officials, workers and people overseas. Hawaiʻi's initial select now judges sources of consent rather than guessing a number; this question was substantively revised and may require a **new throwaway alias** in a mock run to avoid old prototype answers.
- Retired the second factual prediction dropdown after evidence in each of five required investigations. Existing initial predictions and distinct motive ranking revisions remain; reveal buttons now say \"Reveal what happened\". Preview-only `pilot-app-streamlined.js` tolerates absent retired fields and uses the original initial choice to permit reveal after required source responses.
- New files and script order checked statically; **actual browser, completion, field restoration and PDF tests remain required**. Original production `index.html`, `app.js` and classroom save endpoint remain unchanged.
