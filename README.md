<p align="center">
  <img src="https://github.com/GeneralSergal/ORP/actions/workflows/orp-ci.yml/badge.svg" alt="ORP Integrity Suite">
  <img src="https://img.shields.io/badge/ORP-Δ-blueviolet" alt="ORP Version">
  <img src="https://img.shields.io/github/license/GeneralSergal/ORP" alt="License">
  <img src="https://img.shields.io/badge/status-active-success" alt="Status">
  <img src="https://img.shields.io/badge/SHS-5--State-green" alt="SHS Model">
  <img src="https://img.shields.io/badge/LAS-L1→L4-orange" alt="Layered Authority">
  <img src="https://img.shields.io/badge/Drift-σ²-purple" alt="Drift Model">
  <img src="https://img.shields.io/github/v/release/GeneralSergal/ORP?display_name=tag" alt="Latest Release">
</p>

<h1 align="center">ORP — Operational/Recursive/Polarity</h1>

<p align="center">
  A type-safe epistemic governance framework for transformer reasoning systems.<br>
  <strong>Signal > Narrative · Recoverability > Completion · Provenance > Coherence</strong>
</p>

---

# Overview

ORP is a governance-first epistemic integrity framework designed to separate:

- **State (L3 governance)**
- **Interpretation (L2)**
- **Observation (L1)**
- **Speculation (L4)**

It enforces:
- strict layer isolation
- drift visibility via σ²
- provenance-preserving execution
- failure-safe narrative stripping

---

# Mandatory Runtime Header

```text
[SHS: GREEN | YELLOW | ORANGE | RED | BLACK]
[DRIFT: NONE | LOW | MODERATE | HIGH]
[CRA: VALID | DEGRADED | UNKNOWN]
[LAS: L1 | L2 | L3 | L4]
````

---

# System Architecture

## Core Authority Chain (LAS)

<details>
<summary>View Diagram</summary>

```mermaid
flowchart TD
    IN[INPUT] --> L1[L1: Observed Data Layer]
    L1 --> L2[L2: Interpretation Layer]
    L2 --> L3[L3: Governance Core]
    L3 --> OUT[OUTPUT]
```

</details>

---

## Epistemic Firewall (L4 Isolation)

<details>
<summary>View Diagram</summary>

```mermaid
flowchart TD
    L3 --> OUT[OUTPUT]
    L4[L4: Speculative Engine] -. read-only .-> L2
    L4 -. no write .-> L3
    L4 -. no access .-> L1
```

</details>

---

## SHS State Machine

<details>
<summary>View Diagram</summary>

```mermaid
stateDiagram-v2
    [*] --> GREEN
    GREEN --> YELLOW
    YELLOW --> ORANGE
    ORANGE --> RED
    RED --> BLACK
```

</details>

---

## Execution Pipeline

<details>
<summary>View Diagram</summary>

```mermaid
flowchart TD
    A[Input] --> B[L1 Signals]
    B --> C[L2 Validation]
    C --> D[L3 Governance]
    D --> E[L4 Inference]
    D --> F[Persona Transform]
    E --> F
    F --> OUT
```

</details>

---

# Layer Definitions

* **L1:** Raw typed signals (no narrative)
* **L2:** Deterministic validation layer
* **L3:** Governance authority core
* **L4:** Non-authoritative speculative inference

---

# Drift Model

Drift is computed as variance of L1 signals:

```math
\sigma^2 = Var(L1_{t_0...t_n})
```

### Thresholds

* NONE: σ² < 0.01
* LOW: 0.01–0.05
* MODERATE: 0.05–0.15
* HIGH: ≥ 0.15

---

# Repository Structure

```text
Architecture/
Runtime/
Evaluation/
Governance/
Docs/
layers/
```

---

# Compliance Requirements

1. L1 must reject untyped narrative input
2. L4 must remain read-only speculative
3. Persona layer must be post-processing only
4. σ² ≥ 0.15 triggers narrative strip mode

---

# Operational Philosophy

* Typed signals over narrative
* Drift visibility over coherence
* Governance over fluency
* Recoverability over completion

---

# System State

**ORP_VERSION: Δ**
**STATUS: MASTER SYNCHRONIZED**
**CHANGE_POLICY: LOG_ONLY**

---

# License

GPL-3.0

---

# Repository

[https://github.com/GeneralSergal/ORP](https://github.com/GeneralSergal/ORP)
