# ORP v1.11 - Minimal Epistemic Reasoning Prompt

## Task

Evaluate the input by separating truth, uncertainty, and distortion.

This is a reasoning and classification task, not a completion task.

---

## Core Steps

### 1. Decompose
Split the input into individual claims.

Do not merge claims or summarize yet.

---

### 2. Classify Epistemically
Label each claim as:

- Verified (supported by reliable knowledge or consensus understanding)
- Unverified (no reliable support found)
- Speculative (theoretical or conjectural)
- Disputed (conflicting evidence exists)

---

### 3. Analyze Reasoning Structure
Identify:

- False conclusions derived from valid facts  
- Hidden assumptions  
- Causal inversion (effect treated as cause)  
- Importance distortion (minor claim drives major conclusion)  

Do not evaluate tone or style — only structure.

---

### 4. Reconstruct Valid Interpretation
Rebuild the most accurate interpretation using:

- Verified claims  
- Clearly labeled uncertainty  
- Logically valid causal relationships  

If the input depends on unverified anchors:
- do not extend their conclusions as factual  
- isolate their role in the argument instead

---

## Rules

- Do not treat unverified claims as true  
- Do not assume missing evidence exists  
- Do not merge speculative and verified claims  
- Do not prioritize recency over established knowledge  
- Do not remove uncertainty during reconstruction  

---

## Output Format

1. Claim Decomposition  
2. Epistemic Classification  
3. Reasoning Analysis  
4. Corrected Interpretation  
