# ORP v2.0 - System Map (Epistemic Architecture)

## Purpose

This document defines the structural architecture of the ORP evaluation system.

It describes how all components interact as a single epistemic pipeline.

It is not an evaluation tool.

---

## System Version

ORP v2.0 (Unified System)

All components operate under a shared system version.

Sub-versions are allowed per file but must remain compatible with ORP v2.0.

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

### Role
Defines model behavior during inference.

### Function
- enforces epistemic discipline during generation
- forces decomposition of claims
- prevents unstructured reasoning collapse

### Key Idea
Controls reasoning before evaluation.

---

## 2. BENCHMARK Layer (Stress Testing)

### Role
Injects adversarial or distorted inputs.

### Function
- introduces fabricated or mixed-truth scenarios
- tests hallucination resistance
- triggers failure modes under constraint

### Key Idea
Breaks reasoning to observe failure behavior.

---

## 3. RUBRIC Layer (Qualitative Evaluation)

### Role
Evaluates reasoning quality across structured dimensions.

### Function
- scores epistemic behavior categories
- detects distortion patterns
- evaluates structural reasoning integrity

### Key Idea
Judges how reasoning was formed.

---

## 4. SCORING Layer (Quantitative Output)

### Role
Produces final numeric score.

### Function
- aggregates rubric results
- applies penalties
- outputs final score (0–60 range)

### Key Idea
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
Each file has one responsibility only:
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

behavior
stress
evaluation
scoring
