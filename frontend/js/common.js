// Shared helpers used by every page.
// Each page sets <body data-root="..."> to the path from that page back to the repo root,
// so the same data paths (e.g. "data/subjects.json") work from any folder depth.

const Academia = (() => {
  const root = document.body.dataset.root || "./";

  /** Fetch a JSON file, given a path relative to the repo root. */
  async function loadJSON(path) {
    const res = await fetch(root + path);
    if (!res.ok) throw new Error(`Could not load ${path} (HTTP ${res.status}).`);
    return res.json();
  }

  /**
   * Create an element safely. Text is set with textContent (never innerHTML),
   * so content from the JSON files can't inject HTML or scripts into the page.
   */
  function el(tag, props = {}, children = []) {
    const node = document.createElement(tag);
    for (const [key, value] of Object.entries(props)) {
      if (value !== undefined && value !== null) node[key] = value;
    }
    node.append(...children);
    return node;
  }

  /** Only allow absolute https:// links from the data files. */
  function isSafeLink(url) {
    try {
      return new URL(url).protocol === "https:";
    } catch {
      return false;
    }
  }

  /** Replace a container's contents with a message box. */
  function showMessage(container, title, detail, kind = "info") {
    container.replaceChildren(
      el("div", { className: `message message--${kind}`, role: kind === "error" ? "alert" : "status" }, [
        el("strong", { textContent: title }),
        el("p", { textContent: detail }),
      ])
    );
  }

  /** Show a helpful error, with a special hint for the most common mistake. */
  function showError(container, err) {
    console.error(err);
    const openedAsFile = location.protocol === "file:";
    showMessage(
      container,
      "Something went wrong while loading.",
      openedAsFile
        ? "This page was opened directly from disk. Run `python -m http.server 8000` in the project folder and open http://localhost:8000/ instead."
        : err.message,
      "error"
    );
  }

  return { loadJSON, el, isSafeLink, showMessage, showError };
})();
