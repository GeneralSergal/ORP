# **ORP v3.0 — Release‑Please‑Aware CHANGELOG Template**

# ORP Changelog
Governance‑first release history for the Open Resonance Protocol.

All releases follow:
- **Semantic Versioning**
- **Conventional Commits**
- **Release‑Please automated versioning**
- **ORP v3.0 provenance requirements**

---

## [Unreleased]

> This section is automatically populated by Release‑Please  
> when new commits with `feat:` or `fix:` are merged into `main`.

---

# [3.0.0] — Initial Frozen Release
**Status:** FROZEN  
**SHS:** GREEN  
**DRIFT:** NONE  
**CRA:** VALID  
**LAS:** L3  

The canonical, governance‑frozen release of ORP v3.0.

### ✨ Features
- Introduced full L1→L4 authority chain
- Added σ² numeric drift model
- Added SHS 5‑state health engine
- Added CRA (Consistency & Recovery Anchor)
- Added governance‑first runtime header
- Added invariants for typed signals, provenance, and drift visibility

### 📝 Documentation
- Added full ORP documentation suite
- Added architectural diagrams (L1→L4, SHS, Drift Loop)
- Added execution pipeline diagrams
- Added compliance and invariants sections

### 🔧 Maintenance
- Repository structure formalized
- Documentation index created
- Initial CI pipeline established

---

# CHANGELOG FORMAT (Template for Future Releases)

Below is the structure Release‑Please will follow for each new version.

Copy/paste this block when manually adding notes or when preparing a major revision.

```markdown
## [X.Y.Z] — YYYY‑MM‑DD
**SHS:** GREEN | YELLOW | ORANGE | RED | BLACK  
**DRIFT:** NONE | LOW | MODERATE | HIGH  
**CRA:** VALID | DEGRADED | UNKNOWN  
**LAS:** L1 | L2 | L3 | L4  

### ✨ Features
- feat: …

### 🐛 Bug Fixes
- fix: …

### 📝 Documentation
- docs: …

### 🔧 Maintenance
- chore: …

### ♻️ Refactoring
- refactor: …

### 🔍 Provenance Notes
- (Optional) Manual notes on state transitions, drift resets, or governance decisions.
```

---

# Release‑Please Metadata

Release‑Please automatically updates:

- `ORP_VERSION`
- `CHANGELOG.md`
- GitHub Releases
- Tags
- Release PRs

It uses:

```
.release-please-manifest.json
.release-please-config.json
.github/workflows/release-please.yml
```

---

# Provenance Guarantee

Every release must preserve:

- L1 immutability  
- L2 deterministic validation  
- L3 authority integrity  
- L4 non‑authoritative inference  
- σ² drift visibility  
- End‑to‑end provenance continuity  

---

# Footer

**Signal > Narrative**  
**Recoverability > Completion**  
**Provenance > Coherence**
