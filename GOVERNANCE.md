# **GOVERNANCE.md**  
### **ORP Δ — Governance Charter**  
*(Authority Model, Decision Flow, Structural Responsibilities, and Provenance Rules)*

---

## **1. Purpose of This Governance Model**

ORP Δ is a **governance‑first epistemic architecture**.  
This governance model defines:

- who may change what  
- how authority flows  
- how structural integrity is preserved  
- how epistemic boundaries are enforced  
- how drift and provenance are controlled  
- how licensing domains interact  

This document governs **decision‑making**, not runtime behavior.

---

## **2. Authority Layers (L1–L4)**

ORP Δ uses a four‑layer authority stack:

### **L1 — Structural Foundations**  
Defines the invariant architectural primitives.  
Cannot be overridden.  
Changes require explicit maintainer consensus.

### **L2 — Schema & Evaluation Contracts**  
Defines evaluation logic, drift metrics, provenance rules, and structural schemas.  
Changes require governance review.

### **L3 — Runtime Governance**  
Defines reasoning constraints, uncertainty surfacing, epistemic separation, and fail‑closed behavior.  
Changes require full PR review and governance alignment.

### **L4 — Implementation & Tooling**  
Defines utilities, reproducibility tools, documentation, and non‑structural improvements.  
Changes may be approved through standard PR review.

---

## **3. Governance Principles**

1. **Epistemic Separation**  
   No layer may reinterpret or override the authority of a lower layer.

2. **Deterministic Governance Flow**  
   All changes must follow the L1→L4 authority hierarchy.

3. **Provenance Preservation**  
   All modifications must maintain traceability and avoid corruption of upstream signals.

4. **Drift Observability**  
   All changes must preserve or improve drift detection and σ² observability.

5. **Fail‑Closed Behavior**  
   When uncertain, ORP Δ must degrade safely, not creatively.

6. **No Hidden Dependencies**  
   All cross‑component relationships must be explicit and documented.

7. **License Domain Integrity**  
   Code, assets, and authorship metadata must remain within their designated license domains.

---

## **4. Decision‑Making Process**

### **4.1 Maintainer Responsibilities**

Maintainers are responsible for:

- enforcing governance rules  
- reviewing contributions for structural alignment  
- rejecting changes that introduce drift or weaken epistemic boundaries  
- ensuring documentation and implementation remain synchronized  
- preserving ORP Δ’s architectural invariants  
- maintaining license domain separation  

### **4.2 Contributor Responsibilities**

Contributors must:

- follow the **CONTRIBUTING.md** protocol  
- understand the repository structure before modifying it  
- maintain alignment with runtime definitions, specifications, and manifests  
- avoid introducing new authority layers or bypassing existing ones  
- respect DAL‑1.0 authorship rules  
- respect GPL‑3.0 and CC‑BY‑SA 4.0 boundaries  

---

## **5. Change Classification**

### **5.1 Structural Changes (L1–L2)**  
Examples:

- architectural primitives  
- schema definitions  
- drift metrics  
- provenance boundaries  
- license domain boundaries  

**Require:**  
- maintainer consensus  
- governance review  
- full PR template  

### **5.2 Runtime Changes (L3)**  
Examples:

- uncertainty surfacing  
- epistemic separation logic  
- fail‑closed behavior  

**Require:**  
- governance review  
- full PR template  

### **5.3 Implementation Changes (L4)**  
Examples:

- tooling  
- documentation  
- reproducibility utilities  
- non‑structural improvements  

**Require:**  
- standard PR review  

---

## **6. Governance Review Criteria**

A change is acceptable only if it:

- preserves epistemic separation  
- maintains schema/runtime compatibility  
- avoids provenance corruption  
- improves or maintains drift observability  
- does not introduce hidden dependencies  
- does not weaken fail‑closed behavior  
- respects license domain boundaries  
- preserves DAL‑1.0 authorship integrity  

---

## **7. Conflict Resolution**

If maintainers disagree:

1. Structural integrity takes precedence over convenience.  
2. Governance alignment takes precedence over implementation preference.  
3. Drift‑minimizing solutions take precedence over expressive ones.  
4. The design principle applies:

> **Visible uncertainty is preferable to invisible corruption.**

---

## **8. Licensing Governance**

ORP Δ uses a **multi‑license perimeter**:

- **DAL‑1.0** — authorship & provenance  
- **GPL‑3.0** — source code  
- **CC‑BY‑SA 4.0** — visual assets  

Rules:

- No mixing share‑alike domains in a single artifact  
- No relicensing DAL‑1.0 materials  
- Documentation may reference all domains without inheriting their licenses  

See: **Multi‑License Structure Appendix**

---

## **9. Provenance Governance**

Provenance categories:

- SELF‑GENERATED  
- DERIVED‑WITH‑ATTRIBUTION  
- TRANSFORMED‑AS‑ALLOWED  
- EXTERNAL‑UNLICENSED (not permitted)

Recognized provenance markers include:

- ENTROPIA  
- ORP Δ  
- Δ‑Interface Arbiter  
- 0.51_strict  
- SHS / DRIFT / CRA / LAS  
- Operator State Model  

See: **Provenance Chain Appendix**

---

## **10. Amendments**

This governance charter may be updated only through:

- maintainer consensus  
- a governance‑aligned PR  
- explicit documentation of the rationale  

---

## **11. Canonical References**

- `LICENSE`  
- `LICENSE-DETAILED.md`  
- `DAL-FAQ.md`  
- `CONTRIBUTING.md`  
- `README.md`  

---

## **End of GOVERNANCE.md**
