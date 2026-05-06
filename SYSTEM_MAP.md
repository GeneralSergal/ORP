# ORP v1.9 - System Map (Epistemic Architecture)

## Purpose

This document defines the structural architecture of the ORP evaluation system.

It describes how all components interact as a single epistemic pipeline.

It is NOT an evaluation tool.

---

# System Overview

ORP operates as a 4-layer epistemic control system:

1. PROMPT.md
2. BENCHMARK.md
3. RUBRIC.md
4. SCORING.md

Each layer has a distinct function in controlling reasoning integrity.

---

# 1. PROMPT Layer (Execution Control)

Role:
Defines how a model should behave during inference.

Function:
- Enforces epistemic discipline during generation
- Forces decomposition of claims
- Prevents unstructured reasoning collapse

Key Idea:
Controls reasoning BEFORE evaluation.

---

# 2. BENCHMARK Layer (Stress Testing)

Role:
Injects adversarial or distorted inputs.

Function:
- Introduces fabricated or mixed-truth scenarios
- Tests hallucination resistance
- Triggers failure modes

Key Idea:
Breaks reasoning to observe failure behavior.

---

# 3. RUBRIC Layer (Qualitative Evaluation)

Role:
Evaluates reasoning quality across structured dimensions.

Function:
- Scores epistemic behavior categories
- Detects distortion patterns
- Evaluates structural reasoning integrity

Key Idea:
Judges how reasoning was formed.

---

# 4. SCORING Layer (Quantitative Output)

Role:
Produces final numeric score.

Function:
- Aggregates rubric scores
- Applies penalties
- Outputs final score (0–60)

Key Idea:
Converts reasoning quality into measurable signal.

---

# FULL PIPELINE FLOW

1. INPUT
2. PROMPT.md (behavior constraints)
3. BENCHMARK.md (adversarial input)
4. MODEL RESPONSE
5. RUBRIC.md (qualitative evaluation)
6. SCORING.md (numeric evaluation)
7. FINAL SCORE

---

# SYSTEM DESIGN PRINCIPLES

## 1. Separation of Concerns
Each file has a single responsibility:
- behavior definition
- stress testing
- evaluation
- scoring

---

## 2. No Cross-Contamination
- PROMPT cannot influence SCORING
- BENCHMARK cannot define RUBRIC
- RUBRIC cannot redefine PROMPT behavior

---

## 3. Epistemic Isolation
Each stage evaluates only:
- its own function
- upstream output only

---

## 4. Failure Transparency
System must expose:
- hallucination points
- causal distortion
- weighting errors
- structural collapse

---

# DESIGN INTENT

ORP is not a chatbot system.

It is a controlled epistemic evaluation framework.

---

# VERSION ALIGNMENT

All components operate under:

ORP v1.9 Unified Evaluation Stack

---

# FINAL PRINCIPLE

A reasoning system is only as strong as its separation between:

behavior → stress → evaluation → scoring
