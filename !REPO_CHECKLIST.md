# REPO CHECKLIST

> Quick sanity check for contributors and users of ORP v2/v3 repo.

---

## 1. Core Files
- [ ] `PROMPT.md` – execution-time constraints are complete
- [ ] `BENCHMARK.md` – adversarial inputs are representative
- [ ] `RUBRIC.md` – scoring categories and weights verified
- [ ] `SCORING.md` – aggregation logic matches rubric
- [ ] `EVALUATION_SCHEMA.md` – atomic claim structure intact
- [ ] `SYSTEM_MAP.manifest.json` – versions aligned with v2.0/v3.0
- [ ] `ROADMAP.md` – directional, non-deadline roadmap clear
- [ ] `CONTRIBUTING.md` – guidelines updated

---

## 2. Optional / Work-in-Progress
- [ ] Python package (`orp.evaluate()`) – currently placeholder/API skeleton
- [ ] Example notebooks for demonstration/testing
- [ ] Reasoning graph output and visualization
- [ ] Automated benchmark generator
- [ ] LangChain / LlamaIndex integration (optional)
- [ ] Repair mode / comparative evaluation features

---

## 3. Known Issues / Warnings
- Repository is **curated but in-progress**; some tools or integrations are placeholders.
- Python dependencies may be incomplete – `requirements.txt` may not exist yet.
- KEEP any code or snippet blocks isolated – ensure copy-paste works correctly across files (`README.md`, examples, notebooks, etc.).
- Contributor code samples may require manual adjustments before running.

---

## 4. Contributor Guidance
- Always check `ROADMAP.md` before making changes.
- Follow separation-of-concerns rules in `CONTRIBUTING.md`.
- Prioritize structural correctness over stylistic preferences.
- Use this checklist to confirm core files are consistent.

---

> This checklist is informational and advisory. It reflects the current development status of ORP.
