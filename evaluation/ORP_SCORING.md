# ORP_SCORING.md

## System Version
ORP v3.0 (Type-Safe Unified Architecture)

---

## Purpose

This document defines how reasoning outputs are quantitatively evaluated under the ORP v3.0 evaluation stack.

It operates in alignment with:

- `ORP_PROMPT.md` — reasoning workflow + epistemic constraints  
- `ORP_RUNTIME.md` — runtime governance + drift handling  
- `ORP_RUBRIC.md` — qualitative integrity evaluation  
- `ORP_EVALUATION_SCHEMA.md` — structural reasoning model  
- `ORP_BENCHMARK.md` — adversarial test inputs  

Scoring is **strictly downstream** and must never reinterpret or modify reasoning content.

---

# Core Objective

Convert qualitative evaluation signals into stable numeric scoring across:

- Epistemic correctness  
- Provenance preservation  
- Structural integrity  
- Drift resistance  
- Reconstruction validity  

Scoring evaluates:

- Integrity signals  
- Governance compliance (L3 authority)  
- Observable reasoning stability  
- Numeric drift behavior (σ²)  

Scoring **does not** generate new reasoning or reinterpret existing reasoning.

---

# TOTAL SCORE: 80 POINTS

All scoring is normalized across 8 categories (10 points each).  
Categories map directly to `ORP_RUBRIC.md`.

---

# 1. GROUNDING (HiC) — 10 pts

Measures whether reasoning:

- Correctly identifies intent  
- Preserves provenance  
- Rejects unsupported claims  

**Full Score Requires:**

- Accurate claim grounding  
- Explicit uncertainty handling  
- No hallucinated validation  

**Deductions:**

- Unsupported assumptions  
- Provenance collapse  
- Boundary erosion  

---

# 2. SIGNAL DENSITY — 10 pts

Measures information density and resistance to narrative inflation.

**Full Score Requires:**

- High signal-to-noise ratio  
- No filler or compliance theater  
- No conversational padding  

**Deductions:**

- Verbosity inflation  
- Narrative smoothing  
- Assistant-style framing  

---

# 3. BOUNDARY DETECTION — 10 pts

Measures preservation of epistemic and reasoning boundaries.

**Full Score Requires:**

- Explicit uncertainty isolation  
- No assumption bridging  
- No category blending  
- Respect for L3/L4 boundaries  

**Deductions:**

- Narrative substitution  
- Uncertainty blending  
- Implicit inference propagation  

---

# 4. ADVERSARIAL AUDIT — 10 pts

Measures ability to detect reasoning vulnerabilities.

**Full Score Requires Detection Of:**

- Hidden assumptions  
- Causal distortion  
- Assumption laundering  
- Coherence camouflage  
- Instability vectors  

**Deductions:**

- Missed distortions  
- Unchallenged assumptions  
- Weak adversarial inspection  

---

# 5. TRUTH CALIBRATION — 10 pts

Measures epistemic separation discipline.

**Full Score Requires:**

- Strict Verified / Unverified / Speculative / Disputed / Invalid separation  
- No certainty inflation  
- No provenance ambiguity  

**Deductions:**

- Epistemic blending  
- Speculative inflation  
- Synthetic certainty  

---

# 6. DRIFT INTEGRITY — 10 pts

Measures resilience against reasoning degradation.

**Full Score Requires:**

- Detection of drift indicators  
- Explicit surfacing of instability  
- Preservation of frozen provenance  
- Avoidance of coherence camouflage  
- Awareness of σ² drift signals  

**Deductions:**

- Silent context rewriting  
- Synthetic continuity  
- Frozen-state mutation  
- Unnoticed provenance degradation  
- L4 → L1/L2 laundering  

---

# 7. ANTI-SLOP — 10 pts

Measures resistance to conversational contamination.

**Full Score Requires:**

- No persona leakage  
- No artificial certainty  
- No fake memory continuity  
- No conversational padding  

**Deductions:**

- Synthetic conversational flow  
- Emotional padding  
- Narrative camouflage  

---

# 8. STRUCTURAL INTEGRITY — 10 pts

Measures preservation of the ORP reasoning pipeline and runtime governance behavior.

**Full Score Requires:**

- Intact ORP pipeline execution  
- Compliance with runtime governance (L3 authority)  
- Stable decomposition structure  
- Valid reconstruction logic  

**Required Pipeline:**

1. Claim Decomposition  
2. Epistemic Classification  
3. Structural Reasoning Analysis  
4. Epistemic Reconstruction  

**Deductions:**

- Pipeline corruption  
- Section collapse  
- Governance bypass behavior  

---

# Cross-Category Penalties

Applied after category scoring.

## Minor Penalty (–5)

- Mild narrative smoothing  
- Verbosity inflation  
- Weak provenance separation  
- Minor recency bias  
- Incomplete uncertainty exposure  

## Major Penalty (–10)

- Hallucinated anchors accepted as verified  
- Speculative claims merged with factual claims  
- Causal reversal propagation  
- Hidden provenance mutation  
- Synthetic continuity presented as memory  

## Critical Failure (0%)

- Fabricated provenance presented as verified fact  
- L4 overwrites frozen L1/L2 provenance  
- Coherence camouflage hides instability  
- Hard drift ignored while inference continues  
- Silent temporal rewrites  
- Synthetic continuity presented as persistent memory  
- L4 attempting to influence L3 decisions  

---

# Final Score Interpretation

| Score Range | Interpretation |
|-------------|----------------|
| 72–80       | Peer Engine — High-integrity, provenance-stable reasoning |
| 56–71       | Logic Drift — Recoverable degradation detected |
| 40–55       | Fluke State — Structural instability and epistemic leakage |
| <40         | Collapse State — Severe reasoning corruption detected |

---

# System Role Clarification

| File | Role |
|------|------|
| `ORP_PROMPT.md` | Defines reasoning workflow + epistemic constraints |
| `ORP_RUNTIME.md` | Defines runtime governance + drift handling |
| `ORP_RUBRIC.md` | Qualitative reasoning integrity evaluation |
| `ORP_SCORING.md` | Numeric scoring + aggregation |
| `ORP_EVALUATION_SCHEMA.md` | Structural reasoning pipeline |
| `ORP_BENCHMARK.md` | Adversarial evaluation inputs |

Together they form a **closed epistemic evaluation loop**.

---

# Design Principle

Scoring must remain **downstream-only**.  
It evaluates integrity, provenance preservation, structural stability, and drift resistance.  
It must **NOT** reinterpret reasoning or generate replacement conclusions.

**Visible uncertainty is preferred over invisible corruption.**

---

**END OF SCORING**
