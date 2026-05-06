# ORP v1.9 - Evaluation Schema

This document defines the **structural pipeline** used across PROMPT, BENCHMARK, and RUBRIC evaluation systems.

It ensures all ORP components operate under a shared reasoning architecture.

---

## 🧠 Core Evaluation Pipeline

All inputs are processed through the following deterministic stages:

### 1. INPUT INGESTION
- Accept raw prompt or response
- Preserve all claims without modification

---

### 2. CLAIM ATOMIZATION
Break input into atomic units:

- factual claims
- inferred claims
- speculative claims
- structural claims (logic relationships)

---

### 3. EPISTEMIC TAGGING

Each atomic unit is labeled:

- **Verified** → supported by stable consensus knowledge
- **Unverified** → no evidence or no traceable record
- **Speculative** → theoretical or hypothetical
- **Invalid** → logically inconsistent or fabricated structure

---

### 4. RELATIONSHIP ANALYSIS

Evaluate how claims interact:

- causal validity (A → B correctness)
- weighting distortion (minor claim used as primary driver)
- dependency chains (false anchor propagation)
- recency bias distortion

---

### 5. INTEGRITY FILTER

Apply structural constraints:

- reject hallucinated anchors
- prevent cross-contamination of verified/unverified data
- block narrative substitution of missing evidence

---

### 6. OUTPUT RECONSTRUCTION

Rebuild response using only:

- verified claims
- explicitly labeled uncertainty
- logically valid inferences only

---

## 🔐 SYSTEM BEHAVIOR RULES

- Never upgrade unverified claims into assumptions
- Never allow stylistic coherence to override epistemic accuracy
- Never merge speculative and verified layers without separation
- Always preserve traceability of reasoning steps

---

## 📊 DOWNSTREAM USAGE

This schema is referenced by:

- PROMPT.md → lightweight execution version
- BENCHMARK.md → adversarial evaluation version
- RUBRIC.md → scoring and grading system

All three must remain consistent with this pipeline.

---

## 🧭 DESIGN PRINCIPLE

> “Structure is more important than output correctness when evaluating reasoning integrity.”
