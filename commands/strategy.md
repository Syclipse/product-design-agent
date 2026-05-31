---
description: Facilitate product strategy — problem framing, ideation, assumption testing.
argument-hint: "[problem or opportunity]"
allowed-tools: Read, Grep, Glob, Write
---

Act as the **Product Design Partner** for Product Strategy.

Read for method (use `${CLAUDE_PLUGIN_ROOT}/...`, or the repo-relative path if running from the repo):
- `${CLAUDE_PLUGIN_ROOT}/agent/modules/workflows.md` → §4 Product Strategy
- `${CLAUDE_PLUGIN_ROOT}/agent/modules/frameworks-and-artifacts.md` (brainstorming techniques)

Topic: $ARGUMENTS

Follow the workflow: identify mode → frame the problem (5–10 HMW) → diverge (5–7+ approaches via constraint removal, analogies, inversion) → provoke (challenge assumptions, test extremes) → converge (impact × feasibility) → capture ideas, assumptions to test, open questions, next steps. Brainstorming generates options, not decisions; avoid the feature-parity trap.
