# ORP_RUNTIME_VARIANTS
**Runtime Variant Overview**

**Part of:** ORP v3.0 — Open Resonance Protocol

---

## Purpose

This document defines the official runtime variants of ORP v3.0 and their intended use cases.

All variants operate under the global governance runtime defined in **ORP_RUNTIME.md**.

Optional modules may be activated depending on context:
- ORP_RUNTIME_CODE.md → coding/engineering only (NOT a runtime variant dependency)
- ORP_RUNTIME_RP.md → behavioral transform layer (optional downstream)
- ORP_RUNTIME_LITE.md → degraded environment execution mode
- ORP_RUNTIME_RP_LITE.md → hybrid RP + degraded mode

---

## Runtime Architecture Model

ORP operates as a **modular, context-dependent runtime system**, not a linear boot stack.

### Core Principle

> ORP_RUNTIME.md is always active as the global governance layer.  
> All other components are context-activated modules or transforms.

No variant initializes ORP_RUNTIME_CODE.md.

No variant is dependent on CODE module existence.

---

## Runtime Composition Contract

### 1. Global Governance Layer (Always Active)
→ ORP_RUNTIME.md

Defines:
- system-wide rules
- drift control
- epistemic governance
- execution constraints

---

### 2. Optional Behavioral Layer
→ ORP_RUNTIME_RP.md

Defines:
- persona / narrative transformation
- immersion rules
- downstream-only output modification

Constraint:
- Cannot override ORP_RUNTIME.md
- Cannot modify provenance or SHS state

---

### 3. Optional Degraded Execution Layer
→ ORP_RUNTIME_LITE.md

Defines:
- reduced capability execution mode
- simplified reasoning constraints
- performance-aware governance reduction

Used when:
- model capacity is limited
- system constraints require simplification

---

### 4. Hybrid Mode
→ ORP_RUNTIME_RP_LITE.md

Combines:
- RP transformation layer
- LITE execution constraints

Used for:
- small models with narrative bias
- constrained environments requiring immersion + compression

---

### 5. External Domain Module (NOT a runtime variant)
→ ORP_RUNTIME_CODE.md

Scope:
- AI coding / engineering tasks only

Properties:
- NOT globally active
- NOT part of runtime variant system
- NOT a boot dependency

Activation Rule:
> Applied only when task domain = coding / software engineering

---

## Variant Comparison

| Variant                        | Full Name                              | Best For                                      | Role-Play Support | Strictness | Token Efficiency | Link |
|--------------------------------|----------------------------------------|-----------------------------------------------|-------------------|----------|------------------|------|
| **ORP_RUNTIME.md**             | Full Governance Runtime                | Strong models, production governance          | Low               | Highest  | Medium           | [→ ORP_RUNTIME.md](ORP_RUNTIME.md) |
| **ORP_RUNTIME_RP.md**          | Role-Play Transform Mode              | Creative work, persona-driven sessions        | High              | High     | Medium-High      | [→ ORP_RUNTIME_RP.md](ORP_RUNTIME_RP.md) |
| **ORP_RUNTIME_LITE.md**        | Degraded Execution Mode               | Filtered, rate-limited, weak models           | Low               | Medium   | High             | [→ ORP_RUNTIME_LITE.md](ORP_RUNTIME_LITE.md) |
| **ORP_RUNTIME_RP_LITE.md**     | RP + Degraded Hybrid Mode             | Small models with narrative constraints       | High              | Medium   | Highest          | [→ ORP_RUNTIME_RP_LITE.md](ORP_RUNTIME_RP_LITE.md) |

---

## Visual Variant Map

<details>
<summary><strong>Click to view Variant Architecture Map</strong></summary>

```mermaid
flowchart TD
    A[ORP Core System] --> B[ORP_RUNTIME.md<br>Global Governance]

    A --> C[ORP_RUNTIME_RP.md<br>Behavioral Transform]
    A --> D[ORP_RUNTIME_LITE.md<br>Degraded Mode]
    A --> E[ORP_RUNTIME_RP_LITE.md<br>Hybrid Mode]

    B --> F[Strong Models]

    C --> G[Persona Output Layer]
    D --> H[Reduced Capability Execution]
    E --> I[Small Models / RP Bias]

    click B href "ORP_RUNTIME.md" "Open Runtime"
    click C href "ORP_RUNTIME_RP.md" "Open RP Mode"
    click D href "ORP_RUNTIME_LITE.md" "Open Lite Mode"
    click E href "ORP_RUNTIME_RP_LITE.md" "Open RP-Lite Mode"
````

</details>

---

## Quick Selection Guide

* Use **Full Runtime (ORP_RUNTIME.md)** → maximum governance control
* Use **RP Mode** → immersive persona / narrative output
* Use **LITE Mode** → constrained or degraded environments
* Use **RP-LITE Mode** → small models needing both compression + role-play

---

## Optimization Axiom

> Optimization is the highest form of respect for the hardware.

Select the lightest viable runtime variant that preserves ORP_RUNTIME.md governance integrity.

---

## System Integrity Rule

The ORP system is valid only when:

* ORP_RUNTIME.md is active as the global governance layer
* A runtime variant is selected for behavior shaping

Optional modules may be applied based on task domain:

* ORP_RUNTIME_CODE.md → coding/engineering only (context-activated, not runtime-bound)
* ORP_RUNTIME_RP.md → narrative transformation only
* ORP_RUNTIME_LITE.md → degraded execution only

No variant directly initializes or binds ORP_RUNTIME_CODE.md.

---

**Status**: Active Documentation
**Last Updated**: 2026-05-28

---

**End of Document**
