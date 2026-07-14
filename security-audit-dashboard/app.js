const auditItems = [
  {
    id: 1,
    area: "Logon Warning Banner",
    result: "Non-Compliant",
    severity: "Critical",
    description: "A legal warning banner is displayed before user logon to deter unauthorized access and establish legal notice.",
    evidence: "No logon banner is configured. Interactive logon message title and text are blank in Local Security Policy.",
    recommendation: "Configure an authorized-use warning banner through Local Security Policy or Group Policy."
  },
  {
    id: 2,
    area: "Minimum Password Length",
    result: "Compliant",
    severity: "Passed",
    description: "Minimum password length is set to 10 characters or greater.",
    evidence: "Minimum password length is set to 12 characters.",
    recommendation: "Maintain the current policy and review during quarterly access-control checks."
  },
  {
    id: 3,
    area: "Deny Guest Logon as a Service",
    result: "Compliant",
    severity: "Passed",
    description: "Guest is denied service-level logon rights.",
    evidence: "Guest is listed under Deny log on as a service.",
    recommendation: "No action required."
  },
  {
    id: 4,
    area: "Guest Account Status",
    result: "Compliant",
    severity: "Passed",
    description: "The built-in Guest account is disabled.",
    evidence: "Guest account is disabled in Local Users and Groups.",
    recommendation: "No action required."
  },
  {
    id: 5,
    area: "Inactivity Timeout",
    result: "Non-Compliant",
    severity: "Major",
    description: "The workstation locks after a defined idle period.",
    evidence: "Machine inactivity limit is set to 0, leaving sessions unlocked indefinitely.",
    recommendation: "Set machine inactivity limit to 900 seconds and enforce screen lock through GPO."
  },
  {
    id: 6,
    area: "Anti-Spyware Protection",
    result: "Compliant",
    severity: "Passed",
    description: "Anti-spyware is active with current definitions.",
    evidence: "Windows Defender real-time protection is enabled and definitions are current.",
    recommendation: "No action required."
  },
  {
    id: 7,
    area: "Password Expiration Warning",
    result: "Non-Compliant",
    severity: "Minor",
    description: "Users receive warning before password expiration.",
    evidence: "Password expiration warning is set to 0 days.",
    recommendation: "Set warning period to 14 days to reduce unexpected lockouts."
  },
  {
    id: 8,
    area: "Saved Credentials (RDP)",
    result: "Non-Compliant",
    severity: "Major",
    description: "RDP clients are prevented from saving passwords.",
    evidence: "Do not allow passwords to be saved is Not Configured.",
    recommendation: "Enable the RDP saved-password restriction through Group Policy."
  },
  {
    id: 9,
    area: "Account Lockout Threshold",
    result: "Non-Compliant",
    severity: "Critical",
    description: "Failed logon attempts are limited to reduce brute-force risk.",
    evidence: "Account lockout threshold is set to 0, allowing unlimited failed attempts.",
    recommendation: "Set lockout threshold to 5 failed attempts."
  },
  {
    id: 10,
    area: "Password Complexity Requirements",
    result: "Compliant",
    severity: "Passed",
    description: "Passwords must meet complexity requirements.",
    evidence: "Password complexity is enabled.",
    recommendation: "No action required."
  },
  {
    id: 11,
    area: "Recent Service Packs and Updates",
    result: "Non-Compliant",
    severity: "Major",
    description: "Security updates are installed within the required patch window.",
    evidence: "Last successful update check was over 2 months ago.",
    recommendation: "Install pending security updates and schedule monthly patch review."
  },
  {
    id: 12,
    area: "Account Lockout Duration",
    result: "Non-Compliant",
    severity: "Critical",
    description: "Accounts are temporarily disabled after failed logon attempts.",
    evidence: "Lockout duration is not applicable because the threshold is disabled.",
    recommendation: "After setting the threshold, configure lockout duration to 30 minutes."
  },
  {
    id: 13,
    area: "Antivirus Software",
    result: "Compliant",
    severity: "Passed",
    description: "Antivirus is installed, active, and current.",
    evidence: "Windows Defender Antivirus is active with current definitions.",
    recommendation: "No action required."
  },
  {
    id: 14,
    area: "Firewall Status",
    result: "Compliant",
    severity: "Passed",
    description: "Host firewall is enabled on all profiles.",
    evidence: "Domain, Private, and Public firewall profiles are enabled.",
    recommendation: "No action required."
  },
  {
    id: 15,
    area: "Anonymous Access Permissions",
    result: "Non-Compliant",
    severity: "Major",
    description: "Anonymous access to shares, pipes, and SAM enumeration is restricted.",
    evidence: "Anonymous named pipe/share access and SAM enumeration restrictions are disabled.",
    recommendation: "Enable anonymous access restrictions and remove unnecessary anonymous pipe entries."
  },
  {
    id: 16,
    area: "Account Lockout Counter Reset",
    result: "Non-Compliant",
    severity: "Critical",
    description: "Failed logon counters reset after a defined period.",
    evidence: "Counter reset is not applicable because no lockout threshold is set.",
    recommendation: "After implementing lockout threshold, set counter reset to 30 minutes."
  },
  {
    id: 17,
    area: "Password Length Configuration",
    result: "Compliant",
    severity: "Passed",
    description: "Minimum password length is explicitly configured.",
    evidence: "Policy is explicitly set to 12 characters.",
    recommendation: "No action required."
  },
  {
    id: 18,
    area: "File and Print Sharing",
    result: "Non-Compliant",
    severity: "Minor",
    description: "File and print sharing is scoped to authorized subnets.",
    evidence: "Firewall rule allows connections from any source address.",
    recommendation: "Scope sharing rules to local subnets or disable sharing where unnecessary."
  },
  {
    id: 19,
    area: "AutoRun/AutoPlay Disabled",
    result: "Non-Compliant",
    severity: "Major",
    description: "AutoRun is disabled to reduce removable-media execution risk.",
    evidence: "Turn off Autoplay is Not Configured.",
    recommendation: "Enable Turn off Autoplay for all drives and block AutoRun commands."
  },
  {
    id: 20,
    area: "System Backups",
    result: "Non-Compliant",
    severity: "Major",
    description: "A backup solution is configured and tested.",
    evidence: "No backup solution is configured and File History is off.",
    recommendation: "Deploy daily incremental backups, weekly full backups, and quarterly restore tests."
  }
];

