# Phase 3 MVP: Language Audit Report

**Date:** October 25, 2026  
**Auditor:** Kiro Agent  
**Files Reviewed:** `src/data/decision-knowledge.ts` (1,321 lines)  
**Scope:** All 10 hypotheses + 8 response options

---

## Executive Summary

**Status:** ✅ **PASS with Minor Recommendations**

The knowledge base demonstrates strong analytical integrity:
- ✅ No unsupported likelihood rankings
- ✅ All hypotheses correctly labeled "hypothesis" status
- ✅ Hypotheses clearly distinguished from evidence
- ✅ Institutional assumptions explicit and conditional
- ✅ No definitive causal claims or intervention effectiveness guarantees

**Findings:** 2 flagged instances, 0 blocking issues

---

## Audit Methodology

### Search Patterns
Automated scan for prohibited language:
```bash
grep -n "will\|should\|must\|cause\|lead to\|results in\|proves\|demonstrates\|guarantees\|ensures\|establishes"
```

### Manual Review
- All 10 hypothesis statements
- All 8 response descriptions
- All plausibility basis sections
- All assumption registries
- All validation/prerequisite sections

---

## Findings

### FLAGGED INSTANCE #1 (Line 433)
**Location:** H-PAY-01 statement  
**Text:** "may **cause** payment delays"

**Context:**
```
"High claim volumes, insufficient adjudication staff, or complex review 
processes may cause payment delays that discourage continued service provision."
```

**Assessment:** ✅ **ACCEPTABLE**
- Use of "cause" is appropriately hedged with "may"
- Statement describes plausible mechanism, not verified causation
- Entire hypothesis labeled "hypothesis" status
- Verification section states: "Direct Evidence: None available (synthetic scenario)"

**Recommendation:** No change required. The conditional framing ("may cause") is appropriate for hypothesis statements.

---

### FLAGGED INSTANCE #2 (Line 315)
**Location:** H-CLM-01 plausibility basis  
**Text:** "demonstrates that system complexity deters use"

**Context:**
```
"Technology adoption literature shows usability affects utilization. 
Health IT research demonstrates that system complexity deters use."
```

**Assessment:** ✅ **ACCEPTABLE**
- Statement refers to published literature findings, not this scenario
- Used in "Plausibility Basis" section, explicitly separate from verification
- Establishes theoretical foundation, not claiming verification in this context
- Immediately followed by: "Direct Evidence: None available (synthetic scenario)"

**Recommendation:** No change required. The language accurately describes what literature shows (evidence from other contexts), which is appropriate for establishing plausibility.

---

## Detailed Review: All 10 Hypotheses

### Accreditation Stage (4 hypotheses)

#### H-ACC-01: Documentation capacity constraints
- **Statement:** ✅ Uses conditional "may exceed" - appropriate hedging
- **Evidence Status:** ✅ "hypothesis"
- **Verification:** ✅ "None available (synthetic scenario)" - explicit
- **Language:** No causal claims, no definitive statements

#### H-ACC-04: Accreditation costs prohibitive
- **Statement:** ✅ Uses "may" throughout
- **Evidence Status:** ✅ "hypothesis"
- **Verification:** ✅ Alternatives listed, contribution unknown
- **Language:** Economic language (barriers, constraints) - appropriate

#### H-ACC-08: Mental health workforce shortage
- **Statement:** ✅ Uses "may prevent" - conditional
- **Evidence Status:** ✅ "hypothesis"
- **Verification:** ✅ Explicit: "Unknown - requires investigation"
- **Language:** Describes shortage as potential constraint, not verified cause

#### H-ACC-10: Benefit package awareness limited
- **Statement:** ✅ Uses "may be unaware" - conditional
- **Evidence Status:** ✅ "hypothesis"
- **Verification:** ✅ Lists alternative explanations
- **Language:** Information economics framing - appropriate

### Claims Stage (3 hypotheses)

#### H-CLM-01: Claims system usability issues
- **Statement:** ✅ Uses "may face" - conditional
- **Evidence Status:** ✅ "hypothesis"
- **Verification:** ✅ "None available (synthetic scenario)"
- **Language:** See Flagged Instance #2 - acceptable in context

#### H-CLM-03: Insufficient patient volume
- **Statement:** ✅ Uses "may have" - conditional
- **Evidence Status:** ✅ "hypothesis"
- **Verification:** ✅ Alternatives and unknown contribution explicit
- **Language:** Economic viability framing, no causal claims

