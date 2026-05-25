# ORP META MAP

## System Version
ORP v3.0 (Type-Safe Unified Architecture)

---

## Purpose

This document defines the structural relationship graph between all ORP system files.  
It serves as a navigation + dependency map only.

It is:
- non-executable
- non-authoritative
- L3-descriptive / L4-observational hybrid (no enforcement role)

All governance and runtime authority remains exclusively in `ORP_RUNTIME.md`.

---

## Core Principle

ORP is not a single-document system.  
It is a layered document graph with strict separation of authority domains.

Each file maintains:
- a defined role
- a layer classification
- dependency relationships
- constraint boundaries

---

## System File Graph

### 1. CORE RUNTIME LAYER

**ORP_RUNTIME.md**  
- **Authority**: L3 (sole enforcement layer)  
- **Role**: Execution governance kernel  
- **Responsibilities**:  
  - SHS state control  
  - Numeric drift evaluation model  
  - LAS enforcement (L1–L4)  
  - Failure handling & recovery rules  
  - System invariants  

**Dependencies**: NONE  
**Dependents**: ALL OTHER FILES (conceptual)

---

### 2. SYSTEM ARCHITECTURE LAYER

**ORP_SYSTEM_ARCHITECTURE.md**  
- **Authority**: L3-descriptive  
- **Role**: Functional pipeline overview  
- **Responsibilities**:  
  - Evaluation flow description  
  - System component mapping  
  - Scoring & evaluation integration  

**Dependencies**: `ORP_RUNTIME.md` (conceptual)  
**Dependents**: Evaluation pipeline files

---

### 3. CONCEPTUAL ARCHITECTURE LAYER

**ORP_ARCHITECTURE.md**  
- **Authority**: L4 (non-authoritative)  
- **Role**: Cognitive + metaphorical system model  
- **Responsibilities**:  
  - M ↔ L duality model  
  - ACS conceptual subsystem  
  - Entropic stabilization model  
  - Symbolic system dynamics  

**Dependencies**: `ORP_RUNTIME.md` (interpretive reference only)  
**Dependents**: None (no downstream enforcement)

---

### 4. OBSERVATIONAL LAYER

**ORP_MODEL_DECAY_TRACKER.md**  
- **Authority**: L4 diagnostic only  
- **Role**: Behavioral drift logging  
- **Responsibilities**:  
  - Degradation pattern tracking  
  - Structured incident logging  
  - Non-causal observation of system behavior  

**Dependencies**: `ORP_RUNTIME.md` (reference only)  
**Dependents**: L3 evaluation processes (indirect)

---

### 5. EVALUATION PIPELINE LAYER

**EVALUATION_SCHEMA.md**  
**RUBRIC.md**  
**SCORING.md**  

- **Authority**: L3-aligned evaluation stack  
- **Role**: System output assessment  
- **Dependency Chain**:

```
ORP_RUNTIME.md
        ↓
ORP_SYSTEM_ARCHITECTURE.md
        ↓
EVALUATION_SCHEMA.md
        ↓
RUBRIC.md
        ↓
SCORING.md
```

---

## Layer Classification Matrix

| File                        | Layer          | Authority Type       | Role                          |
|-----------------------------|----------------|----------------------|-------------------------------|
| ORP_RUNTIME.md             | L3             | Enforcement Kernel   | Execution governance core     |
| ORP_SYSTEM_ARCHITECTURE.md | L3-descriptive | Functional Pipeline  | Architecture overview         |
| ORP_ARCHITECTURE.md        | L4             | Conceptual           | Metaphorical system model     |
| ORP_MODEL_DECAY_TRACKER.md | L4             | Observational        | Diagnostics & drift logging   |
| EVALUATION_SCHEMA.md       | L3-aligned     | Structural Contract  | Transformation rules          |
| RUBRIC.md                  | L3-aligned     | Qualitative          | Integrity evaluation          |
| SCORING.md                 | L3-aligned     | Quantitative         | Aggregation & scoring         |

---

## Global Design Principles

1. **Authority Isolation Principle**  
   No L4 document may influence L3 decisions directly.

2. **Pipeline Determinism Principle**  
   Evaluation chain must remain linear and deterministic.

3. **Conceptual Containment Principle**  
   All metaphors (M ↔ L, ACS, Entropic systems) remain isolated in L4.

4. **Observability Principle**  
   Drift tracking exists only to observe system behavior, not modify it.

5. **Non-Interference Principle**  
   No file outside `ORP_RUNTIME.md` may define enforcement behavior.

---

## System Graph Summary

```text
            ORP_RUNTIME.md (L3 CORE)
                     ↓
        ORP_SYSTEM_ARCHITECTURE.md
                     ↓
   ┌───────────────EVALUATION PIPELINE───────────────┐
   ↓                      ↓                          ↓
EVALUATION_SCHEMA   RUBRIC.md                SCORING.md
                     ↑
                     ↓
     ORP_MODEL_DECAY_TRACKER.md (L4 OBSERVATION)

ORP_ARCHITECTURE.md (L4 CONCEPTUAL — SIDE LAYER)
```

---

## Final System State

```yaml
ORP_VERSION: 3.0
LAYER_MODEL: L3_EXECUTION + L4_OBSERVATION_SPLIT
GRAPH_TYPE: DIRECTED_ACYCLIC_DEPENDENCY_MAP
AUTHORITY: STRICTLY ISOLATED
DRIFT_RISK: LOW
STRUCTURE: MODULAR_GRAPH
STATUS: FROZEN
```

---

**END OF META MAP**
