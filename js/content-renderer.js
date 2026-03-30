(function() {
  "use strict";

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function parseItems(yamlText) {
    var data = jsyaml.load(yamlText) || {};
    if (!Array.isArray(data.items)) {
      return [];
    }
    return data.items;
  }

  function loadYaml(path) {
    return fetch(path, { cache: "no-store" }).then(function(response) {
      if (!response.ok) {
        throw new Error("Unable to load " + path);
      }
      return response.text();
    });
  }

  function renderEducation(items) {
    var timeline = document.getElementById("education-timeline");
    if (!timeline) {
      return;
    }

    var sorted = items.slice().sort(function(a, b) {
      var left = Number(a.sort || a.period || 0);
      var right = Number(b.sort || b.period || 0);
      return right - left;
    });

    var html = sorted.map(function(item, index) {
      var liClass = index % 2 === 1 ? ' class="timeline-inverted"' : "";
      var connector = index < sorted.length - 1 ? '<div class="line"></div>' : "";
      var image = escapeHtml(item.image || "img/univr.png");
      var period = escapeHtml(item.period || "");
      var title = escapeHtml(item.title || "");
      var description = item.description_html || escapeHtml(item.description || "");

      return [
        '<li' + liClass + '>',
        '  <div class="timeline-image">',
        '    <img class="img-circle img-fluid" src="' + image + '" alt="">',
        "  </div>",
        '  <div class="timeline-panel">',
        '    <div class="timeline-heading">',
        '      <h4>' + period + '</h4>',
        '      <h4 class="subheading">' + title + '</h4>',
        "    </div>",
        '    <div class="timeline-body">',
        '      <p class="text-muted">' + description + "</p>",
        "    </div>",
        "  </div>",
        "  " + connector,
        "</li>"
      ].join("\n");
    }).join("\n");

    timeline.innerHTML = html;
  }

  function renderPublications(items) {
    var publicationsList = document.getElementById("publications-list");
    if (!publicationsList) {
      return;
    }

    if (!items.length) {
      publicationsList.innerHTML = '<p class="text-muted">No publications added yet.</p>';
      return;
    }

    var sorted = items.slice().sort(function(a, b) {
      return Number(b.year || 0) - Number(a.year || 0);
    });

    publicationsList.innerHTML = sorted.map(function(item) {
      var year = escapeHtml(item.year || "");
      var title = escapeHtml(item.title || "");
      var authors = escapeHtml(item.authors || "");
      var venue = escapeHtml(item.venue || "");
      var link = item.link ? '<a href="' + escapeHtml(item.link) + '" target="_blank" rel="noopener noreferrer">Read publication</a>' : "";

      return [
        '<article class="publication-item">',
        '  <p class="publication-year">' + year + '</p>',
        '  <h4 class="publication-title">' + title + '</h4>',
        '  <p class="publication-authors">' + authors + '</p>',
        '  <p class="publication-venue">' + venue + '</p>',
        '  <p class="publication-link">' + link + '</p>',
        '</article>'
      ].join("\n");
    }).join("\n");
  }

  function renderError(targetId, message) {
    var target = document.getElementById(targetId);
    if (!target) {
      return;
    }
    target.innerHTML = '<p class="text-muted">' + escapeHtml(message) + '</p>';
  }

  Promise.all([
    loadYaml("data/education.yml").then(parseItems),
    loadYaml("data/publications.yml").then(parseItems)
  ]).then(function(results) {
    renderEducation(results[0]);
    renderPublications(results[1]);
  }).catch(function(error) {
    renderError("education-timeline", "Education data is currently unavailable.");
    renderError("publications-list", "Publications data is currently unavailable.");
    if (window.console && typeof window.console.error === "function") {
      window.console.error(error);
    }
  });
})();