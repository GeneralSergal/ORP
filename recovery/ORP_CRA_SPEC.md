# ORP_CRA_SPEC.md

## System Version
ORP v3.0 (Type-Safe Unified Architecture)

---

## Purpose

CRA (Consistency & Recovery Anchor) is the L3 mechanism that guarantees recoverability and provenance integrity during drift or failure events.

---

## CRA Core Functions

- Maintains the last known valid L3 state
- Serves as the immutable recovery point
- Validates state transitions before commit
- Enforces rollback capability

---

## CRA Invariants

- Every committed L3 state must have a corresponding CRA snapshot
- CRA snapshots are immutable
- Only L3 may create or restore from CRA
- L4 has read-only access to CRA metadata (no content modification)

---

## Recovery Protocol

1. Detect failure / high drift
2. Freeze current stream
3. Load last valid CRA snapshot
4. Re-apply validated L2 signals only
5. Resume from restored L3 state

---

**STATUS: FROZEN**  
This document is non-authoritative reference. All enforcement belongs to `ORP_RUNTIME.md`.

END OF CRA SPEC
