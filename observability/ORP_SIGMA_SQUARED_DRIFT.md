# ORP_SIGMA_SQUARED_DRIFT.md

## System Version
ORP v3.0 (Type-Safe Unified Architecture)

---

## Purpose

This document provides a detailed exploration of the **σ² Drift Model** — the numeric core of drift detection and observability in ORP v3.0.

---

## Definition

**σ² (Sigma Squared)** represents the **variance** of the L1 typed signal vector over time.

```math
\sigma^2 = \text{variance}(L1\_signal\_vector_{t_0 \dots t_n})
```

It serves as the primary quantitative measure of **reasoning degradation** and **epistemic instability** during runtime.

---

## Why σ²?

Transformers exhibit **probabilistic drift** under context pressure. Stylistic coherence often persists while factual/provenance integrity degrades (coherence camouflage).

σ² provides a **deterministic, observable signal** instead of relying solely on heuristic judgment.

---

## How σ² Drift is Computed (L3 Governed)

1. **L1 Signal Ingestion**  
   Raw telemetry is normalized into typed signals only (Float [0.0-1.0], Integer, Boolean).

2. **Time-Windowed Vector**  
   Maintain a rolling history of L1 signals.

3. **Variance Calculation**  
   Compute statistical variance across the vector. Higher variance = higher instability.

4. **Drift Level Mapping**
   - **NONE**: σ² < 0.01 → Fully stable
   - **LOW**: 0.01 ≤ σ² < 0.05 → Early smoothing / minor degradation
   - **MODERATE**: 0.05 ≤ σ² < 0.15 → Notable instability
   - **HIGH**: σ² ≥ 0.15 → Critical degradation

---

## What σ² Actually Measures

- Signal inconsistency over time
- Provenance deviation from frozen baseline
- Uncertainty collapse
- Narrative override of structural constraints
- L4 leakage into higher authority layers

---

## Relationship to Other Components

- **SHS Transitions**: Primary trigger for downgrades
- **ORP_RUBRIC.md & ORP_SCORING.md**: Directly referenced in Drift Integrity
- **ORP_MODEL_DECAY_TRACKER.md**: Feeds observational patterns
- **ORP_ANTI_DEGRADATION.md**: Aims to minimize σ²
- **LAS Enforcement**: High σ² often flags L4 overreach

---

## Practical Implications

- **Low σ²** → High recoverability, stable GREEN SHS
- **Rising σ²** → Early warning, increased L3 vigilance
- **High σ²** → SHS downgrade + branch freezing

---

## Design Philosophy

> "Visible uncertainty is preferred over invisible corruption."

By making drift numeric and measurable, ORP turns subjective degradation into observable governance.

---

**END OF SIGMA SQUARED DRIFT MODEL**
