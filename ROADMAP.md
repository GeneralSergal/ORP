# ORP v3.0 Roadmap

> Note on timelines: ORP is a solo, curiosity-driven project. There are no fixed deadlines. Progress depends on available time and community interest. This roadmap reflects direction and priorities rather than promises. Contributions and feedback are very welcome to accelerate development.

## One-Sentence Vision
ORP aims to become the standard open quality gate for reliable AI reasoning — prioritizing signal integrity over polished hallucinations.

## Current Focus
Right now, the primary effort is on:
- Building the Python package foundation (`orp.evaluate()` API)
- Improving scoring logic and assumption surfacing
- Preparing example notebooks for demonstration and testing
## Core Philosophy & Branding
- **Signal Integrity Engine** — Emphasize ORP as prioritizing truth over narrative coherence.
- **Epistemic Modes**:
  - Strict (zero tolerance for uncertainty)
  - Balanced (default)
  - Exploratory (controlled speculation with explicit flags)
- **Confidence Decay** — Track how model confidence declines when leaving its knowledge boundary.

## Architectural / Structural Ideas
- **Multi-Stage Pipeline**:
  - Decomposition → atomic claims
  - Assumption surfacing → list explicit model assumptions
  - Adversarial perturbation → auto-generated stress inputs
  - Cross-verification → self-consistency + optional external tools
  - Epistemic scoring → human-readable report
- **Modular Evaluators**:
  - Plug-in different scoring modules (rubric-based, LLM-as-judge, embedding similarity)
- **Traceability Layer**:
  - Full audit trail for each score (claims failed, why, adversarial tests revealed)

## New Capabilities
- **Automated Benchmark Generator**:
  - Domain-specific (history, medicine, code)
  - Generates fresh adversarial test cases
- **Reasoning Graph Output**:
  - Nodes = claims
  - Edges = supports / contradicts / depends
  - Graph visualization
- **Comparative Mode**:
  - Run same query across multiple models or temperatures
  - Highlight epistemic differences
- **Uncertainty Quantification**:
  - From scalar score to confidence distribution
  - Example: "70% ± 15% confidence on core claims"
- **Repair Mode**:
  - Detect hallucinations
  - Suggest corrected claims
  - Regenerate higher-fidelity response
  ## Implementation / Usability

- **Python Package MVP**

\```python
from orp import evaluate

result = evaluate(response, context=context, mode="strict")
print(result.score, result.report, result.graph)
\```

- Optional LangChain / LlamaIndex integration
- Web UI (Streamlit / Gradio) for quick testing
- CLI tool for batch dataset evaluation
## Evaluation & Validation
- Built-in test suites for multiple domains:
  - Reasoning
  - Factuality
  - Coding
  - Creative
- Self-improvement loop:
  - ORP evaluates its own outputs
  - Iteratively improves prompts and rubrics
- Export results:
  - JSON
  - Markdown
  - Hugging Face dataset style

## Community & Extensibility
- Plugin system for custom rubrics or domain-specific evaluators (medical, legal, scientific)
- ORP Hub → share adversarial tests and configs
- Versioned prompt library for transparent and reversible improvements

## Prioritization Suggestion for v3.0 (MVP)
- **Must-have**:
  - Runnable Python package (API stub ready)
  - Improved scoring with assumption surfacing
  - Better documentation and examples
  - One strong demo (e.g., auditing RAG outputs)
- **Nice-to-have**:
  - Reasoning graph
  - Automated attack generator
  - LangChain integration
- **Ambitious**:
  - Multi-model comparison dashboard
  - Repair mode
