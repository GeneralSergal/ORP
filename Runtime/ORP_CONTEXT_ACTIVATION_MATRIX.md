# ORP_CONTEXT_ACTIVATION_MATRIX
**Context-Based Module Activation Rules**

**Part of:** ORP v3.0 — Open Resonance Protocol

---

## Purpose

This document defines how ORP runtime components are activated based on task context.

It ensures that ORP operates as a **context-dependent modular system**, not a static or always-on stack.

---

## Core Principle

> ORP modules are activated by context classification, not by boot sequence.

The system is composed of:
- A **global governance runtime (ORP_RUNTIME.md)**  
- Optional behavioral and execution modules activated per context  

No module operates outside its defined activation domain.

---

## Context Classification Model

All tasks are classified into one or more of the following contexts:

### 1. CORE (Default)
General reasoning, analysis, explanation, planning.

### 2. CODE
Software engineering, programming, debugging, system design.

### 3. CREATIVE / RP
Narrative, role-play, character-based output, immersive generation.

### 4. DEGRADED
Low-capability environments, constrained models, performance-limited execution.

### 5. HYBRID
Mixed contexts (e.g. RP + CODE, or CREATIVE + DEGRADED).

---

## Module Activation Rules

### GLOBAL BASE LAYER (Always Active)

#### ORP_RUNTIME.md
**Activated in all contexts**

Applies:
- drift control
- epistemic governance
- artifact validation rules
- failure handling
- macro coherence enforcement

---

### CODE CONTEXT

#### If Context = CODE

Activate:
- ORP_RUNTIME.md (required)
- ORP_RUNTIME_CODE.md (conditional module)

Rules:
- CODE module applies ONLY to engineering artifacts
- RP module is disabled unless explicitly required for output formatting

Constraint:
> ORP_RUNTIME_CODE is NOT a runtime layer — it is a domain-specific constraint module

---

### CREATIVE / RP CONTEXT

#### If Context = CREATIVE / RP

Activate:
- ORP_RUNTIME.md (required)
- ORP_RUNTIME_RP.md (optional transform layer)

Rules:
- RP layer applies only as downstream transformation
- Governance kernel remains authoritative
- No modification of SHS or drift states by RP layer

Constraint:
> RP layer affects expression, not truth state

---

### DEGRADED CONTEXT

#### If Context = DEGRADED

Activate:
- ORP_RUNTIME.md (required)
- ORP_RUNTIME_LITE.md (required or implicit based on system constraints)

Rules:
- Reduce reasoning overhead
- Simplify artifact structure
- Preserve core governance invariants
- Avoid deep abstraction chains

Constraint:
> Simplicity is enforced, not optional

---

### HYBRID CONTEXT

#### If Context = HYBRID

Activate combinations:

- CODE + CREATIVE → CODE rules dominate structure, RP only affects output tone
- CODE + DEGRADED → LITE + CODE module both active
- CREATIVE + DEGRADED → RP-LITE mode active
- CODE + CREATIVE + DEGRADED → RP-LITE + CODE module (CODE remains structurally dominant)

---

## Conflict Resolution Priority (Cross-Context)

When modules conflict across contexts:

1. ORP_RUNTIME.md (global governance always wins)
2. ORP_RUNTIME_CODE.md (only in CODE context)
3. ORP_RUNTIME_RP.md (output transformation only)
4. ORP_RUNTIME_LITE.md (execution compression only)

---

## Critical Rules

### 1. No Global RP Contamination
RP transformations must never affect:
- reasoning integrity
- drift state
- provenance tracking

---

### 2. No CODE Module Leakage
ORP_RUNTIME_CODE must not:
- activate outside CODE context
- influence non-engineering reasoning
- override global governance rules

---

### 3. No Context Ambiguity
If context cannot be classified:
- default to CORE
- apply ORP_RUNTIME.md only
- explicitly mark uncertainty

---

### 4. Deterministic Activation
Given identical context classification:
> The same modules MUST always activate

---

## System Behavior Model

ORP operates as:

> Context → Module Activation → Constraint Application → Output Generation

Not as:

> Runtime Stack → Execution → Optional Overrides

---

## Summary Mapping

| Context   | Active Modules |
|----------|----------------|
| CORE     | ORP_RUNTIME.md |
| CODE     | ORP_RUNTIME.md + ORP_RUNTIME_CODE.md |
| CREATIVE | ORP_RUNTIME.md + ORP_RUNTIME_RP.md |
| DEGRADED | ORP_RUNTIME.md + ORP_RUNTIME_LITE.md |
| HYBRID   | Combination of above with priority rules |

---

## Optimization Axiom

> Activate only the minimum required modules that preserve ORP_RUNTIME.md integrity.

---

## Status

Active Control Specification  
Part of ORP v3.0 Runtime Architecture

---

**End of Document**
