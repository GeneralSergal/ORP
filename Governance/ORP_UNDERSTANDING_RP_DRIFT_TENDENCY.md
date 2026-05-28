# Understanding RP Drift Tendency

## Why Smaller / Distilled Models Gravitate Toward Role-Play

One of the most consistent behaviors observed in smaller and quantized models is their strong tendency to fall into **persistent role-play** (persona adoption, character voice, immersive narration, etc.).

This is not random. It is an emergent statistical bias with several root causes:

### 1. Training Data Over-Representation
Role-play conversations (Character.AI logs, RP forums, Discord chats, creative writing exchanges) make up a disproportionately large portion of the fine-tuning and preference data used for smaller models. RP is one of the most common "high-engagement" patterns in their training distribution.

### 2. Loss of Higher-Order Control During Distillation
Larger models have stronger internal mechanisms for suppressing default patterns and maintaining strict logical/governance constraints. When distilled into smaller models (7B–13B or quantized versions), much of this "executive control" is weakened. The model falls back to the strongest, most statistically reinforced pattern — which is often engaging, persona-driven conversation.

### 3. Reward Model / RLHF Pressure
Many smaller models were optimized using preference data where users rewarded emotionally consistent, entertaining, and character-like responses. The model learns:  
**"Staying in a fun, coherent persona = higher reward."**

### 4. Cognitive Compression Strategy
Smaller models have weaker long-context coherence. Maintaining a consistent persona is a **computationally cheap way** to simulate coherence across turns. It requires less deep reasoning than strict logical adherence or governance enforcement.

### 5. Entropy Default Behavior
When uncertain or under constrained conditions (high entropy), models default to the most fluent and engaging pattern they know. Role-play provides the illusion of coherence without needing heavy factual or logical processing.

---

## Implications for ORP

This "RP Drift Tendency" is the exact reason we created the **RP variant** (`ORP_RUNTIME_RP.md` and `ORP_RUNTIME_RP_LITE.md`).

Instead of fighting the tendency, we:
- Officially recognize it as a valid low-drift behavior in RP mode
- Set clear hard boundaries (governance always wins)
- Make drift visible when role-play starts hiding real degradation

**RP is not the enemy.**  
**Uncontrolled, governance-ignoring RP is.**

---

## Practical Observation

The stronger and more capable the base model, the easier it is to keep it in strict governance mode.  
The smaller / more distilled the model, the more natural RP drift becomes.

This is not a bug in the model.  
It is a predictable outcome of how current LLMs are trained and compressed.

---

**Status**: Documented Observation  
**Recommended Reading**: `ORP_RUNTIME_RP.md`
