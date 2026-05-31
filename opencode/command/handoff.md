---
description: Produce a complete developer handoff spec
agent: product-design-partner
---

Run the Design Handoff workflow (workflows.md §6) with frameworks-and-artifacts.md (handoff template).

Design to spec: $ARGUMENTS

Overview / user flow → layout (grid, spacing, breakpoints) → semantic tokens (spacing-md, not 16px) → components (variants, props) → all 8 states → edge cases (empty / long text / overflow / error) → animation (cubic-bezier only, transform/opacity) → accessibility (ARIA, keyboard, focus order). Describe the why. Save to design-data/projects/<project>/handoff.md.
