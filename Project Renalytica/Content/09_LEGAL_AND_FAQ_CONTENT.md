# RENALYTICA — LEGAL, PRIVACY & KNOWLEDGE SUITE MANIFEST
**Target Suite:** Legal & Knowledge Pages  
**Structure Status:** Production Decoupled Architecture  
**Last Updated:** September 2026  

---

## 1. Architectural Overview & Page Isolation

To provide enterprise-grade detail, transparency, and distinct search indexing for corporate procurement, legal compliance, and buyer assurance, the former monolithic document has been decoupled into **three (3) dedicated, production-grade specifications**:

```
RENALYTICA LEGAL & KNOWLEDGE SUITE
│
├── 1.0 FREQUENTLY ASKED QUESTIONS (FAQ)
│   ├── Target URL: /faq (or faq.html)
│   ├── Dedicated Specification: 09_FAQ_CONTENT.md
│   └── Scope: 32+ exhaustive questions covering Instant Digital Delivery, Licensing Tiers, 
│              Dual-Track Data Verification, Corporate Subscriptions, Custom Advisory & Payments.
│
├── 2.0 TERMS OF SERVICE & RESEARCH LICENSING AGREEMENT
│   ├── Target URL: /terms (or terms.html)
│   ├── Dedicated Specification: 09_TERMS_OF_SERVICE_CONTENT.md
│   └── Scope: Legally binding 16-section contract covering License Grant, Single/Departmental/
│              Enterprise Scopes, Prohibited Commercial Exploitation, IP Reservation, Digital Delivery,
│              Refund Policies, Non-Reliance Disclaimers, and Binding Lagos Court of Arbitration Terms.
│
└── 3.0 PRIVACY & DATA PROTECTION POLICY
    ├── Target URL: /privacy (or privacy.html)
    ├── Dedicated Specification: 09_PRIVACY_POLICY_CONTENT.md
    └── Scope: 12-section compliance charter under Nigeria Data Protection Act 2023 (NDPA), NDPR, 
               GDPR, and CCPA covering Data Controller / DPO details, Lawful Processing Bases, 
               Sub-processors, Cookie Governance, International Transfers, Security Safeguards, 
               and Enforceable Data Subject Rights.
```

---

## 2. Dedicated Specification File Links

1. **Frequently Asked Questions (FAQ):**
   * Review file: [`09_FAQ_CONTENT.md`](file:///c:/Users/USER/Documents/Renalytica%20Website%20Project/Project%20Renalytica/Content/09_FAQ_CONTENT.md)
   * Primary route: `/faq`
2. **Terms of Service & Licensing:**
   * Review file: [`09_TERMS_OF_SERVICE_CONTENT.md`](file:///c:/Users/USER/Documents/Renalytica%20Website%20Project/Project%20Renalytica/Content/09_TERMS_OF_SERVICE_CONTENT.md)
   * Primary route: `/terms`
3. **Privacy & Data Protection Policy:**
   * Review file: [`09_PRIVACY_POLICY_CONTENT.md`](file:///c:/Users/USER/Documents/Renalytica%20Website%20Project/Project%20Renalytica/Content/09_PRIVACY_POLICY_CONTENT.md)
   * Primary route: `/privacy`

---

## 3. Global Navigation & Site-Wide Integration Notes

* **Desktop Header (`HeaderNav.js`)**: Includes quick access to `/faq` and legal resources under the "Company" and "Support" dropdowns.
* **Mobile Drawer Navigation**: Dedicated entry points for `FAQ` and `Terms & Privacy`.
* **Universal Mega Footer (`MegaFooter.js`)**:
  * **Column 3 (Support & Trust)**: Links to `Frequently Asked Questions (/faq)`.
  * **Column 4 (Legal & Governance)**: Separate direct links to `Terms of Service (/terms)` and `Privacy Policy (/privacy)`.
* **Checkout & Store Modals**: Direct mandatory checkout checkbox: *"I agree to the Renalytica [Terms of Service](/terms) and acknowledge the [Privacy Policy](/privacy)."*
