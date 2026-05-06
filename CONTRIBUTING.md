# ORP v2.0 - CONTRIBUTING

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
