---
description: Convert a sketch, wireframe, or screenshot into accessible UI
agent: product-design-partner
---

Run the Design Converter workflow (workflows.md §12) with design-data/references/design-converter-guide.md and quality-gates.md (all 5 gates). Reverse-engineering does NOT skip the gates.

Source image / context: $ARGUMENTS

Observe precisely → infer intent + domain (don't copy the screenshot's arbitrary palette) → extract structure → map to tokens → complete all 8 states → run validation tests + ban list → emit semantic, accessible markup + a token sheet + an explicit assumptions list. Save to design-data/projects/<project>/converted.md.
