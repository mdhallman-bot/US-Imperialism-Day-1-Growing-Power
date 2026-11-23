# Growing Power — Student Release Candidate (November 22, 2026)

## Files
- Candidate page: `student-release.html` (not the root `index.html`).
- Student assignment save client: `student-app.js`, forked from existing `app.js` with only retired-field safety changes. Original saving namespace, tab and Web App URL retained. Original live `index.html` and `app.js` remain unchanged.
- Independent check: `student-learning-check.js`. Five questions with no answer key or grading rationales in this file; answers stored in the assignment response state and included in its PDF. The button confirms answers were saved with the assignment. It does **not** auto-score or submit Learning Evidence analytics.
- Existing locally bundled `assets/jspdf.umd.min.js`, maps, cartoon asset, instructions and teacher-approved source/prompt revisions remain.

## Completed
- Student-only page created and GitHub fetched/verified; removed teacher mock-test banner.
- Reinstated original assignment cloud-save protocol in the student client; syntax-checked and compared unchanged endpoint and namespace.
- Five question choices shown; student check has no answer key; answer IDs match pilot.
- Confirmed all declared student scripts and local PDF library are referenced.
- Production root `index.html` and original `app.js` untouched.

## NOT COMPLETE; DO NOT ASSIGN TO STUDENTS YET
1. Annual private Learning Evidence Sheet ID and separate Apps Script deployment URL not supplied. Current assessment selections are saved within assignment only; no private analytics grading/reporting. Existing publicly committed pilot JS and its Git history contain demonstration keys for these items, so use a newly audited item version when activating operational analytics.
2. Exact old save deployment must be diagnosed with an unused alias, then verified to read/write the expected tab and lesson. Existing endpoint was copied from the repository; it has not been verified live for the modified candidate.
3. Test browser interactions with throwaway alias: 5 investigations, both history reveals, both sets of motive rankings and drag/keyboard order, required China cartoon, synthesis evidence table, hover/tap words and images.
4. Verify same-device and cross-device save/restore, offline fallback, conflict handling without harming class records.
5. Open and inspect both primary and Emergency PDFs for correct alias, vocabulary-adjusted completion grade at top, full responses (including Source A/B and five MC answers), and long-answer pagination. Test asset availability and console errors.
6. After all gates pass, optionally publish the candidate as the root `index.html` with user authorization and rollback plan.

## Teacher handoff
Provide existing private annual Learning Evidence spreadsheet ID, then deploy the separately prepared Learning Evidence Apps Script and provide its exact /exec URL. Avoid copying the answer key into public GitHub code. Until then, the candidate is usable for teacher preflight with a throwaway alias but not certified classroom-ready.
