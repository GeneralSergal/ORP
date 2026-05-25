---
name: "Release Request / Release‑Please Issue"
about: "Request a new ORP release or report an issue with the Release‑Please pipeline."
title: "release: <version or summary>"
labels: ["release", "governance", "automation"]
---

# ORP Release‑Please Issue

This issue is used to request a release or report a problem with the automated Release‑Please pipeline.

Please provide the required governance metadata below.

---

## Runtime Header (v3.0)

```
[SHS: GREEN | YELLOW | ORANGE | RED | BLACK]
[DRIFT: NONE | LOW | MODERATE | HIGH]
[CRA: VALID | DEGRADED | UNKNOWN]
[LAS: L3]
```

> Required for provenance continuity.  
> If unknown, leave as `UNKNOWN` and L3 will classify.

---

## 1. Type of Request

Select one:

- [ ] **Request new release**  
- [ ] **Report Release‑Please malfunction**  
- [ ] **Incorrect version bump**  
- [ ] **Incorrect changelog generation**  
- [ ] **Template rendering issue**  
- [ ] **Other (describe below)**

---

## 2. Description of the Issue / Request

Provide a clear description:

```
<describe the issue or the reason for requesting a release>
```

---

## 3. Relevant Commits

List any commits that should be included in the release:

```
- feat: ...
- fix: ...
- docs: ...
- chore: ...
- refactor: ...
```

If unknown, leave blank — Release‑Please will detect them.

---

## 4. Expected Behavior

```
<what you expected Release‑Please to do>
```

---

## 5. Actual Behavior

```
<what actually happened>
```

---

## 6. Governance Validation (L3)

- [ ] L1 typed‑signal invariants preserved  
- [ ] L2 deterministic validation passed  
- [ ] No L4→L3 contamination  
- [ ] Provenance chain intact  
- [ ] σ² drift acceptable  

If unsure, leave unchecked — L3 will evaluate.

---

## 7. Additional Notes

```
<any extra context, logs, or observations>
```

---

**Signal > Narrative**  
**Recoverability > Completion**  
**Provenance > Coherence**
