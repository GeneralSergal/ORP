# **GDPR_CCPA_ADDENDUM.md**  
### **Data Protection Addendum for GDPR & CCPA Contexts**  
*(Supplement to `DISCLAIMER.md` — applies strictly to instances operated on an unmanaged, self‑service basis)*

---

## **1. Scope of This Addendum**

This addendum applies **only** to deployments of this software that are:

- publicly accessible, or  
- accessible to users other than the operator  

It does **not** apply to:

- private, local, or single‑user self‑hosted instances  
- deployments where no personal data is collected or stored  

This addendum supplements, but does not replace, the project’s primary `DISCLAIMER.md`.

---

## **2. Nature of the Software**

This project is an **open‑source, self‑hosted application**.  
It does not inherently require the collection of personal data.

Any personal data processed by a hosted instance is:

- voluntarily submitted by users  
- controlled by the operator of that instance  
- not transmitted to the project maintainers  

The maintainers of this repository do **not** operate a centralized service and do **not** receive or process user data unless they themselves host a specific deployment.

---

## **3. Operator Responsibilities (If You Host a Public Instance)**

If you deploy this software in a way that allows others to access it, you become the **Data Controller** under GDPR and the **Business** under CCPA.

As such, **you**, the operator, are responsible for:

- determining what data your instance collects  
- informing users of that data collection  
- complying with applicable privacy laws  
- responding to user data requests  
- securing any stored data  

The project maintainers cannot fulfill these obligations on your behalf.

**Where the project maintainers act as the operator of a specific public deployment, their responsibilities as a Data Controller are strictly limited to the data handling practices disclosed in that deployment’s specific Privacy Notice.**

---

## **4. User Responsibilities**

Users of any hosted instance are responsible for:

- ensuring they have rights to any data they upload  
- complying with all applicable laws  
- not submitting sensitive or regulated data unless explicitly supported  

Users should assume that any data they submit may be visible to the operator of the instance.

---

## **5. Data Categories Potentially Processed**

Depending on configuration, a hosted instance **may** process:

- user‑submitted text or files  
- IP addresses (standard server logs)  
- browser metadata (standard HTTP headers)  

The core software architecture does **not** natively deploy tracking scripts or analytics; however, underlying hosting infrastructure, network routing, or content delivery networks used by an operator may utilize standard technical cookies or metadata logging for security and operational purposes.

---

## **6. Data Retention**

This software does not enforce any retention policy.

Retention is determined by:

- the operator of the hosted instance  
- the hosting environment  
- any external storage systems the operator configures  

Users must contact the operator directly for retention details.

---

## **7. Data Access, Correction, and Deletion Requests**

Under GDPR and CCPA, users may have rights to:

- access their data  
- request correction  
- request deletion  
- request export  

These rights apply **only** to the operator of the hosted instance.

The project maintainers:

- cannot access user data  
- cannot modify or delete user data  
- cannot respond to GDPR/CCPA requests  

All such requests must be directed to the operator of the specific deployment.

---

## **8. No Data Transfer to Project Maintainers**

This software does **not** transmit user data to:

- the project maintainers  
- third‑party servers  
- analytics providers  
- external APIs  

Unless the operator explicitly configures such integrations.

---

## **9. Security Disclaimer**

This software is provided **without any security guarantees**.

Operators are responsible for:

- securing their deployment  
- applying updates  
- configuring HTTPS  
- managing access controls  
- preventing unauthorized access  

The maintainers are not liable for security incidents on hosted instances.

---

## **10. Changes to This Addendum**

Operators may modify this addendum to suit their deployment, provided such modifications:

- do not misrepresent the responsibilities of the project maintainers  
- do not imply the maintainers provide hosting or data processing services  

---

