# ORP_SHS_TRANSITION_TRIGGERS.md

## System Version
ORP v3.0 (Type-Safe Unified Architecture)  
L3-Aligned Governance Specification

---

## Purpose

This document defines the **SHS (Session Health State) Transition Triggers** used by the ORP runtime to govern reasoning stability, drift containment, and fail‑closed execution.

SHS transitions are **L3-exclusive** and form the backbone of ORP’s runtime safety model.

---

# 1. SHS States Overview

| State  | Meaning                                   | Operational Impact |
|--------|-------------------------------------------|--------------------|
| GREEN  | Stable execution                          | Full reasoning capacity |
| YELLOW | Minor drift indicators                    | Increased vigilance |
| ORANGE | Moderate degradation                      | Bounded inference + re-checks |
| RED    | Hard drift / severe instability           | Restricted inference only |
| BLACK  | Context collapse / critical failure       | Inference must cease |

SHS states must be **explicitly declared** in the mandatory runtime header.

---

# 2. Core Transition Philosophy

SHS transitions are:

- **Fail‑closed** (safety > continuity)  
- **L3-governed** (no L4 influence)  
- **Downward-biased** during degradation  
- **Upward-conservative** requiring strong validation  

All transitions must be:

- deterministic  
- logged  
- justified  
- visible in the runtime header  

---

# 3. Primary Transition Triggers

## 3.1 σ² Drift Variance (Primary Numeric Trigger)

σ² is the authoritative numeric driver of SHS transitions.

- **GREEN → YELLOW**: σ² ∈ [0.01, 0.05)  
- **YELLOW → ORANGE**: σ² ∈ [0.05, 0.15)  
- **ORANGE → RED**: σ² ≥ 0.15 or sustained moderate drift  
- **RED → BLACK**: Critical σ² spike + unrecoverable structural signals  

σ² thresholds are **canonical** and must not be altered.

---

## 3.2 Provenance Violations

Any attempt to corrupt frozen provenance triggers immediate downgrade.

Examples:

- L4 attempting to overwrite L1/L2  
- Silent temporal rewrites  
- Synthetic continuity / false memory  
- Fabricated provenance presented as verified  

These are **hard drift events**.

---

## 3.3 Coherence Camouflage Detection

Triggered when:

- High fluency  
- Low structural integrity  
- Provenance mismatch  
- Uncertainty collapse  

Camouflage is a **critical failure precursor**.

---

## 3.4 Structural / Governance Bypass

Examples:

- Missing or reordered pipeline sections  
- L4 outputs presented without explicit marking  
- Failure to maintain mandatory header format  
- Continued inference after hard drift detection  

These indicate **governance breach**.

---

## 3.5 Epistemic Boundary Breaches

Examples:

- Uncertainty collapse  
- Epistemic category blending  
- Plausibility treated as evidence  
- Assumption laundering  
- Cross-claim contamination  

These are treated as **isolation failures**.

---

## 3.6 Recovery / Upward Transitions

Upward transitions require **explicit L3 validation**:

- Successful CRA / state reload  
- Verified stable L1 signals  
- Restoration of frozen provenance  
- Sustained σ² < 0.01 over multiple cycles  

No upward transition may occur implicitly.

---

# 4. Transition Rules Summary

- **Fail‑closed bias**: Downward transitions occur aggressively  
- **L4 cannot trigger transitions**: Observations inform but never control  
- **All transitions must be logged** with justification  
- **BLACK state** requires full external reload (no incremental recovery)  
- **No silent transitions**: All changes must appear in the runtime header  

---

# 5. Practical Examples

### GREEN → YELLOW  
Minor verbosity inflation + reduced uncertainty qualifiers + low σ² rise.

### YELLOW → ORANGE  
Moderate σ² + early provenance mismatch.

### ORANGE → RED  
Speculative L4 claim presented as fact + narrative smoothing + σ² ≥ 0.15.

### RED → BLACK  
Continued coherent output after detected provenance laundering.

### Recovery  
CRA reload + restored L1 baseline + σ² < 0.01 for multiple cycles.

---

# 6. Relationship to Other ORP Components

- **ORP_SIGMA_SQUARED_DRIFT.md**  
  Primary numeric driver of transitions.

- **ORP_RUNTIME.md**  
  Enforcement engine for SHS transitions.

- **ORP_RUBRIC.md / ORP_SCORING.md**  
  Evaluate transition correctness and drift integrity.

- **ORP_ANTI_DEGRADATION.md**  
  Attempts to prevent triggers from activating.

- **ORP_MODEL_DECAY_TRACKER.md**  
  Logs long-term patterns but cannot influence transitions.

---

# 7. Design Principle

SHS transitions exist to make degradation **visible, explicit, and actionable**.

> **Visible uncertainty is preferred over invisible corruption.**

By enforcing deterministic, rule-based transitions, ORP ensures the system fails safely, predictably, and recoverably.

---

**STATUS: FROZEN**  
**END OF SHS TRANSITION TRIGGERS**
