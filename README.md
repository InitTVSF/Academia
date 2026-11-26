# Academia
A Simple Platform For Academic Help

Academia helps students prepare for practical exams by showing them the questions asked in previous practicals.

**Currently available:** C++ practical questions.

## Project structure
- `frontend/`: the website (HTML, CSS, JS)
- `data/`: subjects and question links as JSON (see [`data/README.md`](data/README.md))
- `backend/`: reserved for future features
- `docs/`: architecture notes

## Run locally
```
python -m http.server 8000
```
Then open http://localhost:8000/frontend/
