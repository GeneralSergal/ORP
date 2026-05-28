# ORP_CONTEXT_ACTIVATION_COMPILER.md
**Executable Context-to-Module Compilation Model**

**Part of:** ORP v3.0 — Open Resonance Protocol  
**Dependency:** ORP_BOOT_SEQUENCE.md (MANDATORY INITIAL STATE)

---

## PURPOSE

This document defines ORP as a **context compiler**, not a routing system.

It transforms:

> Context → Modules → Execution Behavior

into a deterministic compiled graph:

> Context → IR → Dependency DAG → Governed Execution

---

## BOOT DEPENDENCY RULE (CRITICAL)

Compiler CANNOT operate unless:

> ORP_BOOT_SEQUENCE.md has completed successfully

Required boot state:

- ORP_RUNTIME.md = ACTIVE
- SHS = GREEN
- σ² = OBSERVATIONAL MODE
- Context Matrix = READY

---

## COMPILATION PIPELINE

---

### STEP 1 — CONTEXT PARSING

Input → structured context vector:

```

C = {
domain,
complexity,
risk_profile,
structure_type,
artifact_type
}

```

---

### STEP 2 — IR GENERATION

Context is compiled into IR nodes:

```

IR_NODE {
context_tags,
required_modules,
optional_modules,
constraints
}

```

---

### STEP 3 — MODULE RESOLUTION GRAPH

Modules are resolved as dependencies:

ROOT:
→ ORP_RUNTIME.md

Conditional:
→ CODE → ORP_RUNTIME_CODE.md
→ CREATIVE → ORP_RUNTIME_RP.md
→ DEGRADED → ORP_RUNTIME_LITE.md

---

### STEP 4 — EXECUTION DAG BUILD

```

ExecutionGraph = DAG(IR_nodes, dependencies)

```

Constraint:

> ORP_RUNTIME.md is always the root node.

---

### STEP 5 — CONSTRAINT INJECTION

Execution is wrapped with L3 governance:

```

execute(node):
apply(ORP_RUNTIME.md)
apply(node.constraints)
apply(module_constraints)

```

Priority:

1. ORP_RUNTIME.md
2. Node constraints
3. Module constraints

---

### STEP 6 — σ² OBSERVABILITY BINDING

σ² is attached as:

> read-only telemetry stream

Rules:

- cannot affect compilation
- cannot affect execution graph
- cannot modify module resolution
- L3 only interprets σ²

---

## EXECUTION SEMANTICS

ORP behaves as a compiled system:

```

for node in ExecutionGraph:
governed_context = ORP_RUNTIME(node)
modules = resolve(node)
output = execute(governed_context, modules)

```

---

## MODULE RULES

### RULE 1 — ROOT IS IMMUTABLE

ORP_RUNTIME.md is always injected first.

---

### RULE 2 — MODULES ARE DEPENDENCIES

Modules do NOT execute independently.

They only modify node behavior.

---

### RULE 3 — NO CROSS-MODULE MUTATION

Modules cannot:
- modify each other
- override L3
- alter IR structure

---

## COMPILER INVARIANTS

- deterministic compilation
- acyclic execution graph
- monotonic constraint enforcement
- σ² immutability

---

## FAILURE MODES

### COMPILATION FAILURE
→ fallback to CORE + ORP_RUNTIME only

### EXECUTION FAILURE
→ SHS downgrade via ORP_RUNTIME.md

---

## FORMAL MODEL

```

ORP = Compile(Context) → ExecutionGraph → GovernedOutput

```

---

## FINAL PRINCIPLE

> Governance is compiled, not interpreted.

---

**STATUS: EXECUTABLE COMPILER LAYER — ACTIVE**

**END OF DOCUMENT**

