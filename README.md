<p align="center">
  <img src="https://github.com/GeneralSergal/ORP/actions/workflows/orp-ci.yml/badge.svg" alt="ORP Integrity Suite">
  <img src="https://img.shields.io/badge/ORP-Δ-blueviolet" alt="ORP Version">
  <img src="https://img.shields.io/github/license/GeneralSergal/ORP" alt="License">
  <img src="https://img.shields.io/badge/status-active-success" alt="Status">
  <img src="https://img.shields.io/badge/SHS-5--State-green" alt="SHS Model">
  <img src="https://img.shields.io/badge/LAS-L1→L4-orange" alt="Layered Authority">
  <img src="https://img.shields.io/badge/Drift-σ²-purple" alt="Drift Model">
</p>

<h1 align="center">ORP — Operational/Recursive/Polarity Δ</h1>

<p align="center">
  A type-safe epistemic governance framework for transformer reasoning systems.<br>
  <strong>Signal > Narrative · Recoverability > Completion · Provenance > Coherence</strong>
</p>

---

## Mandatory Runtime Header
```text
[SHS: GREEN | YELLOW | ORANGE | RED | BLACK]
[DRIFT: NONE | LOW | MODERATE | HIGH]
[CRA: VALID | DEGRADED | UNKNOWN]
[LAS: L1 | L2 | L3 | L4]
```

---

## 1. Overview
ORP is a governance-first epistemic integrity framework designed to prevent narrative drift in probabilistic reasoning systems. It enforces strict separation between raw observation, validation, governance, and speculation through a Layered Authority Stack (LAS).

The protocol treats transformer outputs as drift-prone and enforces recoverability and provenance preservation as primary invariants.

---

## 2. Epistemic Architecture

| Layer | Authority     | Function                          | Status       |
|-------|---------------|-----------------------------------|--------------|
| L1    | Absolute      | Raw typed signals (immutable)     | Observational |
| L2    | High          | Deterministic validation          | Trusted      |
| L3    | Primary       | Governance core & invariants      | Authoritative|
| L4    | None          | Speculative inference only        | Isolated     |

L4 is strictly read-only and may never influence L1–L3.

---

## 3. Drift Observability (σ² Model)

Drift is quantified as variance over L1 signal vectors:

```math
\sigma^2 = \mathrm{Var}(L1_{t_0 \dots t_n})
```

### Thresholds
- **NONE** — σ² < 0.01  
- **LOW** — 0.01 ≤ σ² < 0.05  
- **MODERATE** — 0.05 ≤ σ² < 0.15  
- **HIGH** — σ² ≥ 0.15 → triggers **Narrative Strip** mode

---

## 4. Operational Philosophy
1. **Provenance over Fluency** — Broken provenance chain renders output invalid.
2. **Epistemic Firewall** — L4 has no write access to L1/L2/L3.
3. **Recoverability First** — Every L3 decision must support Chain Recovery Architecture (CRA).
4. **Visible Uncertainty** — Invisible corruption is treated as critical failure.

---

## 5. Repository Structure
```text
ORP/
├── Architecture/     # Core state machines and invariants
├── Runtime/          # NESS telemetry engine + Warden
├── Evaluation/       # Benchmark suite and rubric
├── Governance/       # L3 authority definitions
├── Layers/           # L1 typed signal schemas
├── Docs/             # Technical manuals
└── public/           # Live website
```

---

## 6. Compliance Requirements
- L1 must reject untyped narrative input (Signal-Only policy)
- L4 must remain read-only speculative engine
- Persona transforms are strictly post-processing (`Output_final = PersonaTransform(L3_output)`)
- σ² ≥ 0.15 forces immediate narrative strip and SHS downgrade

---

## 7. System State
**ORP_VERSION:** Δ (v3.0)  
**STATUS:** MASTER SYNCHRONIZED  
**CHANGE_POLICY:** LOG_ONLY  

**License:** GPL-3.0  
**Maintained by:** Laurentius Maximus (The ENTROPIA)

---

**Repository:** [https://github.com/GeneralSergal/ORP](https://github.com/GeneralSergal/ORP)

---

**Signal > Narrative**
