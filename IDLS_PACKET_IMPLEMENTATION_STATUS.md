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
