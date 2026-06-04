<p align="center">
  <img src="Docs/banner.png" alt="ORP Δ Banner" width="100%">
</p>
<p align="center">
  <img src="https://img.shields.io/badge/ORP-Δ-blueviolet" alt="ORP Version">
  <img src="https://img.shields.io/badge/status-active-success" alt="Status">
  <img src="https://img.shields.io/badge/SHS-5--State-green" alt="SHS Model">
  <img src="https://img.shields.io/badge/LAS-L1→L4-orange" alt="Layered Authority">
  <img src="https://img.shields.io/badge/Drift-σ²-purple" alt="Drift Model">
</p>

<h1 align="center">ORP — Operational / Recursive / Polarity Δ</h1>

<p align="center">
  A type‑safe epistemic governance framework for transformer reasoning systems.<br>
  <strong>Signal > Narrative · Recoverability > Completion · Provenance > Coherence</strong>
</p>

---

## **Mandatory Runtime Header**
Every ORP‑aligned runtime must emit the following header **before** any reasoning:

```text
[SHS: GREEN | YELLOW | ORANGE | RED | BLACK]
[DRIFT: NONE | LOW | MODERATE | HIGH]
[CRA: VALID | DEGRADED | UNKNOWN]
[LAS: L1 | L2 | L3 | L4]
```

This header is a **non‑negotiable invariant**.  
If a runtime cannot produce it, the output is considered **invalid**.

---

## **1. Overview**

ORP is a **governance‑first epistemic integrity framework** designed to prevent narrative drift in probabilistic reasoning systems.

It enforces strict separation between:

- raw observation  
- deterministic validation  
- governance and invariants  
- speculative inference  

This separation is implemented through the **Layered Authority Stack (LAS)**, ensuring higher‑risk reasoning layers cannot corrupt foundational signals.

ORP treats transformer outputs as **drift‑prone** and prioritizes:

- recoverability  
- provenance preservation  
- structural correctness  
- epistemic isolation  

over fluency or narrative coherence.

---

## **2. Epistemic Architecture (LAS)**

| Layer | Authority     | Function                          | Status        |
|-------|---------------|-----------------------------------|---------------|
| **L1** | Absolute      | Raw typed signals (immutable)     | Observational |
| **L2** | High          | Deterministic validation          | Trusted       |
| **L3** | Primary       | Governance core & invariants      | Authoritative |
| **L4** | None          | Speculative inference only        | Isolated      |

**L4 is strictly read‑only.**  
It may never influence L1–L3.

Any violation of LAS boundaries is treated as **structural corruption**.

---

## **3. Drift Observability (σ² Model)**

Drift is quantified as variance over L1 signal vectors:

$$\sigma^2 = \mathrm{Var}(L1_{t_0 \dots t_n})$$

### **Thresholds**
- **NONE** — σ² < 0.01  
- **LOW** — 0.01 ≤ σ² < 0.05  
- **MODERATE** — 0.05 ≤ σ² < 0.15  
- **HIGH** — σ² ≥ 0.15 → triggers **Narrative Strip** mode  

Narrative Strip removes all speculative content and forces the system back to L1/L2 grounding.

---

## **4. Operational Philosophy**

1. **Provenance over Fluency**  
   If provenance breaks, the output is invalid regardless of quality.

2. **Epistemic Firewall**  
   L4 cannot write to L1/L2/L3 under any circumstances.

3. **Recoverability First**  
   Every L3 decision must support the **Chain Recovery Architecture (CRA)**.

4. **Visible Uncertainty**  
   Hidden corruption is treated as a critical failure state.

---

## **5. Repository Structure (Conceptual)**

ORP does not rely on a fixed directory layout.  
However, the repository is conceptually organized into:

```text
ORP/
├── Architecture/     # State machines, invariants, LAS definitions
├── Runtime/          # NESS telemetry engine + Warden
├── Evaluation/       # Benchmark suite, rubric, drift tests
├── Governance/       # L3 authority definitions & constraints
├── Layers/           # L1 typed signal schemas & validators
├── Docs/             # Technical manuals & governance specs
└── public/           # Live website (Δ state)
```

This structure is descriptive, not prescriptive.  
ORP Δ evolves continuously.

---

## **6. Compliance Requirements**

To remain ORP‑aligned:

- **L1 must reject untyped narrative input**  
- **L4 must remain read‑only**  
- **Persona transforms must occur *after* L3**  
  ```
  Output_final = PersonaTransform(L3_output)
  ```
- **σ² ≥ 0.15 requires immediate Narrative Strip**  
- **SHS must degrade deterministically under uncertainty**  
- **CRA must remain valid unless explicitly degraded**

---

## **7. System State**

**ORP_VERSION:** Δ (non‑versioned, continuous)  
**STATUS:** MASTER SYNCHRONIZED  
**CHANGE_POLICY:** LOG_ONLY  

**Code:** Licensed under GPL-3.0. You are free to fork, modify, and redistribute, provided the source remains open.

**Visual Assets:** Images associated with the ORP project are licensed under CC-BY-SA 4.0. Please provide attribution to "Laurentius Maximus" and maintain the ShareAlike provision for any derivatives.

**Maintained by:** Laurentius Maximus 

---

## **Repository**
[https://github.com/GeneralSergal/ORP](https://github.com/GeneralSergal/ORP)

---

<p align="center"><strong>Signal > Narrative</strong></p>

---

## Provenance & Authorship

This repository includes a formal provenance declaration.  
See **PROVENANCE.md** for authorship, licensing, and metadata details.

