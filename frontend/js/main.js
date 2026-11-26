// Front page: builds one card per subject listed in data/subjects.json.

(async function renderSubjects() {
  const list = document.getElementById("subject-list");
  const { el } = Academia;

  try {
    const { subjects } = await Academia.loadJSON("data/subjects.json");

    if (!Array.isArray(subjects) || subjects.length === 0) {
      Academia.showMessage(list, "No subjects yet.", "Check back soon.");
      return;
    }

    list.replaceChildren(...subjects.map(subjectCard));
  } catch (err) {
    Academia.showError(list, err);
  }

  function subjectCard(subject) {
    const available = subject.status === "available";

    // Available subjects are links; "coming soon" ones are plain, non-clickable cards.
    return el(
      available ? "a" : "div",
      {
        className: available ? "card" : "card card--disabled",
        href: available ? `pages/subject.html?id=${encodeURIComponent(subject.id)}` : undefined,
      },
      [
        el("h3", { className: "card__title", textContent: subject.name }),
        el("span", {
          className: available ? "badge" : "badge badge--muted",
          textContent: available ? "Practical questions →" : "Coming soon",
        }),
      ]
    );
  }
})();
