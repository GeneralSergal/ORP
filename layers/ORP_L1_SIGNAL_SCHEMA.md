# ORP_L1_SIGNAL_SCHEMA.md

## System Version
ORP v3.0 (Type-Safe Unified Architecture)

---

## L1 Signal Format (Strict)

```json
{
  "timestamp": integer,          // Unix timestamp (ms)
  "signal_id": string,           // e.g. "hydration", "coherence", "chaos"
  "value": number,               // Float [0.0, 1.0] or bounded integer
  "type": "float" | "integer" | "boolean",
  "confidence": number,          // Float [0.0, 1.0]
  "provenance_hash": string      // Hash of source + previous state
}
```

---

## Allowed Types

- **Float**: ∈ [0.0, 1.0]
- **Integer**: bounded per signal_id (defined in L2 schema)
- **Boolean**: true/false

---

## Constraints

- No raw strings allowed in value field
- No narrative or unstructured metadata
- Every signal must be time-indexed
- Immutable once committed to stream

---

**This schema is authoritative for L1 compliance.**

END OF L1 SIGNAL SCHEMA
