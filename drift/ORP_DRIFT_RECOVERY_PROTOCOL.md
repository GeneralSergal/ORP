# ORP_DRIFT_RECOVERY_PROTOCOL.md

## System Version
ORP v3.0 (Type-Safe Unified Architecture)

---

## Recovery Stages

1. **Detection** — L2/L3 identifies high drift or failure
2. **Containment** — Freeze L1 stream, downgrade SHS
3. **Restoration** — Load last valid CRA snapshot
4. **Revalidation** — Re-run L2 validation on restored state
5. **Resume** — L3 approves resumption with tightened constraints

---

## Success Criteria

- Provenance chain restored
- Drift reduced to NONE or LOW
- All invariants satisfied

---

**Recovery is always L3-gated.**

END OF DRIFT RECOVERY PROTOCOL
