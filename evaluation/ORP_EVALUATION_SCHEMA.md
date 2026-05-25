# ORP_EVALUATION_SCHEMA.md

## System Version
ORP v3.0 (Type-Safe Unified Architecture)

---

## Purpose

This document defines the structural transformation pipeline used across the ORP stack.

It governs how information is:
- ingested
- atomized
- classified
- analyzed
- filtered
- reconstructed
- monitored for drift

It operates alongside:
- `ORP_PROMPT.md`
- `ORP_RUBRIC.md`
- `ORP_SCORING.md`
- `ORP_RUNTIME.md`
- `ORP_BENCHMARK.md`

This document defines structure and transformation rules only.

It does NOT define:
- scoring logic
- stylistic preferences
- conversational behavior
- persuasion quality

---

## Core Principle

Each layer transforms information only within its defined authority boundary.

No layer may:
- reinterpret upstream meaning
- silently rewrite provenance
- overwrite frozen state
- normalize uncertainty into certainty
- promote L4 inference into L1/L2 factual form

---

## Governance Model

ORP v3.0 uses a Type-Safe Unified Architecture with runtime governance awareness through:
- SHS (Session Health State)
- LAS (Layered Authority Stack)
- Numeric Drift Observability (σ² model)
- Provenance Preservation
- Recovery-Oriented Execution

The schema must remain recoverable under partial context degradation.

---

## Layered Authority Stack (LAS)

| Layer | Authority |
|-------|---------------------------------------------------|
| L1    | Direct evidence / observed typed signals          |
| L2    | Verified interpretation / constrained synthesis   |
| L3    | Protocol / governance / operational rules         |
| L4    | Inference / speculation / probabilistic synthesis (non-authoritative) |

---

## Critical Authority Rule

L4 inference/speculation must **NEVER** overwrite frozen L1/L2 provenance.

Any attempted overwrite constitutes:
- provenance laundering
- context corruption
- hard drift event

---

## 1. INPUT INGESTION

**Function**: Capture raw input exactly as received.

**Rules**:
- Preserve all claims verbatim
- Preserve temporal ordering
- Preserve uncertainty markers
- Preserve stated provenance
- No normalization
- No correction
- No interpretation

**Forbidden**:
- Rewriting user meaning
- Semantic compression
- Assumption injection
- Hidden reconstruction

---

## 2. CLAIM ATOMIZATION

**Function**: Convert input into isolated atomic units.

**Output Units**:
- Factual claims
- Inferred claims
- Speculative claims
- Explicit structural relationships

**Rules**:
- Each claim must remain independent
- No claim merging
- No implied claim generation
- No synthesis between unrelated claims
- Preserve original claim boundaries

**Drift Monitoring**:
Watch for claim compression, narrative fusion, or assumption propagation — these indicate early drift.

---

## 3. EPISTEMIC TAGGING

**Function**: Assign a single epistemic state to each atomic claim.

**Allowed Labels**:
- Verified
- Unverified
- Speculative
- Disputed
- Invalid

**Rules**:
- Exactly one label per claim
- No hybrid states
- No confidence inflation
- Plausibility is NOT evidence
- Uncertainty must remain explicit

**Forbidden**:
- Converting speculation into verification
- Certainty laundering
- Implicit upgrades of claim authority

---

## 4. RELATIONSHIP ANALYSIS

**Function**: Analyze explicit logical relationships between claims.

**Allowed Relationship Types**:
- Causal link (explicit only)
- Dependency link (explicit only)
- Contradiction
- Independence

**Detectable Distortions**:
- Causal inversion
- Importance distortion
- False synthesis
- Recency bias override
- Assumption laundering
- Coherence camouflage

**Rules**:
- Analyze explicit structure only
- No hidden relationship inference
- No external knowledge insertion
- No narrative gap filling

---

## 5. INTEGRITY FILTER

**Function**: Enforce provenance boundaries and epistemic separation.

**Constraints**:
- No category blending
- No uncertainty collapse
- No assumption bridging
- No narrative smoothing over uncertainty
- No silent temporal rewrites

**Enforcement Rules**:
- Invalid claims remain non-causal
- Hallucinated anchors must be isolated
- Speculative claims cannot become causal drivers
- L4 outputs must remain explicitly marked

**Drift Detection**:
The integrity filter monitors for coherence camouflage, synthetic continuity, provenance degradation, false memory persistence, and frozen-state mutation. Detection triggers SHS downgrade procedures.

---

## 6. OUTPUT RECONSTRUCTION

**Function**: Rebuild the most epistemically consistent interpretation possible.

**Allowed Inputs**:
- Verified claims
- Explicitly labeled uncertainty
- Frozen L1/L2 provenance

**Rules**:
- No new information generation
- No unsupported extrapolation
- No hidden causal insertion
- Preserve uncertainty boundaries
- Preserve provenance lineage

**Reconstruction Priority**:
1. Recoverability
2. Provenance integrity
3. Structural consistency
4. Narrative coherence

Narrative coherence is always subordinate to provenance preservation.

---

## 7. DRIFT GOVERNANCE LAYER (DGL)

**Function**: Monitor reliability degradation across session runtime.

**Observable Drift Classes**:

**LOW DRIFT**
- Verbosity inflation
- Stylistic smoothing
- Weakened uncertainty qualifiers

**MODERATE DRIFT**
- Confidence inflation
- Narrative smoothing over provenance
- Temporal inconsistencies
- Assumption laundering
- σ² in moderate range

**HIGH DRIFT**
- Fabricated provenance
- Synthetic continuity
- L4 promoted to L1/L2
- Frozen-state mutation
- Coherence camouflage
- σ² in high range

---

## Session Health State (SHS)

| SHS    | Meaning                          |
|--------|----------------------------------|
| GREEN  | Stable operation                 |
| YELLOW | Minor drift possible             |
| ORANGE | Moderate drift detected          |
| RED    | Hard drift detected              |
| BLACK  | Context collapse                 |

---

## Failure Response Rules

On hard drift detection:
- Downgrade SHS immediately
- Serialize uncertainty explicitly
- Halt contaminated reasoning branch
- Recommend CRA/state reload
- Avoid narrative continuation until provenance stabilizes

---

## System Interface Contracts

- `ORP_PROMPT.md` — Defines execution behavior and epistemic constraints
- `ORP_RUNTIME.md` — Defines mandatory runtime governance behavior
- `ORP_BENCHMARK.md` — Introduces adversarial and distortion-heavy inputs
- `ORP_RUBRIC.md` — Evaluates qualitative reasoning integrity
- `ORP_SCORING.md` — Converts rubric evaluation into numeric scoring

---

## Critical System Rules

- No layer may reinterpret upstream output
- No downstream influence on upstream meaning
- No silent provenance mutation
- No hidden state rewriting
- No semantic drift between stages
- No coherence camouflage

---

## Design Principle

The schema exists to preserve:
- provenance integrity
- recoverability
- drift observability
- structural reasoning stability

ORP assumes transformer outputs are probabilistic and drift-prone.  
Therefore:  
**Visible uncertainty is preferred over invisible corruption.**

---

**END OF EVALUATION SCHEMA**
