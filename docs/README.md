# Documentation

Product Design Partner — find the right doc for your role.

## Designers (start here)

| Doc | Best for | Time |
|-----|----------|------|
| **[Quick start for designers](designer-quick-start.md)** | First day in Cursor; minimal jargon | 10 min |
| **[Handoff guide](handoff-guide.md)** | Full team onboarding + rollout checklist | 20 min |
| **[Workflows by task](workflows-by-task.md)** | "Which `/command` do I use?" | 5 min |
| **[Quality gates (plain English)](quality-gates-for-designers.md)** | Why the agent asks Who/What/Feel | 10 min |
| **[Troubleshooting](troubleshooting-for-designers.md)** | Something isn't working | 5 min |
| **[Getting started examples](../examples/getting-started.md)** | Sample prompts and responses | 10 min |

### Install (one-time)

| Doc | When |
|-----|------|
| [macOS installation](installation-macos.md) | Mac + step-by-step paths |
| [Installation (all platforms)](installation.md) | Claude Code, Codex, OpenCode, manual paths |

## Daily reference

| Doc | Purpose |
|-----|---------|
| [Workflows by task](workflows-by-task.md) | Commands matched to design jobs |
| [Workflow index (technical)](workflows.md) | § numbers and output filenames |
| [Product design process](../design-data/references/product-design-process.md) | Discover → Define → Develop → Deliver |
| [Saving project files](../design-data/projects/README.md) | Where specs and prototypes live |
| [Ban list](../design-data/references/ban-list.md) | Patterns the agent avoids (with reasons) |

## Platform setup (optional depth)

| Doc | Platform |
|-----|----------|
| [AGENTS.md](../AGENTS.md) | Open agent repo in Cursor without global install |
| [Platform adaptation](../agent/modules/platform-adaptation.md) | Differences between Cursor, Claude, Codex, OpenCode |

## Maintainers & engineers

| Doc | Purpose |
|-----|---------|
| [Architecture](architecture.md) | How modules, plugins, and sync scripts connect |
| [Contributing](contributing.md) | Change workflows, gates, commands |
| [Changelog](../CHANGELOG.md) | Version history |
| [Quality gates (full spec)](../agent/modules/quality-gates.md) | Authoritative gate rules |

## Verify install (technical)

Design leads or IT can run:

```bash
./scripts/test.sh
```

Designers usually only need: type `/` in Cursor and see `/interface`.

## What's in the repo vs on your laptop

| Location | What it is |
|----------|------------|
| This repo | The tool, commands, playbooks |
| `design-data/projects/` on your machine | **Your** specs and prototypes (not uploaded to git by default) |
| `~/.cursor/commands/` | Slash commands after install |
| `~/.product-design-partner/` | Reference files the agent reads (after install) |
