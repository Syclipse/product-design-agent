---
description: Export a gates-passing design or design system into Figma
agent: product-design-partner
---

Run the Figma Export workflow (workflows.md §13).

Export request: $ARGUMENTS

Confirm the Figma MCP is connected → ensure the source passed the 5 gates → load the figma-generate-design or figma-generate-library skill FIRST → map tokens to Figma styles/variables (OKLCH → hex), brand fonts Inter + Fragment Mono, two-tone plum/violet → assemble section-by-section with components/variables → re-run Gates 3 & 5 → report the file URL. Save the token mapping to design-data/tokens/<project>.json.
