# ORP_SIGMA_SQUARED_DRIFT.md

## System Version
ORP v3.0 (Type-Safe Unified Architecture)

---

## Purpose

This document defines the **σ² Drift Model**, the numeric core of drift detection and observability in ORP v3.0.

It provides the **only authoritative quantitative definition** of drift used by:

- `ORP_RUNTIME.md` (L3 governance kernel)  
- `ORP_EVALUATION_SCHEMA.md` (structural contract)  
- `ORP_RUBRIC.md` (qualitative drift integrity)  
- `ORP_SCORING.md` (quantitative drift scoring)  
- `ORP_MODEL_DECAY_TRACKER.md` (L4 observational diagnostics)  

This file is **L4 observational**, but its definitions are consumed by L3.

---

# 1. Definition

**σ² (Sigma Squared)** is the **variance** of the L1 typed signal vector over time.

```math
\sigma^2 = \mathrm{Var}(L1\_signal\_vector_{t_0 \dots t_n})
```

It is the **primary numeric indicator** of:

- reasoning degradation  
- epistemic instability  
- provenance drift  
- L4 leakage into higher authority layers  

---

# 2. Why σ²?

Transformer systems exhibit **probabilistic drift** under:

- long-context pressure  
- semantic dilution  
- narrative smoothing  
- coherence camouflage  

Stylistic coherence often persists while provenance degrades.

σ² provides a **deterministic, observable, non‑narrative** signal of degradation.

---

# 3. How σ² Is Computed (L3 Governed)

### Step 1 — L1 Signal Ingestion  
L1 contains only typed telemetry:

- Float ∈ [0.0, 1.0]  
- Bounded Integer  
- Boolean  

No strings.  
No narrative fields.

### Step 2 — Time‑Windowed Vector  
L3 maintains a rolling history of L1 signals.

### Step 3 — Variance Calculation  
Variance is computed across the time window.  
Higher variance = higher instability.

### Step 4 — Drift Level Mapping (L3 Authority)

| Drift Level | σ² Range | Meaning |
|-------------|----------|---------|
| NONE        | < 0.01   | Fully stable |
| LOW         | 0.01–0.05 | Early smoothing / minor degradation |
| MODERATE    | 0.05–0.15 | Notable instability |
| HIGH        | ≥ 0.15   | Critical degradation |

These thresholds are **canonical** and must not be altered.

---

# 4. What σ² Measures

σ² captures:

- signal inconsistency over time  
- deviation from frozen provenance  
- uncertainty collapse  
- narrative override of structural constraints  
- L4 inference leaking into L1/L2 form  
- temporal instability in reasoning  

It is **not** a stylistic metric.  
It is a **numeric governance signal**.

---

# 5. Relationship to Other Components

### `ORP_RUNTIME.md` (L3 Kernel)
- Uses σ² to determine SHS transitions  
- Freezes branches on high drift  
- Enforces fail‑closed behavior  

### `ORP_RUBRIC.md`
- Drift Integrity category references σ² explicitly  

### `ORP_SCORING.md`
- Numeric drift penalties derived from σ²  

### `ORP_MODEL_DECAY_TRACKER.md`
- Logs drift patterns but cannot influence σ²  

### `ORP_ANTI_DEGRADATION.md`
- Provides mitigation strategies but cannot modify σ²  

### `ORP_EVALUATION_SCHEMA.md`
- Uses σ² to detect structural drift and provenance degradation  

---

# 6. SHS Integration

σ² is the **primary quantitative driver** of SHS transitions.

| SHS | σ² Influence | Meaning |
|-----|--------------|---------|
| GREEN | σ² stable | Normal operation |
| YELLOW | σ² rising | Early drift indicators |
| ORANGE | σ² moderate | Degradation detected |
| RED | σ² high | Hard drift; bounded inference only |
| BLACK | σ² extreme | Context collapse; inference halted |

SHS transitions are **L3‑only**.

---

# 7. Drift Governance Rules

- σ² must be computed deterministically  
- L4 cannot modify σ²  
- L4 cannot reinterpret drift levels  
- σ² cannot be smoothed, averaged, or narratively reframed  
- σ² must remain observable and serialized in governance output  

Any attempt to obscure σ² constitutes:

- provenance corruption  
- drift concealment  
- governance violation  

---

# 8. Practical Implications

### Low σ²  
- High recoverability  
- Stable GREEN SHS  
- Minimal governance intervention  

### Rising σ²  
- Early warning  
- Increased L3 vigilance  
- Potential SHS downgrade  

### High σ²  
- Hard drift  
- Branch freezing  
- L4 inference halted  
- Provenance restoration required  

---

# 9. Design Philosophy

> **Visible uncertainty is preferred over invisible corruption.**

σ² transforms subjective drift into **objective, measurable governance signals**.

It is the numeric backbone of ORP’s fault‑observable reasoning architecture.

---

**STATUS: FROZEN**  
**END OF SIGMA SQUARED DRIFT MODEL**
