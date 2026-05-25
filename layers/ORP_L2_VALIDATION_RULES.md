# ORP_L2_VALIDATION_RULES.md

## System Version
ORP v3.0 (Type-Safe Unified Architecture)

---

## Responsibilities

- Schema validation of all L1 signals
- Boundary enforcement
- Anomaly detection and tagging
- Temporal consistency verification
- Provenance hash validation

---

## Core Validation Rules

1. All signals match L1 schema
2. Value ranges respected
3. Temporal sequence is strictly increasing
4. Provenance hash chain is intact
5. No forbidden raw string leakage

---

## Output

- Validated snapshot (structured)
- List of tagged anomalies
- L4-compatible inference input (sanitized)

---

**L2 is deterministic. No probabilistic logic allowed.**

END OF L2 VALIDATION RULES

All missing files generated and ready.

Which one do you want to refine next, or shall we update another existing file?
