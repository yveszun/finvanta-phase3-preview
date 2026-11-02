# Phase 3 Decision Intelligence - Preview Deployment

**⚠️ TEMPORARY PREVIEW REPOSITORY**

This repository contains the Phase 3 MVP code from `yveszun/screenshot-exact-match` (branch: `feature/phase3-decision-intelligence-mvp`) for isolated preview deployment.

## Purpose

Preview deployment for Phase 3 Decision Intelligence feature before merging to production.

## Source

**Main Repository:** https://github.com/yveszun/screenshot-exact-match  
**Source Branch:** `feature/phase3-decision-intelligence-mvp`  
**Pull Request:** https://github.com/yveszun/screenshot-exact-match/pull/3 (DRAFT)

## Deployment

**Worker Name:** `finvanta-phase3-preview`  
**Platform:** Cloudflare Workers  
**Type:** SSR Application (TanStack Start + Nitro)

## Build Commands

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Output: .output/server/ (Worker) + .output/public/ (static assets)
```

## Cloudflare Configuration

The repository includes `wrangler.toml` with preview-specific settings:
- Worker name: `finvanta-phase3-preview`
- Node.js compatibility enabled
- SSR with static assets binding

## Testing Focus

1. Executive View - DecisionSummary card (collapsed/expanded)
2. Explore Evidence → Decision Support section
3. Tab navigation (Hypotheses ↔ Responses)
4. Card expansion (all sections visible)
5. Mobile responsive layout
6. All 6 synthetic scenarios

## Documentation

- **QA Report:** See main repo `PHASE3_QA_REPORT.md`
- **Manual Testing:** See main repo `MANUAL_TESTING_CHECKLIST.md`
- **Language Audit:** See main repo `PHASE3_LANGUAGE_AUDIT_REPORT.md`

## Data Notice

**All data is synthetic** - no actual PhilHealth patient records.
- 6 demonstration scenarios
- Synthetic facility counts
- Illustrative hypotheses and responses

## Cleanup

This repository will be deleted after Phase 3 is approved/rejected and merged.

---

**Status:** Preview Only - Not for Production Use  
**Created:** October 25, 2026  
**Main Project:** https://github.com/yveszun/screenshot-exact-match
