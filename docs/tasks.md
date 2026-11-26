# Tasks

Last updated: 2026-11-26 08:36 IST

## Now: v0, C++ practical questions page

- [ ] **Collect content.** Upload the C++ practical question images to one Google Drive folder.
  - [ ] Remove or crop out names, roll numbers and signatures.
  - [x] Set sharing to "Anyone with the link → Viewer". (folder is public, checked ~08:47)
  - [x] Check that the files show up for logged-out visitors (5 images visible at 08:48)
  - [ ] Check with a faculty member that sharing past practical questions is allowed.
- [x] **Fill in data.** Paste the folder link into `data/subjects/cpp.json` → `practicals.driveFolderLink`.
- [ ] **Front page.** Create `frontend/index.html`.
  - [ ] Header with the project name and a one-line purpose.
  - [ ] Load `data/subjects.json` with `fetch()` and show one card per subject.
  - [ ] Each card links to `pages/subject.html?id=<id>`.
- [ ] **Subject page.** Create `frontend/pages/subject.html`.
  - [ ] Read `id` from the URL and load `data/subjects/<id>.json`.
  - [ ] Show the subject name and a clear "Open C++ practical questions" button pointing to the Drive link.
  - [ ] If the link is empty, show "Coming soon" instead of a broken button.
- [ ] **Styling.** Add `frontend/css/style.css`: simple, readable and mobile-friendly (students will mostly use phones).
- [ ] **Scripts.** Put the JS in `frontend/js/` (e.g., `main.js`, `subject.js`), not inline.
- [ ] **Test locally.** From the repo root, run `python -m http.server 8000` and open `http://localhost:8000/frontend/`.
  - [ ] Test it on a phone-sized screen.
  - [ ] Test an unknown `?id=` and a missing JSON file. The page should show a friendly error.
- [ ] **Deploy.** Publish with GitHub Pages and add the live URL to `README.md`.
- [ ] **Get feedback.** Share the site with a few classmates and note whether they found the questions quickly.

## Next: image quality (fix blurry or angled photos)
_Proposed 08:45. Waiting on decisions: who uploads, and where the processing runs (see session log)._

- [ ] **Decide** who uploads (students or maintainer) and where processing runs (offline script, browser, or server).
- [ ] **Build a test set.** Collect 15–20 real bad photos (angled, blurry, shadowed) plus a few good ones.
- [ ] **Blur check.** Compute a blur score (variance of the Laplacian) and pick a threshold using the test set.
- [ ] **Perspective fix.** Detect the paper's 4 corners, then warp to a flat top-down view.
- [ ] **Enhancement.** Grayscale + adaptive threshold or CLAHE for a "scanned" look.
- [ ] **Evaluate** on the test set: % readable after processing, % blurry correctly rejected, time per image. Look at where it fails, e.g., the paper edge isn't visible or the background is cluttered.
- [ ] **Compare** results against Google Drive scan or Microsoft Lens on the same photos (baseline).
- [ ] Only then: wire it into an upload flow (needs backend, see `backend/README.md`).

## Later (backlog)
- [ ] OCR the cleaned images to get searchable question text (needs manual checking).
- [ ] List individual papers (year, semester, set) using the `papers` array.
- [ ] Add more subjects (data only: new entries in `subjects.json` plus `subjects/<id>.json`).
- [ ] Search and filter by year or semester.
- [ ] Decide whether a backend is needed (uploads, accounts, admin). See `backend/README.md`.
- [ ] Choose a license.

## Open questions
- Which university, course and semester is the C++ subject from? (This should be shown on the page.)
- Will students contribute photos, or will you collect them yourself?
- How will you measure whether it helps? (e.g., number of visits, or classmates' feedback)
