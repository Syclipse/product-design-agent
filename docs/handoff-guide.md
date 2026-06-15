# Designer handoff guide

For **designers and design leads** receiving this as a team tool. You don't need an engineering background—just Cursor (or another supported AI app) and about 30 minutes for first-time setup.

**Brand new?** Start with the even shorter [Quick start for designers](designer-quick-start.md).

## What you're getting

A **structured AI design partner** that:

- Lives in **Cursor**, **Claude Code**, **Codex**, or **OpenCode** (use whatever your org standardizes on)
- Covers the design lifecycle—research, flows, screens, prototypes, critique, handoff, portfolio
- Pushes back on generic AI UI ("clean, modern, for users")
- Shows **2–3 real options** for new screens before you commit to one direction

Your team's client work stays in a folder on your laptop (`design-data/projects/`). The shared repo is the **tool**, not your deliverables.

## Glossary (tech words we use)

| Term | Plain meaning |
|------|----------------|
| **Slash command** | Shortcut you type in chat, e.g. `/interface` |
| **Quality gates** | Five checks so output stays specific and accessible — [explained simply](quality-gates-for-designers.md) |
| **Variant Protocol** | Always 2–3 different layout directions for new UI; you pick the winner |
| **Rule file** | One file copied into your project so Cursor knows to act as the design partner |
| **Install script** | One terminal command that copies commands into your app (often run once by IT) |
| **Subagent / focused agent** | Optional: runs a big task in a separate chat so your main thread stays clean |

---

## 30-minute onboarding

### 1. Install (10 min) — you or IT

**Easiest path (Mac + Cursor):**

