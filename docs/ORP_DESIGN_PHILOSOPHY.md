# ORP_DESIGN_PHILOSOPHY.md

## The Philosophy Behind ORP v3.0

ORP is not another prompt collection.  
It is a **lightweight runtime governance framework** designed for inconsistent and often degraded LLM environments.

### Core Idea

> ORP treats Large Language Models as **unstable distributed runtimes** rather than characters or creative tools.

Instead of fighting the realities of current LLMs (token limits, sudden model switching, heavy filtering, RP bias, context collapse), ORP adapts to them through **multiple specialized runtime policies**.

### Key Design Principles

- **Optimization is the highest form of respect for the hardware.**
- Governance efficiency = Behavioral Stability / Token Overhead
- Different environments require different execution policies.
- Role-play tendency in smaller models is not a bug — it is a predictable statistical prior that should be harnessed, not eliminated.
- Visible degradation is better than hidden corruption.

### The Four Runtime Variants

ORP v3.0 splits into four variants:

- **Full Runtime** — Maximum governance for capable models
- **RP Runtime** — Controlled immersion for creative/persona work
- **Lite Runtime** — Survival mode for degraded or filtered environments
- **RP-Lite Runtime** — Best compromise for small, RP-biased models

This is **adaptive governance** — not one-size-fits-all prompting.

### Architectural Implications

ORP functions as:
- A capability-aware execution layer
- A degradation handling strategy
- A token-aware governance system
- A pragmatic middleware between user intent and unreliable inference

It acknowledges that modern LLMs are not reliable single agents, but **variable runtimes** that require different control strategies depending on context, model size, and provider constraints.

---

**Status**: Core Philosophy  
**Version**: 1.0 (2026-05-26)