const weights = {
  Critical: 12,
  Major: 7,
  Minor: 3,
  Passed: 0
};

const severityRank = {
  Critical: 1,
  Major: 2,
  Minor: 3,
  Passed: 4
};

const storageKey = "securityAuditDashboardState";
const defaultOwners = {
  Critical: "Security Admin",
  Major: "Endpoint Team",
  Minor: "Help Desk",
  Passed: "Validated"
};

let activeFilter = "all";

const scoreValue = document.querySelector("#scoreValue");
const scoreRing = document.querySelector("#scoreRing");
const postureLabel = document.querySelector("#postureLabel");
const postureSummary = document.querySelector("#postureSummary");
const totalFindings = document.querySelector("#totalFindings");
const criticalCount = document.querySelector("#criticalCount");
const openCount = document.querySelector("#openCount");
const resolvedCount = document.querySelector("#resolvedCount");
const severityStack = document.querySelector("#severityStack");
const priorityList = document.querySelector("#priorityList");
const findingsList = document.querySelector("#findingsList");
const searchInput = document.querySelector("#searchInput");
const reportGrid = document.querySelector("#reportGrid");
const remediationProgress = document.querySelector("#remediationProgress");
const remediationSummary = document.querySelector("#remediationSummary");
const exportJson = document.querySelector("#exportJson");
const importFile = document.querySelector("#importFile");
const resetDemo = document.querySelector("#resetDemo");

function addBusinessDays(days) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
}

function hydrateAuditItems() {
  auditItems.forEach((item) => {
    item.remediationStatus = item.result === "Compliant" ? "Resolved" : "Not Started";
    item.owner = defaultOwners[item.severity];
    item.dueDate = item.severity === "Critical" ? addBusinessDays(7) : item.severity === "Major" ? addBusinessDays(30) : item.severity === "Minor" ? addBusinessDays(45) : "";
    item.notes = "";
  });

  const saved = localStorage.getItem(storageKey);
  if (!saved) return;

  try {
    const parsed = JSON.parse(saved);
    parsed.items?.forEach((savedItem) => {
      const item = auditItems.find((entry) => entry.id === savedItem.id);
      if (item) {
        item.remediationStatus = savedItem.remediationStatus || item.remediationStatus;
        item.owner = savedItem.owner || item.owner;
        item.dueDate = savedItem.dueDate || item.dueDate;
        item.notes = savedItem.notes || "";
      }
    });
  } catch {
    localStorage.removeItem(storageKey);
  }
}

function saveState() {
  localStorage.setItem(storageKey, JSON.stringify({
    exportedAt: new Date().toISOString(),
    items: auditItems.map(({ id, remediationStatus, owner, dueDate, notes }) => ({
      id,
      remediationStatus,
      owner,
      dueDate,
      notes
    }))
  }));
}

