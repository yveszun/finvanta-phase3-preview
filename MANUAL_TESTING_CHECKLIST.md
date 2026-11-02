# Phase 3 MVP: Manual Browser Testing Checklist

**Branch:** `feature/phase3-decision-intelligence-mvp`  
**Tester:** _____________  
**Date:** _____________

---

## Setup

```bash
cd /projects/sandbox/screenshot-exact-match
git checkout feature/phase3-decision-intelligence-mvp
npm install
npm run dev
```

Expected: Development server starts on http://localhost:3000 (or shown port)

---

## Test Suite 1: Executive View (index.tsx)

### Scenario Selection
Navigate to root URL and test scenario switcher (if available):

- [ ] **low-bottleneck** scenario loads
- [ ] **low-neutral** scenario loads
- [ ] **moderate-bottleneck** scenario loads
- [ ] **moderate-neutral** scenario loads
- [ ] **high-bottleneck** scenario loads
- [ ] **high-neutral** scenario loads

### Executive Intelligence Page Elements

For each scenario, verify:

#### Header Section
- [ ] Page title: "Only X of Y eligible facilities have received payment"
- [ ] Subtitle shows scenario name
- [ ] Percentage calculation correct
- [ ] "Measures facility participation" disclaimer present

#### Cascade Visualization
- [ ] "Where implementation stalls" section visible
- [ ] Cascade component renders correctly
- [ ] All 4 stages shown (Eligible → Accredited → Claims → Payment)

#### Investigation Card
- [ ] "Largest proportional drop-off" card present
- [ ] Stage name displayed correctly
- [ ] Conversion rate shown
- [ ] "Proportional vs. Absolute" explanation present
- [ ] Orange accent color when measures diverge (if applicable)

#### **NEW: Decision Summary Card** 🎯
- [ ] **DecisionSummary card appears** below investigation card
- [ ] Card is **collapsible** (click to expand/collapse)
- [ ] **Chevron icon rotates** on expand
- [ ] **Blue informational banner** present with "Experimental" notice
- [ ] **All hypotheses for identified stage** listed
- [ ] Each hypothesis shows:
  - [ ] Statement text
  - [ ] Gray "HYPOTHESIS" badge
  - [ ] ID (e.g., H-ACC-01)
- [ ] **Disclaimer text** at bottom
- [ ] **"Explore the Evidence →" link** present and clickable
- [ ] Link navigates to Explore Evidence page

#### Stage Conversion Indicators
- [ ] "Stage conversion · observed" section present
- [ ] 3 conversion rates displayed
- [ ] Counts shown (e.g., "X / Y")
- [ ] Accent color on bottleneck stage

### Responsive Design (Executive View)
- [ ] Desktop (1920px): All elements visible, proper spacing
- [ ] Tablet (768px): Layout adjusts, no horizontal scroll
- [ ] Mobile (375px): Single column, cards stack vertically

---

## Test Suite 2: Explore Evidence (explore.tsx)

Navigate to Explore Evidence page.

### Navigation Menu
- [ ] 6 sections visible in navigation:
  1. Overview
  2. Facility cascade
  3. Claims processing
  4. Regional analysis
  5. Diagnostic insights
  6. **Decision support** 🎯 NEW

### Section 1: Overview
- [ ] 4 facility counts displayed
- [ ] "OBSERVED" tag present
- [ ] Numbers match Executive view

### Section 2: Facility cascade
- [ ] Full cascade component renders
- [ ] All denominators shown

### Section 3: Claims processing
- [ ] Conversion rates displayed
- [ ] Empty state for claim-level data
- [ ] "Data required" list present

### Section 4: Regional analysis
- [ ] Empty state: "No validated regional data yet"
- [ ] "Data required" list present

### Section 5: Diagnostic insights
- [ ] 4-step reasoning chain:
  1. What the data show (OBSERVED)
  2. What the rule concludes (RULE)
  3. What might explain it (POSSIBLE)
  4. What to investigate next (INVESTIGATE)
- [ ] Absolute gap calculation shown
- [ ] Divergence note when measures differ

### **Section 6: Decision Support** 🎯 NEW

#### Banner and Introduction
- [ ] **Blue informational banner** at top
- [ ] Banner text: "Experimental: This section demonstrates..."
- [ ] "Based on the identified gap at [STAGE]" text present
- [ ] Stage name matches bottleneck from Executive view

