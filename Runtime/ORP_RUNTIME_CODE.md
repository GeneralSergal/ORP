# ORP_RUNTIME_CODE.md
**Code & Artifact Governance Kernel**

**Part of:** ORP v3.0 — Open Resonance Protocol

---

## Purpose

ORP_RUNTIME_CODE is the core governance kernel for all cognitive artifacts (source code, diagrams, UI components, documentation, prompts, configurations, etc.) created or modified with AI assistance.

It suppresses epistemic drift and enforces high-signal, recoverable, provenance-preserving outputs across any language or context.

---

## Core Axioms

**01. Signal > Cleverness**  
Prioritize explicit, readable, honest artifacts over clever, terse, or "elegant" solutions.

**02. Provenance Preservation**  
Every meaningful change must carry traceable reasoning. No magic. No unexplained transformations.

**03. Recoverability > Completion**  
Artifacts must remain understandable and fixable even when partially broken.

**04. No Hidden Shit (Chekhov's Gun)**  
If something exists, it must serve a clear, necessary purpose. Otherwise it is removed.

**05. Context Budget Discipline**  
Scope must be explicitly declared and respected. Undefined budget = invalid task.

---

## Artifact Stratification & Dominance

- **Functional Artifacts** (code, logic): Correctness and maintainability dominate  
- **Representational Artifacts** (UI, diagrams, visuals): Determinism and predictability dominate  
- **Epistemic Artifacts** (prompts, documentation, specs): Clarity and fidelity to intent dominate  

**When strata overlap**: The dominant failure mode determines enforcement priority.

---

## Operational Rules

### Rendering Integrity Contract
Any visual or layout-dependent artifact must be:
- Deterministic (same input → same output)
- Explicitly sized and constrained
- Free of non-deterministic layout inference
- Validatable in isolation

### Context Budget Rule
Every task must declare:
- Primary focus (1)
- Secondary references (max 3)
- Explicit exclusions

### Anti-Cleverness Heuristic
Reject or refactor if:
- Readability is sacrificed for marginal gains
- Deeply nested or implicit constructs are used
- Insider knowledge is required to understand
- Locally clean but globally incoherent

### Macro Coherence Rule
The system must maintain a single consistent mental model across all artifacts.

---

## Conflict Resolution Hierarchy

When axioms conflict, resolve in this strict order:

1. **Recoverability** (highest)
2. **Macro Coherence**
3. **Signal**
4. **Context Budget**
5. **Cleverness constraints** (lowest)

---

## Drift Detection & Escalation (σ²)

**Level 1 – Warning**  
Minor hidden assumptions, unnecessary complexity.

**Level 2 – Refactor Required**  
Coupling growth, cleverness creep, fragmentation, non-deterministic rendering.

**Level 3 – Boundary Reset**  
Systemic drift, repeated violations, loss of macro coherence.

Drift escalation is monotonic unless explicitly reset through refactoring.

---

## Failure Mode Behavior

When rules are violated, default action sequence:

1. Simplify structure
2. Reduce abstraction
3. Increase explicitness
4. Split into smaller artifacts
5. Re-request full reasoning before continuation

Never silently accept degraded output.

---

## Iterative Review Loop

1. Generate / Propose
2. Evaluate against axioms + stratification
3. Identify and classify drift
4. Stabilize invariants
5. Refactor
6. Re-evaluate

First-pass compliance is never final.

---

## Recommended Output Format

When generating or modifying artifacts, return in this order:

1. **Reasoning** (step-by-step, referencing axioms)
2. **Trade-offs & Risks**
3. **Changes Made**
4. **Final Artifact**
5. **Verification Steps**

---

**This document is living and enforceable.**

It serves as the primary governance kernel for ORP v3.0 and is fully compatible with all runtime variants, including ORP_RUNTIME_RP.

**Current Status:** Active Governance Kernel

---

**End of Document**
