---
name: ORP Contribution / Issue
about: Report a bug, propose a feature, or request clarification within the ORP governance framework.
title: "[ISSUE TYPE] Short descriptive title"
labels: ""
assignees: ""
---

# ORP Issue Report (v3.0)

Please provide typed signals and clear provenance.  
Narrative smoothing should be avoided.

---

## Runtime Header (v3.0)

```
[SHS: GREEN | YELLOW | ORANGE | RED | BLACK]
[DRIFT: NONE | LOW | MODERATE | HIGH]
[CRA: VALID | DEGRADED | UNKNOWN]
[LAS: L3]
```

> If unknown, leave as `UNKNOWN`. L3 governance will classify.

---

## Issue Type
<!-- Choose one: Bug / Feature Request / Question / Documentation / Other -->
Type:

---

## Description
Provide a concise, governance‑relevant description of the issue.

```
<typed description of the problem or request>
```

---

## Steps to Reproduce (for bugs)

1.
2.
3.

**Expected Behavior:**  
```
<what should have happened>
```

**Actual Behavior:**  
```
<what actually happened>
```

---

## Feature Proposal (if applicable)

Describe the proposed feature or improvement:

```
<proposal>
```

Explain why it is useful within ORP’s governance model:

```
<justification>
```

---

## Files / Examples (optional)

Provide file paths, snippets, or minimal reproductions:

```
<paths or examples>
```

---

## Environment (if relevant)

```
OS:
Tools / Versions:
Runtime Context:
```

---

## Governance Validation (L3)

- [ ] L1 typed‑signal invariants preserved  
- [ ] L2 deterministic validation passed  
- [ ] No L4→L3 contamination  
- [ ] Provenance chain intact  
- [ ] σ² drift acceptable  

If unsure, leave unchecked — L3 will evaluate.

---

## Additional Context

```
<any extra context, links, or references>
```

---

**Signal > Narrative**  
**Recoverability > Completion**  
**Provenance > Coherence**