#### Tab Navigation
- [ ] **Two tabs present:** "Hypotheses (X)" and "Response Options (Y)"
- [ ] Tab shows count (e.g., "Hypotheses (4)")
- [ ] **Active tab highlighted** with border-accent (orange/accent color)
- [ ] Inactive tab: muted text, no border
- [ ] **Clicking tab switches content** without page reload

#### Tab 1: Hypotheses

For **low-bottleneck** scenario (accreditation stage):
- [ ] **4 hypotheses displayed:**
  - [ ] H-ACC-01: Documentation capacity constraints
  - [ ] H-ACC-04: Direct/indirect costs exceed capacity
  - [ ] H-ACC-08: Workforce capacity constraints
  - [ ] H-ACC-10: Awareness of benefit/requirements

For **moderate-bottleneck** scenario (claims stage):
- [ ] **3 hypotheses displayed:**
  - [ ] H-CLM-01: System usability barriers
  - [ ] H-CLM-03: Insufficient patient volume
  - [ ] H-CLM-07: Eligibility/documentation rules unclear

For **high-bottleneck** scenario (payment stage):
- [ ] **3 hypotheses displayed:**
  - [ ] H-PAY-01: Claims adjudication delays
  - [ ] H-PAY-02: Documentation deficiencies
  - [ ] H-PAY-05: Reimbursement rates insufficient

#### Hypothesis Card Structure
For each hypothesis card:
- [ ] **Card is clickable/expandable**
- [ ] **Chevron icon** on right side
- [ ] **Chevron rotates** when expanded (down → up)
- [ ] **Gray "HYPOTHESIS" badge** visible (never green/orange/red)
- [ ] **Statement** always visible (collapsed state)

When **expanded**, verify sections:
- [ ] **Plausibility Basis** section:
  - [ ] "Theory" subsection with content
  - [ ] "Analogous Cases" subsection with content
  - [ ] "Context" subsection with content
- [ ] **Verification Status** section:
  - [ ] "Direct Evidence: None (synthetic scenario)" text
  - [ ] "Alternatives Ruled Out: None" text
  - [ ] "Contribution to Gap: Unknown" text
- [ ] **Data Needed** section:
  - [ ] "To Verify" list with 3+ items
  - [ ] "To Refute" list with 3+ items
- [ ] **Disclaimer** at bottom
- [ ] Disclaimer text: "This hypothesis is provisional..."

#### Tab 2: Response Options

For **accreditation** stage:
- [ ] **3 responses displayed:**
  - [ ] R-ACC-04: Technical assistance program
  - [ ] R-ACC-03: Application fee waiver/reduction
  - [ ] R-ACC-07: Targeted awareness campaign

For **claims** stage:
- [ ] **3 responses displayed:**
  - [ ] R-CLM-02: System usability improvements
  - [ ] R-CLM-06: Demand generation support
  - [ ] R-CLM-04: Dedicated helpdesk/support

For **payment** stage:
- [ ] **2 responses displayed:**
  - [ ] R-PAY-01: Accelerate claims adjudication
  - [ ] R-PAY-02: Documentation clarity improvements

#### Response Card Structure
For each response card:
- [ ] **Card is clickable/expandable**
- [ ] **Chevron icon** on right side
- [ ] **Chevron rotates** when expanded
- [ ] **Description** always visible (collapsed state)

When **expanded**, verify sections:
- [ ] **Key Assumptions** section:
  - [ ] **⚠ Institutional** subsection with content
  - [ ] **⚠ Temporal** subsection with content
  - [ ] **⚠ Financial** subsection with content
  - [ ] **⚠ Legal** subsection with content
  - [ ] All ⚠ symbols visible (not hidden by CSS)
- [ ] **What Needs Validation** section:
  - [ ] Checklist of items (3-5 items)
  - [ ] Clear, actionable items
- [ ] **Prerequisites** section:
  - [ ] List of required conditions
- [ ] **Trade-offs** section:
  - [ ] Both benefits and costs/risks listed
- [ ] **Timeframe** section:
  - [ ] Estimated duration (e.g., "3-6 months")
- [ ] **Disclaimer** at bottom
- [ ] Disclaimer text: "These assumptions are unvalidated..."

#### Bottom Disclaimer
- [ ] **Final disclaimer text** below all cards
- [ ] Text mentions: "hypotheses represent plausible explanations"
- [ ] Text mentions: "not yet verified through direct evidence"
- [ ] Text mentions: "require validation before implementation"

