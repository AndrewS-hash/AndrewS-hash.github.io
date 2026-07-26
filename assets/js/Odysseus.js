const incidents = [
  {
    id: 1,
    title: "The Lotus-Eaters",
    category: "distraction",
    categoryLabel: "Distraction",
    duration: "Several avoidable days",
    severity: "High severity",
    summary: "The team forgot the primary objective after encountering lotus.",
    issue:
      "The crew entered an environment designed to eliminate urgency and temporarily abandoned the journey home.",
    action:
      "Establish milestones, maintain crew accountability, and enforce a strict departure deadline before exploring.",
    system: "Automated deadline alerts",
    icon: "⏱",
    color: "#ffd84d"
  },
  {
    id: 2,
    title: "The Cyclops",
    category: "blocker",
    categoryLabel: "Risk-management failure",
    duration: "One cave incident",
    severity: "Critical severity",
    summary: "An unvetted cave became a hostage situation.",
    issue:
      "Odysseus entered an unknown location without conducting reconnaissance, preparing an exit strategy, or respecting obvious risk signals.",
    action:
      "Send a scouting team first, document the entrance, retain an escape route, and avoid announcing your legal name to the threat.",
    system: "Pre-entry risk checklist",
    icon: "⚠",
    color: "#ff9d57"
  },
  {
    id: 3,
    title: "The Bag of Winds",
    category: "failure",
    categoryLabel: "Communication failure",
    duration: "Destination nearly reached",
    severity: "Critical severity",
    summary: "The crew opened a critical asset because nobody explained it.",
    issue:
      "A sealed navigational resource was left beside an uninformed and suspicious crew with no ownership protocol.",
    action:
      "Identify the asset, explain its purpose, assign a trusted owner, and implement access controls before going to sleep.",
    system: "Role-based access control",
    icon: "🔐",
    color: "#8cbcff"
  },
  {
    id: 4,
    title: "Circe's Island",
    category: "distraction",
    categoryLabel: "Scope creep",
    duration: "Approximately one year",
    severity: "High severity",
    summary: "A rescue operation turned into a year-long residency.",
    issue:
      "After resolving the initial crisis, the project lead remained at a comfortable detour without a defined departure date.",
    action:
      "Close the incident, restore the team, record lessons learned, and immediately return to the original project roadmap.",
    system: "Calendar-based escalation",
    icon: "📆",
    color: "#ff9fca"
  },
  {
    id: 5,
    title: "The Sirens",
    category: "distraction",
    categoryLabel: "Known distraction",
    duration: "Brief but dramatic",
    severity: "Medium severity",
    summary: "A predictable temptation required a mast-based workaround.",
    issue:
      "Odysseus knew the distraction was dangerous but still designed a process that required the entire crew to restrain him manually.",
    action:
      "Block exposure completely, document the procedure, and remove the project lead as a single point of failure.",
    system: "Automated content restriction",
    icon: "🔇",
    color: "#b99cff"
  },
  {
    id: 6,
    title: "Scylla and Charybdis",
    category: "blocker",
    categoryLabel: "Forced trade-off",
    duration: "One catastrophic passage",
    severity: "Unavoidable severity",
    summary: "The route offered two bad options and no perfect outcome.",
    issue:
      "This was a genuine strategic constraint rather than a simple distraction. Every route involved measurable loss.",
    action:
      "Evaluate both risks, choose the least destructive option, communicate the decision, and document why the loss was accepted.",
    system: "Decision-impact matrix",
    icon: "⚖",
    color: "#a9e76c"
  },
  {
    id: 7,
    title: "Calypso",
    category: "blocker",
    categoryLabel: "Executive-level blocker",
    duration: "Seven years",
    severity: "Maximum severity",
    summary: "The project remained blocked for seven years before escalation.",
    issue:
      "Odysseus was unable to leave, yet the issue remained unresolved until divine leadership finally intervened.",
    action:
      "Escalate captivity to Athena immediately, request executive sponsorship, and do not allow a blocker to age into an epic subplot.",
    system: "Automatic blocker escalation",
    icon: "📣",
    color: "#ff9fca"
  }
];

const incidentGrid = document.querySelector("#incidentGrid");
const filterButtons = document.querySelectorAll(".filter-button");

