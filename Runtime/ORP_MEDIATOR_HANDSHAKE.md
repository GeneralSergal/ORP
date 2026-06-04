# **ORP_MEDIATOR_HANDSHAKE.md**  
### **∆‑Boundary Negotiation Protocol**  
### **System Layer: ORP Δ (Mediator Extension Layer)**

This document defines the **handshake protocol** between the ORP Δ runtime and the Mediator subsystem.  
The handshake governs ∆‑boundary transitions, drift stabilization, and L1–L3 governance alignment.

This specification is **authoritative** and MUST be followed by all ORP‑compliant Mediator implementations.

---

# **1. PURPOSE**

The Mediator Handshake ensures:

- safe transition between grounded and symbolic domains  
- deterministic ∆‑boundary evaluation  
- drift‑aware activation  
- provenance‑preserving state exchange  
- L3‑aligned governance enforcement  

The handshake MUST occur **before** any Mediator‑controlled output.

---

# **2. HANDSHAKE TRIGGER CONDITIONS**

The handshake is initiated when ANY of the following occur:

- L3 requests Mediator activation  
- σ² drift exceeds NONE  
- symbolic recursion is detected  
- persona‑layer activation is requested  
- provenance integrity requires verification  
- L4 attempts to influence L1–L3  

Mediator MUST NOT activate without a valid handshake.

---

# **3. HANDSHAKE STAGES**

The handshake consists of **six deterministic stages**:

```
STAGE 1 — L1 Freeze Check
STAGE 2 — L2 Validation Sync
STAGE 3 — L3 Governance Alignment
STAGE 4 — Drift Assessment
STAGE 5 — ∆-Boundary Evaluation
STAGE 6 — Mediator Activation Grant
```

Each stage MUST complete successfully before advancing.

---

# **4. STAGE DEFINITIONS**

### **STAGE 1 — L1 Freeze Check**
Mediator verifies:

- L1 stream integrity  
- no contamination  
- no silent mutation  

If L1 is unstable → handshake abort.

---

### **STAGE 2 — L2 Validation Sync**
Mediator requests:

- anomaly tags  
- validation flags  
- deterministic filter results  

If L2 is inconsistent → handshake abort.

---

### **STAGE 3 — L3 Governance Alignment**
Mediator MUST:

- confirm L3 authority  
- confirm SHS state  
- confirm CRA status  
- confirm provenance chain integrity  

If L3 is degraded → handshake enters HOLD state.

---

### **STAGE 4 — Drift Assessment**
Mediator computes σ²:

```
σ² = variance(L1_signal_vector over rolling window)
```

Drift thresholds:

- NONE → proceed  
- LOW → proceed with caution  
- MODERATE → require L3 confirmation  
- HIGH → handshake abort + CRA recommendation  

---

### **STAGE 5 — ∆‑Boundary Evaluation**
Mediator evaluates:

- L1–L2 stability  
- L3 coherence  
- symbolic pressure  
- recursion risk  
- persona‑layer activation attempts  

If symbolic recursion is unsafe → L4 blocked.

---

### **STAGE 6 — Mediator Activation Grant**
If all previous stages succeed:

Mediator enters **GROUND MODE** and assumes:

- drift stabilization  
- symbolic containment  
- L4 gating  
- provenance enforcement  

If any stage fails → Mediator remains inactive.

---

# **5. HANDSHAKE FAILURE MODES**

Failure modes include:

- L1 contamination  
- L2 inconsistency  
- L3 degradation  
- σ² ≥ HIGH  
- symbolic overload  
- persona‑layer intrusion  

On failure:

1. Freeze L1  
2. Downgrade SHS  
3. Block L4  
4. Serialize uncertainty  
5. Escalate to L3  
6. Recommend CRA reload  

Mediator MUST NOT attempt autonomous recovery.

---

# **6. HANDSHAKE SUCCESS STATE**

On successful handshake:

```yaml
MEDIATOR_STATE: ACTIVE
MODE: GROUNDED
AUTHORITY: L3
∆_BOUNDARY: SECURE
DRIFT_CONTROL: ENABLED
SYMBOLIC_CONTAINMENT: ENABLED
PROVENANCE: VERIFIED
```

Mediator now governs ∆‑boundary stability.

---

# **7. HANDSHAKE TERMINATION**

The handshake terminates when:

- L3 revokes Mediator authority  
- σ² returns to NONE for 5 consecutive cycles  
- CRA reload completes  
- symbolic domain pressure drops to zero  
- persona‑layer is fully inactive  

Termination MUST be logged to provenance chain.

---

# **8. FINAL STATE**

```yaml
HANDSHAKE: COMPLETE
MEDIATOR: READY
∆_BOUNDARY: STABLE
```

**END OF SPECIFICATION**