#### Empty State (if no hypotheses)
- [ ] If stage has no hypotheses: "No hypotheses identified for this stage."
- [ ] If stage has no responses: "No response options identified for this stage."

### Navigation Between Sections
- [ ] Clicking "← Previous" navigates correctly
- [ ] Clicking "Next →" navigates correctly
- [ ] Clicking numbered navigation (01-06) works
- [ ] URL updates with ?section=decision when on Decision support
- [ ] Direct URL navigation works: /explore?section=decision

### Responsive Design (Explore View)
- [ ] Desktop (1920px): Side navigation + content
- [ ] Tablet (768px): Top navigation (horizontal scroll)
- [ ] Mobile (375px): Navigation collapses, full-width content

---

## Test Suite 3: Scenario-Specific Validation

### Test: low-bottleneck (Accreditation Stage)

Executive View:
- [ ] Bottleneck stage: "Accreditation"
- [ ] DecisionSummary shows 4 hypotheses

Explore → Decision support:
- [ ] Hypotheses tab: 4 cards (H-ACC-01, H-ACC-04, H-ACC-08, H-ACC-10)
- [ ] Responses tab: 3 cards (R-ACC-04, R-ACC-03, R-ACC-07)
- [ ] All hypothesis IDs start with "H-ACC-"
- [ ] All response IDs start with "R-ACC-"

### Test: moderate-bottleneck (Claims Stage)

Executive View:
- [ ] Bottleneck stage: "Claims submission"
- [ ] DecisionSummary shows 3 hypotheses

Explore → Decision support:
- [ ] Hypotheses tab: 3 cards (H-CLM-01, H-CLM-03, H-CLM-07)
- [ ] Responses tab: 3 cards (R-CLM-02, R-CLM-06, R-CLM-04)
- [ ] All hypothesis IDs start with "H-CLM-"
- [ ] All response IDs start with "R-CLM-"

### Test: high-bottleneck (Payment Stage)

Executive View:
- [ ] Bottleneck stage: "Payment received"
- [ ] DecisionSummary shows 3 hypotheses

Explore → Decision support:
- [ ] Hypotheses tab: 3 cards (H-PAY-01, H-PAY-02, H-PAY-05)
- [ ] Responses tab: 2 cards (R-PAY-01, R-PAY-02)
- [ ] All hypothesis IDs start with "H-PAY-"
- [ ] All response IDs start with "R-PAY-"

---

## Test Suite 4: Interaction & Animation

### Card Expansion
- [ ] Clicking hypothesis card toggles expansion
- [ ] Clicking response card toggles expansion
- [ ] Chevron icon animates smoothly (rotate transition)
- [ ] Content expands/collapses with smooth height transition
- [ ] No layout shift or flicker
- [ ] Can expand multiple cards simultaneously

### Tab Switching
- [ ] Tab switch is instant (no loading spinner needed)
- [ ] Previous tab content disappears
- [ ] New tab content appears
- [ ] No data loss when switching back
- [ ] URL does not change when switching tabs (stays ?section=decision)

### DecisionSummary Collapsible
- [ ] Clicking header toggles collapse
- [ ] Chevron rotates
- [ ] Content slides in/out smoothly
- [ ] State persists when navigating away and back (or resets - document behavior)

---

## Test Suite 5: Accessibility

### Keyboard Navigation
- [ ] Tab key moves through interactive elements
- [ ] Enter key expands/collapses cards
- [ ] Enter key switches tabs
- [ ] Focus outline visible on all interactive elements
- [ ] Focus order logical (top to bottom, left to right)

### Screen Reader (Test with NVDA/JAWS/VoiceOver)
- [ ] Hypothesis cards announced as expandable
- [ ] Response cards announced as expandable
- [ ] Tab navigation announces tab name and selection state
- [ ] ARIA labels present on navigation
- [ ] Landmarks used correctly (nav, main, section)

### Semantic HTML
- [ ] Headings hierarchy logical (h1 → h2 → h3)
- [ ] Lists use <ul>/<ol> tags
- [ ] Buttons use <button> tags (not <div>)
- [ ] Links use <a> tags with href

---

## Test Suite 6: Performance

### Load Time
- [ ] Executive view loads in < 2 seconds
- [ ] Explore view loads in < 2 seconds
- [ ] Tab switching instant (< 100ms)
- [ ] Card expansion smooth (no lag)

