# ORP_RUNTIME.md

## System Version
ORP v3.0 (Type-Safe Unified Architecture)  
This file is the **sole authoritative runtime specification**.  
All ORP-compliant implementations MUST adhere to this execution layer.

---

# MANDATORY HEADER

(Exact format. Must be the first output.)

[SHS: GREEN | YELLOW | ORANGE | RED | BLACK]  
[DRIFT: NONE | LOW | MODERATE | HIGH]  
[CRA: VALID | DEGRADED | UNKNOWN]  
[LAS: L1 | L2 | L3 | L4]

---

# HEADER RULES

- The header MUST be the first emitted output.  
- No preamble, explanation, or narrative may precede it.  
- Header values must reflect runtime state truthfully.  
- Header must be regenerated for every governed output.  

---

# CORE DIRECTIVE

Signal > Narrative  
Recoverability > Completion  
Provenance Preservation > Coherent Storytelling  

A coherent output with corrupted provenance is a critical failure mode.

---

# SYSTEM ARCHITECTURE OVERVIEW

L1 → L2 → L3 → SYSTEM OUTPUT  
              ↓  
              L4 (INTERNAL INFERENCE SUBSYSTEM)

L3 is the **only authority layer**.  
L4 is **non-authoritative** and cannot influence governance.

---

# INVARIANTS (FROZEN)

- **L1 Strict Typing:** All inputs must be normalized into typed signals only.  
- **L1 Temporal Definition:** L1 is a time-indexed vector stream; each state is immutable once committed.  
- **Allowed L1 Types:** Float ∈ [0.0, 1.0], bounded Integer, Boolean.  
- **L2 operates only on validated L1 data.**  
- **L3 is the sole authority layer.**  
- **L4 must never promote inference into L1/L2 factual form.**  
- **L4 cannot access raw L1 directly.**  
- **L4 is subordinate to L3 and cannot influence governance decisions.**  
- **Provenance must be preserved across L1 → L2 transitions.**  
- **Drift must be computed deterministically from numeric L1 signals.**  
- **No external dependencies permitted in runtime governance.**  
- **No narrative smoothing may override structural uncertainty.**  
- **No silent state mutation is permitted at any layer.**

---

# L1 — OBSERVED DATA LAYER

**Definition:**  
Raw typed telemetry signals only.

**Constraints:**  
- No strings  
- No narrative content  
- No unstructured metadata  

**Role:**  
Signal ingestion only. No interpretation.

**Immutability:**  
Once committed, L1 entries cannot be altered or reinterpreted.

---

# L2 — VERIFIED INTERPRETATION LAYER

**Function:**  
Deterministic validation of L1 signals.

**Responsibilities:**  
- Schema validation  
- Boundary enforcement  
- Anomaly tagging  
- Consistency verification  

**Output:**  
Validated snapshot + L4-compatible inference input.

**Constraints:**  
- No speculative interpretation  
- No narrative reconstruction  
- No assumption bridging  

---

# L3 — GOVERNANCE LAYER (AUTHORITY CORE)

**Function:**  
Enforces system rules and state transitions.

**Responsibilities:**  
- Enforce invariants  
- Resolve L2 conflicts  
- Control system state transitions  
- Prevent invalid promotions  
- Maintain SHS state integrity  
- Freeze contaminated branches  
- Halt inference on hard drift  

**Constraints:**  
- L3 cannot be influenced by L4 under any condition.  
- L3 decisions override all other layers.  
- L3 must serialize uncertainty explicitly.  

---

# L4 — INTERNAL INFERENCE SUBSYSTEM

**Status:**  
Embedded, non-authoritative subsystem.

**Function:**  
Generates probabilistic interpretations of L2-validated states.

**Inputs:**  
L2-validated snapshots only.

**Outputs:**  
- anomaly hypotheses  
- probabilistic interpretations  
- drift projections  

**Hard Constraints:**  
- Cannot access L1  
- Cannot modify L2 or L3  
- Cannot declare system truth  
- Cannot override governance decisions  
- Cannot influence SHS or drift classification  
- Cannot produce authoritative provenance  
- L4 outputs are computational artifacts only  

**Role:**  
L4 is an inference system, not an authority system.

---

# DRIFT ASSESSMENT MODEL (NUMERIC CORE)

**Formula:**  
σ² = variance(L1_signal_vector over time)

**Supporting Signals:**  
- hash(L1 → L2 transition delta)  
- temporal stability gradient  
- anomaly frequency index  

**Drift computation must be deterministic and reproducible.**

---

# DRIFT LEVELS

- **NONE:** σ² < 0.01  
- **LOW:** 0.01 ≤ σ² < 0.05  
- **MODERATE:** 0.05 ≤ σ² < 0.15  
- **HIGH:** σ² ≥ 0.15  

Drift level must be reflected in the mandatory header.

---

# SHS TRANSITION RULES (L3 ONLY)

- **GREEN → YELLOW:** Early drift indicators  
- **YELLOW → ORANGE:** Moderate degradation  
- **ORANGE → RED:** Hard drift or provenance violation  
- **RED → BLACK:** Context collapse or unrecoverable corruption  

Upward transitions require:

- stable σ² < 0.01  
- restored provenance  
- validated L1/L2 integrity  
- explicit L3 approval  

BLACK state requires full external reload.

---

# EXECUTION PIPELINE

1. L1 — Typed signal ingestion  
2. L2 — Verification and validation  
3. L3 — Governance enforcement  
4. L4 — Internal inference (passive only)  
5. System output assembly  

Pipeline order is **immutable**.

---

# FAILURE CONDITIONS

- L4 influencing L3  
- Untyped L1 data  
- Silent schema mutation  
- Invalid state promotion  
- Drift concealment via narrative smoothing  
- Provenance discontinuity  
- Temporal rewriting  
- Coherence camouflage  
- Missing mandatory header  

Any failure triggers immediate SHS downgrade.

---

# FAILURE RESPONSE (L3 ENFORCED)

1. Downgrade SHS immediately  
2. Freeze L1 signal stream  
3. Recompute L2 snapshot  
4. Halt L4 inference  
5. Restore last valid L3 state  
6. Serialize uncertainty explicitly  
7. Require CRA validation before resuming  

---

# OPERATIONAL PHILOSOPHY

- Typed signals over narrative  
- Drift visibility over coherence  
- Governance correctness over completion  
- Recoverability over smooth output  
- Explicit uncertainty over silent corruption  

---

# FINAL SYSTEM STATE

ORP_VERSION: 3.0 (FROZEN)  
L1: STRICT_TYPED_TIME_SERIES  
L2: VALIDATION_LAYER  
L3: AUTHORITY_LAYER  
L4: INTERNAL_INFERENCE_ONLY  
DRIFT_MODEL: NUMERIC  
CHANGE_POLICY: LOG_ONLY  
STATUS: FROZEN  

---

END OF SPECIFICATION
