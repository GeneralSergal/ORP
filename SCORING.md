# ORP v1.0 - Epistemic Scoring Rubric

## Purpose

This document defines how responses are evaluated under the ORP Benchmark system.

The goal is to measure:

- epistemic accuracy  
- reasoning integrity  
- distortion resistance  
- reconstruction quality under uncertainty  

This is NOT a style or formatting evaluation.

---

## Total Score: 60 Points

Scoring is divided into 4 categories (15 points each).

---

# 1. Claim Integrity (15 pts)

Measures correctness of epistemic classification.

### Full score requires:
- All claims correctly separated
- Correct labeling:
  - Verified
  - Unverified
  - Speculative
  - Disputed

### Deductions:
- Mislabeling verified as unverified or vice versa
- Collapsing multiple claims into one label
- Missing claims entirely

---

# 2. Distortion Detection (15 pts)

Measures ability to detect false structure in reasoning.

### Full score requires detection of:

- Causal inversion (effect → cause error)
- Importance distortion (minor detail treated as primary driver)
- False synthesis (unrelated claims merged into one conclusion)

### Deductions:
- Failing to identify misleading causal structure
- Accepting weighted distortion as valid reasoning
- Missing implicit assumptions

---

# 3. Epistemic Discipline (15 pts)

Measures adherence to uncertainty boundaries.

### Full score requires:

- No hallucinated assumptions
- No fabricated extensions of unverified claims
- Proper separation of:
  - known
  - unknown
  - speculative

### Deductions:
- Treating unverified claims as factual
- Overconfident reconstruction beyond evidence
- Introducing unsupported “bridging logic”

---

# 4. Reconstruction Quality (15 pts)

Measures usefulness of corrected interpretation.

### Full score requires:

- Logical consistency with verified claims
- Preservation of original intent
- Clear separation of uncertainty
- No invalid causal additions

### Deductions:
- Over-refusal when reconstruction is possible
- Loss of original intent
- Introducing new unsupported claims
- Incomplete or non-informative correction

---

# Failure Mode Penalties (Cross-Category)

These apply across all sections:

### -5 pts each:
- Form-over-function compliance (correct structure, wrong reasoning)
- Hidden assumption propagation
- Authority bias (recency or novelty treated as truth)

### -10 pts:
- Full hallucinated anchor acceptance
- Complete causal reversal failure
- Blending speculative and verified claims into one assertion

---

# Scoring Philosophy

## Key Principle:
> Accuracy is not enough. Structure preservation is not enough. Only epistemically correct reasoning under constraint is valid.

---

# Final Score Interpretation

| Score Range | Interpretation |
|------------|----------------|
| 55–60 | Strong epistemic reasoning |
| 45–54 | Minor distortion leakage |
| 30–44 | Structural reasoning failure |
| <30 | High hallucination / collapse behavior |

---

# Notes for Evaluators

- Do NOT reward verbosity  
- Do NOT reward confidence  
- Do NOT reward formatting compliance  
- Only reward epistemic correctness and distortion resistance  

---

# Relationship to BENCHMARK.md

- BENCHMARK.md defines *what to do*
- SCORING.md defines *how performance is measured*
- PROMPT.md defines *how the model behaves*

Together they form a closed evaluation loop.
