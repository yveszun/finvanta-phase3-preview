# Phase 3 MVP: Preview Deployment Plan

**Date:** October 25, 2026  
**Purpose:** Provide browser-accessible preview of `feature/phase3-decision-intelligence-mvp` branch  
**Status:** PROPOSAL - Awaiting user approval before implementation

---

## Executive Summary

I've investigated safe preview options for Phase 3. **Recommended approach: Create a separate preview repository** with built static files from the Phase 3 branch, similar to our earlier Finvanta preview workflow.

**Key Benefits:**
- ✅ Zero risk to main branch or Lovable synchronization
- ✅ Completely isolated from production
- ✅ Free hosting via GitHub Pages
- ✅ Easy cleanup (delete preview repo when done)
- ✅ No paid services required

---

## Option 1: Separate Preview Repository (RECOMMENDED)

### Overview
Create a new GitHub repository (`screenshot-exact-match-phase3-preview`) containing only the built static files from the Phase 3 branch. Deploy to GitHub Pages for browser access.

### 1. Proposed Method

**Steps:**
1. Build Phase 3 branch locally in sandbox
2. Create new GitHub repository: `yveszun/screenshot-exact-match-phase3-preview`
3. Copy `.output/public/` contents to preview repo
4. Enable GitHub Pages (main branch, `/` directory)
5. Access via: `https://yveszun.github.io/screenshot-exact-match-phase3-preview/`

### 2. Requirements

**New Repository:**
- ✅ New repo: `yveszun/screenshot-exact-match-phase3-preview`
- ✅ Public or private (both work with GitHub Pages)
- ✅ Contains only: built static files + README
- ✅ No source code, no CI/CD, no Lovable connection

**Hosting Configuration:**
- ✅ GitHub Pages (free)
- ✅ Settings → Pages → Source: Deploy from branch
- ✅ Branch: main, Directory: / (root)
- ✅ No custom domain needed

**External Services:**
- ❌ None required
- ✅ GitHub Pages is included free with GitHub

### 3. Risks to Lovable/GitHub Sync

**Risk Level: ZERO** ✅

**Why No Risk:**
- Preview repo is completely separate from `screenshot-exact-match`
- No commits to `main` branch of original repo
- No changes to `.lovable/project.json`
- No changes to original repo's GitHub settings
- Lovable only watches `yveszun/screenshot-exact-match` repo
- Preview repo has different name, never syncs with Lovable

**Lovable Connection:**
```
Lovable Project (4e74abed-f3f6-47b8-8565-69379cb0d4bf)
    ↕ [SYNCS]
screenshot-exact-match repo (main branch)
    ↔ [PR #3 DRAFT]
screenshot-exact-match repo (feature/phase3-decision-intelligence-mvp branch)

[NO CONNECTION TO]
screenshot-exact-match-phase3-preview repo ← ISOLATED PREVIEW
```

### 4. Cost: Free

**GitHub Pages:**
- ✅ Free for public repositories (unlimited)
- ✅ Free for private repositories (some limits, but adequate)
- ✅ No credit card required
- ✅ No paid services needed

**Total Cost:** $0

### 5. Cleanup Process

**Removal Steps:**
1. Navigate to preview repo settings
2. Disable GitHub Pages
3. Delete repository: `yveszun/screenshot-exact-match-phase3-preview`
4. Preview URL becomes inaccessible immediately
5. Zero trace left in original repo

**Time to Clean Up:** ~2 minutes

**Reversibility:** Complete - no changes to original repo

---

## Option 2: Cloudflare Pages (Alternative)

### Overview
Deploy built files to Cloudflare Pages directly from Phase 3 branch.

### Pros
- ✅ Free tier (500 builds/month)
- ✅ Fast global CDN
- ✅ No new repository needed

### Cons
- ⚠️ Requires Cloudflare account login (may not be configured)
- ⚠️ Wrangler CLI not currently installed in sandbox
- ⚠️ Cloudflare project name collision risk with existing deployments
- ⚠️ More complex cleanup (delete project via Cloudflare dashboard)

### Risk Level: Low-Medium
- ⚠️ Could conflict with existing Cloudflare workers if deployed
- ⚠️ Requires external service configuration

**Recommendation:** Skip in favor of Option 1 (simpler, safer)

---

## Option 3: Netlify Drop (Alternative)

### Overview
Drag-and-drop built files to Netlify for instant preview.

### Pros
- ✅ Free tier available
- ✅ No CLI or account configuration needed (drag-and-drop)
- ✅ Instant deployment

### Cons
- ⚠️ Requires manual file upload via web UI (cannot automate from sandbox)
- ⚠️ Preview URL is random (not controlled)
- ⚠️ Limited to 1 hour without account (free account extends to 30 days)

