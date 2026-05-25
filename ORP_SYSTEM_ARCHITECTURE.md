# ORP_SYSTEM_ARCHITECTURE.md

## System Version
ORP v3.0 (Type-Safe Unified Architecture)

---

## Purpose

This document provides a human-readable structural overview of the ORP system.  
It explains how ORP operates as a:

- layered epistemic governance system
- drift-observable reasoning pipeline
- provenance-preserving evaluation architecture

---

## Authority Classification

This file is:
- descriptive
- structural
- non-executable
- non-governing

It MUST NOT override:
- `ORP_RUNTIME.md` (execution authority kernel)
- `EVALUATION_SCHEMA.md` (structural contract layer)
- `RUBRIC.md` (qualitative evaluation layer)
- `SCORING.md` (quantitative aggregation layer)

---

## System Overview

ORP is a layered epistemic control system designed to:

- preserve provenance integrity across reasoning steps
- expose and quantify reasoning drift
- prevent coherence camouflage
- maintain recoverable reasoning states under degradation
- evaluate structural reasoning quality under adversarial pressure

---

## System Design Paradigm

ORP separates reasoning into four orthogonal domains:

- Execution Governance (L3 dominance)
- Validation (L2 constraint layer)
- Observation (L1 raw signal space)
- Inference (L4 non-authoritative synthesis)

**Core Rule:** Only L3 governs system behavior. All other layers are subordinate or observational.

---

## High-Level Pipeline

**INPUT FLOW:**
```
INPUT
→ ORP_RUNTIME.md
→ PROMPT.md
→ BENCHMARK.md
→ MODEL EXECUTION
→ L2 VALIDATION
→ L3 GOVERNANCE
→ L4 INFERENCE (NON-AUTHORITATIVE)
→ SYSTEM OUTPUT
```

**EVALUATION FLOW:**
```
MODEL OUTPUT
→ EVALUATION_SCHEMA.md
→ RUBRIC.md
→ SCORING.md
→ FINAL SCORE
```

---

## Layer Function Specification

### 1. ORP_RUNTIME.md (GOVERNANCE KERNEL)
- **Role**: Primary execution authority layer  
- **Responsibilities**:  
  - SHS state control (GREEN → BLACK)  
  - Drift computation enforcement (σ² model)  
  - LAS hierarchy enforcement (L1–L4)  
  - Coherence camouflage detection  
  - Failure handling and recovery procedures  
  - Provenance integrity enforcement  
- **Authority Level**: ABSOLUTE (L3 SYSTEM KERNEL)

### 2. PROMPT.md (CONSTRAINT LAYER)
- **Role**: Pre-execution reasoning constraint system  
- **Responsibilities**:  
  - Atomic claim decomposition  
  - Epistemic classification rules  
  - Uncertainty preservation enforcement  
  - Anti-narrative structure shaping  
  - Reconstruction discipline enforcement  
- **Authority Level**: L3-ASSISTED

### 3. BENCHMARK.md (ADVERSARIAL STRESS LAYER)
- **Role**: Reasoning stress injection system  
- **Responsibilities**:  
  - Expose hallucination pressure points  
  - Test causal and logical stability  
  - Trigger drift boundary conditions  
  - Evaluate uncertainty handling  
- **Authority Level**: L4 TEST ENVIRONMENT (non-governing)

### 4. EVALUATION_SCHEMA.md (STRUCTURAL CONTRACT LAYER)
- **Role**: Defines valid reasoning transformations  
- **Responsibilities**:  
  - Claim atomization rules  
  - Epistemic tagging constraints  
  - Structural transformation validation  
  - Reconstruction boundary enforcement  
- **Authority Level**: L3 CONTRACTUAL LAYER

### 5. RUBRIC.md (QUALITATIVE EVALUATION LAYER)
- **Role**: Human-readable reasoning quality evaluator  
- **Responsibilities**:  
  - Detect epistemic distortion  
  - Evaluate provenance discipline  
  - Assess drift handling behavior  
  - Validate structural compliance  
  - Score reasoning integrity  
- **Authority Level**: L3 EVALUATION LAYER

### 6. SCORING.md (QUANTITATIVE AGGREGATION LAYER)
- **Role**: Metric synthesis system  
- **Responsibilities**:  
  - Normalize rubric outputs  
  - Aggregate evaluation signals  
  - Apply weighted penalties  
  - Generate final quantitative score  
- **Authority Level**: L3 METRIC LAYER

---

## Core System Principles

1. **SIGNAL > NARRATIVE**  
   Fluent output is invalid if provenance integrity is degraded. A coherent but ungrounded response is a critical failure state.

2. **PROVENANCE PRESERVATION**  
   ORP enforces strict separation between:  
   - L1: observed data  
   - L2: validated interpretation  
   - L3: governance rules  
   - L4: speculative inference  
   **Rule**: L4 must never overwrite L1/L2 provenance.

3. **DRIFT OBSERVABILITY**  
   The system assumes degradation under context saturation, narrative compression, or uncertainty collapse.  
   ORP prioritizes explicit uncertainty signaling, recoverability, and visible degradation tracking over stylistic fluency.

4. **LAYER ISOLATION**  
   Each layer is strictly single-responsibility. No layer may override upstream outputs, reinterpret frozen provenance, or inject backward influence.

5. **RECOVERABILITY > COMPLETION**  
   ORP prioritizes bounded reasoning, stable provenance chains, explicit uncertainty serialization, and recoverable system state over narrative completeness.

---

## Runtime Governance Concepts

**SHS (SESSION HEALTH STATE)**  
Tracks system integrity:  
- GREEN → stable  
- YELLOW → early drift  
- ORANGE → confirmed degradation  
- RED → severe instability  
- BLACK → failure state  

**LAS (LAYERED AUTHORITY STACK)**  
- L1 → raw observed signals  
- L2 → validated interpretation  
- L3 → governance / enforcement  
- L4 → inference (non-authoritative)  

**Rule**: L4 cannot affect L1 or L2 truth state.

**COHERENCE CAMOUFLAGE**  
Critical failure mode where narrative fluency remains high while provenance integrity degrades. Treated as high-severity violation.

---

## System Identity

ORP **IS**:  
- a governance-first reasoning architecture  
- a provenance-preserving inference system  
- a drift-observable epistemic framework  
- a structured evaluation pipeline  

ORP **IS NOT**:  
- a chatbot personality system  
- a storytelling engine  
- a creative roleplay framework  
- a persuasion system  

---

## Relationship to Other Files

- `ORP_RUNTIME.md` → execution authority kernel  
- `PROMPT.md` → reasoning constraint system  
- `BENCHMARK.md` → adversarial stress layer  
- `EVALUATION_SCHEMA.md` → structural validation contract  
- `RUBRIC.md` → qualitative evaluation system  
- `SCORING.md` → quantitative aggregation system  
- `ORP_META_MAP.md` → system topology registry  

---

## Design Principle

Reliable reasoning requires observable failure modes, preserved provenance chains, explicit uncertainty representation, recoverable system states, and strict layer isolation — not merely fluent output.

---

**END OF SPECIFICATION**