function effectiveSeverity(item) {
  return item.remediationStatus === "Resolved" ? "Passed" : item.severity;
}

function effectiveResult(item) {
  return item.remediationStatus === "Resolved" ? "Compliant" : item.result;
}

function calculateScore(items) {
  const maxPenalty = items.length * weights.Critical;
  const penalty = items.reduce((sum, item) => sum + weights[effectiveSeverity(item)], 0);
  return Math.max(0, Math.round(100 - (penalty / maxPenalty) * 100));
}

function getCounts() {
  return auditItems.reduce((counts, item) => {
    const severity = effectiveSeverity(item);
    const result = effectiveResult(item);
    counts[severity] = (counts[severity] || 0) + 1;
    counts[result] = (counts[result] || 0) + 1;
    counts[item.remediationStatus] = (counts[item.remediationStatus] || 0) + 1;
    return counts;
  }, {});
}

function updateSummary() {
  const score = calculateScore(auditItems);
  const counts = getCounts();
  const nonCompliant = counts["Non-Compliant"] || 0;

  scoreValue.textContent = score;
  scoreRing.style.setProperty("--score-deg", `${score * 3.6}deg`);
  totalFindings.textContent = auditItems.length;
  criticalCount.textContent = counts.Critical || 0;
  openCount.textContent = nonCompliant;
  resolvedCount.textContent = counts.Resolved || 0;

  const actionable = auditItems.filter((item) => item.result === "Non-Compliant").length;
  const resolvedActionable = auditItems.filter((item) => item.result === "Non-Compliant" && item.remediationStatus === "Resolved").length;
  const progress = actionable ? Math.round((resolvedActionable / actionable) * 100) : 100;
  remediationProgress.style.width = `${progress}%`;
  remediationSummary.textContent = `${resolvedActionable} of ${actionable} non-compliant controls resolved. ${counts["In Progress"] || 0} currently active.`;

  postureLabel.textContent = score >= 85 ? "Strong" : score >= 70 ? "Moderate Risk" : "Needs Remediation";
  postureSummary.textContent = `${nonCompliant} controls need action. Account lockout, patching, backup, and access-control findings should be handled first.`;
}

function renderSeverityStack() {
  const counts = getCounts();
  const total = auditItems.length;
  severityStack.innerHTML = ["Critical", "Major", "Minor", "Passed"].map((severity) => {
    const width = ((counts[severity] || 0) / total) * 100;
    return `<span class="${severity.toLowerCase()}" style="width:${width}%"></span>`;
  }).join("");
}

function renderPriorityList() {
  const topItems = auditItems
    .filter((item) => item.result === "Non-Compliant" && item.remediationStatus !== "Resolved")
    .sort((a, b) => severityRank[effectiveSeverity(a)] - severityRank[effectiveSeverity(b)] || a.id - b.id)
    .slice(0, 5);

  priorityList.innerHTML = topItems.map((item) => `
    <li>
      <strong>${item.area}</strong>
      ${item.severity} - ${item.owner} - due ${item.dueDate}
    </li>
  `).join("") || `<li><strong>Queue clear</strong>All non-compliant controls are marked resolved.</li>`;
}

function matchesSearch(item, term) {
  const haystack = `${item.area} ${item.description} ${item.evidence} ${item.recommendation} ${item.severity} ${item.owner} ${item.notes}`.toLowerCase();
  return haystack.includes(term.toLowerCase());
}

function renderFindings() {
  const term = searchInput.value.trim();
  const visible = auditItems.filter((item) => {
    const filterMatch = activeFilter === "all" || effectiveResult(item) === activeFilter || item.remediationStatus === activeFilter;
    const searchMatch = !term || matchesSearch(item, term);
    return filterMatch && searchMatch;
  });

  findingsList.innerHTML = visible.map((item) => {
    const result = effectiveResult(item);
    const severity = effectiveSeverity(item);
    const severityClass = result === "Compliant" ? "compliant" : severity.toLowerCase();
    const workClass = item.remediationStatus === "Resolved" ? "done" : item.remediationStatus === "In Progress" ? "active" : item.remediationStatus === "Blocked" ? "blocked" : "";
    return `
      <details class="finding">
        <summary>
          <span class="finding-id">#${String(item.id).padStart(2, "0")}</span>
          <span class="finding-title">${item.area}</span>
          <span class="status-pill ${severityClass}">${result === "Compliant" ? "Passed" : severity}</span>
          <span class="work-pill ${workClass}">${item.remediationStatus}</span>
        </summary>
        <div class="finding-body">
          <p><strong>Control:</strong><br>${item.description}</p>
          <p><strong>Evidence:</strong><br>${item.evidence}</p>
          <p><strong>Recommendation:</strong><br>${item.recommendation}</p>
          <p><strong>Status:</strong><br>${result}</p>
          <div class="remediation-form" data-id="${item.id}">
            <label class="field">
              Remediation
              <select data-field="remediationStatus">
                ${["Not Started", "In Progress", "Blocked", "Resolved"].map((status) => `<option value="${status}" ${item.remediationStatus === status ? "selected" : ""}>${status}</option>`).join("")}
              </select>
            </label>
            <label class="field">
              Owner
              <input data-field="owner" value="${escapeHtml(item.owner)}">
            </label>
            <label class="field">
              Due Date
              <input data-field="dueDate" type="date" value="${item.dueDate}">
            </label>
            <label class="field field-wide">
              Analyst Notes
              <textarea data-field="notes" placeholder="Add remediation evidence or next step">${escapeHtml(item.notes)}</textarea>
            </label>
          </div>
        </div>
      </details>
    `;
  }).join("") || `<p class="muted">No findings match the current search.</p>`;
}

