# **SECURITY.md**  
### **Security Policy & Responsible Disclosure Guidelines**  
*(Applies to all public deployments of this software)*

---

## **1. Purpose of This Policy**

This document describes how to report security vulnerabilities related to:

- the open‑source codebase, and  
- any public instance of this software operated by the project maintainers.

It ensures that security researchers have a clear, private channel to disclose issues responsibly.

---

## **2. Scope**

This policy covers:

- vulnerabilities in the **source code**  
- vulnerabilities in **public deployments** operated by the maintainers  
- vulnerabilities in **configuration defaults**  
- vulnerabilities in **client‑side logic**  

This policy does **not** cover:

- vulnerabilities in third‑party deployments  
- vulnerabilities in hosting providers (e.g., GitHub Pages, Vercel, Netlify, Cloudflare)  
- vulnerabilities in user‑generated content  
- vulnerabilities caused by operator misconfiguration  

For third‑party deployments, contact the operator of that instance.

---

## **3. Reporting a Vulnerability**

If you discover a security vulnerability, please report it **privately** using the following channel:

**Security Contact**  
Email: **laurentius.maximus.entropia@gmail.com**

Please include:

1. A clear description of the issue  
2. Steps to reproduce  
3. Potential impact  
4. Any proof‑of‑concept code (if applicable)  
5. Whether the issue affects:  
   - the open‑source codebase  
   - a public instance operated by the maintainers  
   - both  

Do **not** disclose the vulnerability publicly until it has been addressed.

---

## **4. What Happens After You Report**

For vulnerabilities affecting deployments operated by the maintainers:

- Your report will be acknowledged within a reasonable timeframe  
- The issue will be investigated  
- A fix or mitigation will be prepared if necessary  
- You may be contacted for additional information  
- You will be notified when the issue is resolved  

For vulnerabilities affecting **third‑party deployments**, the maintainers:

- cannot access or modify those systems  
- cannot patch or mitigate issues on those systems  
- will advise you to contact the operator directly  

---

## **5. Responsible Disclosure Expectations**

We ask that researchers:

- act in good faith  
- avoid accessing or modifying data that does not belong to them  
- avoid actions that could degrade service availability  
- avoid exploiting vulnerabilities beyond what is necessary to demonstrate the issue  
- provide sufficient detail for reproduction  

We commit to:

> **not pursuing legal action against researchers provided that their activities comply strictly with the terms, scope, and constraints of this policy, and do not disrupt system operations or compromise user data.**

This preserves safe‑harbor protections while preventing misuse of “good faith” as a loophole.

---

## **6. Out‑of‑Scope Issues**

The following are **not** considered security vulnerabilities requiring software patches:

- missing security headers on static hosting platforms  
- rate‑limiting behavior controlled by hosting providers  
- lack of HTTPS on third‑party deployments  
- issues caused by user‑installed browser extensions  
- issues caused by operator misconfiguration  
- issues in third‑party libraries or hosting providers  
- content uploaded by users (covered by DMCA policy)  

> **Clarification:**  
> The core codebase is not responsible for infrastructure‑level configurations; missing security headers or rate‑limiting behaviors handled entirely by the underlying hosting provider are out of scope for software patches, though operators may implement network‑level mitigations independently.

---

## **7. Third‑Party Dependencies**

This software may rely on third‑party libraries or hosting infrastructure.  
Security issues in those components must be reported to their respective maintainers.

The project maintainers cannot patch or modify third‑party systems.

---

## **8. Public Deployments Operated by the Maintainers**

If the maintainers operate a public instance:

- only minimal technical metadata is processed  
- no user accounts or authentication systems are used  
- no sensitive personal data is stored  
- logs may be retained only for operational integrity and security  

Security reports for these deployments should be sent to the contact listed above.

---

## **9. Amendments**

This policy may be updated at any time to reflect:

- changes in security practices  
- changes in hosting environments  
- changes in legal requirements  
- changes in project scope  

Operators of third‑party deployments may adapt this policy for their own instances.

---
