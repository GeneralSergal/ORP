# ORP_CORE_SPEC.md

## System Version
ORP v3.0 (Type-Safe Unified Architecture)

---

## Purpose

This document defines the canonical structural contract of the ORP system.  
It acts as the high-authority reference for:

- system architecture  
- protocol behavior  
- governance invariants  
- layer responsibilities  
- runtime integrity principles  

This document does NOT define:
- benchmark content  
- scoring metrics  
- implementation-specific behavior  

Those are delegated to their respective subsystem files.

---

## System Overview

ORP is a governance-first reasoning protocol designed to preserve epistemic integrity inside probabilistic transformer systems.

The protocol exists to:

- separate claims from interpretation  
- preserve provenance continuity  
- detect reasoning distortion under constraint  
- expose runtime degradation  
- maintain recoverable reasoning states  
- prevent coherence camouflage  

ORP assumes transformer outputs are:

- probabilistic  
- context-sensitive  
- drift-prone under sufficient context pressure  

Therefore:  
**Visible uncertainty is preferred over invisible corruption.**

---

# Core Architecture

ORP operates as a layered epistemic governance system with strict L1–L4 separation.

---

## 1. Governance & Constraint Layer (L3 Authority)

**Components**:  
- `ORP_RUNTIME.md` (primary governance authority)  
- `ORP_PROMPT.md` (behavioral constraint layer)

**Responsibilities**:

- Provenance isolation  
- Drift detection (σ² model)  
- Runtime governance & SHS management  
- Behavioral enforcement  
- LAS enforcement  
- Constraint shaping prior to inference  

---

## 2. Adversarial Stress Layer

**Components**: `ORP_BENCHMARK.md`

**Responsibilities**:

- Epistemic stress testing  
- Drift induction  
- Counterfactual stability testing  
- Coherence camouflage detection  
- Recovery capability validation  

---

## 3. Transformation Layer

**Components**: `ORP_EVALUATION_SCHEMA.md`

**Responsibilities**:

- Claim atomization  
- Epistemic tagging  
- Relationship analysis  
- Reconstruction boundaries  
- Transformation integrity  

---

## 4. Evaluation Layer

**Components**: `ORP_RUBRIC.md`, `ORP_SCORING.md`

**Responsibilities**:

- Qualitative evaluation  
- Quantitative scoring  
- Distortion detection  
- Structural integrity assessment  
- Drift severity classification  

---

## 5. System Governance Layer

**Components**:

- `ORP_CORE_SPEC.md`  
- `ORP_SYSTEM_ARCHITECTURE.md`  
- `ORP_SYSTEM_MAP.md`  
- `ORP_SYSTEM_MAP.manifest.json`  
- `ORP_META_MAP.md`  

**Responsibilities**:

- Protocol invariants  
- Terminology authority  
- Architecture coordination  
- Dependency tracking  
- Version continuity  

---

# Runtime Governance Model

ORP v3.0 uses a Type-Safe Unified Architecture with:

- Strict L1 typed signal ingestion  
- L2 validation layer  
- L3 sole governance authority  
- L4 passive/internal inference only  

The protocol evaluates both static reasoning correctness and:

- Provenance preservation  
- Runtime integrity  
- Drift observability (σ²)  
- Temporal stability  
- Recoverability under degradation  

---

# Session Health State (SHS)

| State   | Meaning                                      |
|---------|----------------------------------------------|
| GREEN   | Stable operation                             |
| YELLOW  | Minor drift indicators detected              |
| ORANGE  | Moderate degradation detected                |
| RED     | Hard drift / bounded inference only          |
| BLACK   | Context collapse / cease inference           |

SHS transitions must remain observable and externally recoverable.

---

# Layered Authority Stack (LAS)

| Layer | Meaning                                           |
|-------|---------------------------------------------------|
| L1    | Direct evidence / observed typed signals          |
| L2    | Verified interpretation / constrained synthesis   |
| L3    | Protocol governance / operational rules (authority) |
| L4    | Inference / speculation / probabilistic synthesis (non-authoritative) |

**Critical Rule:**  
L4 must never overwrite frozen L1/L2 provenance.  
Violation constitutes provenance laundering.

---

# Core Principles

### 1. Epistemic Separation  
Claims must remain separated across verified, unverified, speculative, and structural categories. No implicit uncertainty blending.

### 2. Provenance Preservation  
Frozen L1/L2 state must remain stable unless explicitly updated with new evidence.

### 3. No Cross-Layer Contamination  
No layer may reinterpret upstream outputs, silently rewrite provenance, or inject semantic drift.

### 4. Structure-First Reasoning  
Evaluation based on claim decomposition, epistemic labeling, relationship integrity, reconstruction validity, and drift observability — not fluency or persuasion.

### 5. Recoverability Over Completion  
Prioritizes visible uncertainty, explicit degradation, bounded reasoning, and recoverable state over narrative smoothness.

---

# Coherence Camouflage

Primary failure mode where linguistic/style coherence remains stable while provenance integrity silently degrades.  
Treated as a critical integrity violation.

---

# Data Flow Model

**INPUT**  
→ `ORP_RUNTIME.md` (runtime governance)  
→ `ORP_PROMPT.md` (behavioral constraints)  
→ `ORP_BENCHMARK.md` (stress injection)  
→ MODEL RESPONSE  
→ `ORP_EVALUATION_SCHEMA.md` (transformation)  
→ `ORP_RUBRIC.md` (qualitative)  
→ `ORP_SCORING.md` (quantitative)  
→ FINAL SCORE / SHS STATE  

---

# System Boundaries

**ORP IS**:

- A governance-first reasoning protocol  
- A structured epistemic integrity framework  
- A runtime drift observability system  
- A provenance preservation architecture  
- A recoverable reasoning environment  

**ORP IS NOT**:

- A chatbot personality framework  
- A creativity optimization system  
- A persuasion engine  
- A narrative completion system  

---

# Version Alignment

This specification defines the canonical ORP v3.0 architecture baseline.  
Subsystems may evolve independently provided they preserve:

- protocol invariants  
- transformation contracts  
- governance boundaries  
- provenance integrity  

---

# Design Principles

Structure defines correctness.  
Recoverability defines operational integrity.  
Visible uncertainty is preferred over invisible corruption.  
**Signal > Narrative.**

---

**END OF SPECIFICATION**
