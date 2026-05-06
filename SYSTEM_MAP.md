# ORP v2.0 - System Map (Epistemic Architecture)

## Purpose

This document defines the human-readable architecture of the ORP evaluation system.

It describes how all components interact as a single deterministic epistemic pipeline.

It is not an evaluation tool.

---

## System Version

ORP v2.0 (Unified Evaluation Architecture)

All components operate under a shared system version: ORP v2.0

---

## Sub-versioning Policy

Each component may maintain internal sub-versions:

- PROMPT.md
- BENCHMARK.md
- RUBRIC.md
- SCORING.md
- EVALUATION_SCHEMA.md

Rules:

- Sub-versions must remain compatible with ORP v2.0 core contract
- External contributions may increment sub-versions without changing system version
- Breaking structural changes require system upgrade (v2.1+)
- No sub-version may alter pipeline order or responsibilities

---

## System Overview

ORP operates as a layered epistemic evaluation pipeline:

### 1. PROMPT.md
Execution-time reasoning constraint layer

### 2. BENCHMARK.md
Adversarial input and stress-testing layer

### 3. MODEL_RESPONSE
Model-generated output under constraints

### 4. EVALUATION_SCHEMA.md
Structural transformation and epistemic tagging contract

### 5. RUBRIC.md
Qualitative reasoning evaluation layer

### 6. SCORING.md
Quantitative aggregation and scoring layer

### 7. FINAL_SCORE
Final normalized epistemic integrity output

---

## Layer Responsibilities

### PROMPT Layer (Execution Control)
- Enforces epistemic constraints during inference
- Forces atomic claim decomposition
- Prevents narrative collapse
- Maintains structured reasoning discipline

Key idea: controls reasoning before evaluation

---

### BENCHMARK Layer (Stress Testing)
- Injects adversarial or mixed-truth inputs
- Exposes hallucination and bias vulnerabilities
- Tests causal reasoning stability under pressure
- Triggers boundary enforcement behavior

Key idea: breaks reasoning to reveal failure modes

---

### EVALUATION_SCHEMA Layer (Structural Contract)
- Defines atomic claim transformation rules
- Specifies epistemic tagging system
- Enforces relationship analysis constraints
- Guarantees structural consistency across pipeline

Key idea: defines what “valid reasoning structure” is

---

### RUBRIC Layer (Qualitative Evaluation)
- Detects epistemic distortion patterns
- Evaluates reasoning structure integrity
- Assesses schema compliance
- Produces scoring dimensions for aggregation

Key idea: evaluates how reasoning was formed

---

### SCORING Layer (Quantitative Output)
- Aggregates rubric outputs
- Applies deterministic weights and penalties
- Normalizes evaluation results
- Produces final scalar score (0–60)

Key idea: converts reasoning quality into a measurable signal

---

## Full Pipeline Flow

1. INPUT
2. PROMPT.md (execution constraints)
3. BENCHMARK.md (adversarial input)
4. MODEL RESPONSE
5. EVALUATION_SCHEMA.md (structural transformation)
6. RUBRIC.md (qualitative evaluation)
7. SCORING.md (quantitative scoring)
8. FINAL SCORE

---

## System Design Principles

### 1. Separation of Concerns
Each layer has a single responsibility:
- PROMPT = execution control
- BENCHMARK = stress testing
- EVALUATION_SCHEMA = structural contract
- RUBRIC = evaluation
- SCORING = scoring

---

### 2. No Cross-Contamination
- PROMPT does not define scoring rules
- BENCHMARK does not define evaluation logic
- RUBRIC does not alter execution behavior
- SCORING does not reinterpret upstream structure

---

### 3. Epistemic Isolation
Each layer evaluates only:
- its direct input
- its defined responsibility domain

No backward inference allowed.

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

It is a deterministic epistemic evaluation architecture.

---

## Final Principle

A reasoning system is only as strong as its separation between:

execution → stress → structure → evaluation → scoring