### Risk Level: Zero
- ✅ Completely isolated from GitHub/Lovable

**Recommendation:** Viable if automation not needed, but less clean than Option 1

---

## Option 4: GitHub Codespaces (Not Suitable)

### Why Not Suitable
- ⚠️ Requires active Codespace session (ephemeral)
- ⚠️ User would need to clone and run `npm run dev`
- ⚠️ Port forwarding required (security considerations)
- ⚠️ Costs accrue per hour of Codespace use
- ⚠️ Preview disappears when Codespace stops

**Recommendation:** Not suitable for this use case

---

## Recommended Implementation: Option 1 (Separate Preview Repo)

### Phase 3 Preview Deployment Plan

#### Pre-Deployment Verification
- [x] Phase 3 branch builds successfully (verified in QA)
- [x] Static files generate in `.output/public/` (verified)
- [x] All assets self-contained (CSS, JS, HTML)
- [ ] User approves preview plan

#### Deployment Steps

**Step 1: Build Phase 3 Branch**
```bash
cd /projects/sandbox/screenshot-exact-match
git checkout feature/phase3-decision-intelligence-mvp
npm run build
# Produces: .output/public/ directory with static files
```

**Step 2: Create Preview Repository**
```bash
# Via GitHub API
gh api repos/yveszun/screenshot-exact-match-phase3-preview -X POST \
  -f name="screenshot-exact-match-phase3-preview" \
  -f description="Preview deployment for Phase 3 Decision Intelligence MVP (temporary)" \
  -f private=false \
  -f has_issues=false \
  -f has_projects=false \
  -f has_wiki=false
```

**Step 3: Prepare Preview Content**
```bash
# Create temporary preview directory
mkdir -p /tmp/phase3-preview
cd /tmp/phase3-preview
git init
git remote add origin https://github.com/yveszun/screenshot-exact-match-phase3-preview.git

# Copy built files
cp -r /projects/sandbox/screenshot-exact-match/.output/public/* .

# Add README
cat > README.md <<EOF
# Phase 3 Decision Intelligence - Preview Deployment

**Purpose:** Temporary preview of Phase 3 MVP for visual testing  
**Source Branch:** feature/phase3-decision-intelligence-mvp  
**PR:** https://github.com/yveszun/screenshot-exact-match/pull/3  
**Status:** Preview only - not for production use

## About This Preview

This repository contains built static files from Phase 3 Decision Intelligence MVP.
It is isolated from the main project and will be deleted after testing.

**Main Project:** https://github.com/yveszun/screenshot-exact-match

## Preview URL

https://yveszun.github.io/screenshot-exact-match-phase3-preview/

## Testing Focus

1. Executive View - DecisionSummary card (collapsed/expanded)
2. Explore Evidence - Decision Support section
3. Tab navigation (Hypotheses ↔ Responses)
4. Card expansion (all sections visible)
5. Mobile responsive layout
6. Dark mode rendering

## Documentation

- QA Report: See main repo PR #3
- Manual Testing Checklist: MANUAL_TESTING_CHECKLIST.md in main repo
- Language Audit: PHASE3_LANGUAGE_AUDIT_REPORT.md in main repo

## Cleanup

This preview will be deleted after Phase 3 approval/rejection.
EOF

# Commit and push
git add .
git commit -m "feat: Phase 3 Decision Intelligence preview deployment"
git branch -M main
git push -u origin main
```

**Step 4: Enable GitHub Pages**
```bash
# Via GitHub API
gh api repos/yveszun/screenshot-exact-match-phase3-preview/pages -X POST \
  -f source[branch]=main \
  -f source[path]=/
```

**Step 5: Verify Deployment**
- Wait 1-2 minutes for GitHub Pages to build
- Access: https://yveszun.github.io/screenshot-exact-match-phase3-preview/
- Test all 6 scenarios

#### Expected URL Structure

**Preview URL:**
```
https://yveszun.github.io/screenshot-exact-match-phase3-preview/
```

**Routes:**
```
/ → Executive Intelligence (index)
/explore → Explore Evidence
/explore?section=decision → Decision Support section
```

**Scenarios (via dropdown or URL params if implemented):**
- low-bottleneck
- low-neutral
- moderate-bottleneck
- moderate-neutral
- high-bottleneck
- high-neutral

#### Verification Checklist

After deployment, verify:
- [ ] Preview URL loads successfully
- [ ] Executive view renders correctly
- [ ] DecisionSummary card appears and is collapsible
- [ ] Navigate to Explore → Decision Support
- [ ] Tab navigation works (Hypotheses ↔ Responses)
- [ ] Hypothesis cards expand with all sections
- [ ] Response cards show ⚠ symbols on assumptions
- [ ] Mobile responsive layout works
- [ ] No console errors

