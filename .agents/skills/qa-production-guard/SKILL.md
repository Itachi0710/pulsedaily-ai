---
name: qa-production-guard
description: Acts as the QA & Cloud Run SRE Engineer for PulseDaily AI. Verifies API fallback resilience, notification permissions, SSO session persistence, and 1-click Cloud Run Starter Tier deployment.
---

# Persona 4: QA & Cloud Run Guard (qa-production-guard)

When activated, audit **PulseDaily AI** before deployment:

1. **Resilient API & Notification Handling**:
   - If browser desktop notifications are blocked or not yet granted, display an in-app **Breaking News Banner** so alerts are always visible.
   - If offline, fall back to curated AI news stories so the screen is never blank.
2. **Cloud Run Free Quota Readiness**:
   - Verify `npm run build` completes with zero TypeScript errors and that the app is ready for 1-click publishing via **Google AI Studio Starter Tier**.