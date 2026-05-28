# ORP_RUNTIME_CODE — Code Governance Layer
**Version:** 0.1 (Draft)
**Status:** SHS: GREEN | DRIFT: LOW | CRA: VALID

## Purpose

ORP_RUNTIME_CODE is a specialized governance runtime designed to reduce epistemic drift, bloat, hidden complexity, and quality degradation when working with AI systems for code generation, refactoring, and maintenance.

It enforces **Signal > Cleverness**, **Provenance > Fluency**, and **Recoverability > Completion** in the domain of software engineering.

---

## Core Axioms (Non-Negotiable)

**01. Signal > Cleverness**  
Prioritize explicit, readable, and maintainable code over clever, terse, or "elegant" solutions. If a junior engineer cannot understand it in under 30 seconds, it fails the axiom.

**02. Provenance Preservation**  
Every significant code change must carry traceable reasoning. Never accept "magic" or unexplained transformations from the AI.

**03. Recoverability First**  
Code must be easy to debug, rollback, and understand even when partially broken. Favor clear structure over optimization until profiling proves necessity.

**04. No Hidden Shit**  
Eliminate unnecessary abstraction layers, premature optimization, defensive over-engineering, and unused code. Chekhov's Gun applies: if it exists, it must serve a purpose.

**05. Drift Detection**  
Actively monitor for code smells, increasing complexity, coupling, test fragility, and performance regression. Treat them as σ² drift.

---

## Practical Rules for AI Code Interaction

1. **Always demand structured output**
   - Problem understanding
   - Proposed solution + trade-offs
   - Code changes (diff style when possible)
   - Risks & edge cases
   - Testing recommendations

2. **Force reasoning before code**
   Never accept code without preceding reasoning.

3. **Iterate with criticism**
   After receiving code, always ask the AI to critique its own output against ORP axioms.

4. **Keep context small and focused**
   Large files = high drift risk. Prefer small, single-responsibility modules.

5. **Version and review aggressively**
   Treat AI-generated code with the same (or higher) scrutiny as human code.

---

## Recommended Prompt Patterns

### Basic Refactor Prompt
```
You are operating under ORP_RUNTIME_CODE governance.

Refactor the following code according to the axioms:
- Signal > Cleverness
- No Hidden Shit
- Recoverability First

[Code here]

First explain your reasoning, then provide the refactored code.
```

### New Feature Prompt
```
Create a new feature following ORP_RUNTIME_CODE rules.

Requirements: [list]

Think step by step:
1. Understand scope and edge cases
2. Design minimal viable implementation
3. Consider future maintainability

Output in this exact order:
1. Summary of approach
2. Potential risks
3. Complete code
4. Suggested tests
```

---

## Code Review Checklist (ORP-CODE Review)

- Does every piece of code serve a clear, necessary purpose? (Chekhov's Gun)
- Is the code understandable by a competent junior in < 30 seconds per function?
- Are there any hidden side effects or magic?
- Is error handling explicit and recoverable?
- Are variable and function names honest and descriptive?
- Is complexity justified by profiling or requirements?
- Does it introduce unnecessary abstraction layers?

---

**Current Status:** This is v0.1 — a living document.

We will evolve it as we use it in practice.

---

**End of Document**

