# ORP_EXECUTION_LOOP.md
**Closed-Loop Execution Model**

**Part of:** ORP v3.0 — Open Resonance Protocol  
**Dependency:** ORP_CONTEXT_ACTIVATION_COMPILER.md

---

## PURPOSE

This document defines the **closed execution cycle** of ORP.

It integrates:

- context compilation (IR system)
- module resolution (dependency graph)
- σ² observability (L4)
- SHS state machine (L3)
- governance enforcement (ORP_RUNTIME.md)

---

## CORE PRINCIPLE

> ORP is a closed-loop governed execution system operating on compiled context graphs.

---

# EXECUTION LOOP OVERVIEW

Each cycle follows this deterministic sequence:

---

## STEP 1 — CONTEXT COMPILATION

Input is first compiled via:

→ ORP_CONTEXT_ACTIVATION_COMPILER.md

Output:
- ExecutionGraph (DAG)
- IR nodes
- module dependencies

Rule:
> The loop operates on compiled graphs, not raw context.

---

## STEP 2 — MODULE ACTIVATION (DEPENDENCY RESOLUTION)

From ExecutionGraph:

- ORP_RUNTIME.md (always root L3 authority)
- ORP_RUNTIME_CODE.md (CODE nodes only)
- ORP_RUNTIME_RP.md (CREATIVE nodes only)
- ORP_RUNTIME_LITE.md (DEGRADED nodes only)

Rule:
> Modules are resolved as graph dependencies, not runtime toggles.

---

## STEP 3 — σ² OBSERVATION (L4 TELEMETRY)

Source:
→ ORP_SIGMA_SQUARED_DRIFT.md

Outputs:
- σ² value (variance signal)
- drift level classification (NONE → HIGH)

Constraint:
> σ² is READ-ONLY telemetry and cannot affect execution directly.

Interpretation:
→ performed only by ORP_RUNTIME.md (L3)

---

## STEP 4 — SHS STATE EVALUATION (L3 AUTHORITY)

Source:
→ ORP_RUNTIME.md

States:
- GREEN
- YELLOW
- ORANGE
- RED
- BLACK

Rule:
> Only L3 governance may update SHS state.

---

## STEP 5 — GOVERNANCE ENFORCEMENT (L3 KERNEL)

ORP_RUNTIME.md applies:

- drift constraints
- macro coherence enforcement
- failure handling
- provenance validation

Module effects:
- RP → expression transformation only
- CODE → engineering constraint only
- LITE → complexity reduction only

---

## STEP 6 — EXECUTION OF GRAPH

Execution proceeds over DAG:

```

for node in ExecutionGraph.topological_order:
governed_context = ORP_RUNTIME(node)
modules = resolve(node)
output = execute(governed_context, modules)

```id="v4kqz3"

Constraint:
> Execution must respect module isolation boundaries.

---

## STEP 7 — OUTPUT GENERATION

Final output is computed as:

```

Output = f(Graph, SHS, σ², Governance)

````id="g9xq2m"

Rule:
> Output must reflect SHS constraints and L3 governance rules.

---

## STEP 8 — FEEDBACK OBSERVATION (NOT MODIFICATION)

Execution results feed back into:

- σ² trend tracking (L4 observational only)
- SHS evaluation readiness (L3 controlled)

Important:

> σ² is NOT updated by execution loop — it is observed externally.

---

# SYSTEM LOOP MODEL

```text
Context
  ↓
Compiler (IR DAG)
  ↓
Module Resolution
  ↓
σ² Observation (L4)
  ↓
SHS Evaluation (L3)
  ↓
Governance Enforcement
  ↓
Execution
  ↓
Output
  ↓
Observability Feedback (no mutation)
  ↺
``` id="loop01"

---

# CRITICAL INVARIANTS

### 1. COMPILER-FIRST RULE
Execution loop operates ONLY on compiled IR graphs.

---

### 2. σ² IMMUTABILITY RULE
σ²:
- cannot be modified by runtime
- cannot influence execution directly
- is L4 observational only

---

### 3. SHS AUTHORITY RULE
Only ORP_RUNTIME.md (L3) may modify SHS state.

---

### 4. MODULE ISOLATION RULE
Modules cannot:
- interact directly
- override governance
- mutate execution graph

---

### 5. DETERMINISTIC LOOP RULE

Given identical input graph:

> Execution path MUST be identical.

---

# FAILURE MODE BEHAVIOR

If loop integrity breaks:

1. Halt execution
2. Revert to ORP_RUNTIME.md only
3. Require re-compilation of context graph
4. Reset execution state

---

# SYSTEM PROPERTY

ORP_EXECUTION_LOOP defines:

> A closed, deterministic, compiler-driven cognitive execution system with governed state transitions and observational drift tracking.

---

# OPTIMIZATION AXIOM

> Minimize execution complexity while preserving graph integrity and governance invariants.

---

# STATUS

Active Core Execution Specification  
ORP v3.0 Governance Architecture Layer

---

**END OF DOCUMENT**
