(function odysseusPortfolio() {
  "use strict";

  function boot() {
    initProjectFilters();
    initContactForm();
    initSmoothScroll();
  }

  /* ======================================================================
       Project Filters
       ====================================================================== */
  function initProjectFilters() {
    var filterButtons = document.querySelectorAll("[data-project-filter]");
    var projectCards = document.querySelectorAll("[data-project]");

    if (!filterButtons.length) return;

    filterButtons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var filter = btn.getAttribute("data-project-filter");

        filterButtons.forEach(function (b) {
          b.classList.remove("active");
        });
        btn.classList.add("active");

        projectCards.forEach(function (card) {
          if (filter === "all" || card.getAttribute("data-project") === filter) {
            card.classList.remove("project-card-hidden");
          } else {
            card.classList.add("project-card-hidden");
          }
        });
      });
    });
  }

  /* ======================================================================
       Contact Form
       ====================================================================== */
  function initContactForm() {
    var form = document.querySelector(".contact-form");
    var note = document.querySelector(".contact-note");

    if (!form) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var btn = form.querySelector(".contact-submit");
      var original = btn.textContent;
      btn.textContent = "Sending\u2026";
      btn.disabled = true;

      fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      })
        .then(function (res) {
          if (!res.ok) throw new Error("Submission failed");
          note.textContent = "Thanks! I'll get back to you soon.";
          note.style.color = "#15803d";
          form.reset();
        })
        .catch(function () {
          note.textContent = "Something went wrong. Please email me directly.";
          note.style.color = "#dc2626";
        })
        .finally(function () {
          btn.textContent = original;
          btn.disabled = false;
        });
    });
  }

  /* ======================================================================
       Smooth Scroll for anchor links
       ====================================================================== */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener("click", function (e) {
        var targetId = link.getAttribute("href");
        if (targetId === "#") return;

        var target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
