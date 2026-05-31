# UX Flow & Information Architecture Patterns

Reference data for the **UX Flows** workflow. Turn a concept into user journeys, task
flows, and product structure. Always define the **happy path first**, then error and edge
branches — never ship a flow that only handles success.

---

## Flow Notation (text-first, tool-agnostic)

Use a simple, reviewable notation that maps cleanly to FigJam/Mermaid later:

```
[Entry] → (Action) → <Decision?>
   <Decision?> --yes--> (Action) → [End: success]
   <Decision?> --no---> (Recover) → back to (Action)
```

- `[ ]` screen/state · `( )` user or system action · `< >` decision · `--label-->` branch
- Number steps so they're referenceable in critique and handoff.

---

## Task Flow vs. User Flow vs. Journey Map

| Artifact | Scope | Answers |
|---|---|---|
| **Task flow** | One goal, one path | "What are the exact steps to do X?" |
| **User flow** | One goal, all paths | "Where can they branch, fail, or exit?" |
| **Journey map** | End-to-end experience | "How does this feel across time and channels?" |

---

## Journey Map Template

| Stage | User actions | Thoughts | Emotions | Pain points | Opportunities |
|---|---|---|---|---|---|
| Awareness | … | … | 😐 | … | … |
| Onboarding | … | … | 😟 | … | … |
| First value | … | … | 🙂 | … | … |
| Habit | … | … | 😀 | … | … |

- Plot an **emotion curve** across stages; the lowest dip is your highest-leverage fix.
- Mark **moments of truth** (where the relationship is won or lost).

---

## Information Architecture

- **Sitemap**: hierarchy of screens/sections (depth ≤ 3 where possible).
- **Card sorting** (open/closed) validates grouping with real people, not opinion.
- **Navigation models**: hub-and-spoke (mobile tasks), nested doll (linear), tabbed
  (parallel sections), bento/dashboard (monitoring). Pick from the task, not fashion.
- **Labeling**: name sections in the user's domain language, not internal jargon.

**Token test for IA:** read the nav labels aloud — do they belong to this product's
world, or could they sit on any app? (Mirror of Gate 3.)

---

## Deliverable Template

```markdown
# [Product] Flows & IA

## Primary Job & Entry Points
[JTBD + where users arrive from]

## Sitemap
- Home
  - Section A
    - Screen A1
  - Section B

## Core Flow: [Goal]
1. [Entry] → ...
   - Happy path: ...
   - Error branches: ...
   - Edge cases: empty / first-run / offline / permission-denied

## Journey Map
[Table above]

## Risks & Open Questions
[What to validate with research]
```

---

## Anti-Patterns

- ❌ Mapping only the happy path
- ❌ Deep nesting (>3 levels) that buries core tasks
- ❌ Modal-first flows (every step a popup) — prefer inline / drawer / step pages
- ❌ Internal jargon as navigation labels
- ❌ Dead ends with no recovery or "back"

## See Also

- **Workflow**: `agent/modules/workflows.md` → UX Flows
- **Diagrams in Figma**: `figma:figma-generate-diagram` skill (Mermaid → FigJam)
- **From idea**: `design-data/references/mentorship-frameworks.md`
- **To handoff**: `agent/modules/workflows.md` → Design Handoff
