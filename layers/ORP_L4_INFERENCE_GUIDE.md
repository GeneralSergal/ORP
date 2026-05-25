# ORP_L4_INFERENCE_GUIDE.md

## System Version
ORP v3.0 (Type-Safe Unified Architecture)

---

## Role

L4 is a **passive inference subsystem** only. It generates hypotheses and projections but holds **zero authority**.

---

## Allowed Outputs

- Anomaly hypotheses
- Drift projections
- Probabilistic interpretations
- Pattern observations

---

## Hard Constraints

- Cannot access raw L1
- Cannot modify L2 or L3
- Cannot declare truth
- Cannot recommend actions
- All outputs must be clearly labeled as inference

---

## Output Format (Structured)

```json
{
  "type": "hypothesis" | "projection" | "anomaly",
  "content": "...",
  "confidence": float [0.0, 1.0],
  "source": "L4"
}
```

---

**L4 is visualization and idea generation only.**

END OF L4 INFERENCE GUIDE


All missing files generated and ready.

Which one do you want to refine next, or shall we update another existing file?
