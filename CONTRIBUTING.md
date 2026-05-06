# ORP v2.0 - CONTRIBUTING

> ROADMAP HINT: ORP v3.0 focuses on Python package MVP, improved scoring, and example notebooks. See ROADMAP.md for details.

## Quick Start for Contributors

1. Clone the repo locally
2. Install Python dependencies
   pip install -r requirements.txt
3. Run a basic evaluation (example):
```python
   from orp import evaluate
    result = evaluate(response, context=context, mode="strict")
   print(result.score, result.report, result.graph)
   ```
4. Check ROADMAP.md for current priorities
5. Make changes in PROMPT.md, BENCHMARK.md, RUBRIC.md, SCORING.md, or EVALUATION_SCHEMA.md following guidelines below

---

## Purpose

This document defines how changes may be contributed to the ORP system.

It ensures that modifications preserve epistemic integrity, structural separation, and deterministic evaluation behavior.

---

## System Context

All contributions must remain compatible with:

- PROMPT.md (execution constraints)
- BENCHMARK.md (adversarial testing)
- RUBRIC.md (evaluation logic)
- SCORING.md (aggregation layer)
- EVALUATION_SCHEMA.md (structural contract)

This document does not redefine system behavior. It only governs modifications.

---

## Roadmap Reference (v3.0)

To guide contributions for the next evolution of ORP:

- Focus on building a **Python package** with `orp.evaluate()` API.
- Improve **scoring logic** with assumption surfacing.
- Prepare **example notebooks** for domain-specific adversarial testing.
- Optional features: **reasoning graph output**, **modular evaluators**, **plugin system**.
- The roadmap is **directional**, not deadline-bound. Contributions accelerate progress.

> See `ROADMAP.md` for the full prioritized plan and feature tiers (Must-have / Nice-to-have / Ambitious).

---

## Allowed Contribution Types

### 1. Epistemic Improvements
- improve claim separation clarity
- improve classification consistency
- improve distortion detection precision
- improve reconstruction fidelity

### 2. Benchmark Expansion
- new adversarial test cases
- hallucination stress tests
- causal distortion scenarios

### 3. Infrastructure / Tooling
- local execution tooling (Ollama, vLLM, etc.)
- evaluation automation
- reproducibility improvements

---

## Not Allowed

### Structural Violations
- merging system layers
- redefining evaluation pipeline structure
- introducing cross-file hidden dependencies

### Epistemic Regression
- weakening uncertainty tracking
- collapsing epistemic categories
- replacing structured evaluation with narrative logic

### Behavioral Drift
- adding persona behavior rules
- introducing tone/persuasion constraints
- embedding stylistic preferences into evaluation logic

---

## Validation Rule

A contribution is valid only if:

- it preserves separation of concerns
- it does not modify the evaluation architecture
- it remains compatible with EVALUATION_SCHEMA.md

If a change improves usability but reduces epistemic precision, it must be rejected.

---

## Design Principle

> Structural correctness is a hard constraint, not a preference.

Signal integrity overrides readability or stylistic convenience.

---

## Version Alignment

All contributions must remain compatible with:

ORP v2.0 — Unified Epistemic Evaluation Architecture
