---
name: ponytail-gain
description: >
  Show ponytail's measured impact as a compact scoreboard: less code, less
  cost, more speed, from the benchmark medians. One-shot display, not a
  persistent mode, and not a per-repo number. Trigger: "ponytail gain",
  "ponytail-gain", "what does ponytail save", "show ponytail impact",
  "ponytail scoreboard".
license: MIT
---

# Ponytail Gain

Display this scoreboard when invoked. One-shot: do NOT change mode, write flag files, or persist anything.

The figures are the published benchmark medians (5 everyday tasks: email validator, debounce, CSV sum, countdown timer, rate limiter; 3 models: Haiku, Sonnet, Opus). They are measured, not computed from the current repo. Source: `benchmarks/` and the README at https://github.com/DietrichGebert/ponytail.

## Scoreboard

```
ponytail gain benchmark median · 5 tasks · 3 models

Lines of code
  no-skill  ████████████████████ 100%
  ponytail  ██▌················· 6–20% ▼ 80–94%

Cost (tokens)
  no-skill  ████████████████████ 100%
  ponytail  █████▌·············· 23–53% ▼ 47–77%

Speed      ▸ 3–6× faster

Agentic benchmark (real repo, 12 tasks, Haiku 4.5):
  LOC:      -54% ▼
  Tokens:   -22% ▼
  Cost:     -20% ▼
  Time:     -27% ▼
  Safety:   100% ✓

See also:
  ponytail-debt   → shortcuts you deferred
  ponytail-audit  → what's still cuttable
  ponytail-review → review current diff for over-engineering
```

## Honesty Boundary

These are benchmark medians, not this repo. NEVER print a per-repo savings number ("you saved X lines/tokens here"): the unbuilt version was never written, so there is no real baseline to subtract from in a live repo. The only real per-repo figures come from `ponytail-debt` (a counted ledger), and this card points there instead of inventing one.

## Boundaries

One-shot display. Edits nothing, changes no mode.

"stop ponytail" or "normal mode": revert.
