# Phase 3: Decision Intelligence
## Executive Summary

**Date:** October 25, 2026  
**Repository:** `yveszun/screenshot-exact-match`  
**Current State:** Evidence transparency improvements (PR #2) merged and verified  
**Objective:** Design decision-support framework for health financing stakeholders

---

## Purpose

Current Finvanta prototype identifies **where** implementation gaps occur. Phase 3 extends this to help decision-makers understand:

1. **What might explain the gap** (plausible hypotheses requiring investigation)
2. **What response options exist** (operational, financing, and policy levers)
3. **Who can act** (institutional roles and decision-making authority)
4. **How to monitor progress** (leading, process, and outcome indicators)

This framework must serve **senior payer, government, and health financing decision-makers** while maintaining analytical credibility and avoiding unsupported causal claims.

---

## Core Design Principles

### 1. Hypothesis-Driven, Not Prescriptive

❌ **Avoid:** "You should simplify accreditation requirements"  
✅ **Instead:** "If accreditation requirements are misaligned with facility capacity, consider: [options with prerequisites and trade-offs]"

### 2. Institutionally Grounded

Each response option identifies:
- **Who can act** (PhilHealth, DOH, LGUs, facility associations)
- **What authority required** (policy change, budget allocation, administrative action)
- **What prerequisites exist** (data requirements, stakeholder buy-in, legal barriers)

### 3. Evidence Limitations Explicit

Every recommendation includes:
- What data would verify the hypothesis
- What data are currently unavailable
- What assumptions underlie the analysis

### 4. Monitoring-First Mindset

For each response, specify:
- **Leading indicators** (early signals: training attendance, policy drafts)
- **Process indicators** (implementation: facilities accredited, claims filed)
- **Outcome indicators** (impact: payment rates, service delivery)

---

## Proposed Framework Structure

### Four-Step Decision Support Flow

```
┌─────────────────────────────────────────────────────────────────┐
│ 1. IDENTIFY THE GAP                                             │
│    Current: Proportional (14.4%) + Absolute (1,284 facilities)  │
│    New: Magnitude vs. Actionability assessment                  │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│ 2. INVESTIGATE EXPLANATIONS                                     │
│    Plausible hypotheses with verification requirements          │
│    - Policy/regulatory barriers                                 │
│    - Capacity constraints (financial, technical, human)         │
│    - Information/awareness gaps                                 │
│    - Administrative/process bottlenecks                         │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│ 3. CONSIDER RESPONSES                                           │
│    Mapped to barriers, with actor + prerequisites + trade-offs  │
│    - Policy reforms                                             │
│    - Financing adjustments                                      │
│    - Technical assistance                                       │
│    - Monitoring enhancements                                    │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│ 4. MONITOR IMPLEMENTATION                                       │
│    Indicator dashboard with data requirements                   │
│    - Leading: policy adoption, TA provision                     │
│    - Process: accreditation, claims submission, payments        │
│    - Outcome: service delivery, population coverage             │
└─────────────────────────────────────────────────────────────────┘
```

---

## Key Deliverables Proposed

### 1. Analytical Framework (Rule-Based)

**Structured knowledge base covering:**
- **Accreditation barriers:** 12 plausible explanations with verification needs
- **Claims submission barriers:** 10 explanations
- **Payment processing barriers:** 8 explanations
- **Response options:** 25+ mapped to barrier types
- **Monitoring indicators:** 40+ with data requirements

**Decision logic:**
- Identify proportional and absolute gaps (✅ already implemented)
- Map gap to barrier categories based on cascade stage
- Present hypotheses requiring investigation (not conclusions)
- Filter response options by institutional actor and context
- Generate monitoring plan based on selected responses

### 2. User Journey Redesign

**Executive Intelligence View:**
- Preserve current gap identification
- **Add:** "What might explain this?" section (2-3 top hypotheses)
- **Add:** "Consider investigating" with data requirements
- **Keep concise:** Decision summary, not analysis workbook

**Explore Evidence View:**
- **New section:** "Decision Support" (after current "Insights")
  - Full hypothesis catalog
  - Response options matrix
  - Monitoring framework
- **Design pattern:** Progressive disclosure (show summary, expand for detail)

### 3. Data Model Extension

```typescript
// New types (non-breaking additions)
type BarrierCategory = 
  | "policy_regulatory" 
  | "capacity_financial" 
  | "capacity_technical" 
  | "capacity_human_resources"
  | "information_awareness" 
  | "administrative_process";

type Hypothesis = {
  id: string;
  category: BarrierCategory;
  statement: string; // Plain language
  verificationData: string[]; // What data would confirm/refute
  likelihood: "high" | "medium" | "low"; // Based on literature
};

type ResponseOption = {
  id: string;
  name: string;
  description: string;
  addressesBarriers: BarrierCategory[];
  actor: string; // "PhilHealth" | "DOH" | "LGU" | etc.
  prerequisites: string[];
  tradeoffs: string[];
  timeframe: string; // "1-3 months" | "6-12 months" | etc.
  evidenceLimitations: string[];
};

type Indicator = {
  id: string;
  name: string;
  type: "leading" | "process" | "outcome";
  definition: string;
  dataSource: string;
  frequency: string;
  interpretation: string;
};
```

### 4. Example Decision Support Outputs

Using **Moderate Activity (Mixed Bottlenecks)** scenario:

**Gap:** 14.4% accreditation rate (1,284 facilities not progressing)

**Top 3 Hypotheses:**
1. **High likelihood:** Documentation requirements exceed facility administrative capacity
   - *Verify with:* Accreditation application completion rates, rejection reasons
2. **Medium likelihood:** Accreditation costs prohibitive for small facilities
   - *Verify with:* Fee structure analysis, facility financial statements
3. **Medium likelihood:** Awareness of benefit package limited among eligible facilities
   - *Verify with:* Facility surveys, information dissemination records

**Response Options (sample 3 of 8):**
1. **Simplify documentation requirements** (PhilHealth policy)
   - Prerequisites: Review of clinical safety implications, legal authority confirmation
   - Trade-offs: May reduce quality assurance, requires enhanced monitoring
   - Timeframe: 3-6 months for policy change
   
2. **Provide technical assistance** (DOH + PhilHealth)
   - Prerequisites: Budget allocation, TA provider identification
   - Trade-offs: Resource-intensive, may favor certain facility types
   - Timeframe: 1-3 months to launch program

3. **Subsidize accreditation fees** (PhilHealth financing)
   - Prerequisites: Budget availability, targeting criteria
   - Trade-offs: Moral hazard, may not address capacity constraints
   - Timeframe: Immediate if budget available

**Monitoring Plan:**
- **Leading:** TA sessions delivered, policy draft completion
- **Process:** Accreditation applications filed, approvals granted
- **Outcome:** % of eligible facilities accredited, time to accreditation

---

## Implementation Roadmap

### Phase 3A: Knowledge Base (8-12 hours)
**Objective:** Build structured barrier/response/indicator framework

1. ✅ Literature review (health financing implementation barriers) — 2 hours
2. ⚠️ Develop barrier taxonomy with hypotheses — 3 hours
3. ⚠️ Map response options to barriers — 3 hours
4. ⚠️ Define monitoring indicators with data requirements — 2 hours
5. ⚠️ Create JSON knowledge base structure — 2 hours

**Deliverable:** `decision-knowledge.ts` with type-safe framework

### Phase 3B: Decision Logic (6-8 hours)
**Objective:** Connect gaps to decision support

1. ⚠️ Implement hypothesis selection logic — 2 hours
2. ⚠️ Build response filtering by actor/context — 2 hours
3. ⚠️ Generate monitoring plans — 2 hours
4. ⚠️ Add comprehensive tests — 2 hours

**Deliverable:** Functions: `getRelevantHypotheses()`, `getResponseOptions()`, `generateMonitoringPlan()`

### Phase 3C: UI Integration (10-14 hours)
**Objective:** Surface decision support in both views

1. ⚠️ Executive view: Add concise decision summary — 3 hours
2. ⚠️ Explore view: New "Decision Support" section — 5 hours
3. ⚠️ Progressive disclosure components — 3 hours
4. ⚠️ Synthetic data disclaimers — 1 hour
5. ⚠️ Responsive design testing — 2 hours

**Deliverable:** Updated Executive and Explore views with decision support

### Phase 3D: Verification (4-6 hours)
**Objective:** Ensure credibility and usability

1. ⚠️ Analytical review (hypothesis quality, response feasibility) — 2 hours
2. ⚠️ Language audit (avoid causal overreach) — 1 hour
3. ⚠️ Build and test all 6 scenarios — 2 hours
4. ⚠️ Documentation and handoff — 1 hour

**Total estimated effort:** 28-40 hours

---

## Risk Assessment

### High-Risk Areas

#### 1. Causal Overreach ⚠️ CRITICAL
**Risk:** Hypotheses mistaken for verified causes  
**Mitigation:**
- Prefix all hypotheses with "If [condition], then consider..."
- Explicit "Data needed to verify" for each hypothesis
- Red disclaimer: "These are hypotheses requiring investigation, not findings"

#### 2. Inappropriate Recommendations ⚠️ HIGH
**Risk:** Response suggestions perceived as PhilHealth-endorsed policy  
**Mitigation:**
- Frame as "options to consider" not "recommendations"
- Include prerequisites and trade-offs for every option
- Attribute to Finvanta analysis, not PhilHealth decision
- Disclaimer: "These options require institutional review and approval"

#### 3. Synthetic Data Confusion ⚠️ HIGH
**Risk:** Decision support outputs mistaken for real-world guidance  
**Mitigation:**
- Preserve blue informational banner on all views
- Add decision support-specific disclaimer: "This analysis is based on synthetic scenarios for demonstration purposes only"
- Label every decision output: "Illustrative example"

#### 4. Decision-Maker Overload ⚠️ MEDIUM
**Risk:** Too much detail overwhelms executive audience  
**Mitigation:**
- Executive view: Show only top 2-3 hypotheses and responses
- Full catalog in Explore view only
- Progressive disclosure: Summary → Detail on click
- Clear hierarchy: Gap → Why → What → Monitor

### Medium-Risk Areas

#### 5. Knowledge Base Completeness ⚠️ MEDIUM
**Risk:** Missing critical barriers or responses  
**Mitigation:**
- Literature-grounded taxonomy (WHO, World Bank, implementation science)
- Explicit acknowledgment of framework limitations
- Future: Allow user customization/extension

#### 6. Context Sensitivity ⚠️ MEDIUM
**Risk:** Generic advice not applicable to specific contexts  
**Mitigation:**
- Include contextual filters (facility type, region, activity level)
- Acknowledge "one size fits all" limitations
- Recommend contextualized investigation

---

## What's Rule-Based vs. AI-Suitable

### Rule-Based (Now) ✅

1. **Gap identification** — Mathematical (already implemented)
2. **Hypothesis mapping** — Structured taxonomy + cascade stage logic
3. **Response filtering** — Boolean logic (actor, prerequisites, barriers addressed)
4. **Indicator selection** — Predefined catalog + response type matching

**Why rule-based:** 
- Transparent decision logic required for health financing
- Small, structured domain (3 stages × ~10 barriers each)
- Stakeholder trust requires explainability
- No training data available for supervised learning

### AI-Suitable (Future) 🤖

1. **Hypothesis likelihood estimation** — Could learn from real-world data
   - Input: Facility characteristics, historical patterns, regional context
   - Output: Ranked hypotheses by likelihood for specific context
   - Requirement: Real PhilHealth data, not synthetic

2. **Natural language query** — "What if we increase TA budget by 20%?"
   - Parse question, run scenario, explain trade-offs
   - Requirement: Robust knowledge base + conversational interface

3. **Anomaly detection** — Flag unusual patterns across facilities/regions
   - "Region X has different bottleneck distribution than expected"
   - Requirement: Real multi-facility time-series data

4. **Impact prediction** — "If accreditation improves from 14% to 25%, expect..."
   - Model cascade dynamics, predict downstream effects
   - Requirement: Historical intervention data, causal inference methods

**Recommendation:** Build Phase 3 fully rule-based. Design data model to accommodate future AI features without architecture changes.

---

## Safeguards Applied

This document is a **specification exercise only**. Per your instructions:

✅ **No code modified**  
✅ **No branches created**  
✅ **No commits made**  
✅ **No merges or deployments**  
✅ **No other repositories touched**  

Awaiting your approval before any implementation work begins.

---

## Next Steps (Pending Your Approval)

1. **Review this executive summary** and detailed specification (separate document)
2. **Provide feedback** on framework structure, scope, or priorities
3. **Approve implementation** of Phase 3A-D roadmap
4. **Clarify preferences:**
   - Which view should decision support emphasize? (Executive vs. Explore)
   - What level of detail for synthetic demonstration? (Full catalog vs. sample only)
   - Any specific barriers or responses to prioritize?

Once approved, I will implement according to the detailed specification with regular check-ins for your feedback.
