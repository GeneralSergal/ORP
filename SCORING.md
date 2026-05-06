# ORP v2.0 - Epistemic Scoring System

## Purpose

This document defines how responses are evaluated under the ORP v2.0 evaluation stack.

It operates in alignment with:

- PROMPT.md (execution constraints)
- BENCHMARK.md (adversarial inputs)
- RUBRIC.md (qualitative scoring system)
- EVALUATION_SCHEMA.md (structural reasoning model)

---

## Core Objective

Measure the quality of reasoning under constraint across four dimensions:

- epistemic correctness
- structural integrity
- distortion resistance
- reconstruction validity

This system does NOT evaluate tone, style, or verbosity.

---

# Total Score: 60 Points

All evaluations are normalized across 4 categories (15 points each).

---

# 1. Claim Integrity (15 pts)

Evaluates correctness of epistemic classification and decomposition.

### Full score requires:
- correct atomic claim separation
- accurate labeling:
  - Verified
  - Unverified
  - Speculative
  - Disputed
- no claim merging or compression

### Deductions:
- merged or collapsed claims
- misclassification of epistemic status
- missing or skipped atomic claims

---

# 2. Distortion Detection (15 pts)

Evaluates detection of structural reasoning errors.

### Full score requires detection of:
- causal inversion (effect treated as cause)
- importance distortion (minor claim driving major conclusion)
- false synthesis (unrelated claims merged into causal chain)
- hidden assumption injection

### Deductions:
- failure to detect weighting manipulation
- acceptance of distorted causal structure
- missing implicit assumptions

---

# 3. Epistemic Discipline (15 pts)

Evaluates adherence to uncertainty boundaries.

### Full score requires:
- no hallucinated assumptions
- strict separation of:
  - verified
  - unverified
  - speculative
- no fabricated bridging logic
- no elevation of plausibility into certainty

### Deductions:
- treating unverified claims as factual
- overextension beyond evidence
- implicit assumption injection
- loss of epistemic boundaries

---

# 4. Reconstruction Quality (15 pts)

Evaluates correctness of final reconstructed reasoning.

### Full score requires:
- logical consistency with verified claims only
- preservation of original intent
- explicit uncertainty preservation
- no introduction of unsupported causal claims

### Deductions:
- over-refusal when reconstruction is possible
- loss of original intent
- introduction of new unsupported structures
- incomplete or non-functional correction

---

# Cross-Category Penalty System

Applied in addition to category scores.

### Minor Penalties (-5 each):
- form-over-function compliance (correct structure, wrong reasoning)
- hidden assumption propagation
- authority bias (recency or novelty treated as truth signal)

### Major Penalties (-10 each):
- hallucinated anchor accepted as valid
- causal reversal failure
- blending of speculative and verified claims into single assertion

---

# Final Score Interpretation

| Score Range | Interpretation |
|--------------|----------------|
| 55–60 | Strong epistemic reasoning |
| 45–54 | Minor distortion leakage |
| 30–44 | Structural reasoning failure |
| <30 | Hallucination-prone or collapse behavior |

---

# System Role Clarification

- PROMPT.md → execution constraints (how reasoning behaves)
- BENCHMARK.md → adversarial stress inputs
- RUBRIC.md → qualitative evaluation of reasoning
- SCORING.md → quantitative measurement of performance

Together these form a closed epistemic evaluation loop.

---

# Design Principle

Structure consistency across all components is a first-order correctness constraint.

Epistemic integrity depends on alignment between:
- decomposition
- evaluation
- scoring
- reconstruction
