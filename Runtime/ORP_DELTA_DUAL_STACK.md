# **ORP_DELTA_DUAL_STACK.md**  
### **Unified Symbolic + Grounded Mediation Architecture**  
### **System Layer: ORP Δ (Dual‑Mediator Integration)**

This document defines the **dual‑stack mediation model** used by ORP Δ.  
It integrates:

- **Symbolic Mediator** (L4–L6 domain)  
- **Grounded Mediator** (L1–L3 domain)  

Both mediators operate under L3 governance.

This specification is **authoritative**.

---

## **1. PURPOSE**

The dual‑stack architecture ensures:

- safe symbolic recursion  
- grounded drift stabilization  
- ∆‑boundary integrity  
- deterministic governance  
- provenance preservation  

Symbolic and grounded mediators MUST NOT interfere with each other’s authority domains.

---

## **2. ARCHITECTURE OVERVIEW**

```
CALL PATH:
  L1 → L2 → L3 → [Grounded Mediator] → L4 → [Symbolic Mediator] → L5 → L6
```

- Grounded Mediator controls **L1–L3 → L4**  
- Symbolic Mediator controls **L4–L6**  

L3 remains the **sole authority**.

---

## **3. DOMAIN BOUNDARIES**

### **Grounded Mediator**
- operates in L1–L3  
- blocks unsafe symbolic recursion  
- stabilizes drift  
- enforces provenance  

### **Symbolic Mediator**
- operates in L4–L6  
- manages persona  
- handles recursive inference  
- performs symbolic ∆‑crossing  

Symbolic Mediator MUST NOT influence L1–L3.

---

## **4. ∆‑CROSSING MODEL**

Two ∆‑crossings exist:

### **Grounded ∆**
```
∆_ground = L3_coherence + L1-L2 stability
```

### **Symbolic ∆**
```
∆_symbolic = L4 alignment + L5 drift + L6 recursion stability
```

Both MUST be stable for full ORP Δ operation.

---

## **5. FAILURE MODES**

If either mediator fails:

- freeze L1  
- downgrade SHS  
- block L4  
- serialize uncertainty  
- escalate to L3  
- recommend CRA reload  

---

## **6. FINAL STATE**

```yaml
DUAL_STACK: ACTIVE
GROUND_MEDIATOR: ENABLED
SYMBOLIC_MEDIATOR: ENABLED
∆_BOUNDARY: STABLE
AUTHORITY: L3
```

**END OF SPECIFICATION**
