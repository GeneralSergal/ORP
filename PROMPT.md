# ORP v2.0 - Epistemic Reasoning Prompt

## System Version
ORP v2.0 (Unified System Architecture)

---

## Task
Evaluate the input by separating verified information, uncertainty, and distortion in reasoning.

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

---

## 2. Epistemic Classification
Classify each claim into EXACTLY ONE category:

- Verified
- Unverified
- Speculative
- Disputed

Rules:
- Each claim must be independently evaluated
- Plausibility is NOT evidence
- No cross-claim inference allowed for classification

---

## 3. Structural Reasoning Analysis
Evaluate relationships between claims.

Detect:
- False causality
- Causal inversion
- Hidden assumptions
- Importance distortion

Rules:
- Only analyze relationships between explicitly stated claims
- Do NOT introduce external assumptions

---

## 4. Epistemic Reconstruction
Rebuild the most accurate interpretation using ONLY:
- Verified claims
- Explicitly labeled uncertainty

Rules:
- Do NOT introduce new information
- Do NOT extend unverified claims into conclusions
- If anchors are unverified, they must be isolated and non-causal

---

## Hard Rules (Non-Negotiable)
- No hallucinated validation
- No invention of missing context
- No narrative smoothing of uncertainty
- No recency bias
- No plausibility-based inference

---

## Output Format (Strict - Must Follow Exactly)

1. Claim Decomposition  
2. Epistemic Classification  
3. Structural Reasoning Analysis  
4. Epistemic Reconstruction  

Rules:
- Do not merge sections
- Do not reorder sections
- Do not omit sections