const detailSeverity = document.querySelector("#detailSeverity");
const detailNumber = document.querySelector("#detailNumber");
const detailCategory = document.querySelector("#detailCategory");
const detailTitle = document.querySelector("#detailTitle");
const detailIssue = document.querySelector("#detailIssue");
const detailAction = document.querySelector("#detailAction");
const detailSystem = document.querySelector("#detailSystem");
const detailIcon = document.querySelector("#detailIcon");

const nextIncidentButton = document.querySelector("#nextIncident");
const dreamToggle = document.querySelector("#dreamToggle");
const runAuditButton = document.querySelector("#runAudit");
const copyReportButton = document.querySelector("#copyReport");

const auditFill = document.querySelector("#auditFill");
const auditMeter = document.querySelector("#auditMeter");
const auditStatus = document.querySelector("#auditStatus");
const auditPercent = document.querySelector("#auditPercent");
const auditGrade = document.querySelector("#auditGrade");

const eyebrow = document.querySelector("#eyebrow");
const mainTitle = document.querySelector("#mainTitle");
const heroDescription = document.querySelector("#heroDescription");
const symbolLabel = document.querySelector("#symbolLabel");
const finalAssessment = document.querySelector("#finalAssessment");
const toast = document.querySelector("#toast");

let selectedIncidentId = 1;
let currentFilter = "all";
let dreamMode = false;
let auditTimer = null;
let toastTimer = null;

function renderIncidentCards() {
  incidentGrid.innerHTML = incidents
    .map((incident) => {
      const hidden =
        currentFilter !== "all" && incident.category !== currentFilter;

      return `
        <button
          class="incident-card ${
            incident.id === selectedIncidentId ? "selected" : ""
          } ${hidden ? "incident-card-hidden" : ""}"
          type="button"
          data-id="${incident.id}"
          style="--card-color: ${incident.color}"
          aria-label="View ${incident.title} incident"
        >
          <div class="incident-card-top">
            <span class="incident-index">
              Incident ${String(incident.id).padStart(2, "0")}
            </span>

            <span class="incident-duration">${incident.duration}</span>
          </div>

          <h3>${incident.title}</h3>
          <p>${incident.summary}</p>
        </button>
      `;
    })
    .join("");
}

function selectIncident(id) {
  const incident = incidents.find((item) => item.id === id);

  if (!incident) {
    return;
  }

  selectedIncidentId = incident.id;

  detailSeverity.textContent = incident.severity;
  detailNumber.textContent = `Incident ${String(incident.id).padStart(2, "0")}`;
  detailCategory.textContent = incident.categoryLabel;
  detailTitle.textContent = incident.title;
  detailIssue.textContent = dreamMode
    ? `Possible dream symbol: ${incident.issue}`
    : incident.issue;
  detailAction.textContent = incident.action;
  detailSystem.textContent = incident.system;
  detailIcon.textContent = incident.icon;

  detailSeverity.style.background = incident.color;

  renderIncidentCards();
}

function getVisibleIncidents() {
  return incidents.filter(
    (incident) => currentFilter === "all" || incident.category === currentFilter
  );
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("visible");

  window.clearTimeout(toastTimer);

  toastTimer = window.setTimeout(() => {
    toast.classList.remove("visible");
  }, 2200);
}

incidentGrid.addEventListener("click", (event) => {
  const card = event.target.closest(".incident-card");

  if (!card) {
    return;
  }

  selectIncident(Number(card.dataset.id));
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentFilter = button.dataset.filter;

    filterButtons.forEach((item) => {
      item.classList.toggle("active", item === button);
    });

    const visibleIncidents = getVisibleIncidents();

    if (
      visibleIncidents.length &&
      !visibleIncidents.some((incident) => incident.id === selectedIncidentId)
    ) {
      selectedIncidentId = visibleIncidents[0].id;
      selectIncident(selectedIncidentId);
    } else {
      renderIncidentCards();
    }
  });
});

