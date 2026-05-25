# ORP_FAILURE_MODES_CATALOG.md

## System Version
ORP v3.0 (Type-Safe Unified Architecture)

---

## Critical Failure Modes

| Mode | Description | Trigger | Response |
|------|-------------|---------|----------|
| L4→L3 Leakage | L4 attempts to influence governance | Any L4 modification attempt | Immediate BLACK SHS + lockdown |
| Untyped L1 | Raw strings or invalid types in L1 | Schema violation | Freeze + L2 rejection |
| Provenance Corruption | Broken hash chain | Hash mismatch | CRA rollback |
| Silent Schema Mutation | Gradual rule erosion | Validation drift | NO_SLOP_ZONE |
| Narrative Smoothing | Hiding uncertainty | Coherence camouflage detected | Visible drift flag |

---

**All failures must be made visible.**

END OF FAILURE MODES CATALOG
