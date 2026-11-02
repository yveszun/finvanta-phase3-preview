# Phase 3 Quality Pass - Pre-Sharing Review

**Date:** 2026-10-25  
**Target:** `yveszun/finvanta-phase3-preview`  
**Status:** In Progress

## Issues Identified

### Priority 1: Layout & Responsiveness
- **Issue:** Excessive blank space in expanded Decision Support cards on desktop
- **Location:** `HypothesisCard.tsx`, `ResponseCard.tsx`, `DecisionSection.tsx`
- **Fix:** Optimize spacing, improve responsive grid layouts

### Priority 2: Missing Dynamic Text
- **Issue:** "identified gap at ," shows missing stage name
- **Location:** `/explore` route, line 240
- **Root Cause:** `DecisionContext` interface missing `stageName` property
- **Fix:** Add `stageName` to context, populate from stage data

### Priority 3: Evidence Reference Audit
**Locations requiring qualification:**

#### Hypotheses with External References
1. **H-ACC-01** (Documentation requirements)
   - ✓ "PhilHealth 2024 mental health implementation study mentions 'administrative capacity challenges' in general (not specific to documentation)"
   - Action: Already qualified as "general, not specific"

2. **H-ACC-08** (Mental health workforce)
   - ✓ "PhilHealth 2024 technical assistance report notes 'scarcity of mental health professionals.'"
   - Action: Already quoted, appropriately vague

3. **All Hypotheses - Verification Status**
   - ⚠ "directEvidence: None available (synthetic scenario)" - GOOD
   - ⚠ "quantifiedContribution: Unknown - requires investigation" - GOOD

#### Unsupported Precision to Remove
1. **Verification thresholds** (toVerify/toRefute sections):
   - Lines contain specific percentages: "<60%", ">30%", "<50%", ">80%", etc.
   - **Assessment:** These are **illustrative thresholds** for what verification would look like
   - **Decision:** KEEP - they demonstrate what evidence would need to show, explicitly provisional
   - **Justification:** Context makes clear these are hypothetical verification criteria, not observed data

2. **Numerical examples in assumptions**:
   - "Estimated 1-3 months", "Budget >₱10,000", etc.
   - **Assessment:** Clearly labeled as assumptions/estimates
   - **Decision:** KEEP with "illustrative" qualifier where needed

### Priority 4: Numerical Verification Threshold Review
**Current approach:** Specific percentages in `toVerify`/`toRefute` sections

**Analysis:**
- These are **not claims about observed data**
- They specify **what future verification would need to show**
- Context ("Data Needed to Verify or Refute") makes this clear
- All are in future/conditional tense

**Recommendation:** ADD explicit qualifier to card UI

### Priority 5: Response Card Assumptions
**Current status:** All have institutional/temporal/financial/legal assumptions with disclaimers

**Verification needed:**
- Timeframe estimates (1-3 months, 6-12 months, etc.)
- Cost thresholds (₱5,000, ₱10,000, etc.)

**Assessment:** Already clearly labeled as "assumptions requiring validation"

### Priority 6: Mobile Responsiveness
**Components to test:**
- `HypothesisCard` - Multi-section expansion
- `ResponseCard` - Assumption sections
- `DecisionSection` - Tab navigation
- `DecisionSummary` - Executive view

## Fixes Implemented

### Fix 1: Add `stageName` to DecisionContext
**File:** `src/data/decision-support.ts`
**Change:** Add `stageName` property to context, populate from stage label

### Fix 2: Improve Card Layout Spacing
**Files:** `HypothesisCard.tsx`, `ResponseCard.tsx`
**Changes:**
- Reduce excessive padding in expanded sections
- Optimize vertical spacing between subsections
- Improve responsive behavior for mobile

### Fix 3: Add Verification Threshold Qualifier
**File:** `HypothesisCard.tsx`
**Change:** Add note before verification data explaining thresholds are illustrative

### Fix 4: Responsive Grid Improvements
**File:** `DecisionSection.tsx`
**Change:** Ensure tab navigation works well on mobile

## Test Coverage

### Automated Tests (45/45 passing)
- ✓ Scenario calculations
- ✓ Decision support logic
- ✓ App routing

### Manual Testing Required
1. Desktop layout (1920x1080, 1366x768)
2. Mobile layout (375x667, 414x896)
3. Card expansion UX
4. Tab navigation
5. All six scenarios
6. Text overflow handling

## Evidence Integrity

### Synthetic Data Disclaimers Present
- ✓ Executive View banner (DecisionSummary.tsx, line 16-24)
- ✓ Explore section banner (explore.tsx, line 232-238)
- ✓ Hypothesis cards individual disclaimer (HypothesisCard.tsx, line 114-122)
- ✓ Response cards individual disclaimer (ResponseCard.tsx, line 140-148)
- ✓ Footer note in DecisionSummary (line 61-66)
- ✓ Footer note in Explore section (line 252-259)

### Evidence Status Framework
- ✓ All hypotheses = "hypothesis" status (not verified)
- ✓ No color-coding by evidence level
- ✓ Plausibility vs. verification clearly distinguished

### Reference Qualification
- ✓ All PhilHealth 2024 references appropriately vague
- ✓ No invented citations
- ✓ External literature cited generically (implementation science, economic theory, etc.)

## Limitations

### Cannot Test in Sandbox
- ❌ Browser rendering (no browser in sandbox)
- ❌ Actual deployment verification
- ❌ User interaction testing
- ❌ Mobile device testing

### User Must Verify
- [ ] Desktop: Excessive blank space resolved?
- [ ] Mobile: All components responsive?
- [ ] All six scenarios: Navigation works?
- [ ] Card expansion: Smooth UX?
- [ ] Missing text: "identified gap at [STAGE NAME]" displays correctly?

## Cloudflare Auto-Deployment

**Question:** Does Cloudflare Workers GitHub integration auto-deploy on push?

**Answer:** YES - Cloudflare Workers GitHub integration monitors the configured branch (main in preview repo) and automatically rebuilds/redeploys on every push.

**Timeline:** Typically 2-5 minutes after push completes.

**User Action:** No manual deployment needed after push.
