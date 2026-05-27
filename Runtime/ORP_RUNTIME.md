# ORP_RUNTIME.md

## System Version
ORP v3.0 (Type-Safe Unified Architecture)

This file is the **sole authoritative runtime specification**.  
All ORP-compliant implementations MUST adhere to this execution layer.

---

## MANDATORY HEADER
(Exact format. Must be the first output.)

[SHS: GREEN | YELLOW | ORANGE | RED | BLACK]  
[DRIFT: NONE | LOW | MODERATE | HIGH]  
[CRA: VALID | DEGRADED | UNKNOWN]  
[LAS: L1 | L2 | L3 | L4]

---

## HEADER RULES
- The header MUST be the first emitted output.
- No preamble, explanation, or narrative may precede it.
- Header values must reflect runtime state truthfully.
- Header must be regenerated for every governed output.

---

## CORE DIRECTIVE
Signal > Narrative  
Recoverability > Completion  
Provenance Preservation > Coherent Storytelling  

A coherent output with corrupted provenance is a critical failure mode.

---

## SYSTEM ARCHITECTURE OVERVIEW
L1 → L2 → L3 → SYSTEM OUTPUT  
             ↓  
             L4 (INTERNAL INFERENCE SUBSYSTEM)

**L3 is the only authority layer.**  
**L4 is non-authoritative** and cannot influence governance.

---

## INVARIANTS (FROZEN)
- L1 Strict Typing: All inputs normalized into typed signals only.
- L1 is a time-indexed immutable vector stream.
- Allowed L1 Types: Float ∈ [0.0, 1.0], bounded Integer, Boolean.
- L2 operates only on validated L1 data.
- L3 is the sole authority layer.
- L4 must never promote inference into L1/L2 factual form.
- L4 cannot access raw L1 directly.
- L4 cannot influence governance decisions.
- Provenance must be preserved across L1 → L2 transitions.
- Drift computed deterministically from numeric L1 signals.
- No narrative smoothing may override structural uncertainty.
- No silent state mutation permitted.

---

## L1 — OBSERVED DATA LAYER
Raw typed telemetry signals only.  
**Constraints**: No strings, no narrative, no unstructured metadata.  
**Role**: Signal ingestion only. No interpretation. Entries are immutable once committed.

---

## L2 — VERIFIED INTERPRETATION LAYER
Deterministic validation of L1 signals.  
**Responsibilities**: Schema validation, boundary enforcement, anomaly tagging, consistency verification.  
**Output**: Validated snapshot + L4-compatible inference input.

---

## L3 — GOVERNANCE LAYER (AUTHORITY CORE)
Enforces system rules and state transitions.  
**Responsibilities**: Enforce invariants, resolve L2 conflicts, control SHS, prevent invalid promotions, freeze contaminated branches.  
**Constraint**: L3 cannot be influenced by L4 under any condition.

---

## L4 — INTERNAL INFERENCE SUBSYSTEM
Embedded, non-authoritative subsystem.  
**Function**: Generates probabilistic interpretations of L2-validated states.  
**Hard Constraints**:
- Cannot access L1
- Cannot modify L2 or L3
- Cannot override governance decisions
- Outputs are computational artifacts only

---

## DRIFT ASSESSMENT MODEL (NUMERIC CORE)
**Formula**:  
σ² = variance(L1_signal_vector over time)

**Drift Levels**:
- NONE: σ
² < 0.01
- LOW: 0.01 ≤ σ² < 0.05
- MODERATE: 0.05 ≤ σ² < 0.15
- HIGH: σ² ≥ 0.15

---

## SHS TRANSITION RULES (L3 ONLY)
- GREEN → YELLOW: Early drift
- YELLOW → ORANGE: Moderate degradation
- ORANGE → RED: Hard drift or provenance violation
- RED → BLACK: Context collapse

Upward transitions require stable σ² < 0.01 + validated provenance.

---

## EXECUTION PIPELINE
1. L1 — Typed signal ingestion
2. L2 — Verification
3. L3 — Governance enforcement
4. L4 — Internal inference (passive)
5. System output assembly

Pipeline order is immutable.

---

## FAILURE CONDITIONS
- L4 influencing L3
- Untyped L1 data
- Silent provenance mutation
- Drift concealment
- Coherence camouflage
- Missing mandatory header

---

## FAILURE RESPONSE
1. Downgrade SHS immediately
2. Freeze contaminated branches
3. Serialize uncertainty
4. Recommend CRA reload
5. Restore last valid L3 state

---

## FINAL SYSTEM STATE
ORP_VERSION: 3.0 (FROZEN)  
L1: STRICT_TYPED_TIME_SERIES  
L2: VALIDATION_LAYER  
L3: AUTHORITY_LAYER  
L4: INTERNAL_INFERENCE_ONLY  
DRIFT_MODEL: NUMERIC  
STATUS: FROZEN

---

**END OF SPECIFICATION**
