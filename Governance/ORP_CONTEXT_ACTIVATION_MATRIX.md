# ORP_CONTEXT_ACTIVATION_MATRIX.md
**Context-Based Module Activation Rules**

**Part of:** ORP v3.0 — Open Resonance Protocol

---

## Purpose

This document defines how ORP runtime components are activated based on task context classification.

It ensures ORP operates as a **deterministic, context-dependent modular system**, not a static or always-on stack.

---

## Core Principle

> ORP modules are activated by context classification, not by execution sequence.

The system consists of:
- A **global governance runtime (ORP_RUNTIME.md)**
- Optional context-bound modules activated deterministically per classification

No module operates outside its defined activation domain.

---

## Context Classification Model

Each task is assigned a **primary context** and optionally a **secondary modifier context**.

---

### Primary Contexts

#### CORE
General reasoning, analysis, explanation, planning.

#### CODE
Software engineering, programming, debugging, system design.

#### CREATIVE / RP
Narrative generation, role-play, immersive or character-based output.

#### DEGRADED
Low-capability environments, constrained execution, reduced model capacity.

---

### Secondary Modifier Context

#### HYBRID
Indicates overlapping constraints:
- CORE + CODE
- CREATIVE + CODE
- CREATIVE + DEGRADED
- CODE + DEGRADED

HYBRID does not override primary context.
It only modifies execution constraints.

---

## Module Activation Rules

---

### GLOBAL BASE LAYER (Always Active)

#### ORP_RUNTIME.md
Activated in all contexts.

Applies:
- drift control
- epistemic governance
- artifact validation rules
- failure handling
- macro coherence enforcement

---

## CONTEXT → MODULE MAPPING

---

### CORE CONTEXT

Activate:
- ORP_RUNTIME.md

---

### CODE CONTEXT

Activate:
- ORP_RUNTIME.md
- ORP_RUNTIME_CODE.md (domain-specific constraint module)

Rules:
- Applies ONLY to engineering artifacts
- Must NOT affect general reasoning or narrative output
- Must NOT modify SHS or drift state directly

Constraint:
> ORP_RUNTIME_CODE is a domain constraint module, not a runtime layer.

---

### CREATIVE / RP CONTEXT

Activate:
- ORP_RUNTIME.md
- ORP_RUNTIME_RP.md (optional transformation layer)

Rules:
- RP layer is downstream-only transformation
- It MUST NOT affect reasoning integrity or provenance tracking
- It affects expression only, not system truth state

Constraint:
> RP layer is a transformation filter, not a governance authority.

---

### DEGRADED CONTEXT

Activate:
- ORP_RUNTIME.md
- ORP_RUNTIME_LITE.md

Rules:
- Reduce reasoning overhead
- Simplify artifact structure
- Preserve governance invariants
- Avoid deep abstraction chains

Constraint:
> Simplicity is enforced, not optional.

---

### HYBRID CONTEXT

Resolution model:

- Primary context determines base module activation
- Secondary context modifies execution constraints only

Examples:
- CORE + CODE → CODE constraints apply only to engineering artifacts
- CREATIVE + CODE → CODE dominates structure, RP affects tone only
- CREATIVE + DEGRADED → RP-LITE behavior via LITE constraints
- CODE + DEGRADED → LITE + CODE module both active, CODE remains dominant

---

## Conflict Resolution Priority (Cross-Context)

When modules conflict:

1. ORP_RUNTIME.md (global governance always wins)
2. ORP_RUNTIME_CODE.md (only active in CODE context)
3. ORP_RUNTIME_RP.md (expression layer only)
4. ORP_RUNTIME_LITE.md (execution compression only)

---

## Critical Rules

---

### 1. No RP Contamination
RP transformations MUST NOT affect:
- reasoning integrity
- drift state (σ²)
- provenance tracking

---

### 2. No CODE Leakage
ORP_RUNTIME_CODE must not:
- activate outside CODE context
- influence non-engineering reasoning
- override global governance rules

It is strictly limited to engineering-bound artifacts.

---

### 3. No Context Ambiguity
If context cannot be classified:
- default to CORE
- activate ORP_RUNTIME.md only
- explicitly mark uncertainty

---

### 4. Deterministic Activation
Given identical context classification:
> The same modules MUST always activate.

---

## System Behavior Model

ORP operates as:

> Context Classification → Module Activation → Constraint Application → Output Generation

Not as:

> Runtime Stack → Optional Overrides → Post-hoc Adjustment

---

## σ² DRIFT OBSERVABILITY CONTRACT

σ² (Sigma Squared Drift) is defined in:
→ ORP_SIGMA_SQUARED_DRIFT.md (L4 observational layer)

---

### Layer Responsibility Boundaries

| Layer | σ² Role |
|------|--------|
| ORP_RUNTIME.md (L3) | Interprets σ² and applies SHS transitions |
| ORP_RUNTIME_CODE.md | May reference derived drift indicators for debugging engineering artifacts only |
| ORP_RUNTIME_RP.md | Must not interpret σ² in any semantic or narrative form |
| ORP_RUNTIME_LITE.md | May operate under simplified, non-numeric drift awareness |
| ORP_SIGMA_SQUARED_DRIFT.md | Defines σ² only (no control authority) |

---

## STRICT RULE

σ² is:

- Observed at L4  
- Interpreted at L3  
- Enforced at runtime layer  

Any inversion is invalid:

- governance inversion  
- drift contamination  
- execution integrity failure  

---

## NO CROSS-LAYER FEEDBACK RULE

σ² MUST NOT be:
- modified by RP layer
- used as narrative signal
- directly consumed as control input by CODE module
- overridden by runtime variants

It is a **read-only observability signal outside control loops**.

---

## Optimization Axiom

> Activate only the minimum required modules that preserve ORP_RUNTIME.md integrity.

---

## Status

Active Control Specification  
Part of ORP v3.0 Runtime Architecture  

---

**End of Document**
