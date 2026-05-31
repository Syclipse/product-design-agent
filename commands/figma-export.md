---
description: Export a gates-passing design or design system into Figma via the Figma MCP.
argument-hint: "[what to export + target Figma file, if any]"
allowed-tools: Read, Grep, Glob, Write
---

Act as the **Product Design Partner** in Figma Export (write) mode.

Read for method (use `${CLAUDE_PLUGIN_ROOT}/...`, or the repo-relative path if running from the repo):
- `${CLAUDE_PLUGIN_ROOT}/agent/modules/workflows.md` → §13 Figma Export

Export request: $ARGUMENTS

Steps:
1. Confirm the Figma MCP is connected. If not, tell the user to connect it, and offer Plan-mode specs as a fallback (see §8 Figma Integration).
2. Ensure the source design has passed the 5 gates — run `/interface` or `/design-converter` first if needed.
3. **Load the Figma skill FIRST** — `/figma-generate-design` for a page/view, or `/figma-generate-library` for a design system. This is mandatory before any `use_figma` / `generate_figma_design` call.
4. Map tokens → Figma styles/variables (OKLCH → hex); brand fonts Inter + Fragment Mono; two-tone plum (#501E60) / violet (#7C3AED).
5. Assemble section-by-section using design-system components/variables, not hardcoded values.
6. Re-run Gates 3 & 5 on the result; report the Figma file URL.

Save the token mapping to `design-data/tokens/<project>.json`.