1. Install [Node.js LTS](https://nodejs.org/) if you don't have it (needed for an optional quality checker).
2. Download the agent repo (or get a zip from your design ops team).
3. In Terminal, from that folder:

```bash
chmod +x install.sh
./install.sh --target cursor --yes
```

4. Success message = slash commands like `/interface` are now in Cursor.

**Other platforms:** [installation-macos.md](installation-macos.md) · [installation.md](installation.md)

**Verify:** In Cursor, type `/` — you should see design commands.

### 2. Attach to your project (5 min)

The install puts commands on your **computer**. You also attach **identity** to each **project** you design in:

**Cursor (recommended):**

1. Open the folder where you do design work (client project, product repo, etc.).
2. Create `.cursor/rules/` inside that folder if it doesn't exist.
3. Copy this file from the agent download into it:

   `cursor/rules/product-design-partner.mdc` → `your-project/.cursor/rules/product-design-partner.mdc`

4. Open a new chat in that project.

**Without global install:** You can open the agent repo itself in Cursor and read [AGENTS.md](../AGENTS.md)—but slash commands still need the install step once.

**Claude Code:** Add the repo as a plugin (`/plugin`) or run `./install.sh --target claude --yes`. Details: [.claude-plugin/README.md](../.claude-plugin/README.md).

### 3. First workflow (10 min)

In Cursor chat:

```
/interface A settings page where finance admins reconcile Stripe payouts before month-end close. They need confidence nothing is missed.
```

**You should see:**

1. **Who / What / Feel** — specific person, task, emotion (not "users" or "clean")
2. **Domain** — ideas and colors from finance/reconciliation, not template SaaS
3. **2–3 layout directions** — comparison table, recommendation, **your choice**
4. **Refinement** of the winner — states, accessibility, tokens

**If it skips variants, say:** *"Show three distinct directions first, then stop for my pick."*

More examples: [getting-started.md](../examples/getting-started.md) · [workflows-by-task.md](workflows-by-task.md)

### 4. Save your work (5 min)

Tell the agent:

> Save artifacts under design-data/projects/billing-dashboard/

Use one folder per product. You don't need every file type on day one—add them as the project grows.

| File | When you create it |
|------|-------------------|
| `concept.md` | Early mentor/strategy |
| `research-plan.md` | After `/research` |
| `flows.md` | After `/ux-flows` |
| `variants.md` + `prototypes/` | After `/prototype` |
| `system.md` | After `/interface` |
| `handoff.md` | Before dev (`/handoff`) |

Full layout: [design-data/projects/README.md](../design-data/projects/README.md)

---

## Daily cheat sheet

| I want to… | Command |
|------------|---------|
| Early ideation | `/brainstorm` or `/mentor` |
| Research planning | `/research` |
| Flows / IA / diagrams | `/ux-flows` or `/diagram` |
| **New screen** | `/interface` |
| **Clickable options** | `/prototype` |
| Sketch → spec | `/design-converter` |
| Design system audit | `/design-system` |
| Review a mockup | `/critique` or `/ux-audit` |
| Explain decisions | `/annotate` |
| Dev-ready spec | `/handoff` |
| Figma | `/figma-export` |
| Case study | `/portfolio` |

Expanded table with examples: [workflows-by-task.md](workflows-by-task.md)

## Big tasks (optional focused agents)

Long UI work can run in a **separate agent** so your main chat doesn't get huge:

| Task | Command | Agent name (Cursor / Claude) |
|------|---------|------------------------------|
| New screen | `/interface` | `interface-design` |
| HTML prototypes | `/prototype` | `prototype-variants` |
| Figma export | `/figma-export` | `figma-export` |

The slash command alone is enough if you don't use separate agents. Rules always live in the shared modules—not copied into each agent file.

## Quality gates (summary)

Five checks before UI is "done." Full plain-English guide: [quality-gates-for-designers.md](quality-gates-for-designers.md).

1. **Who / What / Feel** — specific human, task, emotion  
2. **Domain** — product-world concepts, colors, repeating signature element  
3. **Validation tests** — swap, squint, signature, token  
4. **Variance** — not the same vibe+layout as your last two big screens  
5. **Ban list** — no glass-everywhere, gradient text, hero-metric clichés  

**Optional file check before engineering handoff** (ask IT to run once and show you):

```bash
node plugins/design-validator.mjs design-data/projects/my-app/handoff.md
```

Exit code `0` = all gates documented correctly in that file.

## Privacy: what stays off git

Your deliverables are **private by default** on your machine:

| Folder | What's in it |
|--------|----------------|
| `design-data/projects/` | Your specs, prototypes, client work |
| `design-data/validation-history/` | Local check logs (optional) |

The shared repo only contains the tool and reference playbooks—not your client files.

## Customizing for client brands

The agent ships a **demo brand** (Inter, Fragment Mono, plum + violet) for examples. For client work:

1. Keep the **process** (gates, variants)—change colors and signature to match the client.
2. Save client tokens in `design-data/projects/<client>/system.md`.
3. Don't remove ban-list rules—they prevent generic AI UI.

## Team rollout checklist

**Design lead**

- [ ] Pin a release tag (e.g. `v1.3.1`) and share [designer-quick-start.md](designer-quick-start.md)
- [ ] Confirm Figma MCP if using `/figma-export` ([installation.md](installation.md#figma-mcp-optional))

**Each designer**

- [ ] Ran `./install.sh --target cursor --yes` (or IT did)
- [ ] Copied `product-design-partner.mdc` into each active project
- [ ] Typed `/` in Cursor and sees design commands
- [ ] Ran one `/interface` prompt successfully
- [ ] Knows where to save: `design-data/projects/<name>/`

## Getting help

| Question | Where |
|----------|-------|
| First day | [designer-quick-start.md](designer-quick-start.md) |
| Which command? | [workflows-by-task.md](workflows-by-task.md) |
| Something broke | [troubleshooting-for-designers.md](troubleshooting-for-designers.md) |
| Why was output rejected? | [quality-gates-for-designers.md](quality-gates-for-designers.md) |
| Install details | [installation-macos.md](installation-macos.md) |
| Process phases | [product-design-process.md](../design-data/references/product-design-process.md) |

## For whoever maintains the tool

1. Tag releases and share this guide + [docs/README.md](README.md)
2. Confirm `.gitignore` excludes `design-data/projects/` (no client data in git)
3. Run `./scripts/test.sh` before pinning a version for the team

Technical docs: [architecture.md](architecture.md) · [contributing.md](contributing.md)
