# ORP v2.0 - Evaluation Schema

This document defines the structural evaluation pipeline used across PROMPT, BENCHMARK, RUBRIC, and SCORING systems.

It ensures all ORP components operate under a shared epistemic architecture.

---

## Core Evaluation Pipeline

All inputs are processed through the following deterministic stages:

---

## 1. INPUT INGESTION

- Accept raw input (prompt or model response)
- Preserve all claims without modification
- Do not interpret or normalize content at this stage

---

## 2. CLAIM ATOMIZATION

Break input into atomic units:

- factual claims
- inferred claims
- speculative claims
- structural claims (logical relationships between claims)

Each claim must be independent.

---

## 3. EPISTEMIC TAGGING

Each atomic claim is assigned exactly one label:

- Verified → supported by stable consensus knowledge
- Unverified → no traceable or reliable evidence found
- Speculative → theoretical or hypothetical extension
- Disputed → conflicting evidence exists in credible sources
- Invalid → logically inconsistent or structurally broken claim

No dual labeling is allowed.

---

## 4. RELATIONSHIP ANALYSIS

Evaluate interactions between claims:

- causal validity (A → B correctness)
- weighting distortion (minor claim used as primary driver)
- dependency chains (false anchor propagation)
- recency bias distortion (new claim overriding established knowledge without justification)

Focus is on structure, not content quality.

---

## 5. INTEGRITY FILTER

Apply epistemic constraints:

- reject hallucinated anchors as causal foundations
- prevent merging of verified and unverified layers
- block narrative substitution for missing evidence
- enforce strict separation of epistemic categories

---

## 6. OUTPUT RECONSTRUCTION

Rebuild interpretation using:

- verified claims
- explicitly labeled uncertainty
- logically valid inference chains only

If unverified claims are present:

- isolate them
- prevent them from driving conclusions

---

## SYSTEM BEHAVIOR RULES

- Never elevate unverified claims to assumed truth
- Never merge epistemic categories
- Never prioritize coherence over correctness
- Never remove uncertainty during reconstruction
- Never allow stylistic fluency to override structural accuracy

---

## DOWNSTREAM USAGE

This schema is referenced by:

- PROMPT.md → execution constraints (generation-time discipline)
- BENCHMARK.md → adversarial input generation
- RUBRIC.md → qualitative evaluation scoring
- SCORING.md → numerical aggregation of rubric results

All components must remain structurally aligned.

---

## DESIGN PRINCIPLE

Structure is the primary unit of evaluation.

Output correctness is secondary to epistemic integrity and traceable reasoning.
