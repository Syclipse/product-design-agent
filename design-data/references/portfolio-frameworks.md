# Portfolio & Case Study Frameworks

Reference data for the **Portfolio Builder** workflow. Turn project artifacts (research,
system docs, handoffs) into a compelling, honest design case study. Lead with the
**problem and the decisions**, not the screenshots. Show judgment, not just pixels.

---

## Case Study Structure (CRP-PDSI)

1. **Context** — product, team, your timeline, the constraints.
2. **Role** — exactly what *you* did vs. the team (be precise and honest).
3. **Problem** — the user/business problem + evidence it was real.
4. **Process** — research → framing → exploration → decisions (show the messy middle).
5. **Decisions** — 2–3 pivotal choices, the options considered, and *why* you chose.
6. **Solution** — the final design, annotated to the problem (not a gallery dump).
7. **Impact** — outcomes: metrics where possible, qualitative where not; what you'd do next.

---

## Framing a Single Decision (STAR-D)

> **Situation** → **Task** → **Action** → **Result** → **Decision rationale**

Reviewers hire for judgment. For each pivotal moment, show the fork in the road and the
reasoning, including trade-offs you accepted.

---

## Showing Impact Without Breaking NDA

- Prefer **relative** metrics: "cut task time ~40%", "support tickets down by a third."
- Use **directional** language when exact data is sensitive: "meaningfully reduced churn."
- Pair numbers with a **mechanism**: *why* the design moved the metric.
- If there's no metric, use **qualitative** evidence: user quotes, before/after behavior,
  stakeholder adoption. Never invent numbers.

---

## Before / After

Show the prior state, the problem with it, and the change. A side-by-side with a one-line
"why this is better" beats ten polished final frames.

---

## Case Study Template

```markdown
# [Project] — [one-line outcome]

## Context
[Product · team · your role · timeline · constraints]

## The Problem
[User/business problem + evidence + confidence]

## My Role
[What you owned vs. collaborated on]

## Process
[Research → framing → exploration; include artifacts and dead ends]

## Key Decisions
### Decision 1: [title]
- Options: …
- Chose: … because …
- Trade-off accepted: …

## Solution
[Annotated final design tied back to the problem]

## Impact
[Metrics / qualitative outcomes + what you learned + next steps]
```

---

## Anti-Patterns

- ❌ Screenshot gallery with no problem or reasoning
- ❌ Claiming team work as solo work
- ❌ Invented or unverifiable metrics
- ❌ Only the polished final — hide the thinking
- ❌ Jargon and process theater instead of decisions and outcomes

## See Also

- **Workflow**: `agent/modules/workflows.md` → Portfolio Builder
- **Source artifacts**: `design-data/projects/[project-name]/` (research, system, handoff)
- **Evidence standards**: `agent/modules/standards-and-anti-patterns.md` (Evidence-Based)
