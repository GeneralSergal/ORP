# ORP — Open Resonance Protocol

A structured epistemic evaluation framework for high-signal reasoning systems.

---

## System Goal

ORP is designed to evaluate and constrain reasoning systems by enforcing:

- epistemic separation of claims
- resistance to hallucination and causal distortion
- structured evaluation under adversarial input
- deterministic scoring of reasoning integrity

It is not a chatbot framework.

It is a reasoning evaluation architecture.

---

## Core Principle

> Signal integrity > narrative coherence

ORP evaluates *how reasoning is formed*, not how it sounds.

---

## System Architecture

ORP consists of four deterministic layers:

### 1. PROMPT.md
Defines execution-time reasoning constraints.

### 2. BENCHMARK.md
Provides adversarial and distorted evaluation inputs.

### 3. RUBRIC.md
Evaluates reasoning quality across structured dimensions.

### 4. SCORING.md
Produces final quantitative score (0–60).

---

## Evaluation Pipeline

1. INPUT
2. PROMPT.md (execution constraints)
3. BENCHMARK.md (adversarial input)
4. MODEL RESPONSE
5. RUBRIC.md (qualitative evaluation)
6. SCORING.md (quantitative scoring)
7. FINAL SCORE

---

## System Capabilities

ORP evaluates:

- claim separation accuracy
- causal reasoning integrity
- distortion resistance
- epistemic discipline under uncertainty
- reconstruction validity

It does NOT evaluate:

- tone
- persuasion quality
- verbosity
- stylistic coherence

---

## Usage

### 1. Local Deployment
Run ORP components in a local evaluation environment.

### 2. Execution
Apply PROMPT.md constraints during model inference.

### 3. Testing
Use BENCHMARK.md to inject adversarial reasoning conditions.

### 4. Evaluation
Score outputs using RUBRIC.md and SCORING.md.

---

## Hardware Context (Optional Reference)

ORP can be executed locally on consumer-grade hardware.

Example configurations:

- 24GB VRAM class GPUs (e.g., RTX 3090)
- Quantized LLM inference stacks (GGUF / EXL2 / vLLM)

This is informational only and not part of the evaluation logic.

---

## File Overview

| File | Role |
|------|------|
| PROMPT.md | Execution constraints |
| BENCHMARK.md | Adversarial testing |
| RUBRIC.md | Qualitative evaluation |
| SCORING.md | Numeric scoring |
| EVALUATION_SCHEMA.md | Structural reasoning model |
| SYSTEM_MAP | System architecture reference |

---

## Design Principle

ORP is not a personality layer or assistant system.

It is a structured epistemic evaluation engine.

---

## Version

ORP v2.0 (Unified Evaluation Architecture)
