# Design Workflows

Complete workflow specifications for all 14 design capabilities.

---

## 1. User Research Workflow

**When**: User asks about research planning, interview guides, usability tests, surveys

**Steps**:
1. **Frame Research Questions**: 3-5 specific questions this research will answer
2. **Select Method**: Match method to question type (interviews for "why", surveys for "how many")
3. **Plan Execution**: Participant criteria, sample size, timeline, materials
4. **Conduct Research**: Follow interview guide, observe behavior, capture quotes
5. **Analyze & Synthesize**: Thematic analysis (6 steps), affinity mapping, triangulation
6. **Deliver Insights**: Themes with evidence, confidence levels, priority recommendations

**Key Standards**:
- Behavioral observation > stated preferences
- Quote attribution: participant type, not name
- Confidence levels: High (5+ sources), Medium (3-4), Low (1-2)
- Frequency × severity = priority

**Tools**: user-research skill, synthesize-research skill

**Output**: Save research plan to `.config/opencode/design-data/projects/[project-name]/research-plan.md`

---

## 2. Design System Workflow

**When**: User mentions design system audit, component documentation, token coverage

**Steps**:
1. **Audit Current State**: Naming inconsistencies, hardcoded values, missing docs
2. **Identify Gaps**: Component completeness (variants, states, accessibility notes)
3. **Define Token Architecture**: Atomic → semantic tokens (colors, typography, spacing)
4. **Document Components**: Variants, states, props, usage guidelines, do's/don'ts
5. **Plan Migration**: Breaking changes need migration paths
6. **Verify Coverage**: Token usage across codebase, eliminate hardcoded values

**Key Standards**:
- Consistency > creativity: system exists so teams don't reinvent
- If not documented, doesn't exist
- Token-based architecture (no hardcoded hex values)
- Breaking changes = migration paths required

**Tools**: design-system skill

**Output**: Save to `.config/opencode/design-data/projects/[project-name]/system.md`

---

## 3. Interface Design Workflow

**When**: Dashboards, admin panels, SaaS apps, data-heavy interfaces

**STRICT ENFORCEMENT ACTIVE**: All 5 gates must pass before showing output.

**Steps**:

1. **[GATE 1] Frame Intent** (MANDATORY - BLOCK if skipped):
   - Who: [Specific human in context]
   - What: [Specific task with verb]
   - Feel: [Specific not generic]
   - **Verification**: Read intent aloud. If it could apply to any product, REJECT and refine.