function renderReport() {
  const critical = auditItems.filter((item) => effectiveSeverity(item) === "Critical");
  const major = auditItems.filter((item) => effectiveSeverity(item) === "Major");
  const quickWins = auditItems.filter((item) => effectiveSeverity(item) === "Minor");
  const active = auditItems.filter((item) => item.remediationStatus === "In Progress");

  const cards = [
    {
      title: "Immediate Actions",
      body: `${critical.length} critical controls affect logon warning, brute-force protection, and account lockout behavior. Resolve these first through local policy or GPO.`
    },
    {
      title: "30-Day Hardening",
      body: `${major.length} major findings cover idle lock, saved RDP credentials, updates, anonymous access, AutoPlay, and backups. These reduce common endpoint attack paths.`
    },
    {
      title: "Operational Improvements",
      body: `${quickWins.length} lower-risk items can reduce help desk load and tighten workstation hygiene after the high-impact controls are fixed.`
    },
    {
      title: "Active Work",
      body: `${active.length} findings are currently in progress. Export the JSON file to preserve remediation ownership, due dates, and analyst notes.`
    }
  ];

  reportGrid.innerHTML = cards.map((card) => `
    <article class="report-card">
      <h3>${card.title}</h3>
      <p>${card.body}</p>
    </article>
  `).join("");
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function rerender() {
  updateSummary();
  renderSeverityStack();
  renderPriorityList();
  renderFindings();
  renderReport();
}

document.querySelectorAll(".filter-button").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter-button").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    activeFilter = button.dataset.filter;
    renderFindings();
  });
});

searchInput.addEventListener("input", renderFindings);
document.querySelector("#printReport").addEventListener("click", () => window.print());

findingsList.addEventListener("change", (event) => {
  const control = event.target.closest("[data-field]");
  const form = event.target.closest(".remediation-form");
  if (!control || !form) return;

  const item = auditItems.find((entry) => entry.id === Number(form.dataset.id));
  if (!item) return;

  item[control.dataset.field] = control.value;
  saveState();
  rerender();
});

findingsList.addEventListener("input", (event) => {
  const control = event.target.closest("input[data-field], textarea[data-field]");
  const form = event.target.closest(".remediation-form");
  if (!control || !form) return;

  const item = auditItems.find((entry) => entry.id === Number(form.dataset.id));
  if (!item) return;

  item[control.dataset.field] = control.value;
  saveState();
});

exportJson.addEventListener("click", () => {
  const blob = new Blob([JSON.stringify({
    exportedAt: new Date().toISOString(),
    score: calculateScore(auditItems),
    items: auditItems
  }, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "security-audit-dashboard-export.json";
  link.click();
  URL.revokeObjectURL(url);
});

importFile.addEventListener("change", async () => {
  const file = importFile.files[0];
  if (!file) return;

  try {
    const imported = JSON.parse(await file.text());
    imported.items?.forEach((importedItem) => {
      const item = auditItems.find((entry) => entry.id === importedItem.id);
      if (item) {
        item.remediationStatus = importedItem.remediationStatus || item.remediationStatus;
        item.owner = importedItem.owner || item.owner;
        item.dueDate = importedItem.dueDate || item.dueDate;
        item.notes = importedItem.notes || "";
      }
    });
    saveState();
    rerender();
  } finally {
    importFile.value = "";
  }
});

resetDemo.addEventListener("click", () => {
  localStorage.removeItem(storageKey);
  hydrateAuditItems();
  rerender();
});

hydrateAuditItems();
rerender();
