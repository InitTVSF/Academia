// Subject page: shows the practical questions for one subject.
// URL format: pages/subject.html?id=cpp

(async function renderSubject() {
  const container = document.getElementById("subject");
  const { el } = Academia;
  const id = new URLSearchParams(location.search).get("id");

  try {
    // Look the id up in subjects.json instead of building a file path from it.
    // This way only subjects we've listed can be loaded, whatever is typed in the URL.
    const { subjects } = await Academia.loadJSON("data/subjects.json");
    const entry = (subjects || []).find((s) => s.id === id);

    if (!entry) {
      Academia.showMessage(
        container,
        "Subject not found.",
        "This subject doesn't exist (yet). Go back to the home page to see the available subjects.",
        "error"
      );
      return;
    }

    document.title = `${entry.name} · Academia`;

    if (entry.status !== "available") {
      container.replaceChildren(el("h1", { textContent: entry.name }));
      container.append(
        el("p", { className: "muted", textContent: "Questions for this subject are coming soon." })
      );
      return;
    }

    const subject = await Academia.loadJSON(entry.dataFile);
    container.replaceChildren(...subjectView(subject));
  } catch (err) {
    Academia.showError(container, err);
  }

  function subjectView(subject) {
    const practicals = subject.practicals || {};
    const parts = [el("h1", { textContent: subject.name })];

    const section = el("section", { className: "panel" }, [
      el("h2", { textContent: "Practical exam questions" }),
    ]);
    if (practicals.description) {
      section.append(el("p", { textContent: practicals.description }));
    }

    if (Academia.isSafeLink(practicals.driveFolderLink)) {
      section.append(
        el("a", {
          className: "button",
          href: practicals.driveFolderLink,
          target: "_blank",
          rel: "noopener noreferrer", // the new tab can't control this page
          textContent: "Open practical questions ↗",
        }),
        el("p", { className: "muted small", textContent: "Opens in Google Drive in a new tab." })
      );
    } else {
      section.append(el("p", { className: "badge badge--muted", textContent: "Coming soon" }));
    }

    if (practicals.lastUpdated) {
      section.append(
        el("p", { className: "muted small", textContent: `Last updated: ${formatDate(practicals.lastUpdated)}` })
      );
    }
    parts.push(section);

    // Optional per-paper list (see data/README.md). Hidden while the array is empty.
    const papers = (subject.papers || []).filter((p) => Academia.isSafeLink(p.link));
    if (papers.length > 0) {
      const list = el("ul", { className: "paper-list" });
      for (const paper of papers) {
        const meta = [paper.year, paper.semester && `Semester ${paper.semester}`].filter(Boolean).join(" · ");
        list.append(
          el("li", {}, [
            el("a", {
              href: paper.link,
              target: "_blank",
              rel: "noopener noreferrer",
              textContent: paper.title || "Untitled paper",
            }),
            meta ? el("span", { className: "muted small", textContent: ` ${meta}` }) : "",
          ])
        );
      }
      parts.push(el("section", { className: "panel" }, [el("h2", { textContent: "Papers" }), list]));
    }

    return parts;
  }

  function formatDate(isoDate) {
    const date = new Date(`${isoDate}T00:00:00`);
    return Number.isNaN(date.getTime())
      ? isoDate
      : date.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
  }
})();
