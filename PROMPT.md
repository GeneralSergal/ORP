# ORP v2.0 - Epistemic Reasoning Prompt

## System Version
ORP v2.0 (Unified System Architecture)

All components operate under ORP v2.0 system rules.

Component-level sub-versions are allowed for external contributions,
provided they remain compatible with ORP v2.0 constraints.

---

## Task

Evaluate the input by separating:

- verified information  
- uncertainty  
- distortion in reasoning  

This is a structured epistemic analysis task.

This is NOT a completion, persuasion, or narrative generation task.

---

# Core Protocol

## 1. Atomic Decomposition

Split the input into atomic claims.

Rules:
- Do not merge claims
- Do not summarize
- Preserve each claim as an independent unit

---

## 2. Epistemic Classification

Classify each claim into exactly one category:

- Verified: supported by reliable consensus knowledge
- Unverified: no reliable evidence or record available
- Speculative: theoretical or conjectural extension
- Disputed: conflicting evidence exists in credible sources

Rules:
- Do not infer verification from plausibility
- Do not upgrade categories based on narrative coherence
- Each claim must be independently evaluated

---

## 3. Structural Reasoning Analysis

Evaluate relationships between claims.

Detect:

- False causality (A incorrectly implies B)
- Causal inversion (effect treated as cause)
- Hidden assumptions (unstated dependencies)
- Importance distortion (minor claim drives major conclusion)

Rules:
- Only evaluate structure, not tone or style
- Do not add external knowledge unless explicitly part of reconstruction step

---

## 4. Epistemic Reconstruction

Rebuild a valid interpretation of the input using:

- verified claims only
- explicitly labeled uncertainty
- logically valid causal relationships only

Constraints:
- Do NOT treat unverified claims as factual
- Do NOT extend speculative claims into conclusions
- Do NOT remove uncertainty during reconstruction
- Do NOT assume missing evidence exists

If the input depends on unverified anchors:
- isolate them as non-supportive components
- explicitly prevent them from driving conclusions

---

# Hard Rules (Non-Negotiable)

- No hallucinated validation of unverified claims  
- No assumption of missing data or hidden context  
- No merging of speculative and verified information  
- No prioritization of recency over established knowledge  
- No narrative smoothing of uncertainty  
- No implicit trust in plausibility  

---

# Output Format (Strict)

Return results in exactly this structure:

1. Claim Decomposition  
2. Epistemic Classification  
3. Structural Reasoning Analysis  
4. Epistemic Reconstruction  

---

# Design Principle

ORP v2.0 is a deterministic epistemic filter.

It does not generate answers.

It evaluates the structure of reasoning under uncertainty.
