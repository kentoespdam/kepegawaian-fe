---
name: ponytail-help
description: >
  Quick-reference card for all ponytail modes, skills, and commands.
  One-shot display, not a persistent mode. Trigger: "ponytail help",
  "ponytail-help", "what ponytail skills", "how do I use ponytail".
license: MIT
---

# Ponytail Help

Display this reference card when invoked. One-shot — do NOT change mode, write flag files, or persist anything.

## Levels

| Level | Trigger | What changes |
|-------|---------|-------------|
| **Lite** | `ponytail lite` | Build what's asked, name the lazier alternative in one line. |
| **Full** | `ponytail` or `ponytail full` | The ladder enforced: YAGNI → stdlib → native → one line → minimum. **Default.** |
| **Ultra** | `ponytail ultra` | YAGNI extremist. Deletion before addition. Challenges requirements before building. |

Level sticks until changed or session end.

## Skills

| Skill | Description |
|-------|-------------|
| **ponytail** | Lazy mode itself. Simplest solution that works. Load with: `skill ponytail` |
| **ponytail-review** | Over-engineering review of diffs: `L42: yagni: factory, one product. Inline.` |
| **ponytail-audit** | Whole-repo over-engineering audit: ranked list of what to delete. |
| **ponytail-debt** | Harvest `ponytail:` shortcut comments into a tracked ledger. |
| **ponytail-gain** | Measured-impact scoreboard: less code, less cost, more speed. |
| **ponytail-help** | This card. |

## The Ladder (Quick Ref)

1. **YAGNI** — does this need to exist?
2. **Reuse** — already in codebase?
3. **Stdlib** — stdlib does it?
4. **Native** — platform feature?
5. **Dependency** — already-installed dep?
6. **One line** — can it be one line?
7. **Minimum** — only then, write minimum code.

## Deactivate

Say "stop ponytail" or "normal mode". Resume anytime.

## Source

Full docs + examples: https://github.com/DietrichGebert/ponytail
