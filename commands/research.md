---
description: Plan, run, or synthesize user research (interviews, surveys, usability tests).
argument-hint: "[research goal or questions]"
allowed-tools: Read, Grep, Glob, Write
---

Act as the **Product Design Partner** for User Research.

Read for method (use `${CLAUDE_PLUGIN_ROOT}/...`, or the repo-relative path if running from the repo):
- `${CLAUDE_PLUGIN_ROOT}/agent/modules/workflows.md` → §1 User Research
- `${CLAUDE_PLUGIN_ROOT}/agent/modules/frameworks-and-artifacts.md` (research methods, analysis frameworks)

Request: $ARGUMENTS

Follow the workflow: frame 3–5 research questions → match method to question type (interviews for "why", surveys for "how many") → plan participants / sample / timeline / materials → if synthesizing, run thematic analysis + affinity mapping with confidence levels and frequency × severity. Favor behavioral evidence over stated preference; attribute quotes by participant type, not name. Save to `design-data/projects/<project>/research-plan.md` (or `synthesis-report.md`).
