# ORP_STATE_TRANSITION_MODEL
**SHS State Evolution & Transition Logic**

**Part of:** ORP v3.0 — Open Resonance Protocol

---

## Purpose

This document defines the formal rules governing **SHS (System Health State) transitions** over time.

It connects:
- σ² drift signals (observability layer)
- ORP_RUNTIME.md (L3 governance layer)
- runtime execution stability

It defines how system state evolves, stabilizes, and degrades.

---

## Core Principle

> SHS is a temporal state machine driven by σ² and governance intervention.

State changes are:
- deterministic where possible
- L3-controlled under high drift
- irreversible under catastrophic collapse conditions

---

## SHS State Space

| State | Meaning |
|------|--------|
| GREEN | Stable operation |
| YELLOW | Early drift detected |
| ORANGE | Structural degradation |
| RED | Critical instability |
| BLACK | Execution collapse / halt |

---

## Transition Driver

Primary driver:
- σ² (Sigma Squared Drift)

Secondary drivers:
- L3 governance intervention
- context instability (from ORP_CONTEXT_ACTIVATION_MATRIX)
- module conflict escalation

---

## Transition Rules

### GREEN → YELLOW
Triggered when:
- σ² crosses LOW threshold
- sustained upward drift trend detected

Condition:
- must persist for N evaluation cycles

---

### YELLOW → ORANGE
Triggered when:
- σ² enters MODERATE range
- OR contextual instability detected in HYBRID mode

---

### ORANGE → RED
Triggered when:
- σ² ≥ HIGH threshold
OR
- repeated failure mode activation detected
OR
- macro coherence breaks

---

### RED → BLACK
Triggered when:
- σ² extreme instability
OR
- recursive failure loop detected
OR
- governance inversion detected

Result:
- execution halt or hard constraint mode

---

## Recovery Rules

### ORANGE → YELLOW
Allowed if:
- σ² drops below threshold
- stability persists over time window

### YELLOW → GREEN
Allowed only if:
- σ² stabilizes at LOW/NONE
- no structural drift indicators remain

---

## Hard Lock Conditions

Once in RED/BLACK:

- RP layer is disabled
- CODE module is isolated
- only ORP_RUNTIME.md remains active

---

## σ² Integration Rule

σ² does NOT directly set SHS.

Instead:

> σ² is a probabilistic driver; SHS is a governed state.

L3 may override transitions.

---

## L3 GOVERNANCE OVERRIDE

ORP_RUNTIME.md may:

- force downgrade SHS
- freeze transitions
- delay state changes
- suppress escalation under controlled conditions

But cannot violate BLACK state lock.

---

## Stability Principle

> SHS changes must be explainable via σ² trajectory or explicit L3 intervention.

No hidden transitions allowed.

---

## System Behavior Model

σ² → evaluation window → transition evaluation → L3 validation → SHS update

---

## Status

Active State Transition Specification  
Part of ORP v3.0 Governance System

---

**End of Document**