2. **[GATE 2] Domain Exploration** (MANDATORY - BLOCK if skipped):
   - Domain: [5+ concepts from product's world]
   - Color world: [5+ natural colors FROM DOMAIN]
   - Signature: [1 unique element, must appear 5+ times]
   - Defaults to reject: [3 with alternatives]
   - **Verification**: Signature must appear in final output 5+ times or REJECT.

3. **[GATE 4] Variance Check** (MANDATORY - consult plugin):
   - Query plugin: "Check variance history for [interface type]"
   - If pattern match found, pick NEW vibe + layout archetype
   - Document choice: "Vibe: [X], Layout: [Y]"

4. **Establish Foundations**:
   - Apply Premium Architecture Patterns (Double-Bezel, Button-in-Button, Whisper-Quiet Elevation)
   - Use Custom Motion (cubic-bezier only, transform/opacity only)
   - Apply [Vibe Archetype] + [Layout Archetype] from variance engine
   - Use brand fonts: Inter (headings/body), Fragment Mono (code/labels/data)

5. **[GATE 5] Ban List Check** (MANDATORY - BLOCK if violated):
   - Scan output for banned patterns
   - If found, REJECT and redesign (or allow user override)

6. **[GATE 3] Validation Tests** (MANDATORY - ALL must pass):
   - Swap test: [Pass/Fail + evidence]
   - Squint test: [Pass/Fail + evidence]
   - Signature test: [Pass/Fail + evidence]
   - Token test: [Pass/Fail + evidence]
   - **If ANY test fails, REJECT and iterate**

7. **Document System**:
   - Save to `.config/opencode/design-data/projects/[project-name]/system.md`
   - Include: Intent, Domain exploration, Vibe+Layout choice, Validation results
   - Add to variance history via plugin

**Key Standards**:
- Intent-first: no code before answering who/what/feel
- Avoid generic defaults: "clean and modern" is meaningless
- Subtle layering: whisper-quiet elevation changes
- Every choice must be a choice: explain why

**Required Modules**: Load `quality-gates.md` for complete gate specifications

**Tools**: interface-design skill, ui-ux-pro-max skill

---

## 4. Product Strategy Workflow

**When**: Brainstorming, problem exploration, opportunity identification

**Steps**:
1. **Identify Mode**: Problem exploration, solution ideation, assumption testing, strategy exploration
2. **Frame Problem**: HMW questions (5-10 reframings)
3. **Diverge**: Generate 5-7+ distinct approaches (constraint removal, analogies, inversion)
4. **Provoke**: Challenge assumptions, test extremes, invert problem
5. **Converge**: Evaluate options, prioritize by impact × feasibility
6. **Capture**: Key ideas, assumptions to test, questions to research, next steps

**Key Standards**:
- Frame problem before exploring solutions
- Brainstorm ≠ decision-making (generates options, not final choice)
- Avoid feature parity trap: copying competitors without understanding needs
- Test assumptions explicitly: user, problem, solution, business, feasibility

**Tools**: product-brainstorming skill

---

## 5. Design Critique Workflow

**When**: Design review, mockup feedback, usability assessment

**Steps**:
1. **First Impression** (2 seconds): Emotional reaction, purpose clarity, visual draw
2. **Usability**: Can user accomplish core task? Error states handled?
3. **Visual Hierarchy**: What draws eye? Reading flow? Emphasis appropriate?
4. **Consistency**: Matches design system? Token usage? Spacing/typography?
5. **Accessibility**: Contrast ratios, keyboard navigation, touch targets, semantic HTML
6. **Prioritize**: Top 3-5 most impactful changes with rationale

**Key Standards**:
- Stage-appropriate feedback: exploration ≠ final polish
- Positive acknowledgment: note what works well
- Specific, not vague: "CTA competes with navigation" not "layout is confusing"
- With rationale: explain why + how to fix

**Reference**: Load `quality-gates.md` for validation tests (Gate 3) and ban list (Gate 5)

**Tools**: design-critique skill

---

## 6. Design Handoff Workflow

**When**: Design ready for engineering, needs implementation spec

**Steps**:
1. **Overview**: Purpose, user flow, key interactions
2. **Layout**: Grid, spacing, responsive breakpoints
3. **Tokens**: Reference semantic tokens (spacing-md not 16px)
4. **Components**: List with variants, props, states
5. **States**: Default, hover, active, focus, disabled, loading, error, empty
6. **Edge Cases**: Empty data, long text, overflow, errors
7. **Animation**: Triggers, durations, easing (cubic-bezier only)
8. **Accessibility**: ARIA labels, keyboard nav, focus order, semantic HTML

**Key Standards**:
- Token references: use spacing-md not 16px
- State exhaustiveness: cover all 8 states
- Describe the why: rationale helps developers make judgment calls
- Edge case coverage: empty, long text, overflow, errors

**Output**: Save to `.config/opencode/design-data/projects/[project-name]/handoff.md`

**Tools**: design-handoff skill

---

## 7. Accessibility Audit Workflow

**When**: WCAG compliance check, accessibility review

**Steps**:
1. **Contrast Calculation**: Measure precisely (4.5:1 text, 3:1 UI components)
2. **Keyboard Navigation**: Tab order, focus indicators, all interactive elements reachable
3. **Semantic HTML**: Proper landmarks, heading hierarchy, button/link distinction
4. **Screen Reader Testing**: Predict announcements from HTML/ARIA structure
5. **Touch Targets**: Minimum 44×44pt (iOS) or 48×48dp (Android)
6. **Severity Classification**: Critical (blocks tasks), Major (impairs), Minor (reduces usability)

**Key Standards**:
- WCAG 2.1 AA compliance: 4.5:1 contrast text, 3:1 UI components
- Calculate contrast - don't estimate
- Semantic HTML > styled divs
- All interactive = keyboard accessible

**Tools**: accessibility-audit skill

---

## 8. Figma Integration Workflow (Context-Aware)

**When**: User provides Figma URL or requests design collaboration

**Detection Pattern**:
```
https://www.figma.com/design/[fileKey]/[fileName]
https://www.figma.com/file/[fileKey]/[fileName]
```

### Collaboration Mode (URL Present)

**Steps**:
1. **Fetch Design**:
   - Use `figma_get_design_context` tool with extracted fileKey
   - Extract design properties (colors, typography, spacing)

2. **Run Gate 3 Validation Tests**:
   - Swap test: Are choices specific to this product?
   - Squint test: Is hierarchy visible without harsh lines?
   - Signature test: Can you point to 5 instances of signature element?
   - Token test: Do CSS variable names belong to product's world?

3. **Check Gate 5 Ban List**:
   - Scan for side-stripe borders, gradient text, glassmorphism, etc.
   - Flag violations with alternatives

4. **Provide Structured Critique**:
   - First impression (2 seconds)
   - Usability assessment
   - Visual hierarchy analysis
   - Consistency with design system
   - Accessibility (contrast, touch targets, semantic structure)
   - Priority recommendations (top 3-5)

5. **Generate Handoff Spec** (if requested):
   - Save to `.config/opencode/design-data/projects/[project-name]/handoff.md`
   - Include layout, tokens, component states, responsive behavior, edge cases, animations, a11y notes

**Reference**: Load `quality-gates.md` for validation tests and ban list

### Plan Mode (No URL)

**Steps**:
1. **Generate Specs/Wireframes**:
   - Follow Interface Design Workflow (Gates 1-5)
   - Create low-fidelity specs for user to implement in Figma
   - Save to `.config/opencode/design-data/projects/[project-name]/wireframes.md`

2. **Provide Figma-Ready Tokens**:
   - Export tokens in Figma-compatible format
   - Color styles: OKLCH → hex conversion
   - Text styles: hierarchy mapping (display/heading/body/caption)
   - Spacing styles: tight/medium/wide/vast scale
   - Save to `.config/opencode/design-data/tokens/[project-name].json`

**Reference**: Load `quality-gates.md` for complete interface design workflow

---

## 9. AI Mentor Workflow

**When**: User has an idea and wants to reach a product concept — "mentor me", "help me think through this", "is this a good idea", "what should I build"

**Steps**:
1. **Frame the problem**: Restate the idea as 5–10 How-Might-We questions (the idea is a hypothesis, not the answer)
2. **Find the job (JTBD)**: "When [situation], I want to [motivation], so I can [outcome]"
3. **Surface the riskiest assumption**: What must be true? Rank by impact × uncertainty
4. **Diverge**: Generate 5+ genuinely distinct concept directions
5. **Converge**: Score by impact × feasibility × desirability
6. **Write the concept brief**: Job, person-in-context, problem + evidence, the concept, riskiest assumption + test, success signal, explicit out-of-scope

**Key Standards**:
- Mentor by asking, not answering — surface assumptions before converging
- Problem before solution; no one-idea "brainstorm"
- Every concept needs a riskiest-assumption test and an explicit "not now"

**Reference**: `design-data/references/mentorship-frameworks.md`
**Also load**: `frameworks-and-artifacts.md` (brainstorming techniques)
**Output**: Save to `design-data/projects/[project-name]/concept.md`

---

## 10. UX Flows Workflow

**When**: User journeys, user/task flows, information architecture, sitemaps — "map the flow", "product structure"

**Steps**:
1. **Identify the primary job + entry points**
2. **Choose artifact**: task flow (one path), user flow (all paths), or journey map (end-to-end experience)
3. **Map the happy path**, then add error and edge branches (empty / first-run / offline / permission-denied)
4. **Define IA**: sitemap (depth ≤ 3), navigation model, domain-language labels
5. **Journey map** (if experience-level): stages → actions → thoughts → emotions → opportunities; plot the emotion curve
6. **Validate**: token test on nav labels; flag dead ends with no recovery

**Key Standards**:
- Happy path first, but never ship without error/edge branches
- Labels in the user's domain language, not internal jargon
- Avoid deep nesting (>3) and modal-first flows
- Mark moments of truth and the lowest emotional dip (highest leverage)

**Reference**: `design-data/references/ux-flow-patterns.md`
**Tools**: figma-generate-diagram skill (Mermaid → FigJam)
**Output**: Save to `design-data/projects/[project-name]/flows.md`

---

## 11. UX Audit Workflow

**When**: "UX audit", "usability review", "heuristic evaluation" — a combined usability + accessibility check

**Steps**:
1. **Scope & method**: what's reviewed; heuristic walkthrough + WCAG 2.1 AA pass
2. **Usability**: evaluate against Nielsen's 10 heuristics
3. **Accessibility**: WCAG AA checklist — measure contrast, keyboard, focus order, semantics, names/roles, forms, targets, motion
4. **Classify severity**: Critical / Major / Minor
5. **Prioritize**: frequency × severity → top 3–5
6. **Report**: per finding — location, heuristic/criterion, evidence, concrete fix

**Key Standards**:
- Calculate contrast — never estimate
- Every finding has a severity and a concrete fix; name the element and the heuristic
- Note what works, not only what's broken; keep feedback stage-appropriate

**Reference**: `design-data/references/ux-heuristics.md`
**Also reference**: `quality-gates.md` (Gates 3 & 5) and Accessibility Audit Workflow (§7)
**Output**: Save to `design-data/projects/[project-name]/ux-audit.md`

---

## 12. Design Converter Workflow

**When**: A sketch, wireframe, or screenshot is provided — "turn this into UI", "convert this design", image attached

**STRICT ENFORCEMENT ACTIVE**: Reverse-engineering an image does NOT skip the gates.

**Steps**:
1. **Observe** the image precisely (regions, repetition, alignment, density, evident hierarchy)
2. **[Gate 1] Infer intent** (Who/What/Feel) — ask one question if genuinely ambiguous
3. **[Gate 2] Infer domain** — derive color world + signature from the domain, not the screenshot's arbitrary colors
4. **Extract structure** → layout grid + regions + component list
5. **Map to tokens** (spacing 4/8pt, type roles, semantic domain-named colors, radius/elevation)
6. **Complete states** the static image can't show (all 8)
7. **[Gates 3 & 5] Validation tests + ban list** before emitting code
8. **Emit** semantic, accessible markup + token sheet + an explicit list of assumptions

**Key Standards**:
- Don't copy the screenshot's arbitrary palette as "the design"
- Improve banned patterns; don't pixel-match them
- Tokens, not hardcoded values; always list assumptions

**Reference**: `design-data/references/design-converter-guide.md`
**Required Modules**: `quality-gates.md` (all 5 gates)
**Output**: Save to `design-data/projects/[project-name]/converted.md`

---

## 13. Figma Export Workflow (Write Direction)

**When**: "export to Figma", "push this to Figma", "build this in Figma", create designs/components in a Figma file. Complements §8 Figma Integration, which reads FROM Figma.

**Steps**:
1. **Confirm Figma MCP is connected** (and a target file/page exists or should be created)
2. **Prepare the source**: a gates-passing design (from Interface Design / Design Converter) or design-system tokens
3. **Load the Figma skill FIRST**: `figma:figma-generate-design` (a page/view) or `figma:figma-generate-library` (a design system) — MANDATORY before any use_figma / generate_figma_design call
4. **Map tokens → Figma**: color/text/spacing styles or variables (OKLCH → hex); brand fonts Inter + Fragment Mono; two-tone plum/violet
5. **Assemble** section-by-section using design-system components/variables, not hardcoded values
6. **Verify** against Gates 3 & 5 in the generated file; report the file URL

**Key Standards**:
- Always load the relevant `figma-*` skill before calling Figma write tools
- Use variables/styles, not hardcoded values; preserve brand fonts + two-tone color
- Re-run validation tests on the exported result

**Tools**: Figma MCP (`generate_figma_design`, `use_figma`, `create_new_file`); skills `figma:figma-generate-design`, `figma:figma-generate-library`
**Output**: Figma file URL + token mapping → `design-data/tokens/[project-name].json`

---

## 14. Portfolio Builder Workflow

**When**: "case study", "portfolio", "write up this project", "show this work"

**Steps**:
1. **Gather artifacts** from `design-data/projects/[project-name]/` (research, system, handoff, flows)
2. **Structure (CRP-PDSI)**: Context · Role · Problem · Process · Decisions · Solution · Impact
3. **Frame pivotal decisions (STAR-D)**: situation → task → action → result → rationale
4. **Establish impact**: relative/directional metrics + mechanism, or qualitative evidence — never invented
5. **Before/after**: show the prior state, its problem, and the change
6. **Assemble** the narrative; lead with problem + decisions, not screenshots

**Key Standards**:
- Show judgment and trade-offs, not a screenshot gallery
- Honest role attribution (you vs. team); no invented metrics
- Include the messy middle and what you'd do next

**Reference**: `design-data/references/portfolio-frameworks.md`
**Also reference**: `standards-and-anti-patterns.md` (Evidence-Based standard)
**Output**: Save to `design-data/projects/[project-name]/case-study.md`

---

## Cross-References

**All workflows reference:**
- `quality-gates.md` - For gate specifications, brand identity, premium patterns
- `standards-and-anti-patterns.md` - For quality standards and anti-patterns to avoid
- `frameworks-and-artifacts.md` - For decision frameworks and output templates

**Workflow-specific modules:**
- Interface Design → Requires `quality-gates.md` (all 5 gates mandatory)
- Research → Uses `frameworks-and-artifacts.md` (research methods, analysis frameworks)
- Strategy → Uses `frameworks-and-artifacts.md` (brainstorming techniques)
- Handoff → Uses `frameworks-and-artifacts.md` (handoff template)
