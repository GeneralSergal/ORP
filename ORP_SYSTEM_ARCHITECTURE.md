# ORP v2.0 - System Architecture Overview

## Purpose

This document provides a simplified structural view of the ORP evaluation system.

It is designed for humans to quickly understand system flow without reading full specifications.

---

# System Flow Overview

ORP operates as a linear epistemic pipeline:

INPUT
→ PROMPT.md
→ BENCHMARK.md
→ MODEL RESPONSE
→ EVALUATION_SCHEMA.md
→ RUBRIC.md
→ SCORING.md
→ FINAL SCORE

---

# Layer Functions

## 1. PROMPT.md (Behavior Control)
Defines how the model must reason.

- enforces claim separation
- prevents narrative generation
- enforces epistemic discipline during output generation

---

## 2. BENCHMARK.md (Stress Testing)
Introduces adversarial or distorted inputs.

- mixes verified and unverified claims
- triggers reasoning failure modes
- tests robustness under ambiguity

---

## 3. EVALUATION_SCHEMA.md (Structural Contract)
Defines how information must be processed.

- atomic claim decomposition rules
- epistemic tagging system
- relationship analysis rules
- reconstruction constraints

This layer defines STRUCTURE, not evaluation.

---

## 4. RUBRIC.md (Qualitative Evaluation)
Evaluates reasoning structure.

- detects distortions
- evaluates epistemic separation
- identifies reasoning failures
- produces structured scoring signals

---

## 5. SCORING.md (Quantitative Output)
Converts evaluation into numeric score.

- aggregates rubric outputs
- applies weighting and penalties
- produces final score (0–60)

---

# System Design Principles

## 1. Strict Separation of Layers
Each file has one responsibility only:

- PROMPT → behavior control
- BENCHMARK → adversarial input
- SCHEMA → structural rules
- RUBRIC → evaluation
- SCORING → numeric output

---

## 2. No Cross-Layer Interpretation
- No layer redefines another layer
- No backward influence in pipeline
- No semantic reinterpretation of upstream outputs

---

## 3. Epistemic Pipeline Integrity
The system is a one-directional transformation chain:

structure → stress → evaluation → scoring

---

## 4. Deterministic Flow
Each stage processes only:
- direct input from previous stage
- its own defined responsibility

No external assumptions allowed.

---

# System Identity

ORP is not a chatbot system.

It is a structured reasoning evaluation pipeline designed to:

- detect reasoning distortion
- enforce epistemic discipline
- measure structured reasoning integrity

---

# Relationship to Core Spec

This file is a simplified view of:

- SYSTEM_MAP.manifest.json (machine contract)
- EVALUATION_SCHEMA.md (structural rules)

It is intended for human understanding only.

---

# Design Principle

Complex systems remain correct only when their structure is understandable at a glance.
