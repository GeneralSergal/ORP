# ORP_CONTEXT_ACTIVATION_COMPILER.md
**Executable Context-to-Module Compilation Model**

**Part of:** ORP v3.0 — Open Resonance Protocol  
**Type:** L3 Execution Compiler Specification  
**Dependency:** ORP_CONTEXT_ACTIVATION_MATRIX.md, ORP_RUNTIME.md, ORP_SIGMA_SQUARED_DRIFT.md

---

## 1. PURPOSE

This document defines ORP as a **compilable execution system**, not a descriptive framework.

It transforms:

> Context → Modules → Behavior

into a deterministic **compiled execution graph**:

> Context → IR (Intermediate Representation) → Module Graph → Constraint Application → Governed Output

---

## 2. CORE CONCEPT

ORP is no longer a static routing matrix.

It is a **context-to-execution compiler** that produces a runtime graph:

```

Input
↓
Context Classifier
↓
ORP IR (Intermediate Representation)
↓
Module Dependency Resolver
↓
Execution Graph
↓
Constraint Enforcement (L3)
↓
Output State

```

---

## 3. COMPILATION MODEL

### 3.1 STEP 1 — CONTEXT PARSING

Input is decomposed into a structured context vector:

```

C = {
domain: CORE | CODE | CREATIVE | DEGRADED | HYBRID,
complexity: float,
risk_profile: float,
structure_type: {linear | branching | recursive},
artifact_type: {text | code | diagram | hybrid}
}

```

---

### 3.2 STEP 2 — ORP INTERMEDIATE REPRESENTATION (ORP-IR)

Context is compiled into a deterministic IR graph:

```

IR_NODE {
id
context_tags[]
required_modules[]
optional_modules[]
constraints[]
output_transformers[]
}

```

Example:

```

IR_NODE: CODE_SYSTEM_DESIGN

* required_modules:

  * ORP_RUNTIME.md
  * ORP_RUNTIME_CODE.md
* constraints:

  * signal > cleverness
  * explicit reasoning required
* output_transformers:

  * structural_diff_formatter

```

---

### 3.3 STEP 3 — MODULE RESOLUTION GRAPH

Modules are no longer “activated”.

They are **resolved as dependencies**:

```

ORP_RUNTIME.md → ROOT GOVERNANCE NODE (always injected)

CODE context:
ORP_RUNTIME_CODE.md → dependency child

CREATIVE context:
ORP_RUNTIME_RP.md → output transformer

DEGRADED context:
ORP_RUNTIME_LITE.md → compression layer

```

Graph becomes:

```

```
  ORP_RUNTIME (ROOT)
       |
```

---

|         |         |
CODE      RP        LITE
|
CODE_CONSTRAINTS

```

---

### 3.4 STEP 4 — EXECUTION GRAPH BUILD

The compiler constructs a DAG:

```

ExecutionGraph = DAG(
nodes = IR_nodes,
edges = dependency_resolution,
root = ORP_RUNTIME.md
)

```

Key property:

> No node executes outside dependency constraints.

---

### 3.5 STEP 5 — CONSTRAINT INJECTION

Each node is wrapped with L3 enforcement:

```

execute(node):
apply(ORP_RUNTIME.md)
apply(node.constraints)
apply(module_constraints)

```

Constraint priority:

1. ORP_RUNTIME.md (absolute)
2. Node constraints
3. Module constraints
4. Context heuristics (lowest priority)

---

### 3.6 STEP 6 — σ² INTEGRATION (L4 OBSERVABILITY)

σ² is injected as a **read-only telemetry stream**:

```

σ² → ExecutionGraph.monitoring_bus

```

Rules:
- cannot modify execution
- cannot influence module selection
- cannot affect IR compilation
- only observable by ORP_RUNTIME.md (L3)

---

## 4. EXECUTION SEMANTICS

ORP runtime now behaves like:

> A compiled program rather than an interpreted policy system

Execution model:

```

for node in ExecutionGraph.topological_order:
governed_context = ORP_RUNTIME(node)
module_context = resolve_modules(node)
output = execute_governed(node, governed_context, module_context)

```

---

## 5. MODULE RESOLUTION RULES

### RULE 1 — ROOT INJECTION

```

ORP_RUNTIME.md is always injected first

```

It cannot be:
- removed
- overridden
- deferred

---

### RULE 2 — DOMAIN ATTACHMENT

Modules attach based on IR classification:

| Context | Module Binding |
|--------|----------------|
| CORE | ORP_RUNTIME only |
| CODE | + ORP_RUNTIME_CODE |
| CREATIVE | + ORP_RUNTIME_RP |
| DEGRADED | + ORP_RUNTIME_LITE |
| HYBRID | DAG-composed combination |

---

### RULE 3 — NO CROSS-MODULE EXECUTION

Modules cannot:
- call each other directly
- override sibling constraints
- mutate IR structure

They only **decorate execution nodes**

---

## 6. EXECUTION GRAPH INVARIANTS

The compiled graph MUST satisfy:

### INVARIANT 1 — ACYCLIC GOVERNANCE
No module can create feedback loops into ORP_RUNTIME.md.

---

### INVARIANT 2 — CONSTRAINT MONOTONICITY
Constraints can only:

- tighten behavior
- never relax governance rules

---

### INVARIANT 3 — σ² IMMUTABILITY
σ² is read-only and external to execution logic.

---

### INVARIANT 4 — DETERMINISTIC COMPILATION
Same context → same IR → same execution graph

---

## 7. FAILURE MODES (COMPILER LEVEL)

### COMPILATION FAILURE
Occurs if:
- context cannot be classified
- module resolution is ambiguous
- IR nodes conflict structurally

Resolution:
→ fallback to CORE context only

---

### EXECUTION FAILURE
Occurs if:
- constraint violation detected
- σ² spike exceeds threshold
- module contradiction occurs

Resolution:
→ invoke ORP_RUNTIME.md fail-closed behavior

---

## 8. FORMAL SYSTEM DEFINITION

ORP is defined as:

```

ORP = Compile(Context) → ExecutionGraph → GovernedOutput

```

Where:

- Compile = deterministic IR transformation
- ExecutionGraph = DAG of constrained reasoning nodes
- GovernedOutput = SHS-scored final state

---

## 9. DESIGN SHIFT (IMPORTANT)

This upgrade introduces a fundamental change:

### BEFORE:
Rule-based runtime routing system

### AFTER:
**Compiled epistemic execution system**

Meaning:

> ORP is no longer interpreted at runtime — it is compiled before execution.

---

## 10. COMPILATION PRINCIPLE

> Governance is not applied. It is compiled into structure.

---

## 11. FINAL PRINCIPLE

A system is only truly governed when:

> its behavior is structurally impossible to misroute at execution time

---

**STATUS: EXECUTABLE SPEC MODEL — ACTIVE**  
**END OF COMPILER SPECIFICATION**
