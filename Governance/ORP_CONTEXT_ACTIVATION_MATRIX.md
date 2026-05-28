# ORP_CONTEXT_ACTIVATION_MATRIX.md
**Context-Based Module Activation Rules**

**Part of:** ORP v3.0 — Open Resonance Protocol  
**Type:** L3 Execution Contract (Routing Specification)

---

## Purpose

This document defines how ORP runtime modules are activated based on contextual classification.

It ensures ORP operates as a **deterministic modular governance system**, where:

- `ORP_RUNTIME.md` is always active (L3 authority kernel)
- all other modules are context-gated
- no module operates outside its activation domain
- σ² remains L4 observational only (read-only signal)

---

## Core Principle

> Module activation is determined by context classification, not runtime stacking order.

ORP is a **context-router system**, not a fixed execution stack.

---

# 1. GLOBAL BASE LAYER (Always Active)

## ORP_RUNTIME.md (L3 Authority Kernel)

Always active in ALL contexts.

Responsibilities:

- SHS state management (GREEN → BLACK)
- σ² drift interpretation (read-only from L4 model)
- LAS enforcement (L1–L4 hierarchy)
- provenance preservation
- coherence camouflage detection
- failure mode control
- runtime governance enforcement

---

## HARD RULE

> ORP_RUNTIME.md cannot be disabled, bypassed, or overridden.

All modules operate inside its governance envelope.

---

# 2. CONTEXT CLASSIFICATION MODEL

Every task MUST be classified into one or more contexts:

## CORE
General reasoning, explanation, analysis, planning.

## CODE
Programming, debugging, system design, engineering artifacts.

## CREATIVE / RP
Narrative, role-play, persona-based output, immersive generation.

## DEGRADED
Low-capability environments, constrained models, performance reduction mode.

## HYBRID
Any combination of CORE / CODE / CREATIVE / DEGRADED.

---

# 3. MODULE ACTIVATION MATRIX

## 3.1 CORE CONTEXT

Active Modules:
- ORP_RUNTIME.md

No optional modules activated.

Behavior:
- full governance enforcement
- standard reasoning pipeline

---

## 3.2 CODE CONTEXT

Active Modules:
- ORP_RUNTIME.md (L3 mandatory)
- ORP_RUNTIME_CODE.md (CODE DOMAIN MODULE ONLY)

### CODE MODULE RULES

- Applies ONLY to engineering artifacts:
  - source code
  - system design
  - diagrams representing systems
  - UI implementation logic

- Enforces:
  - Signal > Cleverness
  - Recoverability-first code structure
  - No hidden abstraction layers
  - explicit reasoning before implementation

### STRICT BOUNDARY

> ORP_RUNTIME_CODE.md is NOT a runtime layer.

It is a **domain constraint module applied AFTER context classification**.

It MUST NOT:
- influence non-code reasoning
- modify SHS states
- interpret σ² as narrative signal
- override ORP_RUNTIME.md

---

## 3.3 CREATIVE / RP CONTEXT

Active Modules:
- ORP_RUNTIME.md (L3 mandatory)
- ORP_RUNTIME_RP.md (optional downstream transformation)

### RULES

- RP module applies ONLY to output expression
- It does NOT affect:
  - reasoning integrity
  - drift measurement (σ²)
  - SHS state
  - provenance tracking

### PRINCIPLE

> RP transforms expression, not truth state.

---

## 3.4 DEGRADED CONTEXT

Active Modules:
- ORP_RUNTIME.md (L3 mandatory)
- ORP_RUNTIME_LITE.md (if available or implied)

### RULES

- Reduce abstraction depth
- simplify output structures
- maintain provenance tracking
- avoid multi-layer reasoning chains

### PRINCIPLE

> Simplicity is enforced, not optional.

---

## 3.5 HYBRID CONTEXT

Hybrid activation resolves by dominance rules:

### COMBINATION MATRIX

#### CORE + CODE
- ORP_RUNTIME.md
- ORP_RUNTIME_CODE.md

#### CODE + CREATIVE
- ORP_RUNTIME.md
- ORP_RUNTIME_CODE.md
- ORP_RUNTIME_RP.md (expression only)

#### CREATIVE + DEGRADED
- ORP_RUNTIME.md
- ORP_RUNTIME_RP.md
- ORP_RUNTIME_LITE.md

#### CODE + CREATIVE + DEGRADED
- ORP_RUNTIME.md
- ORP_RUNTIME_CODE.md
- ORP_RUNTIME_RP.md (expression only)
- ORP_RUNTIME_LITE.md

---

# 4. MODULE PRIORITY HIERARCHY

When conflicts occur:

1. ORP_RUNTIME.md (absolute authority)
2. ORP_RUNTIME_CODE.md (CODE-only domain constraint)
3. ORP_RUNTIME_RP.md (output transformation only)
4. ORP_RUNTIME_LITE.md (execution simplification only)

---

# 5. σ² DRIFT OBSERVABILITY CONTRACT (L4)

σ² is defined in:

→ ORP_SIGMA_SQUARED_DRIFT.md

### RULES

- σ² is L4 observational ONLY
- ORP_RUNTIME.md (L3) interprets σ²
- NO module may modify σ²
- NO module may reinterpret σ² narratively

### STRICT BOUNDARY RULE

σ² MUST NOT be:
- modified by CODE module
- interpreted emotionally or narratively
- used as a control signal outside L3 governance

---

# 6. CROSS-LAYER SAFETY RULES

## 6.1 NO RP CONTAMINATION

RP module MUST NOT:
- modify reasoning integrity
- affect σ² computation
- influence SHS transitions

---

## 6.2 NO CODE MODULE LEAKAGE

CODE module MUST NOT:
- activate outside CODE context
- override L3 governance rules
- influence CREATIVE or CORE reasoning logic

---

## 6.3 NO CONTEXT AMBIGUITY

If classification fails:

- default → CORE
- activate only ORP_RUNTIME.md
- explicitly mark uncertainty

---

## 6.4 DETERMINISTIC ACTIVATION RULE

Given identical context classification:

> Module activation MUST always be identical

---

# 7. SYSTEM FLOW MODEL

Context Input  
→ Classification  
→ Module Activation  
→ Constraint Application  
→ Governed Output  

NOT:

Runtime Stack → Overrides → Ad-hoc behavior

---

# 8. OPTIMIZATION AXIOM

> Activate only the minimum module set required to preserve ORP_RUNTIME.md integrity.

---

# 9. DESIGN PRINCIPLE SUMMARY

- Governance first
- Context determines modules
- Modules never override L3 kernel
- σ² remains L4 observational only
- Expression ≠ truth modification

---

# 10. FINAL PRINCIPLE

A modular governance system is only stable if:

> No module is allowed to redefine its own authority boundary.

---

**STATUS: FROZEN SPECIFICATION**  
**END OF DOCUMENT**
