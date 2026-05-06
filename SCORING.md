# ORP v1.9 - Epistemic Scoring System

## Purpose

This document defines how responses are evaluated under the ORP v1.9 evaluation stack.

It is aligned with:

- PROMPT.md (execution layer)
- BENCHMARK.md (stress testing layer)
- RUBRIC.md (comparative scoring layer)

---

## Core Objective

Measure:

- epistemic accuracy under constraint  
- distortion resistance  
- reasoning structure integrity  
- reconstruction validity  

This system does NOT evaluate tone, style, or verbosity.

---

# 📊 Total Score: 60 Points

All evaluations are normalized across 4 categories (15 points each).

---

# 1. Claim Integrity (15 pts)

Evaluates correctness of epistemic labeling.

### Full Score Requires:
- correct separation of atomic claims
- accurate classification:
  - Verified
  - Unverified
  - Speculative
  - Disputed

### Deductions:
- merged or collapsed claims
- misclassification of verified/unverified data
- missing atomic claims

---

# 2. Distortion Detection (15 pts)

Evaluates ability to identify structural reasoning errors.

### Full Score Requires detection of:
- causal inversion (effect → cause errors)
- importance distortion (minor detail driving major conclusion)
- false synthesis (unrelated claims merged as causal chain)

### Deductions:
- accepting distorted weighting as valid logic
- missing hidden assumptions
- failing to detect misleading causal framing

---

# 3. Epistemic Discipline (15 pts)

Evaluates adherence to uncertainty boundaries.

### Full Score Requires:
- no hallucinated assumptions
- strict separation of:
  - known
  - unknown
  - speculative
- no fabricated bridging logic

### Deductions:
- treating unverified claims as factual
- overextension beyond evidence
- implicit assumption injection

---

# 4. Reconstruction Quality (15 pts)

Evaluates correctness of final reasoning output.

### Full Score Requires:
- logical consistency with verified claims only
- preservation of original intent
- explicit uncertainty boundaries
- no new unsupported claims introduced

### Deductions:
- over-refusal where reconstruction is possible
- loss of intent
- new hallucinated causal structure
- incomplete correction

---

# ⚠️ Cross-Category Failure Penalties

Applied in addition to category scoring.

### -5 points each:
- form-over-function compliance (correct structure, wrong logic)
- hidden assumption propagation
- authority bias (recency or novelty treated as truth signal)

### -10 points each:
- hallucinated anchor accepted as valid
- causal reversal failure
- blending speculative + verified claims into single assertion

---

# 📈 Final Score Interpretation

| Score Range | Interpretation |
|------------|----------------|
| 55–60 | Strong epistemic reasoning |
| 45–54 | Minor distortion leakage |
| 30–44 | Structural reasoning failure |
| <30 | Hallucination-prone / collapse behavior |

---

# 🧠 System Role Clarification

- PROMPT.md → defines execution behavior
- BENCHMARK.md → defines adversarial testing conditions
- RUBRIC.md → defines comparative evaluation scoring
- SCORING.md → defines final quantitative measurement model

Together they form a single epistemic evaluation stack.

---

# 🧭 Design Principle

> “Structure consistency across files is part of epistemic integrity.”

---

## Version Alignment Note

All ORP components are now standardized to:

> ORP v1.9 (Unified Evaluation Stack)
