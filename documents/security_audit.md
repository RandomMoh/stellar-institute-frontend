*Stellar Institute — Security Audit Report*

Date: June 30, 2026
Scope: Backend API files, frontend admin panel, database configuration, deployment configuration


*EXECUTIVE SUMMARY*

An extensive security audit was conducted on the API endpoints, authentication system, database layer, email handler, CORS policy, and frontend admin panel. The audit identified 9 vulnerabilities, categorized as 3 Critical, 3 High, and 3 Medium severity issues.


*CRITICAL VULNERABILITIES (Immediate Action Required)*

1. Hardcoded JWT Secret Key
• Location: admin-login.js, admin-announcements.js, admin-images.js
• Description: JSON Web Tokens (JWT) are currently signed using a hardcoded fallback secret. This value is exposed within the version control system. An attacker can leverage this exposed secret to forge a valid administrative token and gain unauthorized access to the system.
• Remediation: Remove the hardcoded fallback value. The application should enforce the presence of a secure JWT_SECRET environment variable and fail to initialize or issue tokens if it is absent.

2. Exposed Administrative Provisioning Endpoint
• Location: admin-seed.js
• Description: The /api/admin-seed endpoint permits the creation of new administrative accounts via a POST request requiring a static, hardcoded secret. This secret is publicly exposed in the repository, enabling unauthorized users to provision their own administrative accounts.
• Remediation: Deprecate and remove this endpoint entirely, or restrict access by requiring valid administrative authentication (JWT) rather than a static secret.

3. Missing .env Exclusion in Version Control
• Location: .gitignore
• Description: The .gitignore configuration does not currently exclude .env files. This introduces the risk of developers inadvertently committing environment variables to the repository, resulting in credential exposure.
• Remediation: Update .gitignore to explicitly exclude .env, .env.local, and .env.production files.


*HIGH SEVERITY VULNERABILITIES (Remediate Prior to Production Release)*

4. Absence of Rate Limiting
• Location: admin-login.js, contact.js
• Description: The application lacks rate limiting mechanisms on critical endpoints. This enables brute-force attacks against the administrative login interface and facilitates denial-of-service or spam campaigns via the contact form.
• Remediation: Implement rate limiting. Restrict login attempts and contact form submissions.

5. Overly Permissive CORS Policy
• Location: All API endpoints
• Description: All API endpoints are configured with Access-Control-Allow-Origin: *. This allows any external domain to issue cross-origin requests to the administrative API, increasing susceptibility to Cross-Site Request Forgery (CSRF) and related attacks.
• Remediation: Restrict the CORS policy on administrative endpoints to authorized domains only.

6. Missing Security Headers
• Location: index.html, all API endpoints
• Description: The application does not implement standard HTTP security headers, leaving it vulnerable to clickjacking, MIME-type sniffing, and cross-site scripting (XSS).
• Remediation: Configure the application or reverse proxy to include standard security headers: X-Frame-Options, X-Content-Type-Options, Referrer-Policy, and an appropriate Content-Security-Policy.


*MEDIUM SEVERITY VULNERABILITIES (Recommended Enhancements)*

7. Insufficient Input Validation on Contact Form
• Location: contact.js
• Description: The contact form only verifies the presence of an email address, without validating its format. Furthermore, the subject field is not properly sanitized or escaped.
• Remediation: Implement regular expression-based validation for the email field and apply HTML escaping to the subject field.

8. Unauthenticated Access to Administrative Image Endpoint
• Location: admin-images.js
• Description: The GET /api/admin-images endpoint does not require authentication. The endpoint nomenclature is misleading, and the response exposes internal database structures.
• Remediation: Rename the endpoint to reflect its public nature (e.g., /api/images) and filter the response payload to include only strictly necessary data.

9. Hardcoded Default Administrative Credentials
• Location: db.js
• Description: A default administrative password is hardcoded into the database seeding logic and stored in the version control system.
• Remediation: Provision the initial administrative password via a secure environment variable, enforce a mandatory password change upon first login, or mandate manual password modification following deployment.


*CURRENT SECURITY POSTURE (Mitigated Risks)*

• SQL Injection: Mitigated through the use of parameterized queries.
• Cross-Site Scripting (XSS): Mitigated within the React frontend.
• Credential Storage: Mitigated; cryptographic hashing is implemented.
• Session Management: Mitigated; tokens are securely stored in session memory.
• Output Encoding: Generally mitigated; HTML escaping is appropriately applied.


*REMEDIATION ROADMAP*

1. Hardcoded JWT Secret [Critical] - High Priority
2. Exposed Provisioning Endpoint [Critical] - High Priority
3. Missing .env Exclusion [Critical] - High Priority
4. Absence of Rate Limiting [High] - High Priority
5. Overly Permissive CORS Policy [High] - High Priority
6. Missing Security Headers [High] - High Priority
7. Insufficient Input Validation [Medium] - Medium Priority
8. Unauthenticated Image Endpoint [Medium] - Medium Priority
9. Hardcoded Default Credentials [Medium] - Medium Priority

Recommended Action: Remediate all vulnerabilities prior to production deployment.
