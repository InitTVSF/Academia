# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Project

**Academia** — "A Simple Platform For Academic Help."
A personal side project that helps students academically. Repo: `github.com/InitTVSF/Academia`.

**Problem:** students have no way to find out which questions were asked in earlier practical exams.

**Current feature (v0):** a simple website that shows students past **C++ practical exam questions**. The question images are stored in a Google Drive folder, and the site links to that folder through a JSON file.

**Stage:** v0 website built: a front page listing subjects and a subject page linking to the Drive folder. See `docs/tasks.md` for the task list.

**Tech stack (v0):** a static site using plain HTML, CSS and JavaScript, with content in JSON files. There's no backend and no build step. Don't add frameworks or a backend unless the user agrees.

Still undecided:
- Which course and semester the C++ questions belong to
- Success metrics
- Whether students will contribute content themselves
- **Planned feature: image quality.** Fix angled photos and improve contrast, and detect blurry photos so they can be retaken rather than "fixed". Where the processing runs (offline script, browser, or server) isn't decided yet. Don't implement it until the user chooses.

**Design principle:** the project should grow by adding data. A new subject should mean adding JSON files, not changing code.

## Repository layout

```
.gitignore
CLAUDE.md
README.md
index.html           # redirects repo root to frontend/ (for GitHub Pages / local server)
frontend/            # static site
  index.html         # front page: subject cards built from data/subjects.json
  pages/subject.html # subject page, ?id=<subject id>
  css/style.css      # all styles; colour tokens in :root, dark mode via prefers-color-scheme
  js/common.js       # shared helpers (Academia.loadJSON, el, isSafeLink, showMessage, showError)
  js/main.js         # front page logic
  js/subject.js      # subject page logic
  assets/images/     # static images (logo, icons)
data/                # content as JSON, the single source of truth
  subjects.json      # list of all subjects
  subjects/cpp.json  # C++: Drive folder link + optional per-paper list
  README.md          # data schema and how to add a subject
backend/             # reserved for future API (not started)
docs/architecture.md # architecture and how pages load data
docs/tasks.md        # running task list (tick items off as they're done)
discussion/          # LOCAL ONLY (git-ignored) chat logs and tasks
```

Read `data/README.md` before changing the JSON format, and update it whenever the schema changes.

## Working rules

### Process
- Follow the cycle: problem discovery → design → prototype → testing → evaluation → refinement. Don't skip ahead to code while scope is still TBD.
- Push back on vague or weakly justified features. Ask who it's for, what alternatives exist, and how success will be measured.
- Prefer simple, maintainable solutions over clever ones. Explain trade-offs when choosing between approaches.
- When debugging, find and explain the root cause; don't just patch symptoms.

### Teaching and integrity
- This is a learning project. Explain the reasoning behind non-trivial code and decisions. When the user asks for a full implementation, provide it with explanation.
- Never invent facts, citations, datasets, benchmarks, or results. State uncertainty.

### Git
- Default branch: `main`. Do work on feature branches (currently `setup`).
- Commit or push only when the user asks.
- Use short, imperative commit messages (e.g., `Add login form validation`).
- Never commit `discussion/`, secrets, `.env` files, credentials, or personal data.

### Security and privacy
- No API keys, passwords, or tokens in code. Use environment variables, and add `.env` to `.gitignore` once a stack is chosen.
- Treat any student/faculty data as sensitive: collect only what's needed and never log it in plain text.

### Code quality (applies once code exists)
- Add tests alongside new features. Record the test and run commands below once they exist.
- Keep `.gitignore` updated with ignores for the chosen stack (e.g., `node_modules/`, `__pycache__/`, build outputs).
- Update this file when the stack, structure, or commands change.

## Commands

Run locally from the repo root. `fetch()` doesn't work over `file://`, so the site has to be served over HTTP:

```
python -m http.server 8000
# open http://localhost:8000/frontend/
```

Then open http://localhost:8000/ (it redirects to `/frontend/`).

### Frontend conventions
- Each page sets `<body data-root="...">` to the path back to the repo root. Load data with `Academia.loadJSON("data/...")` and never hard-code `../` paths.
- Build DOM with `Academia.el()` and `textContent`. **Never use `innerHTML` with data from JSON or the URL.**
- Subject pages look the `?id=` up in `subjects.json`. Never build a file path from URL input.
- Only render links that pass `Academia.isSafeLink()` (https only). External links use `target="_blank" rel="noopener noreferrer"`.
- No inline scripts or styles. Plain JS with no build step and no frameworks.
- Test on a phone-width screen as well as desktop.

## Content rules
- Question images must not contain personal details (names, roll numbers, signatures).
- Drive links must be set to "Anyone with the link → Viewer".
- Never make up question content, links or paper metadata. Leave a field empty if the value isn't known.

## Discussion log (`discussion/`)

- `discussion/` is git-ignored and holds local notes from Claude sessions.
- One file per session: `discussion/YYYY-MM-DD_session-NN.md`.
- When the user asks to log a discussion, append an entry using this format:
  ```
  ## [HH:MM] Topic
  **Request:** ...
  **Actions taken:** ...
  **Outcome / decisions:** ...
  ```
- Use IST (UTC+05:30) timestamps. Don't record emails, passwords, or other personal details.
