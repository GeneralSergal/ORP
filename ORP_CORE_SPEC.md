# ORP v2.0 - Core System Specification

## Purpose

This document defines the minimal structural contract of the ORP system.

It is a compressed reference for implementation, contribution, and system understanding.

It does NOT define scoring rules or evaluation metrics.

---

# System Overview

ORP is a deterministic epistemic evaluation pipeline.

Its purpose is to:

- separate claims from interpretation
- detect reasoning distortion under constraint
- preserve epistemic uncertainty
- enforce structured reasoning transformation

---

# Core Architecture

ORP operates as a strict 4-stage pipeline:

1. PROMPT.md → defines reasoning constraints (behavior layer)
2. BENCHMARK.md → introduces adversarial inputs (stress layer)
3. EVALUATION_SCHEMA.md → defines structural transformation rules (contract layer)
4. RUBRIC.md + SCORING.md → evaluate and quantify output (evaluation layer)

---

# Data Flow Model

INPUT
→ PROMPT.md (constraint enforcement)
→ BENCHMARK.md (adversarial injection)
→ MODEL RESPONSE
→ EVALUATION_SCHEMA.md (structural transformation rules)
→ RUBRIC.md (qualitative evaluation)
→ SCORING.md (quantitative scoring)
→ FINAL SCORE

---

# Core Principles

## 1. Epistemic Separation
Claims must remain separated across:
- verified information
- unverified information
- speculative reasoning
- structural relationships

---

## 2. No Cross-Layer Contamination
Each system layer has a single responsibility:

- PROMPT → controls behavior
- BENCHMARK → introduces stress
- SCHEMA → defines structure rules
- RUBRIC → evaluates structure
- SCORING → aggregates results

No layer may redefine another layer’s output.

---

## 3. Structure-First Reasoning
All evaluation is based on:

- claim decomposition
- epistemic labeling
- relationship analysis
- reconstruction validity

Not on tone, style, or fluency.

---

## 4. Deterministic Evaluation Chain
The system must behave as a closed pipeline:

- no backward influence
- no reinterpretation of upstream outputs
- no semantic drift between layers

---

# System Boundaries

ORP is NOT:

- a chatbot system
- a knowledge retrieval system
- a generative creativity system

ORP IS:

- a structured reasoning evaluation pipeline
- a deterministic epistemic classification system
- a distortion detection framework

---

# Version Alignment

This specification applies to:

ORP v2.0 Unified System

Sub-versions may exist in components but must remain compatible with this structural contract.

---

# Design Principle

Structure defines correctness.

Correctness is evaluated through transformation integrity, not linguistic output quality.
