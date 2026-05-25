# ORP — CONTRIBUTING
## ORP v3.0 — Governance‑Aligned Contribution Protocol

This document defines contribution rules and architectural expectations for the ORP repository.  
Its purpose is to preserve:

- epistemic integrity  
- provenance preservation  
- structural consistency  
- isolation‑safe modification  
- drift‑resistant behavior  
- alignment with the ORP v3.0 governance model  

This document governs repository modifications only.  
It does not redefine system behavior.

---

## Before Contributing

Review the following core documents:

- core/ORP_RUNTIME.md  
- core/ORP_CORE_SPEC.md  
- core/ORP_SYSTEM_MAP.md  
- core/ORP_SYSTEM_ARCHITECTURE.md  
- constraints/ORP_PROMPT.md  
- docs/!REPO_CHECKLIST.md  
- docs/RELEASE_NOTES.md  

Contributors must understand the separation between:

- runtime governance (L3 authority)  
- structural contracts (evaluation schema)  
- epistemic isolation (L1–L4 boundaries)  
- drift observability (σ² model)  
- anti‑degradation constraints  

before modifying any core subsystem.

---

## Contribution Areas

### 1. Governance‑Aligned Improvements
Examples:
- stronger provenance preservation  
- improved uncertainty surfacing  
- enhanced epistemic separation  
- refined drift‑detection logic  
- improved fail‑closed behavior  

### 2. Evaluation & Benchmark Expansion
Examples:
- adversarial reasoning tests  
- drift‑induction scenarios  
- coherence‑camouflage detection cases  
- provenance‑corruption stress tests  

### 3. Infrastructure & Tooling
Examples:
- reproducibility tooling  
- traceability utilities  
- local evaluation helpers  
- documentation automation  

---

## Architectural Constraints

All contributions must preserve:

- strict L1–L4 isolation  
- deterministic governance flow  
- schema/runtime compatibility  
- provenance boundaries  
- numeric drift observability  
- fail‑closed execution behavior  

No contribution may:

- merge responsibilities across architecture layers  
- introduce hidden cross‑file dependencies  
- bypass runtime or schema constraints  
- reinterpret upstream outputs  
- weaken epistemic separation rules  
- obscure drift or provenance signals  

---

## Runtime Alignment Requirement

Changes affecting:

- reasoning behavior  
- provenance handling  
- uncertainty representation  
- drift semantics  
- governance logic  
- evaluation structure  

must remain aligned with:

- core/ORP_RUNTIME.md  
- core/ORP_CORE_SPEC.md  
- core/ORP_SYSTEM_MAP.manifest.json  

Architecture drift between documents is considered a structural regression.

---

## Pull Request Guidance

### Use the Full PR Template for:
- runtime changes  
- schema modifications  
- governance logic updates  
- evaluation pipeline changes  
- drift or provenance rule adjustments  

Template:  
`.github/PULL_REQUEST_TEMPLATE/orp-pr-full.md`

### Use the Trivial PR Template for:
- typo fixes  
- formatting cleanup  
- documentation clarification  
- non‑structural examples  

Template:  
`.github/PULL_REQUEST_TEMPLATE/orp-pr-trivial.md`

---

## Validation Rule

A contribution is valid only if it:

- preserves architectural consistency  
- maintains epistemic separation  
- avoids provenance corruption  
- remains schema‑compatible  
- does not reduce recoverability  
- does not weaken drift observability  

Usability improvements must not compromise structural integrity.

---

## Roadmap Note

ORP v3.0 development is governance‑driven and community‑guided.

Current areas of interest include:

- traceability tooling  
- reasoning‑graph outputs  
- modular evaluators  
- benchmark generation systems  
- future Python package infrastructure  

See `docs/ORP_ROADMAP.md` for directional planning.

---

## Design Principle

> Visible uncertainty is preferable to invisible corruption.

Signal integrity overrides stylistic convenience.

---

## Final Note

ORP is a governance‑first epistemic architecture, not a conversational framework.  
Contributions should strengthen structural reliability, not narrative fluency.
