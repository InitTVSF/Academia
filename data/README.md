# data/

Content for Academia, stored as JSON. The frontend reads it now, and a future backend can serve the same files.

## Files

| File | Purpose |
|---|---|
| `subjects.json` | List of every subject. The front page builds its subject list from this file. |
| `subjects/<id>.json` | One file per subject: links to its practical questions and papers. |

## Adding a new subject

1. Add an entry to `subjects.json`, giving it a unique lowercase `id` (e.g., `dsa`, `java`).
2. Create `subjects/<id>.json` using the schema below.
3. You don't need to change any code.

## Schema

### `subjects.json`
```json
{
  "subjects": [
    {
      "id": "cpp",                          // unique, lowercase, used in URLs
      "name": "C++ Programming",            // display name
      "status": "available",                // "available" | "coming-soon"
      "dataFile": "data/subjects/cpp.json"  // path from the repo root
    }
  ]
}
```

### `subjects/<id>.json`
```json
{
  "id": "cpp",
  "name": "C++ Programming",
  "practicals": {
    "driveFolderLink": "https://drive.google.com/drive/folders/...",  // shared folder of question images
    "description": "...",
    "lastUpdated": "YYYY-MM-DD"
  },
  "papers": [
    // Optional. Fill in later to list papers one by one instead of only linking the folder:
    // { "title": "Practical 2025 - Set A", "year": 2025, "semester": 2, "link": "https://..." }
  ]
}
```

(JSON doesn't allow comments. They appear above only to explain the fields.)

## Checklist before adding links
- Set the Drive folder to **"Anyone with the link → Viewer"**, or students won't be able to open it.
- Check the images for personal details (names, roll numbers, signatures) and remove or crop them first.
