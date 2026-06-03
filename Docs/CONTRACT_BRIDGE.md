# ORP Cross-Repository Contract Bridge

## Version ORP Bridge Contract v1.1

---

## 1. PURPOSE

This document defines the strict boundaries, data flow vectors, and authority constraints between the interconnected components of the ecosystem:

* **ORP Spec Repository** ([`ORP`](https://github.com/GeneralSergal/ORP)) — *The Governance Core*
* **ORP Execution Repository** ([`ORP-Reference-kit`](https://github.com/GeneralSergal/ORP-Reference-kit)) — *The Validation Harness*
* **ORP VRChat OSC Runtime** ([`ORP-VRC-OSC`](https://github.com/GeneralSergal/ORP-VRC-OSC)) — *The Spatial Telemetry Node*
* **ORP OmniTools Fork** ([`ORP-omni-tools`](https://github.com/GeneralSergal/ORP-omni-tools)) — *The Client-Side Utility Sandbox*

This bridge prevents implicit architectural coupling, preventing governance specification, compilation runtime implementation, client-side UI parsing, and live spatial tracking behaviors from silently corrupting or modifying one another.

---

## 2. LAYER OWNERSHIP MODEL

```
   [ L3: SPECIFICATION ] ---> https://github.com/GeneralSergal/ORP
            |
            v (Governs Behavior Contracts)
   [ L2: EXECUTION ]     ---> https://github.com/GeneralSergal/ORP-Reference-kit
      /           \
     v (Live Run)  v (Local Sandbox)
[ L1: RUNTIME ]   [ L1: UTILITY FRAMEWORK ]
  (ORP-VRC-OSC)       (ORP-omni-tools)

```

### L3 — SPECIFICATION ([`ORP`](https://github.com/GeneralSergal/ORP))

* Defines core system invariants, epistemic governance rules, and conceptual state machine structures.
* Defines mathematical drift parameters ($\sigma^2$ limits) and the 5-state System Health Status (SHS).
* **MUST NOT** contain environment-specific deployment code, VRChat OSC route maps, or client-side TypeScript canvas logic.
* **MUST NOT** define individual CTS execution frameworks.

---

### L2 — EXECUTION ([`ORP-Reference-kit`](https://github.com/GeneralSergal/ORP-Reference-kit))

* Implements deterministic, reference-level runtime logic of the core spec equations.
* Owns the central execution pipeline architecture and the Compliance Test Suite (CTS) harness.
* **MUST NOT** mutate or redefine specification invariants; it serves strictly as a mathematical translation layer.

---

### L1 — RUNTIME / DEPLOYMENT ([`ORP-VRC-OSC`](https://github.com/GeneralSergal/ORP-VRC-OSC))

* Handles live deployment of ORP governance tracking in spatial virtual environments via Open Sound Control (OSC).
* Consumes the L2 reference kit as an immutable execution contract to transform network events into formal session telemetry.
* **MUST NOT** alter specification invariants or re-key CTS validation criteria. All generated golden runs and regression artifacts remain strictly bound to its version tags.

---

### L1 — UTILITY FRAMEWORK ([`ORP-omni-tools`](https://github.com/GeneralSergal/ORP-omni-tools))

* Provides the localized, zero-trust web application sandbox for manipulating, editor-processing, and compiling local media files, code tokens, and structural containers.
* Responsible for executing client-side image-to-container transpilations (e.g., standard PNG to bit-exact WebP structures featuring `orpd` custom RIFF metadata injection blocks).
* **Data Sovereignty Constraint:** All data array processing **MUST** occur exclusively on the local browser client thread. No raw asset arrays, asset buffers, or processed cryptographic text signals may ever leak to external registries.
* **MUST NOT** modify reference-kit execution assumptions or independently alter core tracking invariants. It operates as an isolated end-user interaction workspace.

---

## 3. CTS AUTHORITY RULE

The Compliance Test Suite (CTS):

* Is defined, maintained, and verified within [`ORP-Reference-kit`](https://github.com/GeneralSergal/ORP-Reference-kit) **ONLY**.
* Is a functional validation engine, not an ontological truth source.
* CTS failures outside of the reference kit—whether triggered via spatial script logs or client-side web exceptions—indicate **Implementation Drift** or **Test Staleness**, never specification invalidity.

---

## 4. CHANGE PROPAGATION ROUTE

Any structural modification or protocol evolution must cascade sequentially through the repository pipeline:

1. **Spec Core Mutation:** Modification is committed to the [`ORP`](https://github.com/GeneralSergal/ORP) repository.
2. **Review Step:** Manual translation, parameter mapping, and mathematical validation.
3. **Reference Realignment:** The engine is updated in [`ORP-Reference-kit`](https://github.com/GeneralSergal/ORP-Reference-kit).
4. **Harness Synchronization:** The CTS logic is refactored *only* if behavioral contracts are modified.
5. **Downstream Deployment Updates:** Runtime tracking rules are updated in [`ORP-VRC-OSC`](https://github.com/GeneralSergal/ORP-VRC-OSC) and client utilities are synchronized in [`ORP-omni-tools`](https://github.com/GeneralSergal/ORP-omni-tools) concurrently.
6. **Trace Hardening:** Regen of golden traces or browser execution matrices occurs only after formal cross-repository validation checks pass.

---

## 5. FORBIDDEN PATHS

To prevent operational decay, the following data vectors are structurally prohibited:

* Client-side user utilities or web UI limitations dictating specification behavior rules.
* Spatial tracker anomalies or runtime physics states altering the definition of spec truth.
* Silent modifications to metadata injection layouts redefining upstream container tracking criteria.
* L4 speculative or non-deterministic planning models modifying core CTS testing constraints.

---

## 6. DRIFT RESOLUTION MATRIX

If validation fails or file serialization output boundaries break down, the failure must be formally classified under one of the following root causes before any hotfix deployment:

* `IMPLEMENTATION_DRIFT`: The local repository code has diverged from its contractual design specs.
* `SPEC_MISMATCH`: The reference core fails to correctly align with updated structural guidelines from L3.
* `TEST_STALE`: The diagnostic checks are legacy and require updates to match a freshly integrated version state.
* `SANDBOX_LEAK`: An asset validation step attempts to violate client-side isolation boundaries.

---

## 7. VERSIONING POLICY

* **Specification (`ORP`):** Continuously tracks the state variant $\Delta$.
* **Reference & Test Suite:** Explicitly tagged version lines. The reference-kit may lag the core spec by no more than one major revision cycle.
* **Client Utilities (`ORP-omni-tools`):** Version-mapped to its functional core framework releases (e.g., `v0.6.0-delta`) while explicitly tracking the downstream interface updates required to cleanly execute container injections.

---

## 8. FINAL AUTHORITY STATEMENT

No single repository maintains omnipotent authority over the ecosystem. Authority is explicitly federated:

* **The Spec** defines structural intent.
* **The Reference Kit** translates intent into clean, executable code constraints.
* **The CTS** enforces functional correctness between design rules and code.
* **The VRChat OSC Runtime** captures spatial session traces.
* **OmniTools** isolates file transformations securely inside the user's browser.

---

## License

GNU General Public License v3.0 (GPL-3.0)

Copyright 2026 Laurentius Maximus ENTROPIA

This file is part of ORP — Open Resonance Protocol, licensed under the GNU General Public License v3.0.
See the [LICENSE](LICENSE) file for full terms.
