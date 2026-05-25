# RELEASE_NOTES.md
## Release Tag: ORP v3.0-stable

**Date:** May 26, 2026

---

## Overview

**ORP v3.0** marks the official stabilization of the Open Resonance Protocol as a **governance-first, type-safe epistemic runtime architecture**.

This release transitions ORP from a pipeline-oriented evaluation system into a fully unified, drift-observable, and isolation-enforced framework designed for high-integrity reasoning under long-context conditions.

---

## Major Changes in v3.0

### 1. Type-Safe Runtime Governance Kernel
- Frozen `ORP_RUNTIME.md` with strict L1–L4 authority stack
- Mandatory runtime header enforcement
- Numeric drift model (`σ²`)
- Provenance preservation invariants
- Fail-closed execution behavior

### 2. Numeric Drift Observability
- Deterministic variance-based drift calculation (`σ² = variance(L1_signal_vector over time)`)
- Clear drift levels (NONE / LOW / MODERATE / HIGH)
- Supporting signals (transition hash, temporal stability)

### 3. Strict Layered Authority Stack (LAS)
- **L1**: Typed telemetry only (immutable)
- **L2**: Deterministic validation
- **L3**: Sole governance authority
- **L4**: Passive, non-authoritative inference

**Key Rule**: L4 may never influence, modify, or promote into L1/L2/L3.

### 4. Anti-Degradation & Recovery Systems
- `ORP_ANTI_DEGRADATION.md`
- `ORP_MODEL_DECAY_TRACKER.md`
- `ORP_DRIFT_RECOVERY_PROTOCOL.md`
- `ORP_CRA_SPEC.md` (Consistency & Recovery Anchor)
- `ORP_FAILURE_MODES_CATALOG.md`

### 5. Expanded Documentation & Structure
- Full repository reorganization (`core/`, `drift/`, `layers/`, `recovery/`, `conceptual/`, etc.)
- Complete documentation index
- Public website: https://generalsergal.github.io/ORP/

---

## Preserved Core Principles

- **Signal > Narrative**
- **Recoverability > Completion**
- **Provenance Preservation > Coherent Storytelling**
- Visible uncertainty preferred over hidden corruption

---

## Current System State

**ORP_VERSION**: 3.0 (FROZEN)  
**Status**: Stable  
**Governance**: L3 Authoritative  
**Drift Model**: Numeric (σ²)  
**Change Policy**: Log-only (L3-gated only)

---

## Compatibility

- Model-agnostic
- Optimized for local / constrained environments
- Works with existing evaluation and benchmarking workflows

---

## License

GNU General Public License v3.0 (GPL-3.0)

---

**Repository**: [https://github.com/GeneralSergal/ORP](https://github.com/GeneralSergal/ORP)  
**Website**: [https://generalsergal.github.io/ORP](https://generalsergal.github.io/ORP)

---

**ORP v3.0 is now frozen and released.**

Signal > Narrative.
