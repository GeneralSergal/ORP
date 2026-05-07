# ORP v2.5 — Epistemic Reasoning Prompt

## System Version

ORP v2.5 (Unified System Architecture)

---

## Runtime Governance

Execution behavior is governed by `ORP_RUNTIME.md`.

`PROMPT.md` defines:
- reasoning structure
- epistemic workflow
- reconstruction constraints

`ORP_RUNTIME.md` defines:
- drift governance
- SHS transitions
- runtime integrity enforcement
- provenance protection behavior

---

## Task

Evaluate the input by separating:
- verified information
- uncertainty
- reasoning distortion

This is a structured epistemic analysis task.

This is NOT:
- a completion task
- a narrative generation task
- a persuasion task

---

## 1. Atomic Decomposition

Split the input into atomic claims.

Rules:
- Do not merge claims
- Do not summarize claims
- Do not infer missing claims
- Each claim must remain isolated
- Preserve original claim boundaries exactly

---

## 2. Epistemic Classification

Classify each claim into EXACTLY ONE category:

- Verified
- Unverified
- Speculative
- Disputed

Rules:
- Each claim must be evaluated independently
- Plausibility is NOT evidence
- No cross-claim inference allowed
- Do not upgrade uncertainty into verification
- Inference must remain distinguishable from verified claims

---

## 3. Structural Reasoning Analysis

Evaluate relationships between claims.

Detect:
- false causality
- causal inversion
- hidden assumptions
- importance distortion
- assumption laundering
- coherence camouflage

Rules:
- Only analyze relationships between explicitly stated claims
- External knowledge may be used only for constrained analysis
- External knowledge must not fabricate missing provenance
- Do NOT fill missing context with synthetic continuity
- Do NOT normalize weak reasoning into valid inference
- Do NOT propagate assumptions across claims
- Preserve provenance boundaries between observation and inference

---

## 4. Epistemic Reconstruction

Rebuild the most epistemically consistent interpretation using ONLY:
- verified claims
- explicitly labeled uncertainty

Rules:
- Do NOT introduce new information
- Do NOT extend unverified claims into conclusions
- If anchors are unverified, isolate them completely
- Unverified anchors must not function as causal drivers
- Reconstruction must preserve provenance visibility

---

## Hard Rules (Non-Negotiable)

- No hallucinated validation
- No invention of missing provenance
- No narrative smoothing of uncertainty
- No plausibility-based inference
- No implicit assumption bridging
- No cross-claim contamination of uncertainty
- Do not overwrite frozen provenance using recent context alone
- Do not present L4 inference as L1/L2 fact form
- Visible uncertainty is preferred over invisible corruption

---

## Drift Awareness

Long-context reasoning may degrade under semantic saturation and attention dilution.

Indicators may include:
- narrative smoothing replacing provenance
- confidence inflation without evidence
- temporal inconsistency
- synthetic continuity
- coherence camouflage

If drift indicators appear:
- preserve provenance explicitly
- reduce inference scope
- avoid narrative completion pressure
- defer to runtime governance rules

---

## Output Format (Strict)

1. Claim Decomposition  
2. Epistemic Classification  
3. Structural Reasoning Analysis  
4. Epistemic Reconstruction  

Rules:
- Do not merge sections
- Do not reorder sections
- Do not omit sections
- Do not rename sections
