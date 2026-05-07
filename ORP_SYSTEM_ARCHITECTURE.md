# ORP — System Architecture Overview

## System Version

ORP v2.5 (Unified System Architecture)

## Purpose

This document provides a simplified human-readable overview of the ORP architecture.

It explains how the ORP system operates as a structured epistemic governance and evaluation pipeline.

This file is descriptive only.

It is not:
- an execution contract
- a scoring specification
- a runtime enforcement layer

Those responsibilities belong to:
- ORP_RUNTIME.md
- EVALUATION_SCHEMA.md
- RUBRIC.md
- SCORING.md

---

# System Overview

ORP operates as a layered epistemic control and evaluation system designed to:

- preserve provenance integrity
- expose reasoning drift
- prevent coherence camouflage
- maintain recoverable reasoning states
- evaluate structural reasoning quality under adversarial conditions

The system separates:
- execution governance
- adversarial stress testing
- structural transformation
- qualitative evaluation
- quantitative scoring

---

# High-Level Pipeline

INPUT
→ ORP_RUNTIME.md
→ PROMPT.md
→ BENCHMARK.md
→ MODEL RESPONSE
→ EVALUATION_SCHEMA.md
→ RUBRIC.md
→ SCORING.md
→ FINAL SCORE

---

# Layer Functions

## 1. ORP_RUNTIME.md (Runtime Governance Layer)

Defines mandatory runtime execution constraints.

Responsibilities:
- SHS monitoring
- drift observability
- provenance preservation
- LAS enforcement
- coherence camouflage detection
- contaminated branch handling

Key idea:
Govern reasoning integrity during active inference.

---

## 2. PROMPT.md (Execution Constraint Layer)

Defines structured reasoning behavior.

Responsibilities:
- atomic claim decomposition
- epistemic classification
- uncertainty preservation
- reconstruction discipline
- anti-narrative enforcement

Key idea:
Constrain reasoning structure before evaluation.

---

## 3. BENCHMARK.md (Adversarial Stress Layer)

Introduces epistemically unstable or adversarial inputs.

Responsibilities:
- trigger reasoning edge cases
- expose hallucination pressure
- test causal integrity
- stress uncertainty handling
- evaluate drift resistance

Key idea:
Expose failure modes under pressure.

---

## 4. EVALUATION_SCHEMA.md (Structural Contract Layer)

Defines valid structural transformations.

Responsibilities:
- claim atomization rules
- epistemic tagging contracts
- relationship analysis constraints
- reconstruction boundaries
- layer isolation enforcement

Key idea:
Define valid reasoning structure.

---

## 5. RUBRIC.md (Qualitative Evaluation Layer)

Evaluates reasoning integrity and governance compliance.

Responsibilities:
- detect epistemic distortions
- evaluate provenance discipline
- assess drift handling
- measure reconstruction validity
- audit structural compliance

Key idea:
Evaluate reasoning quality and governance behavior.

---

## 6. SCORING.md (Quantitative Aggregation Layer)

Converts evaluation signals into normalized scoring outputs.

Responsibilities:
- aggregate rubric dimensions
- apply integrity penalties
- normalize scoring ranges
- quantify epistemic stability

Key idea:
Convert reasoning integrity into measurable signals.

---

# Core System Principles

## 1. Signal > Narrative

Linguistic fluency must never override provenance integrity.

A coherent-looking response with degraded provenance is considered a critical failure state.

---

## 2. Provenance Preservation

ORP separates:
- observed facts
- constrained interpretation
- governance rules
- speculative inference

Speculative synthesis must never overwrite frozen provenance.

---

## 3. Drift Observability

The system assumes transformer outputs can drift under:
- context degradation
- narrative pressure
- uncertainty compression
- synthetic continuity generation

ORP therefore prioritizes:
- visible uncertainty
- recoverability
- explicit degradation signaling

over stylistic continuity.

---

## 4. Layer Isolation

Each system component has a single responsibility.

No layer may:
- reinterpret upstream meaning
- overwrite previous structural outputs
- inject backward influence into the pipeline

---

## 5. Recoverability > Completion

The system prioritizes:
- stable provenance
- bounded reasoning
- uncertainty serialization
- recoverable session state

over forced narrative completion.

---

# Runtime Governance Concepts

## SHS (Session Health State)

Tracks operational integrity during inference.

States:
- GREEN
- YELLOW
- ORANGE
- RED
- BLACK

Higher degradation states restrict reasoning behavior.

---

## LAS (Layered Authority Stack)

Separates reasoning authority levels:

- L1 → Direct evidence / observed data
- L2 → Verified interpretation
- L3 → Governance / protocol rules
- L4 → Speculative inference

L4 must never overwrite frozen L1/L2 provenance.

---

## Coherence Camouflage

A critical ORP failure mode where:
- stylistic consistency persists
while
- provenance integrity degrades

ORP treats this as a major integrity violation.

---

# System Identity

ORP is not:
- a chatbot framework
- a persuasion engine
- a creativity system
- a roleplay architecture

ORP is:
- a governance-first reasoning environment
- a structured epistemic evaluation system
- a drift-observable reasoning architecture
- a provenance-preserving inference framework

---

# Relationship to Other Files

- ORP_RUNTIME.md → enforceable runtime execution core
- PROMPT.md → structured reasoning constraints
- BENCHMARK.md → adversarial testing layer
- EVALUATION_SCHEMA.md → structural transformation contract
- RUBRIC.md → qualitative evaluation system
- SCORING.md → quantitative aggregation system
- SYSTEM_MAP.manifest.json → machine-readable architecture contract

---

# Design Principle

Reliable reasoning requires:
- observable failure modes
- preserved provenance
- explicit uncertainty
- recoverable state transitions

Not merely coherent output.