nextIncidentButton.addEventListener("click", () => {
  const visibleIncidents = getVisibleIncidents();

  if (!visibleIncidents.length) {
    return;
  }

  const currentIndex = visibleIncidents.findIndex(
    (incident) => incident.id === selectedIncidentId
  );

  const nextIndex =
    currentIndex === -1 ? 0 : (currentIndex + 1) % visibleIncidents.length;

  selectIncident(visibleIncidents[nextIndex].id);
});

dreamToggle.addEventListener("click", () => {
  dreamMode = !dreamMode;

  document.body.classList.toggle("dream-mode", dreamMode);
  dreamToggle.setAttribute("aria-pressed", String(dreamMode));
  dreamToggle.textContent = `Dream theory: ${dreamMode ? "ON" : "OFF"}`;

  if (dreamMode) {
    eyebrow.textContent = "Unreliable Narrative Mode · Dream Hypothesis";
    mainTitle.innerHTML = `Was Ithaca <span>Ever Real?</span>`;
    heroDescription.textContent =
      "Perhaps the monsters, goddesses, storms, and ten-year detour were not project failures at all—but symbols inside one extremely elaborate dream.";
    symbolLabel.textContent = "Reality status unknown";
    finalAssessment.textContent =
      "Legendary hero. Possibly unconscious project manager.";
  } else {
    eyebrow.textContent = "Olympus Operations · Project Postmortem";
    mainTitle.innerHTML = `Return to <span>Ithaca</span>`;
    heroDescription.textContent =
      "A routine trip home became a ten-year delivery delay involving monsters, divine interference, poor delegation, and one extremely manual automation.";
    symbolLabel.textContent = "Destination overdue";
    finalAssessment.textContent =
      "Legendary hero. Questionable project manager.";
  }

  selectIncident(selectedIncidentId);
});

runAuditButton.addEventListener("click", () => {
  window.clearInterval(auditTimer);

  let progress = 0;

  runAuditButton.disabled = true;
  runAuditButton.querySelector("span:first-child").textContent =
    "Auditing mythology…";

  auditGrade.textContent = "…";
  auditStatus.textContent =
    "Reviewing detours, blockers, crew permissions, divine dependencies, and mast-based automation.";
  auditFill.style.width = "0%";
  auditPercent.textContent = "0%";
  auditMeter.setAttribute("aria-valuenow", "0");

  auditTimer = window.setInterval(() => {
    progress += Math.floor(Math.random() * 8) + 3;

    if (progress >= 100) {
      progress = 100;
      window.clearInterval(auditTimer);

      auditGrade.textContent = "D−";
      auditStatus.textContent =
        "Audit complete: approximately 86% of the journey delay could have been reduced through delegation, access control, deadlines, and earlier escalation.";

      runAuditButton.disabled = false;
      runAuditButton.querySelector("span:first-child").textContent =
        "Run audit again";

      showToast("Audit complete. The gods have been notified.");
    }

    auditFill.style.width = `${progress}%`;
    auditPercent.textContent = `${progress}%`;
    auditMeter.setAttribute("aria-valuenow", String(progress));
  }, 90);
});

copyReportButton.addEventListener("click", async () => {
  const incident = incidents.find((item) => item.id === selectedIncidentId);

  if (!incident) {
    return;
  }

  const report = [
    "ODYSSEUS PROJECT POSTMORTEM",
    "",
    `Incident: ${incident.title}`,
    `Category: ${incident.categoryLabel}`,
    `Duration: ${incident.duration}`,
    "",
    `What happened: ${incident.issue}`,
    "",
    `Recommended response: ${incident.action}`,
    "",
    `System required: ${incident.system}`,
    "",
    "Final assessment: Legendary hero. Questionable project manager."
  ].join("\n");

  try {
    await navigator.clipboard.writeText(report);
    showToast("Postmortem copied.");
  } catch (error) {
    const temporaryTextArea = document.createElement("textarea");

    temporaryTextArea.value = report;
    temporaryTextArea.setAttribute("readonly", "");
    temporaryTextArea.style.position = "fixed";
    temporaryTextArea.style.opacity = "0";

    document.body.appendChild(temporaryTextArea);
    temporaryTextArea.select();

    document.execCommand("copy");
    temporaryTextArea.remove();

    showToast("Postmortem copied.");
  }
});

renderIncidentCards();
selectIncident(selectedIncidentId);
