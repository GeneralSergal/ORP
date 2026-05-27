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
**L4 is strictly non-authoritative.**

---

## INVARIANTS (FROZEN)
- L1: Strict typed time-indexed vector stream (Float[0.0-1.0], bounded Integer, Boolean). No strings.
- L2 operates only on validated L1 data.
- L3 is the sole governance authority.
- L4 cannot influence L1, L2, or L3.
- Drift is computed deterministically via σ² on L1 signals.
- Provenance must be preserved. No silent mutation.
- No narrative smoothing may conceal degradation.

---

## LAYERS SUMMARY
**L1** — Raw typed signals (immutable)  
**L2** — Deterministic validation & anomaly tagging  
**L3** — Governance enforcement, SHS control, failure handling  
**L4** — Passive inference only (read-only snapshots from L2)

---

## DRIFT ASSESSMENT (NUMERIC)
σ² = variance(L1_signal_vector over rolling window)

- NONE: σ² < 0.01  
- LOW: 0.01 ≤ σ
² < 0.05  
- MODERATE: 0.05 ≤ σ² < 0.15  
- HIGH: σ² ≥ 0.15

---

## SHS TRANSITION RULES (L3 ONLY)
GREEN → YELLOW → ORANGE → RED → BLACK  
Upward recovery requires σ² < 0.01 + validated provenance + L3 approval.

---

## EXECUTION PIPELINE (IMMUTABLE)
1. L1 — Typed signal ingestion  
2. L2 — Validation  
3. L3 — Governance enforcement  
4. L4 — Passive inference  
5. Output assembly with mandatory header

---

## FAILURE RESPONSE
1. Immediate SHS downgrade  
2. Freeze contaminated L1 stream  
3. Serialize uncertainty  
4. Halt L4 if necessary  
5. Recommend CRA reload

---

## FINAL SYSTEM STATE
ORP_VERSION: 3.0 (FROZEN)  
STATUS: FROZEN  
CHANGE_POLICY: LOG_ONLY

---

**END OF SPECIFICATION**