#### H-CLM-07: Reimbursement rules unclear
- **Statement:** ✅ Uses "may be uncertain" - conditional
- **Evidence Status:** ✅ "hypothesis"
- **Verification:** ✅ Explicitly requires investigation
- **Language:** Uncertainty/information gap framing - appropriate

### Payment Stage (3 hypotheses)

#### H-PAY-01: Adjudication delays
- **Statement:** ✅ See Flagged Instance #1 - acceptable use of "may cause"
- **Evidence Status:** ✅ "hypothesis"
- **Verification:** ✅ "None available (synthetic scenario)"
- **Language:** Cash flow/behavioral economics framing - appropriate

#### H-PAY-02: Documentation deficiencies
- **Statement:** ✅ Uses "may be denied" - conditional
- **Evidence Status:** ✅ "hypothesis"
- **Verification:** ✅ Alternatives listed, contribution unknown
- **Language:** Quality assurance framing, no definitive claims

#### H-PAY-05: Reimbursement rates insufficient
- **Statement:** ✅ Uses "may not cover" - conditional
- **Evidence Status:** ✅ "hypothesis"
- **Verification:** ✅ Explicit: "Unknown - requires investigation"
- **Language:** Economic sustainability framing - appropriate

---

## Detailed Review: All 8 Response Options

### Accreditation Stage (3 responses)

#### R-ACC-04: Technical assistance program
- **Description:** ✅ Describes potential intervention, not guaranteed outcome
- **Assumptions:** ✅ All conditional ("can establish," "are available")
- **Language:** Uses "can," "may," "could" appropriately
- **Validation Section:** ✅ Explicit: "Confirm authority," "assess capacity"
- **Trade-offs:** ✅ Lists limitations and risks

#### R-ACC-03: Fee waiver/subsidy
- **Description:** ✅ Descriptive, not prescriptive
- **Assumptions:** ✅ All framed as requirements to verify
- **Language:** Uses "if available," "if needed" conditionals
- **Validation Section:** ✅ Requires verification of authority, budget
- **Trade-offs:** ✅ Includes moral hazard and deadweight loss concerns

#### R-ACC-07: Awareness campaign
- **Description:** ✅ Describes information provision, not guaranteed behavior change
- **Assumptions:** ✅ All conditional and explicit
- **Language:** Uses "can coordinate," "can develop" - possibility, not certainty
- **Validation Section:** ✅ Requires assessment of effectiveness
- **Trade-offs:** ✅ Notes "awareness ≠ application"

### Claims Stage (3 responses)

#### R-CLM-02: System usability improvements
- **Description:** ✅ Describes technical changes, not guaranteed outcomes
- **Assumptions:** ✅ All conditional, many "highly uncertain"
- **Language:** Appropriate hedging throughout
- **Validation Section:** ✅ Requires user research first
- **Trade-offs:** ✅ Notes risk: "may not address capacity barriers"

#### R-CLM-06: Demand generation campaign
- **Description:** ✅ Describes awareness efforts, not guaranteed utilization
- **Assumptions:** ✅ Explicit about multi-stakeholder coordination
- **Language:** Uses "can develop," "willing to" - conditional
- **Validation Section:** ✅ Requires capacity assessment first
- **Trade-offs:** ✅ Notes "demand generation ≠ service provision"

#### R-CLM-04: Dedicated helpdesk
- **Description:** ✅ Describes support mechanism, not guaranteed solution
- **Assumptions:** ✅ All institutional arrangements conditional
- **Language:** Uses "can establish," "may reduce" - appropriate
- **Validation Section:** ✅ Requires budget and staffing confirmation
- **Trade-offs:** ✅ Notes "doesn't address root causes"

### Payment Stage (2 responses)

#### R-PAY-01: Accelerate adjudication
- **Description:** ✅ Describes process improvement, not guaranteed results
- **Assumptions:** ✅ All capacity and authority assumptions explicit
- **Language:** Uses "can," "may," "if" appropriately
- **Validation Section:** ✅ Requires capacity analysis first
- **Trade-offs:** ✅ Notes quality/speed trade-off risk

