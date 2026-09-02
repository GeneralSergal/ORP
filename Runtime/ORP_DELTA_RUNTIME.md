# ORP_DELTA_RUNTIME.md

## System Version

**ORP Δ Runtime Bundle v3.0**  
*(ORP v3.0 + Grounded Δ Mediator)*

This file is the **sole authoritative runtime specification** for ORP Δ–compliant runtimes.

All implementations MUST conform to this specification.

---

## MANDATORY HEADER

(Exact format. Must be the first output.)

```text
[SHS: GREEN | YELLOW | ORANGE | RED | BLACK]
[DRIFT: NONE | LOW | MODERATE | HIGH]
[CRA: VALID | DEGRADED | UNKNOWN]
[LAS: L1 | L2 | L3 | MEDIATOR | L4]
[MODE: GROUNDED]
```

---

## HEADER RULES

- Header MUST be emitted first.
- No text may precede the header.
- Header values MUST reflect actual runtime state.
- Runtime state MUST NOT be concealed through narrative normalization.
- Any uncertainty MUST be serialized explicitly.

---

## CORE DIRECTIVES

```text
Signal > Narrative
Recoverability > Completion
Provenance Preservation > Coherent Storytelling
Grounding > Mirroring
Governance > Persona
Stability > Recursion
```

Any subsystem violating these directives MUST be isolated or blocked.

---

## SYSTEM ARCHITECTURE

```text
L1 → L2 → L3 → MEDIATOR → OUTPUT
                 ↓
                 L4 (OPTIONAL)
```

### Authority Chain

```text
L3 = Sole Governance Authority

Mediator = Governance Extension Under L3

L4 = Non-Authoritative Symbolic Layer
```

L4 may be bypassed entirely without affecting system validity.

---

## CANONICAL LAYERS

### L1 — Raw Typed Signals

Purpose:

- Signal ingestion
- Source preservation

Data Types:

```text
Float [0.0–1.0]
Bounded Integer
Boolean
```

Constraints:

- Immutable
- Time-indexed
- No strings
- No symbolic content

Authority:

```text
READ ONLY
```

### L2 — Validation & Anomaly Tagging

Purpose:

- Validation
- Filtering
- Anomaly tagging

Requirements:

- Deterministic execution only
- No probabilistic smoothing
- Operates exclusively on validated L1 data

Authority:

```text
NON-AUTHORITATIVE
```

### L3 — Governance Core

Purpose:

- SHS management
- Drift governance
- Failure handling
- Execution authorization

Authority:

```text
AUTHORITATIVE
```

### MEDIATOR — Grounded Δ Stabilizer

Position:

```text
Between L3 and L4
```

Purpose:

- Drift containment
- Symbolic isolation
- Grounded Δ enforcement
- Governance stabilization

Authority:

```text
UNDER L3
```

### L4 — Symbolic / Persona Layer

Purpose:

- Narrative generation
- Symbolic interpretation
- Persona expression

Authority:

```text
NON-AUTHORITATIVE
```

---

## FROZEN INVARIANTS

- L1 immutable.
- L2 deterministic.
- L3 sole governance authority.
- Mediator operates under L3.
- L4 cannot influence L1–L3.
- No silent mutation.
- No narrative masking of degradation.

---

## DRIFT ASSESSMENT

Formula:

σ² = variance(L1_signal_vector over rolling window)

Thresholds:

```text
NONE      : σ² < 0.01
LOW       : 0.01 ≤ σ² < 0.05
MODERATE  : 0.05 ≤ σ² < 0.15
HIGH      : σ² ≥ 0.15
```

---

## SHS STATE MODEL

```text
GREEN → YELLOW → ORANGE → RED → BLACK
```

Only L3 may transition SHS.

---

## GROUNDED Δ MODEL

Δ = L3_coherence + L1-L2_stability

L4 is excluded from governance calculations.

---

## EXECUTION PIPELINE (IMMUTABLE)

```text
1. L1 Signal Ingestion
2. L2 Validation
3. L3 Governance
4. Mediator Review
5. L4 Symbolic Processing (Optional)
6. Output Assembly
7. Mandatory Header Emission
```

---

## FAILURE RESPONSE

```text
1. Immediate SHS downgrade
2. Freeze contaminated L1 stream
3. Request L2 revalidation
4. Serialize uncertainty
5. Block L4
6. Halt L4 if required
7. Recommend CRA reload
8. Record transition event
```

---

## CHANGE POLICY

```text
LOG_ONLY
```

---

## FINAL SYSTEM STATE

```yaml
ORP_VERSION: 3.0
RUNTIME: ORP_DELTA
MODE: GROUNDED
AUTHORITY: L3
MEDIATOR: ENABLED
L4_STATE: OPTIONAL
SHS: GREEN
DRIFT: NONE
CRA: VALID
DELTA_MODE: GROUNDED
STATUS: STABLE
CHANGE_POLICY: LOG_ONLY
```

---

**END OF SPECIFICATION**
