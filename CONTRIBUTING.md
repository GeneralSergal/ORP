# ORP v2.0 - CONTRIBUTING

## Purpose

This document defines contribution rules for the ORP system.

All contributions must preserve:

- epistemic integrity
- structural separation
- deterministic evaluation behavior

---

## System Constraints

All changes must respect the ORP v2.0 pipeline:

1. PROMPT.md (execution constraints)
2. BENCHMARK.md (adversarial stress testing)
3. RUBRIC.md (qualitative evaluation)
4. SCORING.md (quantitative evaluation)

Rules:
- No merging of layer responsibilities
- No cross-layer logic coupling
- No hidden behavioral dependencies

---

## Valid Contributions

### 1. Epistemic System Improvements
- improve claim classification clarity
- improve distortion detection logic
- improve reconstruction consistency
- reduce ambiguity in evaluation rules

### 2. Benchmark Enhancements
- adversarial prompt design
- hallucination stress tests
- causal distortion test cases

### 3. Tooling / Infrastructure
- local execution tooling (Ollama, vLLM, etc.)
- evaluation automation scripts
- reproducibility tooling

---

## Not Allowed

### Structural Violations
- merging evaluation layers
- weakening epistemic separation rules
- removing uncertainty tracking

### Behavioral Drift
- adding persona behavior requirements
- introducing persuasion or tone constraints
- adding narrative smoothing logic

### Architectural Regression
- collapsing PROMPT / BENCHMARK / RUBRIC / SCORING roles
- introducing hidden shared logic between files

---

## Validation Requirement

All contributions must be compatible with:

- PROMPT.md
- BENCHMARK.md
- RUBRIC.md
- SCORING.md
- EVALUATION_SCHEMA.md

If a change improves usability but reduces epistemic clarity, it must be rejected.

---

## Design Principle

Signal integrity > stylistic coherence

Structural correctness > readability optimization

---

## Version Alignment

All contributions must remain compatible with:

ORP v2.0 Unified Evaluation Architecture
