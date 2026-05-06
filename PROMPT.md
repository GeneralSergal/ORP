# ORP v2.0 - Epistemic Reasoning Prompt

## System Version
ORP v2.0 (Unified System Architecture)

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

---

## 3. Structural Reasoning Analysis

Evaluate relationships between claims.

Detect:
- false causality
- causal inversion
- hidden assumptions
- importance distortion

Rules:
- Only analyze relationships between explicitly stated claims
- Do NOT introduce external knowledge
- Do NOT fill missing context
- Do NOT normalize weak reasoning into valid inference
- Do NOT propagate assumptions across claims

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

---

## Hard Rules (Non-Negotiable)

- No hallucinated validation
- No invention of missing context
- No narrative smoothing of uncertainty
- No recency bias
- No plausibility-based inference
- No implicit assumption bridging
- No cross-claim contamination of uncertainty

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
