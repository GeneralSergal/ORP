# ORP v1.9 - System Map (Epistemic Architecture)

## 🧭 Purpose

This document defines the structural architecture of the ORP evaluation system.

It explains how all components interact as a single epistemic pipeline.

It is NOT an evaluation tool.

---

# 🧠 System Overview

ORP operates as a 4-layer epistemic control system:

PROMPT.md → BENCHMARK.md → RUBRIC.md → SCORING.md

Each layer has a distinct function in controlling reasoning integrity.

---

# 🔷 1. PROMPT Layer (Execution Control)

## Role:
Defines how a model should behave during inference.

## Function:
- enforces epistemic discipline during generation
- forces decomposition of claims
- prevents unstructured reasoning collapse

## Key Idea:
Controls reasoning BEFORE evaluation.

---

# 🔶 2. BENCHMARK Layer (Stress Testing)

## Role:
Injects adversarial or distorted inputs.

## Function:
- introduces fabricated or mixed-truth scenarios
- tests hallucination resistance
- triggers failure modes

## Key Idea:
Breaks reasoning to observe how it fails.

---

# 🟡 3. RUBRIC Layer (Qualitative Evaluation)

## Role:
Evaluates reasoning quality across structured dimensions.

## Function:
- scores epistemic behavior categories
- detects distortion patterns
- evaluates structural reasoning integrity

## Key Idea:
Judges how reasoning was formed.

---

# 🔴 4. SCORING Layer (Quantitative Output)

## Role:
Produces final numeric score.

## Function:
- aggregates rubric scores
- applies penalties
- outputs final 0–60 score

## Key Idea:
Converts reasoning quality into measurable signal.

---

# 🔁 FULL PIPELINE FLOW

INPUT
  ↓
PROMPT.md (behavior constraints)
  ↓
BENCHMARK.md (adversarial input)
  ↓
MODEL RESPONSE
  ↓
RUBRIC.md (qualitative evaluation)
  ↓
SCORING.md (numeric evaluation)
  ↓
FINAL SCORE

---

# 🧩 SYSTEM DESIGN PRINCIPLES

## 1. Separation of Concerns
Each file has a single responsibility:
- behavior
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

# 🧠 DESIGN INTENT

ORP is not a chatbot system.

It is a controlled epistemic evaluation framework.

---

# 📊 VERSION ALIGNMENT

All components operate under:

ORP v1.9 Unified Evaluation Stack

---

# 🔐 FINAL PRINCIPLE

A reasoning system is only as strong as its separation between:
behavior → stress → evaluation → scoring