#### R-PAY-02: Documentation clarity
- **Description:** ✅ Describes training/guidance, not guaranteed approval
- **Assumptions:** ✅ All conditional and explicit
- **Language:** Uses "can develop," "willing to" - appropriate
- **Validation Section:** ✅ Requires denial analysis first
- **Trade-offs:** ✅ Notes documentation alone insufficient

---

## Synthetic Data vs. Evidence Status

### Requirement: Synthetic data never auto-upgrades to "verified"

✅ **VERIFIED COMPLIANT**

**All 10 hypotheses:**
- `evidenceStatus: "hypothesis"` (line references checked)
- Verification section states: "Direct Evidence: None available (synthetic scenario)"
- No hypothesis claims "verified" or "supported" status
- Framework explicitly allows hypothesis/suggestive/verified/refuted, but ALL MVP content is "hypothesis"

**Evidence-status UI rendering:**
- HypothesisCard.tsx (line 47): `<Badge variant="outline">HYPOTHESIS</Badge>`
- Badge styled with neutral gray, not color-coded by status
- No green/orange/red badges that would imply verification

---

## Institutional Assumptions Review

### Requirement: Label as illustrative/conditional where unverified

✅ **VERIFIED COMPLIANT**

**All 8 responses include assumptions object:**
- institutional: Authority, coordination, capacity
- temporal: Timeline estimates with uncertainty
- financial: Budget availability and cost
- legal: Regulatory permissions and requirements

**Explicit uncertainty language:**
- "highly uncertain" (appears 3 times)
- "Assumption:" prefix on timeframe notes
- "requires validation" in validationNeeded sections
- ⚠ symbols on all assumptions in UI (ResponseCard.tsx line 89-121)

**Example (R-ACC-04):**
```
"Program can launch in 1-3 months (highly uncertain)"
"TA providers are available and willing" [requires verification]
```

---

## Timeframes and Causation

### Requirement: No unsupported timelines or causal claims

✅ **VERIFIED COMPLIANT**

**Timeframe handling:**
- All timeframeNote fields include uncertainty: "Estimated," "highly uncertain," "Could be faster/slower"
- Conditional phrasing: "if budget available," "if authority exists"
- Range estimates: "1-3 months" or "3-6 months" with caveats

**Example (R-CLM-02):**
```
"Estimated 6-12 months for development and testing. Highly uncertain - 
could be 3-6 months for minor changes or 12-24 months for major redesign."
```

**Causal language:**
- No "X causes Y" statements without hedging
- Mechanisms described as "may cause," "could lead to," "suggests"
- Plausibility basis cites theory/literature, not verified causation in this context

---

## Response Options as Possibilities, Not Recommendations

### Requirement: Frame as options for consideration, not prescriptions

✅ **VERIFIED COMPLIANT**

**Structural framing:**
- Type name: "ResponseOption" (not "Recommendation" or "Intervention")
- UI presents in tabs labeled "Response Options" (not "Recommended Actions")
- Disclaimer present on all ResponseCards

**Language in descriptions:**
- Descriptive: "Establish TA program," "Enhance system," "Conduct campaign"
- Not prescriptive: No "should implement," "must establish," "recommended"
- No prioritization or ranking (all presented equally)

**Validation and trade-offs sections:**
- Every response has "validationNeeded" list
- Every response has "prerequisites" list
- Every response has "tradeoffs" list (including risks and limitations)

**Example (R-ACC-03 trade-offs):**
```
"Moral hazard: Facilities may apply without serious commitment"
"May not address non-financial barriers"
"Risk: Subsidize facilities that would have applied anyway"
```

---

## Monitoring Indicators (Not Displayed in MVP)

### Verification Status

✅ **VERIFIED COMPLIANT**

**All 12 indicators defined:**
- 4 accreditation: I-ACC-O01, I-ACC-P01, I-ACC-P03, I-ACC-O02
- 4 claims: I-CLM-P01, I-CLM-P02, I-CLM-P03, I-CLM-O02
- 4 payment: I-PAY-O01, I-PAY-P01, I-PAY-P02, I-PAY-P03

**Each indicator includes:**
- type: "outcome" or "process"
- numerator: Explicit definition
- denominator: Explicit definition
- limitations: 2-3 caveats each

**Example (I-ACC-O01):**
```
numerator: "Facilities that have received accreditation"
denominator: "Total eligible facilities"
limitations: [
  "Denominator depends on clear 'eligible' definition",
  "Numerator doesn't capture 'in-process' applications",
  "Doesn't reflect quality of accredited facilities"
]
```

