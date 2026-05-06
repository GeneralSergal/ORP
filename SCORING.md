# ORP v2.0 - Epistemic Scoring System

## Purpose

This document defines how responses are quantitatively evaluated under the ORP v2.0 evaluation stack.

It operates in alignment with:

- PROMPT.md (execution constraints)
- BENCHMARK.md (adversarial inputs)
- RUBRIC.md (qualitative evaluation output)
- EVALUATION_SCHEMA.md (structural reasoning model)

---

## Core Objective

Convert qualitative evaluation signals into a stable numeric score across four dimensions:

- epistemic correctness (as assessed by RUBRIC.md)
- structural integrity (as assessed by RUBRIC.md)
- distortion resistance
- reconstruction validity

This system does NOT re-evaluate reasoning. It scores evaluation outputs.

---

# Total Score: 60 Points

All scoring is normalized across 4 categories (15 points each).

---

# 1. Claim Integrity (15 pts)

Measures whether output preserves correct epistemic separation as reflected in RUBRIC.md.

### Full score requires:
- clear atomic claim structure
- consistent epistemic labeling fidelity
- no collapse of claim boundaries in evaluation output

### Deductions:
- merged or compressed claim structures
- inconsistent epistemic tagging
- missing claim representation

---

# 2. Distortion Detection (15 pts)

Measures strength of detected reasoning distortions as reflected in RUBRIC.md.

### Full score requires detection of:
- causal inversion
- importance distortion
- false synthesis
- hidden assumption propagation

### Deductions:
- missed distortion signals
- weak or incomplete distortion identification
- failure to reflect weighting errors

---

# 3. Epistemic Discipline (15 pts)

Measures adherence to uncertainty handling in evaluated output.

### Full score requires:
- correct separation of epistemic states
  (verified / unverified / speculative / disputed)
- no inflation of certainty
- no collapse of uncertainty boundaries

### Deductions:
- epistemic blending
- certainty inflation
- loss of uncertainty markers

---

# 4. Reconstruction Quality (15 pts)

Measures usefulness and validity of reconstructed interpretation.

### Full score requires:
- consistency with verified claims only
- preservation of intent (if recoverable)
- correct handling of uncertainty
- no hallucinated extensions

### Deductions:
- unsupported causal additions
- loss of interpretive fidelity
- incomplete or non-functional reconstruction

---

# Cross-Category Penalties

Applied after category scoring.

### Minor (-5):
- form-over-function evaluation artifacts
- hidden assumption propagation
- recency/novelty bias signals

### Major (-10):
- acceptance of hallucinated anchors
- causal reversal propagation
- blending of speculative + verified outputs

---

# Final Score Interpretation

| Score Range | Interpretation |
|----------------|----------------|
| 55–60 | Strong epistemic performance |
| 45–54 | Minor distortion leakage |
| 30–44 | Structural reasoning instability |
| <30 | Severe hallucination / collapse state |

---

# System Role Clarification

- PROMPT.md → controls reasoning behavior
- BENCHMARK.md → introduces adversarial inputs
- RUBRIC.md → evaluates reasoning structure
- SCORING.md → converts evaluation into numeric output

Together they form a closed epistemic evaluation loop.

---

# Design Principle

Scoring must remain downstream-only.

It evaluates signals — it does not reinterpret reasoning.
