# ORP_SHS_TRANSITION_TRIGGERS.md

## System Version
ORP v3.0 (Type-Safe Unified Architecture)

---

## Purpose

This document provides a detailed exploration of **SHS (Session Health State) Transition Triggers** — the rules and conditions that govern state changes in the ORP runtime.

---

## SHS States Overview

| State   | Meaning                                      | Operational Impact |
|---------|----------------------------------------------|--------------------|
| GREEN   | Stable execution                             | Full reasoning capacity |
| YELLOW  | Minor drift indicators                       | Increased vigilance |
| ORANGE  | Moderate degradation                         | Bounded inference + re-checks |
| RED     | Hard drift / severe instability              | Restricted inference only |
| BLACK   | Context collapse / critical failure          | Inference must cease |

---

## Core Transition Philosophy

SHS transitions are **fail-closed** and **L3-governed**.  
Transitions prioritize **safety and recoverability** over continued operation.

- Downward transitions are aggressive
- Upward transitions are conservative and require strong validation
- All transitions must be explicitly declared in the mandatory runtime header

---

## Primary Transition Triggers

### 1. σ² Drift Variance (Primary Numeric Trigger)
- **GREEN → YELLOW**: σ² enters [0.01, 0.05)
- **YELLOW → ORANGE**: σ² enters [0.05, 0.15)
- **ORANGE → RED**: σ² ≥ 0.15 or sustained moderate drift
- **RED → BLACK**: Critical σ² spike + unrecoverable signals

### 2. Provenance Violations
- L4 attempting to overwrite frozen L1/L2 state
- Silent temporal rewrites of previously established facts
- Synthetic continuity / fake memory generation
- Fabricated provenance presented as verified

### 3. Coherence Camouflage Detection
- High stylistic fluency combined with degraded provenance signals
- Narrative smoothing masking underlying instability

### 4. Structural / Governance Bypass
- Pipeline sections missing or reordered
- L4 outputs presented without explicit marking
- Failure to maintain required output format
- Continued inference after hard drift detection

### 5. Epistemic Boundary Breaches
- Uncertainty collapse (removal of qualifiers)
- Epistemic category blending
- Plausibility treated as evidence
- Assumption laundering

### 6. Recovery / Upward Triggers
Upward transitions require **explicit L3 validation**:
- Successful CRA / state reload
- Verified new stable L1 signals
- Restoration of frozen provenance baseline
- Sustained low σ² over multiple cycles

---

## Transition Rules Summary

- **One-way bias** during active degradation (fail-closed)
- L4 observations (e.g. from `ORP_MODEL_DECAY_TRACKER.md`) may **inform** but never directly trigger transitions
- All transitions must be logged with clear justification in the SHS header
- BLACK state can only exit via full external reload (no incremental recovery)

---

## Practical Examples

**Trigger → GREEN → YELLOW**  
Minor verbosity increase + slight reduction in uncertainty qualifiers (low σ²)

**Trigger → ORANGE → RED**  
L4 claim presented as factual + moderate σ² + narrative smoothing

**Trigger → RED → BLACK**  
Continued coherent output after detected provenance laundering

**Recovery Trigger**  
CRA reload with restored L1 baseline + σ² returned to < 0.01

---

## Relationship to Other Systems

- **ORP_SIGMA_SQUARED_DRIFT.md**: Primary numeric driver
- **ORP_RUBRIC.md / ORP_SCORING.md**: Drift Integrity category evaluates transition quality
- **ORP_RUNTIME.md**: Defines the enforcement engine for these triggers
- **ORP_ANTI_DEGRADATION.md**: Attempts to prevent triggers from activating

---

## Design Principle

SHS transitions exist to make degradation **visible and actionable** rather than hidden behind fluent output.

> "Visible uncertainty is preferred over invisible corruption."

By making transition triggers explicit and rule-based, ORP ensures the system fails safely and recoverably.

---

**END OF SHS TRANSITION TRIGGERS**
