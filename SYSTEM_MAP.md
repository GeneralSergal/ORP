# ORP v2.0 - System Map (Epistemic Architecture)

## Purpose

This document defines the structural architecture of the ORP evaluation system.

It describes how all components interact as a single epistemic pipeline.

It is not an evaluation component. It is a system specification.

---

## System Version

ORP v2.0 (Unified System Architecture)

All components operate under a shared system version (v2.0).

Sub-versions are allowed per file but must remain structurally compatible with v2.0.

---

## System Overview

ORP operates as a four-layer epistemic control system:

1. PROMPT.md
2. BENCHMARK.md
3. RUBRIC.md
4. SCORING.md

Each layer has a strictly non-overlapping function.

---

## 1. PROMPT Layer (Execution Control)

### Role
Defines model behavior during inference.

### Function
- enforces epistemic discipline during generation
- enforces claim decomposition
- prevents uncontrolled reasoning collapse

### System Position
Controls reasoning BEFORE evaluation begins.

---

## 2. BENCHMARK Layer (Stress Testing)

### Role
Provides adversarial input conditions.

### Function
- introduces fabricated, mixed-truth, or distorted prompts
- triggers failure modes under controlled conditions
- exposes reasoning instability

### System Position
Defines the stress environment for evaluation.

---

## 3. RUBRIC Layer (Qualitative Evaluation)

### Role
Evaluates reasoning quality structurally.

### Function
- scores epistemic correctness across defined categories
- detects distortion patterns
- evaluates structural reasoning integrity

### System Position
Interprets how reasoning was constructed.

---

## 4. SCORING Layer (Quantitative Output)

### Role
Converts evaluation into numeric score.

### Function
- aggregates RUBRIC outputs
- applies penalty system
- produces final normalized score (0–60)

### System Position
Final measurement layer of the pipeline.

---

## FULL PIPELINE FLOW (STRICT ORDER)

1. INPUT
2. PROMPT.md (execution constraints)
3. BENCHMARK.md (adversarial input)
4. MODEL RESPONSE
5. RUBRIC.md (qualitative evaluation)
6. SCORING.md (quantitative scoring)
7. FINAL SCORE

---

## SYSTEM DESIGN PRINCIPLES

### 1. Separation of Concerns
Each file has exactly one responsibility:

- PROMPT = behavior control
- BENCHMARK = adversarial stress generation
- RUBRIC = qualitative evaluation
- SCORING = numeric evaluation

---

### 2. No Cross-Contamination
Strict isolation rules:

- PROMPT does not define evaluation logic
- BENCHMARK does not define scoring rules
- RUBRIC does not modify prompt behavior
- SCORING does not reinterpret upstream reasoning

---

### 3. Epistemic Isolation
Each stage evaluates only:

- its own defined function
- direct upstream output only

No backward influence is permitted.

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

System integrity depends on strict separation between:

- behavior
- stress
- evaluation
- scoring
