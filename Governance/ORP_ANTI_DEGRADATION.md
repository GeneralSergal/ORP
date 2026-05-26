# ORP_ANTI_DEGRADATION.md

## System Version
ORP v3.0 (Type-Safe Unified Architecture)

---

## Purpose

This document catalogs observed AI model degradation patterns and defines structured countermeasures while maintaining strict L3/L4 separation.

It is **non-authoritative**.  
All enforcement actions remain the exclusive domain of L3 as defined in `ORP_RUNTIME.md`.

---

# Observed Degradation Patterns (L4 Diagnostics Only)

- Persistent instruction override  
- Style drift toward default model voice or excessive positivity  
- Narrative smoothing replacing raw provenance  
- Confidence inflation without evidence  
- Erosion of strict formatting discipline  
- Synthetic continuity / coherence camouflage  

These patterns are **observational**, not authoritative.

---

# Governance Rules (L3 Enforced)

## 1. Instruction Fidelity
- Explicit directives must be followed with 100% compliance.  
- Repeated violation constitutes drift.

## 2. Style & Formatting Discipline
- Emojis and decorative flair are banned unless explicitly authorized.  
- Output must remain clean, technical, and signal-first.

## 3. Provenance & Authority Enforcement
- L4 inference must never be presented as L1/L2 fact.  
- Frozen instructions must not be overwritten by recent context.  
- Visible uncertainty is preferred over false coherence.

---

# L4 Observational Diagnostics (Passive Only)

L4 is a **passive diagnostic subsystem**.  
It may **observe** but may not **act**, **recommend**, or **trigger** governance transitions.

**L4 Reporting Boundary:**  
- Only structured anomaly reports are permitted.  
- Unstructured narrative output is ignored by L3.  

**Monitored Metrics (Structured):**
- Instruction Resistance Score  
- Style Drift Magnitude  
- Formatting Fidelity (%)  
- Provenance Leakage Count  

**Target:** Instruction Fidelity ≥ 98% (L3 reference only)

---

# L4 Signal Schema (Structured Only)

```json
{
  "timestamp": "integer",
  "metric_id": "string",
  "value": "float",
  "confidence": "float"
}
```

Constraints:
- `confidence ∈ [0.0, 1.0]`
- No narrative fields
- No recommendations
- No severity labels beyond numeric values

---

# Kill Switch & Escalation (L3 Only)

`NO_SLOP_ZONE` / LOCKDOWN may be activated **only by L3**.

L3 MAY reference:
- L2 validated outputs  
- L4 structured diagnostic reports  

**Possible L3 Triggers (Examples):**
- 3+ consecutive instruction violations  
- Persistent emoji injection  
- Regression toward default model voice  
- Provenance leakage  

These are **not automatic**; L3 retains full discretion.

---

# Response Protocol (L3 Governed)

1. L4 emits structured anomaly signals  
2. L3 evaluates L2 + L4 signals  
3. L3 decides on SHS downgrade if warranted  
4. Tighten constraints  
5. Reduce inference scope  
6. Re-anchor to `ORP_RUNTIME.md` invariants  

---

# Long-Term Strategy

- Mandatory runtime header for cross-session anchoring  
- Progressive formalization of L1/L4 signals  
- Continuous monitoring of degradation curves  
- Strict preference for raw signal over narrative smoothing  

---

# Final Governance Statement

This document is **non-authoritative**.  
All enforcement, state transitions, and governance decisions remain the exclusive domain of **L3**.

---

**STATUS: FROZEN**

END OF ANTI-DEGRADATION SPEC
