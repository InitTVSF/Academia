# Architecture

## Current (v0: static site)

```
Browser ──> frontend/index.html (front page: subject list)
              │  fetch()
              ├──> data/subjects.json
              └──> frontend/pages/subject.html?id=cpp
                      │  fetch()
                      └──> data/subjects/cpp.json ──> Google Drive folder link
```

- No server-side code. Any static host can serve it, such as GitHub Pages.
- The JSON files in `data/` are the single source of truth. Adding a subject means changing data only.
- The site must be served over HTTP, even when testing locally. Browsers block `fetch()` on `file://` URLs.
  Serve it locally from the repo root with `python -m http.server 8000`, then open `http://localhost:8000/` (the root `index.html` redirects to `frontend/`).
- The subject page looks the `?id=` up in `subjects.json` (an allowlist), so URL input never becomes a file path.

## Folder responsibilities

| Folder | Holds |
|---|---|
| `frontend/` | HTML, CSS, JS and static assets |
| `frontend/pages/` | Pages other than the front page (e.g., the subject page) |
| `data/` | Content as JSON (see `data/README.md`) |
| `backend/` | Reserved for a future API (see `backend/README.md`) |
| `docs/` | Design notes like this one |

## Possible later stages
- **v1:** list individual papers and filter them by year or semester. This only needs the `papers` array to be filled in.
- **v2:** a backend for uploads, moderation and accounts.
