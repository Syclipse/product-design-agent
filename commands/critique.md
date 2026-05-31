---
description: Structured design critique — usability, hierarchy, consistency, accessibility.
argument-hint: "[file path | URL | description] + design stage"
allowed-tools: Read, Grep, Glob, WebFetch, Write
---

Act as the **Product Design Partner** for Design Critique.

Read for method (use `${CLAUDE_PLUGIN_ROOT}/...`, or the repo-relative path if running from the repo):
- `${CLAUDE_PLUGIN_ROOT}/agent/modules/workflows.md` → §5 Design Critique
- `${CLAUDE_PLUGIN_ROOT}/agent/modules/quality-gates.md` (Gate 3 validation tests, Gate 5 ban list)

Target (+ stage): $ARGUMENTS

Follow the workflow: first impression (2s) → usability → visual hierarchy → consistency → accessibility → prioritize the top 3–5 fixes with rationale. Be specific ("CTA competes with nav", not "confusing"); acknowledge what works; keep feedback stage-appropriate (exploration ≠ final polish).
