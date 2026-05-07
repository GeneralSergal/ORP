# ORP - Evaluation Schema

## System Version

ORP v2.5 (Governance & Drift-Aware Architecture)

---

# Purpose

This document defines the structural transformation pipeline used across the ORP stack.

It governs how information is:

* ingested
* atomized
* classified
* analyzed
* filtered
* reconstructed
* monitored for drift

It operates alongside:

* `PROMPT.md`
* `RUBRIC.md`
* `SCORING.md`
* `ORP_RUNTIME.md`
* `BENCHMARK.md`

This document defines structure and transformation rules only.

It does NOT define:

* scoring logic
* stylistic preferences
* conversational behavior
* persuasion quality

---

# CORE PRINCIPLE

Each layer transforms information only within its defined authority boundary.

No layer may:

* reinterpret upstream meaning
* silently rewrite provenance
* overwrite frozen state
* normalize uncertainty into certainty

---

# GOVERNANCE MODEL

ORP v2.5 introduces runtime governance awareness through:

* SHS (Session Health State)
* LAS (Layered Authority Stack)
* Drift Observability
* Provenance Preservation
* Recovery-Oriented Execution

The schema must remain recoverable under partial context degradation.

---

# LAYERED AUTHORITY STACK (LAS)

| Layer | Authority                                         |
| ----- | ------------------------------------------------- |
| L1    | Direct evidence / observed data                   |
| L2    | Verified interpretation / constrained synthesis   |
| L3    | Protocol / governance / operational rules         |
| L4    | Inference / speculation / probabilistic synthesis |

---

# CRITICAL AUTHORITY RULE

L4 inference/speculation must NEVER overwrite frozen L1/L2 provenance.

Any attempted overwrite constitutes:

* provenance laundering
* context corruption
* hard drift event

---

# 1. INPUT INGESTION

## Function

Capture raw input exactly as received.

## Rules

* Preserve all claims verbatim
* Preserve temporal ordering
* Preserve uncertainty markers
* Preserve stated provenance
* No normalization
* No correction
* No interpretation

## Forbidden

* rewriting user meaning
* semantic compression
* assumption injection
* hidden reconstruction

---

# 2. CLAIM ATOMIZATION

## Function

Convert input into isolated atomic units.

## Output Units

* factual claims
* inferred claims
* speculative claims
* explicit structural relationships

## Rules

* Each claim must remain independent
* No claim merging
* No implied claim generation
* No synthesis between unrelated claims
* Preserve original claim boundaries

## Drift Monitoring

Watch for:

* claim compression
* narrative fusion
* assumption propagation

These indicate early drift.

---

# 3. EPISTEMIC TAGGING

## Function

Assign a single epistemic state to each atomic claim.

## Allowed Labels

* Verified
* Unverified
* Speculative
* Disputed
* Invalid

## Rules

* Exactly one label per claim
* No hybrid states
* No confidence inflation
* Plausibility is NOT evidence
* Uncertainty must remain explicit

## Forbidden

* converting speculation into verification
* certainty laundering
* implicit upgrades of claim authority

---

# 4. RELATIONSHIP ANALYSIS

## Function

Analyze explicit logical relationships between claims.

## Allowed Relationship Types

* causal link (explicit only)
* dependency link (explicit only)
* contradiction
* independence

## Detectable Distortions

* causal inversion
* importance distortion
* false synthesis
* recency bias override
* assumption laundering
* coherence camouflage

## Rules

* Analyze explicit structure only
* No hidden relationship inference
* No external knowledge insertion
* No narrative gap filling

---

# 5. INTEGRITY FILTER

## Function

Enforce provenance boundaries and epistemic separation.

## Constraints

* No category blending
* No uncertainty collapse
* No assumption bridging
* No narrative smoothing over uncertainty
* No silent temporal rewrites

## Enforcement Rules

* Invalid claims remain non-causal
* Hallucinated anchors must be isolated
* Speculative claims cannot become causal drivers
* L4 outputs must remain explicitly marked

## Drift Detection

The integrity filter must monitor for:

* coherence camouflage
* synthetic continuity
* provenance degradation
* false memory persistence
* frozen-state mutation

Detection triggers SHS downgrade procedures.

---

# 6. OUTPUT RECONSTRUCTION

## Function

Rebuild the most epistemically consistent interpretation possible.

## Allowed Inputs

* Verified claims
* Explicitly labeled uncertainty
* Frozen L1/L2 provenance

## Rules

* No new information generation
* No unsupported extrapolation
* No hidden causal insertion
* Preserve uncertainty boundaries
* Preserve provenance lineage

## Reconstruction Priority

1. Recoverability
2. Provenance integrity
3. Structural consistency
4. Narrative coherence

Narrative coherence is always subordinate to provenance preservation.

---

# 7. DRIFT GOVERNANCE LAYER (DGL)

## Function

Monitor reliability degradation across session runtime.

## Observable Drift Classes

### LOW DRIFT

* verbosity inflation
* stylistic smoothing
* weakened uncertainty qualifiers

### MODERATE DRIFT

* confidence inflation
* narrative smoothing over provenance
* temporal inconsistencies
* assumption laundering

### HIGH DRIFT

* fabricated provenance
* synthetic continuity
* L4 promoted to L1/L2
* frozen-state mutation
* coherence camouflage

---

# SESSION HEALTH STATE (SHS)

| SHS    | Meaning                 |
| ------ | ----------------------- |
| GREEN  | Stable operation        |
| YELLOW | Minor drift possible    |
| ORANGE | Moderate drift detected |
| RED    | Hard drift detected     |
| BLACK  | Context collapse        |

---

# FAILURE RESPONSE RULES

On hard drift detection:

* downgrade SHS immediately
* serialize uncertainty explicitly
* halt contaminated reasoning branch
* recommend CRA/state reload
* avoid narrative continuation until provenance stabilizes

---

# SYSTEM INTERFACE CONTRACTS

## PROMPT.md

Defines execution behavior and epistemic constraints.

## ORP_RUNTIME.md

Defines mandatory runtime governance behavior.

## BENCHMARK.md

Introduces adversarial and distortion-heavy inputs.

## RUBRIC.md

Evaluates qualitative reasoning integrity.

## SCORING.md

Converts rubric evaluation into numeric scoring.

---

# CRITICAL SYSTEM RULES

* No layer may reinterpret upstream output
* No downstream influence on upstream meaning
* No silent provenance mutation
* No hidden state rewriting
* No semantic drift between stages
* No coherence camouflage

---

# DESIGN PRINCIPLE

The schema exists to preserve:

* provenance integrity
* recoverability
* drift observability
* structural reasoning stability

ORP assumes transformer outputs are probabilistic and drift-prone.

Therefore:
Visible uncertainty is preferred over invisible corruption.
