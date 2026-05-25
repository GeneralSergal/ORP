<p align="center">
  <img src="https://github.com/GeneralSergal/ORP/actions/workflows/orp-ci.yml/badge.svg" alt="ORP v3.0 Integrity Suite">
  <img src="https://img.shields.io/badge/ORP-v3.0-blue" alt="ORP Version">
  <img src="https://img.shields.io/github/license/GeneralSergal/ORP" alt="License">
  <img src="https://img.shields.io/badge/status-active-success" alt="Status">
  <img src="https://img.shields.io/badge/SHS-5--State-green" alt="SHS Model">
  <img src="https://img.shields.io/badge/LAS-L1→L4-orange" alt="Layered Authority">
  <img src="https://img.shields.io/badge/Drift-σ²%20Numeric-purple" alt="Drift Model">
</p>

<h1 align="center">ORP — Open Resonance Protocol v3.0</h1>

<p align="center">
  A governance-first epistemic integrity framework.<br>
  <strong>Signal > Narrative · Recoverability > Completion · Provenance > Coherence</strong>
</p>

**Live Website**: [https://generalsergal.github.io/ORP/](https://generalsergal.github.io/ORP/)

---

## Core Directive

**Signal > Narrative**  
**Recoverability > Completion**  
**Provenance Preservation > Coherent Storytelling**

A coherent output with corrupted provenance constitutes a **critical failure**.

---

## Mandatory Runtime Header (v3.0)

All ORP-compliant outputs **must** begin with:

```text
[SHS: GREEN | YELLOW | ORANGE | RED | BLACK]
[DRIFT: NONE | LOW | MODERATE | HIGH]
[CRA: VALID | DEGRADED | UNKNOWN]
[LAS: L1 | L2 | L3 | L4]
```

No preamble may precede this header.

---

## System Architecture (v3.0)

### Core Authority Chain

<details>
<summary>Core Authority Chain Diagram</summary>

```mermaid
flowchart TD
    IN[INPUT] --> L1[L1: Observed Data<br/>Typed Signals Only]
    L1 --> L2[L2: Verified Interpretation<br/>Deterministic Validation]
    L2 --> L3[L3: Governance Core<br/>Authority Layer]
    L3 --> OUT[OUTPUT]
```
</details>

### L4 Non-Authoritative Subsystem

<details>
<summary>L4 Non-Authoritative Subsystem Diagram</summary>

```mermaid
flowchart TD
    L3[L3: Governance Core] --> OUT[OUTPUT]
    L4[L4: Internal Inference<br/>Non-Authoritative] --> OUT

    L4 -. cannot modify .-> L3
    L4 -. no access .-> L1[L1: Observed Data]
```
</details>

### Governance + Drift Loop

<details>
<summary>Governance + Drift Loop Diagram</summary>

```mermaid
flowchart TD
    L1[L1 Signal Stream] --> L2[L2 Validation]
    L2 --> L3[L3 Governance Core]
    L1 --> SIGMA[σ² Drift Computation]
    SIGMA --> SHS[SHS State Engine]
    SHS --> L3
```
</details>

### Session Health State (SHS)

<details>
<summary>Session Health State (SHS) Diagram</summary>

```mermaid
stateDiagram-v2
    [*] --> GREEN
    GREEN --> YELLOW
    YELLOW --> ORANGE
    ORANGE --> RED
    RED --> BLACK

    GREEN: Stable
    YELLOW: Early Drift
    ORANGE: Degraded
    RED: Restricted Inference
    BLACK: Halt State
```
</details>

---

## Layer Definitions

**L1 — Observed Data Layer**  
Typed signals only. Immutable once committed. No narrative allowed.

**L2 — Verified Interpretation Layer**  
Deterministic validation, schema enforcement, anomaly tagging.

**L3 — Governance Layer (Authority Core)**  
Sole authority for state transitions, invariants, and system integrity.

**L4 — Internal Inference Layer**  
Probabilistic reasoning only. Non-authoritative. Cannot access raw L1 or override L3.

---

## Invariants

- L1 accepts only typed signals: `Float ∈ [0.0, 1.0]`, bounded Integer, Boolean
- L1 states are immutable once committed
- L2 operates exclusively on validated L1 data
- L3 is the sole authority layer
- L4 cannot promote inference into factual form
- Drift must be computed numerically (`σ²`)
- Provenance must be preserved end-to-end

---

## Drift Model (Numeric Core)

**σ² = variance(L1_signal_vector over time)**

### Drift Levels
- **NONE**: σ
² < 0.01  
- **LOW**: 0.01 ≤ σ² < 0.05  
- **MODERATE**: 0.05 ≤ σ² < 0.15  
- **HIGH**: σ² ≥ 0.15  

---

## Execution Pipeline

<details>
<summary>Execution Pipeline Diagram</summary>

```mermaid
flowchart TD
    A[INPUT] --> B[L1 Typed Signals]
    B --> C[L2 Validation]
    C --> D[L3 Governance]
    D --> E[OUTPUT]
    D --> F[L4 Inference]
    F --> E
```
</details>

---

## Failure Conditions

- L4 influencing L3
- Untyped L1 data
- Silent schema mutation
- Invalid state promotion
- Drift concealment via narrative smoothing
- Loss of provenance continuity

---

## Failure Response Protocol

1. Downgrade SHS
2. Freeze L1 stream
3. Recompute L2 snapshot
4. Halt L4 inference
5. Restore last valid L3 state

---

## Controlled Expansion Policy

Expansion is **cyclical only**.  
Requires: Drift = NONE, L3 validation success, intact provenance, stable recovery path.

---

## Repository Structure

```text
/core/           # Runtime & Architecture
/constraints/    # Prompts & Anti-Degradation
/drift/          # Drift & Decay Tracking
/evaluation/     # Schemas, Rubrics & Scoring
/layers/         # Layer Schemas
/recovery/       # Recovery & CRA
/conceptual/     # Conceptual Models
/docs/           # Documentation
```

---

## Compliance Requirements

A system is ORP v3.0-compliant only if it enforces:
- Strict L1 typing
- Deterministic L2 validation
- Isolated L3 authority
- Non-authoritative L4
- Numeric drift computation
- Mandatory runtime header
- End-to-end provenance preservation

---

## Operational Philosophy

- Typed signals over narrative
- Drift visibility over coherence
- Governance correctness over fluency
- Recoverability over completion

---

## Current System State

**ORP_VERSION: 3.0 (FROZEN)**  
L1: STRICT_TYPED_TIME_SERIES  
L2: VALIDATION_LAYER  
L3: AUTHORITY_LAYER  
L4: INTERNAL_INFERENCE_ONLY  
DRIFT_MODEL: NUMERIC (σ
²)  
STATUS: FROZEN

---

## License

GNU General Public License v3.0 (GPL-3.0)

---

**Repository**: [https://github.com/GeneralSergal/ORP](https://github.com/GeneralSergal/ORP)  
**Website**: [https://generalsergal.github.io/ORP/](https://generalsergal.github.io/ORP/)
