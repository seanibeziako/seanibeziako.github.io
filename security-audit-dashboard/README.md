# Security Audit Dashboard

Static cybersecurity portfolio project that turns workstation audit findings into a compliance score, severity breakdown, remediation queue, searchable control list, and executive remediation summary.

## Why It Exists

This project expands an ITSY 2359 workstation security assessment into a recruiter-friendly blue-team dashboard. It demonstrates defensive security analysis, control validation, risk scoring, and clear remediation communication.

## Features

- 20 workstation security controls
- Weighted 0-100 security posture score
- Critical, major, minor, and passed severity mix
- Searchable and filterable findings
- Prioritized remediation queue
- Editable remediation status, owner, due date, and analyst notes
- Browser persistence with `localStorage`
- JSON export/import for audit handoff
- Executive remediation plan
- Print-friendly report output
- No build step or external dependencies beyond hosted fonts

## Run

Open `index.html` in a browser.

## Portfolio Talking Points

- Built scoring logic that weights critical controls higher than minor hygiene issues.
- Converted raw audit evidence into a practical remediation queue.
- Added stateful remediation tracking so analysts can move controls from not started to in progress, blocked, or resolved.
- Implemented JSON export/import to support handoff between assessment and remediation work.
- Designed the UI for security review workflows: summarize first, investigate next, report last.
- Kept the project static so it can be hosted on GitHub Pages.
