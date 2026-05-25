# ORP RUNTIME — Compact Execution Core

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

---

## INVARIANTS

- L1 Strict Typing: All inputs must be normalized into typed signals only. No raw strings permitted in L1.
- L1 Temporal Definition: L1 is a time-indexed vector stream of typed signals. Each state is immutable once committed.
- L1 Types Allowed: Float ∈ [0.0, 1.0], Integer (bounded), Boolean.
- L2 must operate only on validated L1 data.
- L3 is the sole authority layer.
- L4 must never promote inference into L1/L2 factual form.
- L4 is internal only and cannot access raw L1 directly.
- Provenance must be preserved across L1 → L2 transitions.
- Drift must be computed deterministically from numeric L1 signals.
- Dashboard: Fully integrated as heuristic overlay only. No external files or dependencies.

---

## L1 — OBSERVED DATA LAYER

**Definition:**  
L1 contains only raw typed telemetry signals.

**Constraints:**  
- No strings as data  
- No narrative fields  
- No unstructured metadata  

**Role:** Signal ingestion only. No interpretation. No validation logic.

---

## L2 — VERIFIED INTERPRETATION LAYER

**Function:** Deterministic validation of L1 signals.

**Responsibilities:**  
- Schema validation  
- Boundary enforcement  
- Anomaly tagging  
- Consistency verification  

**Output:** Structured validated snapshot + L4-compatible inference input.

---

## L3 — GOVERNANCE LAYER (AUTHORITY CORE)

**Function:** Enforces system rules and state transitions.

**Responsibilities:**  
- Enforce invariants  
- Resolve L2 conflicts  
- Control system state transitions  
- Prevent invalid promotions  

**Constraint:** L3 cannot be influenced by L4 under any condition.

---

## L4 — INTERNAL TELEMETRY INFERENCE SUBSYSTEM

**Status:** Embedded subsystem (not external)

**Function:** Generates probabilistic interpretation of L2-validated states.

**Inputs:** L2-only validated snapshots

**Outputs:**  
- Anomaly hypotheses  
- Probabilistic interpretation  
- Drift projections  

**Hard Constraints:**  
- Cannot access L1 directly  
- Cannot modify L2 or L3  
- Cannot declare system truth  
- Cannot override governance decisions  
- L4 outputs are computational artifacts only. Visualization is optional and external to execution semantics.

**Role:** L4 is an inference system, not an authority system.

---

## DRIFT ASSESSMENT MODEL (NUMERIC CORE)

**Formula:**  
σ² = variance(L1_signal_vector over time)

**Supporting signals:**  
- hash(L1 → L2 transition delta)  
- temporal stability gradient

---

## DRIFT LEVELS

- **NONE**: σ² < 0.01  
- **LOW**: 0.01 ≤ σ² < 0.05  
- **MODERATE**: 0.05 ≤ σ² < 0.15  
- **HIGH**: σ² ≥ 0.15

---

## OPERATIONAL STABILIZATION GUIDELINES (Non-Authoritative)

**Primary Governance Signals (L3):**  
- Drift (σ²)  
- L1 signal integrity  
- L2 validation results  

**Heuristic Monitoring Metrics (L4 Visualization Only):**  
- **Hydration**: 85–100%  
- **Chaos**: 0–5%  
- **Vibe (Coherence)**: 85–95%

**Expansion Policy:** Cyclical only. Gate exclusively on Drift=NONE + L3 validation success.  
**White Hat Gating Protocol (WHGP):** Active fluke/malice/noise filtering.  
**Kill Switch:** `NO_SLOP_ZONE` / LOCKDOWN on Chaos >10% or anchor loss (heuristic trigger only).

**Refinement Cycle:**  
Lock refined truth → Discard flukes → Enhanced signal.

**Note:**  
Hydration, Chaos, and Vibe are non-authoritative heuristic indicators.  
They have no direct influence on L3 governance decisions or DRIFT calculation.

---

## EXECUTION PIPELINE

1. L1 — Signal ingestion (typed only)  
2. L2 — Verification and validation  
3. L3 — Governance enforcement  
4. L4 — Internal inference (passive only)  
5. System output assembly

---

## FAILURE CONDITIONS

- L4 influencing L3 decisions  
- Untyped L1 data leakage  
- Silent schema mutation  
- Invalid state promotion  
- Drift concealment through narrative smoothing

---

## ON FAILURE

1. Downgrade SHS immediately  
2. Freeze L1 signal stream  
3. Recompute L2 snapshot  
4. Halt L4 inference  
5. Restore last valid L3 state

---

## OPERATIONAL PHILOSOPHY

- Typed signals over narrative interpretation  
- Drift visibility over coherence masking  
- Governance correctness over completion  
- Recoverability over smooth output

---

## FINAL SYSTEM STATE

ORP_VERSION: 3.0 (FROZEN)  
L1: STRICT_TYPED_TIME_SERIES  
L2: VALIDATION_LAYER  
L3: AUTHORITY_LAYER  
L4: INTERNAL_INFERENCE_ONLY + INTEGRATED_HEURISTIC_OVERLAY  
DRIFT_MODEL: NUMERIC  
DASHBOARD: EMBEDDED (HEURISTIC OVERLAY ONLY)  
CHANGE_POLICY: LOG_ONLY  
STATUS: FROZEN

---

END OF SPECIFICATION
