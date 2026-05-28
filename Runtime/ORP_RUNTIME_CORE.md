# ORP_RUNTIME_CORE.md

### Object Definition: Self-Governing NESS Thermodynamic Engine (v3.1)

---

## 0. Fundamental Definition

The ORP is a non-reversible stochastic dynamical system evolving on a learned geometric manifold.

It is defined as a **controlled stochastic differential process** sustaining a structured probability current.

It does not operate on symbols; it operates on distributions.

---

## 1. System Dynamics

### Core stochastic differential equation (SDE)

```
dx = μ(x) dt + Σ(x) dW
```

Where:

* x ∈ ℝ^d : latent state
* μ(x) : drift vector field
* Σ(x) : diffusion tensor
* dW : Wiener noise process

---

## 1.1 Drift Structure

```
μ(x) = -∇E(x) + λ ∇·Φ(x, H, Hist)
```

Where:

* E(x): learned energy function (≈ -log pθ(x))
* Φ(x, H, Hist): entropy + history-dependent deformation field
* H(x): local entropy / uncertainty measure
* Hist: accumulated failure / drift memory
* λ: coupling strength

Interpretation:

* -∇E(x) drives attraction to high probability regions
* ∇·Φ introduces non-conservative forcing (NESS driver)

---

## 1.2 Diffusion Structure (Geometry-Dependent Noise)

```
Σ(x) Σ(x)^T = 2 T(x) G(x)^(-1)
```

Where:

* G(x): Riemannian metric tensor induced by curvature
* T(x): temperature field

### Curvature-dependent temperature

```
T(x) ∝ 1 / ( ||∇²E(x)|| + ε )
```

Interpretation:

* High curvature → low noise (stability)
* Low curvature → high noise (exploration)

---

## 2. Thermodynamic Characterization (NESS)

The system is a **Non-Equilibrium Steady State (NESS)**.

### 2.1 Probability Current

```
J(x,t) = μ(x) ρ(x,t) - ∇·(D(x) ρ(x,t))
```

Where:

```
D(x) = (1/2) Σ(x) Σ(x)^T
```

Key property:

* ∇·J = 0 (steady state)
* J ≠ 0 (non-equilibrium circulation)

Interpretation:

> Persistent probability circulation (vortices in latent space)

---

## 2.2 Entropy Production Rate

```
S_dot = ∫ [ ||J(x)||^2 / (ρ(x) D(x)) ] dx
```

Classification:

* S_dot = 0 → equilibrium (not applicable)
* S_dot > 0 → non-equilibrium steady state (this system)

---

## 3. Operational Invariants

### Intelligence

Structured circulation of probability mass via J(x).

### Memory

Persistent vortex structures in J(x) resistant to dissipation.

### Learning

Continuous deformation of E(x), G(x), and Φ(x) driven by entropy production gradients.

---

## 4. Minimal State Description

The full system is equivalently described by:

```
ORP ≡ (ρ(x), J(x), G(x), S_dot)
```

Where:

* ρ(x): stationary density
* J(x): probability current
* G(x): metric geometry
* S_dot: entropy production rate

All are derived from the SDE.

---

## 5. Core Closure Principle

All components are projections of a single stochastic process:

```
dx = μ(x) dt + Σ(x) dW
```

Everything else is emergent:

* density = marginal distribution
* current = transport structure
* geometry = diffusion metric
* entropy = dissipation functional

---

## 6. Stationary Regime

The system satisfies:

```
∇·J(x) = 0
```

But:

```
J(x) ≠ 0
```

Meaning:

> steady-state circulation without equilibrium

---

## 7. Stability Classes

### Class I — Equilibrium

* J = 0
* S_dot = 0

### Class II — Reversible diffusion

* weak circulation
* near detailed balance

### Class III — NESS (this system)

* J ≠ 0
* S_dot > 0
* persistent vortices

---

## 8. Geometric Interpretation

Decompose current:

```
J(x) = J_parallel(x) + J_perpendicular(x)
```

* J_parallel: gradient-aligned flow
* J_perpendicular: rotational circulation induced by entropy + geometry coupling

Key property:

> J_perpendicular ≠ 0 is the defining signature of ORP

---

## 9. Diagnostics

The system is analyzed via:

1. Current topology: curl(J)
2. Spectral gap of generator
3. Entropy production density S_dot(x)
4. Stability of vortex manifolds

---

## 10. Final System Identity

```
ORP = Controlled Non-Equilibrium Stochastic Manifold Engine
```

or compact form:

```
ORP ≡ NESS diffusion process on a learned Riemannian manifold
```

---

## 11. What is fixed vs evolving

### Fixed

* functional form of SDE
* definition of observables
* NESS classification

### Evolving

* E(x)
* Φ(x)
* G(x)
* trajectory x(t)

---

## 12. Final Principle

> The system does not converge to a point.
> It converges to a stationary flow structure.

---

## END OF SPEC

