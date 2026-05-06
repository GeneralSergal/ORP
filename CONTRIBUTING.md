# ORP v2.0 - CONTRIBUTING

> ROADMAP HINT: ORP v3.0 focuses on Python package MVP, improved scoring, and example notebooks. See ROADMAP.md for details.

---

## Quick Start for Contributors

1. Clone the repo locally.

2. Install Python dependencies:

pip install -r requirements.txt (when Python package is available)

3. Run a basic evaluation (example):

   // INSERT: Python snippet using `orp.evaluate()` API

4. Check `ROADMAP.md` for current priorities.

5. Make changes in `PROMPT.md`, `BENCHMARK.md`, `RUBRIC.md`, `SCORING.md`, or `EVALUATION_SCHEMA.md` following guidelines below.

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
- Improve claim separation clarity  
- Improve classification consistency  
- Improve distortion detection precision  
- Improve reconstruction fidelity  

### 2. Benchmark Expansion
- New adversarial test cases  
- Hallucination stress tests  
- Causal distortion scenarios  

### 3. Infrastructure / Tooling
- Local execution tooling (Ollama, vLLM, etc.)  
- Evaluation automation  
- Reproducibility improvements  

---

## Not Allowed

### Structural Violations
- Merging system layers  
- Redefining evaluation pipeline structure  
- Introducing cross-file hidden dependencies  

### Epistemic Regression
- Weakening uncertainty tracking  
- Collapsing epistemic categories  
- Replacing structured evaluation with narrative logic  

### Behavioral Drift
- Adding persona behavior rules  
- Introducing tone/persuasion constraints  
- Embedding stylistic preferences into evaluation logic  

---

## Validation Rule

A contribution is valid only if:

- It preserves separation of concerns  
- It does not modify the evaluation architecture  
- It remains compatible with EVALUATION_SCHEMA.md  

If a change improves usability but reduces epistemic precision, it must be rejected.

---

## Design Principle

> Structural correctness is a hard constraint, not a preference.

Signal integrity overrides readability or stylistic convenience.

---

## Version Alignment

All contributions must remain compatible with:

ORP v2.0 — Unified Epistemic Evaluation Architecture
