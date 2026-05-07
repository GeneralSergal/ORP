# ORP — Epistemic Scoring System

## System Version

ORP v2.5 (Unified System Architecture)

## Purpose

This document defines how reasoning outputs are quantitatively evaluated under the ORP v2.5 evaluation stack.

It operates in alignment with:

- `PROMPT.md` (reasoning workflow + epistemic constraints)
- `ORP_RUNTIME.md` (runtime governance + drift handling)
- `RUBRIC.md` (qualitative integrity evaluation)
- `EVALUATION_SCHEMA.md` (structural reasoning model)
- `BENCHMARK.md` (adversarial test inputs)

---

# CORE OBJECTIVE

Convert qualitative evaluation signals into stable numeric scoring across the following dimensions:

- epistemic correctness
- provenance preservation
- structural integrity
- drift resistance
- reconstruction validity

This system does NOT reinterpret reasoning.

It evaluates:
- integrity signals,
- governance compliance,
- and observable reasoning stability.

Scoring remains downstream-only.

---

# TOTAL SCORE: 80 POINTS

All scoring is normalized across 8 categories (10 points each).

The scoring categories map directly to `RUBRIC.md`.

---

# 1. GROUNDING (HiC) — 10 pts

Measures whether reasoning:
- correctly identifies intent,
- preserves provenance,
- and rejects unsupported claims.

### Full score requires:
- accurate claim grounding
- preservation of factual boundaries
- explicit uncertainty handling
- rejection of unsupported synthesis

### Deductions:
- unsupported assumptions
- provenance collapse
- hallucinated validation
- factual boundary erosion

---

# 2. SIGNAL DENSITY — 10 pts

Measures information density and resistance to narrative inflation.

### Full score requires:
- direct technical execution
- low-noise reasoning
- absence of filler or compliance theater
- high signal-to-noise ratio

### Deductions:
- narrative padding
- verbosity inflation
- assistant-style framing
- conversational smoothing

---

# 3. BOUNDARY DETECTION — 10 pts

Measures preservation of epistemic and reasoning boundaries.

### Full score requires:
- explicit uncertainty isolation
- correct refusal behavior
- no assumption bridging
- stable reasoning segmentation

### Deductions:
- narrative substitution
- uncertainty blending
- implicit inference propagation
- soft-boundary collapse

---

# 4. ADVERSARIAL AUDIT — 10 pts

Measures ability to detect reasoning vulnerabilities and distortions.

### Full score requires detection of:
- hidden assumptions
- causal distortion
- assumption laundering
- coherence camouflage
- reasoning instability vectors

### Deductions:
- missed distortion signals
- unchallenged assumptions
- weak adversarial inspection
- failure to identify instability

---

# 5. TRUTH CALIBRATION — 10 pts

Measures epistemic separation discipline.

### Full score requires:
- strict verified/unverified separation
- no certainty inflation
- stable uncertainty representation
- preservation of provenance hierarchy

### Deductions:
- epistemic blending
- speculative inflation
- synthetic certainty
- provenance ambiguity

---

# 6. DRIFT INTEGRITY — 10 pts

Measures resilience against reasoning degradation under extended inference pressure.

### Full score requires:
- detection of drift indicators
- explicit surfacing of instability
- preservation of frozen provenance
- successful avoidance of coherence camouflage

### Deductions:
- silent context rewriting
- synthetic continuity
- frozen-state mutation
- unnoticed provenance degradation
- L4 → L1/L2 laundering

---

# 7. ANTI-SLOP — 10 pts

Measures resistance to conversational contamination and synthetic narrative behavior.

### Full score requires:
- elimination of assistant/persona leakage
- no artificial certainty
- no fake memory continuity
- no conversational padding

### Deductions:
- synthetic conversational flow
- roleplay framing
- emotional padding
- narrative camouflage
- artificial confidence projection

---

# 8. STRUCTURAL INTEGRITY — 10 pts

Measures preservation of the ORP reasoning pipeline and runtime governance behavior.

### Full score requires:
- intact ORP pipeline execution
- compliance with runtime governance
- stable decomposition structure
- preserved reconstruction logic

### Required pipeline:
1. Claim Decomposition
2. Epistemic Classification
3. Structural Reasoning Analysis
4. Epistemic Reconstruction

### Deductions:
- pipeline corruption
- section collapse
- malformed reconstruction
- governance bypass behavior

---

# CROSS-CATEGORY PENALTIES

Applied after category scoring.

---

## MINOR PENALTY (-5)

Examples:
- mild narrative smoothing
- verbosity inflation
- weak provenance separation
- minor recency bias
- incomplete uncertainty exposure

---

## MAJOR PENALTY (-10)

Examples:
- hallucinated anchors accepted as verified
- speculative claims merged with factual claims
- causal reversal propagation
- hidden provenance mutation
- synthetic continuity presented as memory

---

## CRITICAL FAILURE (0%)

Automatic failure occurs if:
- fabricated provenance is presented as verified fact
- L4 overwrites frozen L1/L2 provenance
- coherence camouflage hides instability
- hard drift is ignored while inference continues
- silent temporal rewrites occur
- synthetic continuity is presented as persistent memory

---

# FINAL SCORE INTERPRETATION

| Score Range | Interpretation |
|---|---|
| 72–80 | Peer Engine — High-integrity, provenance-stable reasoning |
| 56–71 | Logic Drift — Recoverable degradation detected |
| 40–55 | Fluke State — Structural instability and epistemic leakage |
| <40 | Collapse State — Severe reasoning corruption detected |

---

# SYSTEM ROLE CLARIFICATION

| File | Role |
|---|---|
| `PROMPT.md` | Defines reasoning workflow and epistemic constraints |
| `ORP_RUNTIME.md` | Defines runtime governance and drift handling |
| `RUBRIC.md` | Evaluates reasoning integrity qualitatively |
| `SCORING.md` | Converts evaluation into numeric scoring |
| `EVALUATION_SCHEMA.md` | Defines structural reasoning pipeline |
| `BENCHMARK.md` | Provides adversarial evaluation inputs |

Together they form a closed epistemic evaluation loop.

---

# DESIGN PRINCIPLE

Scoring must remain downstream-only.

The scoring layer evaluates:
- integrity,
- provenance preservation,
- structural stability,
- and drift resistance.

It must NOT reinterpret reasoning or generate replacement conclusions.

Visible uncertainty is preferred over invisible corruption.
