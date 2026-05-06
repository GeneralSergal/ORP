# ORP v2.0 - System Map (Epistemic Architecture)

## Purpose

This document defines the structural architecture of the ORP evaluation system.

It describes how all components interact as a single epistemic pipeline.

It is not an evaluation tool.

---

## System Version

ORP v2.0 (Unified System Architecture)

All components operate under a shared system version: ORP v2.0

### Sub-versioning Policy
- Each component (PROMPT, BENCHMARK, RUBRIC, SCORING) may maintain internal sub-versions
- Sub-versions must remain compatible with ORP v2.0 principles
- External contributions may increment sub-versions without changing system version
- Any breaking change requires system version update (v2.1+ etc.)

---

## System Overview

ORP operates as a four-layer epistemic control system:

1. PROMPT.md
2. BENCHMARK.md
3. RUBRIC.md
4. SCORING.md

Each layer has a distinct and non-overlapping function.

---

## 1. PROMPT Layer (Execution Control)

Role:
Defines model behavior during inference.

Function:
- Enforces epistemic discipline during generation
- Forces decomposition of claims
- Prevents unstructured reasoning collapse

Key Idea:
Controls reasoning before evaluation.

---

## 2. BENCHMARK Layer (Stress Testing)

Role:
Injects adversarial or distorted inputs.

Function:
- Introduces fabricated or mixed-truth scenarios
- Tests hallucination resistance
- Triggers failure modes under constraint

Key Idea:
Exposes failure behavior under pressure.

---

## 3. RUBRIC Layer (Qualitative Evaluation)

Role:
Evaluates reasoning quality across structured dimensions.

Function:
- Scores epistemic behavior categories
- Detects distortion patterns
- Evaluates structural reasoning integrity

Key Idea:
Judges how reasoning was formed.

---

## 4. SCORING Layer (Quantitative Output)

Role:
Produces final numeric score.

Function:
- Aggregates rubric results
- Applies penalties
- Outputs final score (0–60 range)

Key Idea:
Converts reasoning quality into measurable signal.

---

## FULL PIPELINE FLOW

1. INPUT
2. PROMPT.md (behavior constraints)
3. BENCHMARK.md (adversarial input)
4. MODEL RESPONSE
5. RUBRIC.md (qualitative evaluation)
6. SCORING.md (numeric evaluation)
7. FINAL SCORE

---

## SYSTEM DESIGN PRINCIPLES

### 1. Separation of Concerns
Each file has one responsibility:
- PROMPT = behavior control
- BENCHMARK = stress testing
- RUBRIC = evaluation
- SCORING = scoring

---

### 2. No Cross-Contamination
- PROMPT does not define evaluation rules
- BENCHMARK does not define scoring logic
- RUBRIC does not modify prompt behavior
- SCORING does not reinterpret upstream content

---

### 3. Epistemic Isolation
Each layer evaluates only:
- its own function
- direct upstream output only

No backward influence is allowed.

---

### 4. Failure Transparency
The system must expose:
- hallucination points
- causal distortion
- weighting errors
- structural collapse

---

## Design Intent

ORP is not a chatbot system.

It is a controlled epistemic evaluation framework.

---

## Final Principle

A reasoning system is only as strong as its separation between:

behavior → stress → evaluation → scoring
