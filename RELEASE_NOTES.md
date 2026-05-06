# ORP v2.0 - Release Notes (Stable Snapshot)

## Release Tag
ORP v2.0-stable

---

## Overview

This release represents a stabilized snapshot of the ORP (Open Resonance Protocol) epistemic evaluation framework.

The system is now considered structurally consistent across all core components:

- PROMPT.md
- BENCHMARK.md
- EVALUATION_SCHEMA.md
- RUBRIC.md
- SCORING.md
- SYSTEM_MAP.md
- SYSTEM_MAP.manifest.json
- ORIGIN.md
- CONTRIBUTING.md
- CODE_OF_CONDUCT.md
- LICENSE
- README.md

---

## System State

ORP v2.0 defines a deterministic epistemic evaluation pipeline designed to:

- enforce atomic claim decomposition
- maintain strict epistemic tagging discipline
- detect causal distortion and reasoning failure modes
- evaluate reasoning under adversarial conditions
- produce normalized quantitative scoring (0–60)

---

## Architecture Status

The system is confirmed to be:

- structurally consistent across all layers
- schema-aligned (EVALUATION_SCHEMA.md is fully integrated into pipeline)
- manifest-synchronized (SYSTEM_MAP.manifest.json matches SYSTEM_MAP.md)
- version-stable at ORP v2.0
- subversion-compatible under controlled constraints

---

## Key System Properties (v2.0 Stable)

### 1. Epistemic Separation
Claims are always separated into:
- Verified
- Unverified
- Speculative
- Disputed

---

### 2. Pipeline Determinism
All evaluations follow a strict linear pipeline:

INPUT → PROMPT → BENCHMARK → MODEL_RESPONSE → SCHEMA → RUBRIC → SCORING → OUTPUT

No cycles permitted.

---

### 3. Structural Integrity Enforcement
The system enforces:
- no merging of epistemic categories
- no narrative substitution for missing evidence
- no backward inference between pipeline stages

---

### 4. Evaluation Model
Final scoring is based on:

- claim integrity
- distortion detection
- epistemic discipline
- reconstruction quality

Output range: 0–60

---

## Breaking Changes (since pre-v2.0)

- EVALUATION_SCHEMA.md formally introduced as structural contract layer
- SYSTEM_MAP aligned with schema-driven architecture
- full separation of evaluation vs execution responsibilities enforced
- manifest-system dual representation stabilized

---

## Compatibility

This release is compatible with:

- local inference stacks (Ollama, vLLM, etc.)
- GGUF / EXL2 quantized models
- adversarial evaluation benchmarking setups

---

## Known Constraints

- system is intentionally non-conversational in design
- no probabilistic scoring interpretation allowed (only deterministic evaluation)
- no cross-layer inference allowed outside defined pipeline

---

## Design Principle

Epistemic structure is the only source of evaluation truth.

Signal integrity is preserved through strict separation of system layers.

---

## Final Status

ORP v2.0 is now considered:

> STABLE — ARCHITECTURE LOCKED
