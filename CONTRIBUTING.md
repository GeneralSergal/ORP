# ORP — CONTRIBUTING

## System Version

ORP v2.5 (Unified System Architecture)

---

## Purpose

This document defines contribution rules and architectural expectations for the ORP repository.

Its purpose is to preserve:

- epistemic integrity
- provenance preservation
- structural consistency
- deterministic evaluation behavior
- runtime/schema synchronization

This document governs repository modifications only.
It does not redefine system behavior.

---

## Before Contributing

Please review:

- README.md
- ORP_RUNTIME.md
- EVALUATION_SCHEMA.md
- SYSTEM_MAP.md
- ROADMAP.md
- !REPO_CHECKLIST.md

Contributors should understand the separation between:
- runtime governance
- structural contracts
- evaluation logic
- scoring behavior
- benchmark stress-testing

before modifying core files.

---

## Contribution Areas

### 1. Epistemic Improvements
Examples:
- improved claim decomposition logic
- stronger uncertainty isolation
- provenance preservation enhancements
- better distortion detection rules
- recoverability improvements

---

### 2. Benchmark Expansion
Examples:
- adversarial reasoning tests
- hallucination stress cases
- causal distortion scenarios
- provenance corruption tests
- drift-observability benchmarks

---

### 3. Infrastructure & Tooling
Examples:
- local execution tooling
- evaluation automation
- reproducibility improvements
- future Python package support
- visualization or traceability tooling

---

## Architectural Constraints

Contributions must preserve:

- separation of concerns
- deterministic pipeline flow
- schema/runtime compatibility
- provenance boundaries
- fail-closed reasoning behavior

No contribution may:
- merge architecture layer responsibilities
- introduce hidden cross-file dependencies
- bypass runtime or schema constraints
- reinterpret upstream outputs
- weaken epistemic separation rules

---

## Runtime Alignment Requirement

Changes affecting:
- reasoning behavior
- provenance handling
- uncertainty representation
- drift semantics
- evaluation structure

must remain aligned with:

- ORP_RUNTIME.md
- EVALUATION_SCHEMA.md
- SYSTEM_MAP.manifest.json

Architecture drift between documents is considered a structural regression.

---

## Pull Request Guidance

### Use the Full PR Template for:
- runtime changes
- schema modifications
- scoring changes
- benchmark architecture updates
- evaluation logic changes

Template:
`.github/PULL_REQUEST_TEMPLATE/orp-pr-full.md`

---

### Use the Trivial PR Template for:
- typo fixes
- formatting cleanup
- documentation clarification
- non-structural examples

Template:
`.github/PULL_REQUEST_TEMPLATE/orp-pr-trivial.md`

---

## Validation Rule

A contribution is valid only if it:

- preserves architectural consistency
- maintains epistemic separation
- avoids provenance corruption
- remains schema-compatible
- does not reduce recoverability

Usability improvements must not weaken structural integrity.

---

## Roadmap Note

ORP v3.0 development is exploratory and community-driven.

Current areas of interest include:
- Python package infrastructure
- assumption surfacing
- traceability tooling
- reasoning graph outputs
- modular evaluators
- benchmark generation systems

See ROADMAP.md for directional planning.

---

## Design Principle

> Visible uncertainty is preferable to invisible corruption.

Signal integrity overrides stylistic convenience.

---

## Final Note

ORP is an epistemic evaluation architecture, not a conversational framework.

Contributions should improve structural reliability rather than narrative sophistication.
