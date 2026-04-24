# Security Policy

## Supported Versions

We provide security updates for the following versions:

| Version | Supported |
|---------|-----------|
| 1.0.x   | ✅ Yes     |
| < 1.0   | ❌ No      |

## Reporting a Vulnerability

We are committed to the security of our users. If you discover a security vulnerability, please do NOT open a public issue. Instead, follow these steps:

1. Send an email to **security@example.com** (replace with your actual email).
2. Include a detailed description of the vulnerability.
3. Provide steps to reproduce the issue.
4. If applicable, include screenshots or proof-of-concept code.

We will acknowledge your report within 48 hours and provide a timeline for a fix.

## API Key Safety
- **Never** commit your `.env` or `.env.local` files.
- The project uses a Next.js API Route proxy (`src/app/api/weather/route.ts`) to prevent exposing API keys directly in client-side headers where possible, though `NEXT_PUBLIC_` is used for ease of setup in this version.
- For production, consider moving the API key to a server-side only variable and removing the `NEXT_PUBLIC_` prefix.

## Dependencies
We use automated tools (like Dependabot) to monitor and update dependencies with known vulnerabilities. Always ensure you are running the latest version of the application.