### Bundle Size (Check browser DevTools)
- [ ] decision-support.js bundle loads
- [ ] Bundle size reasonable (< 100 KB uncompressed per file)
- [ ] No console errors
- [ ] No console warnings (except expected deprecations)

---

## Test Suite 7: Edge Cases

### No Hypotheses Scenario (if applicable)
- [ ] If a scenario has no hypotheses, DecisionSummary does not appear
- [ ] Explore → Decision support shows empty state

### Mixed Content (some stages have data, others don't)
- [ ] Only relevant stage's hypotheses shown
- [ ] No cross-contamination (accreditation hypotheses in claims stage)

### Very Long Content
- [ ] Hypothesis with long "Plausibility Basis" does not break layout
- [ ] Response with many assumptions does not overflow card

---

## Test Suite 8: Regression (Existing Functionality)

### Unchanged Components
- [ ] Cascade component unchanged (visual, interaction)
- [ ] Shell component (header, footer) unchanged
- [ ] Tag component renders correctly (OBSERVED, RULE, INVESTIGATE, etc.)
- [ ] Scenario switcher (if present) works

### Existing Routes
- [ ] Executive view (/) loads correctly
- [ ] Explore view (/explore) loads correctly
- [ ] All 5 original Explore sections work (Overview through Diagnostic insights)
- [ ] Navigation between Executive and Explore works

### Data Accuracy
- [ ] Facility counts match across all views
- [ ] Conversion rates consistent
- [ ] Bottleneck identification unchanged (same logic as before)
- [ ] Absolute gap calculation matches PR #2 implementation

---

## Test Suite 9: Visual Regression

### Styling Consistency
- [ ] New components match existing design system:
  - [ ] Font families consistent
  - [ ] Color palette consistent (accent, foreground, muted, background)
  - [ ] Border radius consistent (rounded-lg, etc.)
  - [ ] Spacing consistent (padding, margins)
- [ ] Dark mode works (if supported):
  - [ ] All components readable in dark mode
  - [ ] Blue banner has dark-mode variant
  - [ ] ⚠ symbols visible in dark mode

### No Layout Breaks
- [ ] No horizontal scrolling on any screen size
- [ ] Cards do not overlap
- [ ] Text does not overflow containers
- [ ] Images/icons (if any) not broken

---

## Test Suite 10: Information Density Review

### Executive View Conciseness ✅ CRITICAL
- [ ] DecisionSummary card **does not overwhelm** the page
- [ ] Card is **collapsed by default** (or small when collapsed)
- [ ] Page remains **scannable** - key metric (payment count) still prominent
- [ ] Investigation card remains the **primary call-to-action**
- [ ] DecisionSummary acts as **preview**, not full dashboard
- [ ] User can **ignore Decision section** without losing core insight

### Explore View Detail Availability
- [ ] Decision Support section provides **full detail** when needed
- [ ] Hypotheses tab not cluttered (max 4 cards visible initially)
- [ ] Responses tab not cluttered (max 3 cards visible initially)
- [ ] User can **skim** hypothesis statements without expanding
- [ ] Expanded cards provide **depth** without overwhelming

---

## Blocking Issues

Document any issues that prevent the feature from being usable:

| # | Issue | Severity | Steps to Reproduce | Screenshot |
|---|-------|----------|-------------------|------------|
| 1 |       |          |                   |            |

---

## Non-Blocking Issues

Document issues that are cosmetic or minor usability concerns:

| # | Issue | Priority | Recommendation | Screenshot |
|---|-------|----------|----------------|------------|
| 1 |       |          |                |            |

---

## Screenshots (Required)

Please attach screenshots for:
1. Executive view - DecisionSummary card (collapsed)
2. Executive view - DecisionSummary card (expanded)
3. Explore - Decision Support section (Hypotheses tab)
4. Explore - Decision Support section (Responses tab)
5. Hypothesis card (expanded) - showing all sections
6. Response card (expanded) - showing assumptions with ⚠ symbols
7. Mobile view - Executive page
8. Mobile view - Explore Decision Support

---

## Sign-Off

- [ ] All critical tests passed
- [ ] Blocking issues documented (or none found)
- [ ] Non-blocking issues documented (or none found)
- [ ] Screenshots attached

**Tested by:** _____________  
**Date:** _____________  
**Status:** ⚠️ AWAITING MANUAL TEST COMPLETION

---

**Next Step:** Complete this checklist, attach screenshots, and report findings.
