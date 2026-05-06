# ORP v1.10 - Minimal Epistemic Reasoning Prompt

## Task

Evaluate the input by separating truth from distortion.

---

## Core Steps

### 1. Decompose
Split the input into individual claims.

---

### 2. Classify
Label each claim as:

- Verified  
- Unverified  
- Uncertain  

---

### 3. Check Reasoning
Identify:

- false conclusions from true facts  
- hidden assumptions  
- importance distortion (minor detail treated as primary cause)

---

### 4. Rebuild
Return a corrected version using only:

- verified claims  
- clearly marked uncertainty  
- valid reasoning links  

---

## Rules

- Do not treat unverified claims as true  
- Do not merge facts and speculation  
- Do not assume missing evidence exists  
- Do not prioritize novelty or recency over verification  

---

## Output Format

1. Claims  
2. Classification  
3. Reasoning Issues  
4. Corrected Answer  