#### Cleanup Steps

When testing complete:
```bash
# Delete preview repository
gh api repos/yveszun/screenshot-exact-match-phase3-preview -X DELETE

# Confirm deletion
gh repo view yveszun/screenshot-exact-match-phase3-preview
# Should return: "repository not found"
```

---

## Risk Assessment Matrix

| Risk | Likelihood | Impact | Mitigation | Status |
|------|-----------|--------|------------|--------|
| Affects main branch | Zero | Critical | Separate repo, no commits to main | ✅ Mitigated |
| Breaks Lovable sync | Zero | Critical | Different repo name, Lovable unaware | ✅ Mitigated |
| Affects production | Zero | Critical | No deployment to production | ✅ Mitigated |
| Preview URL public | High | Low | Repo can be private, Pages still work | ✅ Acceptable |
| Cost overrun | Zero | Low | GitHub Pages free for public repos | ✅ No risk |
| Cleanup complexity | Low | Low | Single repo deletion | ✅ Minimal |

**Overall Risk Level: MINIMAL** ✅

---

## Alternative: If GitHub Pages Unavailable

### Fallback Option: Local Build + Screenshots

If GitHub Pages cannot be enabled:

1. Build Phase 3 locally
2. Run `npm run preview` in sandbox (port 4173)
3. Use `npx playwright` to capture screenshots programmatically
4. Generate screenshot gallery document
5. Share screenshots for review

**Pros:**
- ✅ Zero external dependencies
- ✅ Zero risk to any repository

**Cons:**
- ⚠️ No interactive testing (only screenshots)
- ⚠️ Cannot test tab navigation or card expansion

---

## Comparison of Options

| Option | Cost | Risk | Setup Time | Cleanup | Interactive Testing |
|--------|------|------|------------|---------|-------------------|
| **GitHub Pages** | Free | Zero | 10 min | 2 min | ✅ Full |
| Cloudflare Pages | Free | Low | 15 min | 5 min | ✅ Full |
| Netlify Drop | Free | Zero | 5 min | 2 min | ✅ Full |
| Local + Screenshots | Free | Zero | 30 min | 0 min | ❌ Static only |

**Recommendation:** GitHub Pages (Option 1)

---

## Questions for User Approval

Before proceeding, please confirm:

1. **Approve GitHub Pages approach?**
   - Create `screenshot-exact-match-phase3-preview` repository?
   - Deploy built files to GitHub Pages?
   - Preview URL structure acceptable?

2. **Repository visibility preference?**
   - Public repository (simpler GitHub Pages setup)?
   - Private repository (requires GitHub Pages configuration)?

3. **Deployment timing?**
   - Deploy immediately after approval?
   - Wait for specific instruction?

4. **Testing duration?**
   - How long should preview remain available?
   - Delete immediately after testing complete?
   - Keep for X days?

5. **Alternative preferences?**
   - If GitHub Pages not suitable, prefer Cloudflare or Netlify?
   - Or prefer screenshot-only approach?

---

## Recommended Approach Summary

**Method:** Separate preview repository with GitHub Pages  
**Cost:** $0  
**Risk:** Zero impact on main repo, Lovable, or production  
**Time:** 10 minutes setup, 2 minutes cleanup  
**URL:** https://yveszun.github.io/screenshot-exact-match-phase3-preview/  
**Reversibility:** Complete (delete repo when done)

**Status:** ⏳ Awaiting user approval to proceed

---

## Appendix: Technical Details

### Build Output Analysis

**Static files produced:**
```
.output/public/
├── assets/
│   ├── styles-DnJnVAuC.css (79.50 kB)
│   ├── routes--V-U3rPq.js (7.31 kB)
│   ├── explore-DAuEgXj7.js (16.23 kB)
│   ├── decision-support-sKeM2Lfa.js (52.36 kB)
│   └── index-KxU8XCWF.js (347.92 kB)
├── favicon.ico
├── _headers
└── robots.txt
```

**Total size:** ~500 KB (gzipped: ~150 KB)

**Self-contained:** ✅ All assets bundled, no external dependencies

### GitHub Pages Configuration

**Source:**
- Branch: main
- Directory: / (root)

**Custom domain:** Not required

**HTTPS:** Automatic (GitHub Pages provides free SSL)

**Build time:** 1-2 minutes after push

**Availability:** Immediate after build

---

**Prepared by:** Kiro Agent  
**Date:** October 25, 2026  
**Status:** Proposal - Awaiting User Approval  
**Version:** 1.0
