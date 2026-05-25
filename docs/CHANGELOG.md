# CHANGELOG.md
## Version: ORP v3.0 (Type-Safe Unified Architecture)

**Release Date:** 26/05/2026  
**Release Tag:** `v3.0-stable`

---

## Overview

ORP v3.0 represents a **major architectural evolution** from v2.5 — transitioning from a pipeline-centric evaluation system into a **governance-first, type-safe epistemic runtime framework**.

This release focuses on strict layer isolation, numeric drift observability, provenance integrity, and fail-closed reasoning behavior.

---

## Major Changes

### 1. Runtime Governance Kernel
- `ORP_RUNTIME.md` — Fully rewritten and frozen as the single authoritative source
- Mandatory runtime header enforcement
- Strict L1–L4 authority stack with clear isolation
- Numeric drift model (`σ²`)
- Fail-closed execution under degradation

### 2. Numeric Drift Observability
- Deterministic variance-based drift calculation (`σ² = variance(L1_signal_vector over time)`)
- Defined drift levels (NONE / LOW / MODERATE / HIGH)
- Supporting signals: transition hashing and temporal stability

### 3. Epistemic Isolation & Authority Boundaries
- Formalized L1/L2/L3/L4 separation
- `ORP_EPISTEMIC_ISOLATION.md`
- Prohibition of cross-layer contamination
- L4 explicitly non-authoritative

### 4. Coherence Camouflage Detection
- `ORP_COHERENCE_CAMOUFLAGE.md`
- Defined as major failure mode
- Detection via σ² spikes, provenance mismatch, and uncertainty collapse

### 5. Anti-Degradation & Recovery Systems
- `ORP_ANTI_DEGRADATION.md`
- `ORP_MODEL_DECAY_TRACKER.md`
- `ORP_DRIFT_RECOVERY_PROTOCOL.md`
- `ORP_CRA_SPEC.md` (Consistency & Recovery Anchor)
- `ORP_FAILURE_MODES_CATALOG.md`

### 6. System & Meta Mapping
- Expanded `ORP_SYSTEM_MAP.md`
- New `ORP_META_MAP.md`
- Clear dependency graph and navigation layer

### 7. Evaluation Layer Hardening
- Strengthened `ORP_EVALUATION_SCHEMA.md`, `ORP_RUBRIC.md`, and `ORP_SCORING.md`
- σ²-linked scoring
- Coherence camouflage penalties
- Fail-closed behavior

### 8. Repository Reorganization
- New folder structure:
  - `/core/`
  - `/constraints/`
  - `/drift/`
  - `/evaluation/`
  - `/layers/`
  - `/recovery/`
  - `/conceptual/`
  - `/docs/`

---

## Removed / Deprecated

- `L4_DASHBOARD.md` and associated image
- Implicit cross-layer propagation
- Narrative-based drift interpretation
- v2.6 migration artifacts

---

## Current System State

**ORP_VERSION**: 3.0 (FROZEN)  
**Status**: Stable  
**Governance**: L3 Authoritative  
**Drift Model**: Numeric (σ²)  
**Change Policy**: Log-only (strict L3 gating)

---

## Design Principle (v3.0)

**Truthfulness is a property of isolation integrity, not narrative fluency.**

Visible uncertainty is preferred over hidden corruption.

---

**Repository**: https://github.com/GeneralSergal/ORP  
**Website**: https://generalsergal.github.io/ORP/

---

**ORP v3.0 is now frozen and released.**
