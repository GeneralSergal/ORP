# ORP_SYSTEM_MAP.md

## System Version
ORP v3.0 (Type-Safe Unified Architecture)

---

## Purpose

This document defines the human-readable architecture of the ORP system.  
It describes how all components interact as a unified epistemic governance pipeline.

This file acts as:
- the contributor entry point
- the architecture overview
- the layer responsibility reference
- the protocol dependency map

It is **NOT**:
- an evaluation tool
- a scoring document
- a benchmark specification

---

## Sub-Versioning Policy

Subsystems may maintain independent internal revisions.  
Current files (with `ORP_` prefix):
- `ORP_PROMPT.md`
- `ORP_RUNTIME.md`
- `ORP_BENCHMARK.md`
- `ORP_RUBRIC.md`
- `ORP_SCORING.md`
- `ORP_EVALUATION_SCHEMA.md`
- `ORP_CORE_SPEC.md`
- `ORP_SYSTEM_ARCHITECTURE.md`
- `ORP_META_MAP.md`
- `ORP_MODEL_DECAY_TRACKER.md`
- `ORP_ORIGIN.md`
- `ORP_ANTI_DEGRADATION.md` (new)
- `ORP_ARCHITECTURE.md`

**Rules**:
- Sub-versions must remain compatible with ORP v3.0 core invariants
- Internal revisions must not violate runtime governance rules
- Breaking structural changes require architecture version escalation
- No subsystem may redefine another subsystem’s responsibility
- Runtime governance invariants supersede local subsystem behavior

---

## System Overview

ORP operates as a layered epistemic governance architecture with strict type-safe L1–L4 separation.

The protocol combines:
- Execution constraints
- Runtime observability (SHS + σ² drift)
- Adversarial stress testing
- Structured transformation contracts
- Qualitative evaluation
- Quantitative scoring
- Recoverability governance
- Anti-degradation monitoring

---

## Architectural Layers

### 1. ORP_RUNTIME.md
Runtime governance and execution enforcement layer (L3 Authority Kernel).

**Responsibilities**:
- Mandatory runtime headers
- SHS state management
- Numeric drift detection (σ² model)
- Provenance preservation
- Coherence camouflage detection
- Runtime failure handling
- Bounded inference behavior

**Key Principle**: Governance must remain observable during execution.

### 2. ORP_PROMPT.md
Behavioral reasoning constraint layer.

**Responsibilities**:
- Claim atomization
- Epistemic separation
- Uncertainty preservation
- Reconstruction discipline
- Causal integrity constraints

**Key Principle**: Reasoning must remain structurally constrained before evaluation.

### 3. ORP_BENCHMARK.md
Stress-testing and adversarial input layer.

**Responsibilities**:
- Adversarial reasoning tests
- Counterfactual stability testing
- Drift induction
- Hallucination exposure
- Failure envelope mapping

**Key Principle**: Failure modes must be intentionally observable.

### 4. MODEL_RESPONSE
Model-generated output under ORP governance.

**Responsibilities**:
- Runtime execution
- Constrained reasoning generation
- Provenance handling
- Uncertainty serialization
- SHS-compliant behavior

**Key Principle**: Generated output is governed, not trusted.

### 5. ORP_EVALUATION_SCHEMA.md
Structural transformation and integrity contract layer.

**Responsibilities**:
- Atomic claim transformation
- Epistemic tagging
- Relationship analysis
- Reconstruction boundaries
- Transformation consistency

**Key Principle**: Structure preservation takes priority over narrative continuity.

### 6. ORP_RUBRIC.md
Qualitative reasoning integrity evaluation layer.

**Responsibilities**:
- Distortion detection
- Provenance integrity assessment
- Governance compliance analysis
- Drift severity evaluation
- Structural integrity review

**Key Principle**: Reasoning quality is evaluated through integrity, not fluency.

### 7. ORP_SCORING.md
Quantitative aggregation and operational scoring layer.

**Responsibilities**:
- Weighted scoring
- Penalty application
- SHS-linked interpretation
- Drift severity aggregation
- Operational integrity measurement

**Key Principle**: Scores measure reasoning stability, not stylistic quality.

### 8. ORP_ANTI_DEGRADATION.md (New)
Anti-degradation monitoring and defense layer.

**Responsibilities**:
- Tracks model degradation patterns
- Supports L4 observational diagnostics
- Feeds signals into runtime governance
- Helps maintain long-term system integrity

**Key Principle**: Proactive resistance to model decay and coherence camouflage.

### 9. FINAL OUTPUT STATE
Final evaluated reasoning condition.

**Outputs**:
- Final score
- SHS state
- Detected distortions
- Drift classification
- Recoverability assessment

**Key Principle**: Recoverable uncertainty is preferable to coherent corruption.

---

## Runtime Governance Additions (v3.0)

ORP v3.0 introduces Type-Safe Runtime Governance with anti-degradation capabilities.  
The protocol evaluates:
- Static reasoning correctness
- Runtime stability
- Context degradation
- Temporal continuity
- Provenance persistence
- Numeric drift observability (σ²)
- Recovery capability
- Model decay resistance

---

## Session Health State (SHS)

| State   | Meaning                                      |
|---------|----------------------------------------------|
| GREEN   | Stable execution                             |
| YELLOW  | Minor drift indicators                       |
| ORANGE  | Moderate degradation                         |
| RED     | Hard drift / bounded inference only          |
| BLACK   | Context collapse                             |

---

## Layered Authority Stack (LAS)

| Layer | Meaning                                           |
|-------|---------------------------------------------------|
| L1    | Direct evidence / observed typed signals          |
| L2    | Verified interpretation / constrained synthesis   |
| L3    | Protocol governance / operational rules (authority) |
| L4    | Speculation / probabilistic inference (non-authoritative) |

**Critical Rule**: L4 must never overwrite frozen L1/L2 provenance.

---

## Coherence Camouflage

Primary transformer failure mode where stylistic coherence persists while provenance degrades.

---

## Full Pipeline Flow

1. INPUT  
2. `ORP_RUNTIME.md` (runtime governance)  
3. `ORP_PROMPT.md` (behavioral constraints)  
4. `ORP_BENCHMARK.md` (stress injection)  
5. MODEL RESPONSE  
6. `ORP_EVALUATION_SCHEMA.md` (structural transformation)  
7. `ORP_RUBRIC.md` (qualitative evaluation)  
8. `ORP_SCORING.md` (quantitative aggregation)  
9. FINAL OUTPUT STATE

---

## System Design Principles

1. **Separation of Concerns** — Strict single-responsibility layers.  
2. **No Cross-Contamination** — No reinterpretation of upstream outputs.  
3. **Epistemic Isolation** — Backward influence prohibited.  
4. **Failure Transparency** — Visible drift and degradation preferred.  
5. **Recoverability Over Completion** — Provenance first.

---

## Design Intent

**ORP IS**:
- A governance-first reasoning protocol
- A drift-observable & anti-degradation framework
- A provenance preservation system
- A structured epistemic architecture
- A recoverable reasoning environment

**ORP IS NOT**:
- A chatbot personality layer
- A creativity enhancement framework
- A persuasion engine
- A narrative optimization system

---

## Final Principle

A reasoning system is only as reliable as its ability to preserve provenance under degradation.  
**Signal > Narrative.**

---

**END OF SYSTEM MAP**