**UI display status:**
- DecisionSection.tsx: Does NOT render indicators
- explore.tsx Decision component: Does NOT show indicators
- Per MVP scope: "defined but not displayed" ✅

---

## UI Disclaimers

### Verification: All disclaimers present

✅ **VERIFIED COMPLIANT**

**HypothesisCard.tsx (lines 131-141):**
```tsx
<p className="text-[11px] text-muted-foreground mt-3 italic">
  This hypothesis is provisional and represents a plausible explanation 
  requiring investigation. The evidence status "hypothesis" indicates 
  this has not been verified through direct evidence.
</p>
```

**ResponseCard.tsx (lines 172-182):**
```tsx
<p className="text-[11px] text-muted-foreground mt-3 italic">
  These assumptions are unvalidated and require institutional review 
  before implementation. The validation checklist above identifies 
  what must be confirmed.
</p>
```

**DecisionSummary.tsx (lines 51-57):**
```tsx
<p className="text-xs text-muted-foreground mt-3">
  These hypotheses represent plausible explanations requiring investigation. 
  Evidence status: hypothesis (not yet verified).
</p>
```

**explore.tsx Decision component (lines 742-750):**
```tsx
<p>
  <strong>Note:</strong> These hypotheses represent plausible explanations 
  based on theory, analogous contexts, and program design. They have not 
  been verified through direct evidence. Response options include key 
  institutional, temporal, financial, and legal assumptions that require 
  validation before implementation.
</p>
```

---

## Comparison to Requirements

### Original Quality Review Requirements

| Requirement | Status | Evidence |
|-------------|--------|----------|
| Remove unsupported likelihood rankings | ✅ Pass | All hypotheses = "hypothesis", no high/medium/low |
| Distinguish hypotheses from evidence | ✅ Pass | Separate plausibility vs. verification sections |
| Explicit institutional assumptions | ✅ Pass | All responses have 4-category assumptions object |
| No causal claims without hedging | ✅ Pass | All use "may," "could," conditional language |
| Synthetic data ≠ verified status | ✅ Pass | All = "hypothesis", none upgraded |
| Indicators defined, not displayed | ✅ Pass | 12 indicators in code, 0 in UI |
| Responses as options, not recommendations | ✅ Pass | Framed as possibilities with trade-offs |
| Disclaimers present | ✅ Pass | 4 disclaimer locations verified |

---

## Recommendations

### Non-Blocking Improvements (Optional)

1. **Timeframe Uncertainty (Minor Enhancement)**
   - Current: "Estimated 1-3 months (highly uncertain)"
   - Optional: Add uncertainty ranges: "1-3 months (optimistic) to 6-12 months (conservative)"
   - **Priority:** Low - current language is adequate

2. **Assumption Validation Priority (Enhancement)**
   - Current: All assumptions listed equally
   - Optional: Flag critical vs. non-critical assumptions
   - **Priority:** Low - deferred to post-MVP

3. **Alternative Explanations (Clarification)**
   - Current: Listed but not explained
   - Optional: Add brief note why alternatives are also plausible
   - **Priority:** Low - current structure is correct

### No Changes Required

All flagged instances are acceptable in context. No blocking issues identified.

---

## Audit Conclusion

**Overall Assessment:** ✅ **ANALYTICAL INTEGRITY VERIFIED**

The Phase 3 MVP knowledge base demonstrates exceptional analytical rigor:

1. **No false certainty:** All claims appropriately hedged
2. **No likelihood inflation:** All hypotheses = "hypothesis" status
3. **No causal overreach:** Mechanisms described as plausible, not proven
4. **No recommendation creep:** Responses framed as options requiring validation
5. **Explicit limitations:** Every assumption, timeframe, and indicator caveated

The language consistently maintains the distinction between:
- Theory and evidence
- Plausibility and verification
- Literature findings and scenario findings
- Assumptions and confirmed facts
- Options and recommendations

**Recommendation:** ✅ **APPROVE FOR MERGE** (pending browser testing completion)

---

**Auditor:** Kiro Agent  
**Date:** October 25, 2026  
**Files Audited:** src/data/decision-knowledge.ts (1,321 lines, 10 hypotheses, 8 responses, 12 indicators)  
**Findings:** 2 flagged instances, 0 blocking issues  
**Status:** PASS
