# Phase 3: Decision Intelligence
## Detailed Technical Specification

**Date:** October 25, 2026  
**Repository:** `yveszun/screenshot-exact-match`  
**Document Status:** Complete specification for review  
**Related Document:** `PHASE3_EXECUTIVE_SUMMARY.md`

---

## Table of Contents

1. [User Journey Design](#1-user-journey-design)
2. [Analytical Framework](#2-analytical-framework)
3. [Data Model Architecture](#3-data-model-architecture)
4. [Example Decision Outputs](#4-example-decision-outputs)
5. [Interface Structure](#5-interface-structure)
6. [Implementation Roadmap](#6-implementation-roadmap)
7. [Risk Assessment & Acceptance Criteria](#7-risk-assessment--acceptance-criteria)

---

## 1. User Journey Design

### 1.1 Current State (Post-PR #2)

**Executive Intelligence View:**
- Headline: Facility count gap (e.g., "Only 69 of 1,500...")
- Primary finding: Largest proportional drop-off with rate
- Comparison: Proportional vs. absolute alignment
- Investigation card: Generic hypothesis and investigation suggestion
- Stage conversion metrics

**Explore Evidence View:**
- Five sections: Overview, Cascade, Claims, Regional, Insights
- Insights section: 4-step diagnostic (observed → rule → possible → investigate)
- Evidence classification tags (observed, rule, investigate)

**Gap:** Decision-makers see WHERE the problem is, but limited guidance on WHAT TO DO.

### 1.2 Target State (Phase 3)

#### Journey Flow: Executive Decision-Maker

```
Entry Point: Executive Intelligence homepage
     ↓
[IDENTIFY] See the gap (already excellent)
     ↓
[UNDERSTAND] "What might explain this?" ← NEW
  - 2-3 top hypotheses (collapsed by default)
  - Each with: Statement + "Data needed to verify"
  - Disclaimer: "Hypotheses requiring investigation"
     ↓
[DECIDE] "What could we do?" ← NEW
  - 2-3 response options (collapsed by default)
  - Each with: Actor + Timeframe + Prerequisites
  - Link to full catalog: "See all options in Explore Evidence"
     ↓
[MONITOR] "How would we track progress?" ← NEW
  - Sample indicators (2-3 per type)
  - Link to full framework: "See monitoring plan"
     ↓
Exit: "Explore full analysis" → Explore Evidence view
```

**Design philosophy:**
- Executive view remains concise (scannable in 30 seconds)
- Decision support is OPTIONAL (progressive disclosure)
- Always link to deeper analysis in Explore view

#### Journey Flow: Analyst/Deep Investigation

```
Entry Point: Explore Evidence → Insights section
     ↓
Existing 4-step diagnostic (preserved)
     ↓
[NEW SECTION] Decision Support ← NEW
     ↓
Tab 1: Hypotheses Catalog
  - All hypotheses for this stage
  - Grouped by barrier category
  - Each with: Statement, Verification data, Likelihood
     ↓
Tab 2: Response Options
  - Filterable by: Actor, Timeframe, Barrier type
  - Each with: Full details (prerequisites, trade-offs, evidence limits)
  - Comparison view: Side-by-side response evaluation
     ↓
Tab 3: Monitoring Framework
  - Full indicator catalog
  - Data requirement specifications
  - Export as monitoring plan template
```

**Design philosophy:**
- Explore view is comprehensive (reference material)
- Supports detailed investigation and planning
- Exportable/shareable content

### 1.3 User Personas & Use Cases

#### Persona 1: Senior PhilHealth Executive
**Context:** Reviewing quarterly implementation report  
**Goal:** Identify priority intervention areas  
**Journey:**
1. Sees accreditation gap (14.4%, 1,284 facilities)
2. Expands "What might explain this?"
3. Reads top hypothesis: "Documentation requirements exceed capacity"
4. Expands "What could we do?"
5. Sees options: Simplify requirements, Provide TA, Subsidize fees
6. Clicks "Explore full analysis" for detailed comparison
7. Assigns team to investigate hypothesis using verification data list

**Key needs:**
- ✅ Quick assessment (30 seconds)
- ✅ Actionable options (not just problems)
- ✅ Clear ownership (who can act)
- ✅ Link to deeper analysis

#### Persona 2: DOH Policy Analyst
**Context:** Preparing policy brief on mental health benefit  
**Goal:** Assess feasibility of accreditation reform  
**Journey:**
1. Navigates to Explore Evidence → Decision Support
2. Reviews all hypotheses for accreditation barriers
3. Filters response options by "DOH" actor
4. Compares 3 options side-by-side
5. Reviews prerequisites and trade-offs
6. Exports monitoring framework for each option
7. Drafts policy recommendation with evidence limitations

**Key needs:**
- ✅ Comprehensive hypothesis catalog
- ✅ Detailed response evaluation
- ✅ Evidence transparency
- ✅ Exportable analysis

#### Persona 3: Facility Association Representative
**Context:** Advocating for accreditation support  
**Goal:** Understand barriers and propose solutions  
**Journey:**
1. Reviews cascade showing low accreditation (14.4%)
2. Checks hypotheses: Finds "Costs prohibitive" hypothesis
3. Reviews verification data needed
4. Proposes data collection to verify hypothesis
5. Reviews response options that address cost barriers
6. Prepares advocacy brief citing Finvanta analysis

**Key needs:**
- ✅ Transparent hypotheses (not predetermined conclusions)
- ✅ Data requirements clear
- ✅ Multiple response options (not single prescription)
- ✅ Attribution to analysis (not PhilHealth policy)

---

## 2. Analytical Framework

### 2.1 Barrier Taxonomy

Framework grounded in health financing and implementation science literature (WHO, World Bank, Gavi implementation research).


#### Barrier Categories (6 types)

1. **Policy/Regulatory** — Requirements, standards, eligibility criteria
2. **Capacity: Financial** — Costs, fees, opportunity costs, budgets
3. **Capacity: Technical** — Infrastructure, systems, equipment, data
4. **Capacity: Human Resources** — Staffing, training, expertise
5. **Information/Awareness** — Knowledge of benefit, requirements, processes
6. **Administrative/Process** — Application procedures, approval delays, complexity

### 2.2 Accreditation Barriers (12 Hypotheses)

#### Policy/Regulatory

**H-ACC-01: Documentation requirements exceed facility capacity**
- **Likelihood:** High (common across LMICs)
- **Statement:** "Accreditation documentation requirements may exceed the administrative capacity of smaller facilities, particularly those in rural areas without dedicated administrative staff."
- **Verification data:**
  - Accreditation application completion rates by facility type
  - Application rejection reasons (documentation-related)
  - Facility administrative staffing levels
  - Time-to-complete application surveys
- **Literature:** PhilHealth 2024 mental health implementation study notes "varied adoption of clinical practice guidelines" and administrative capacity challenges

**H-ACC-02: Clinical standards misaligned with facility reality**
- **Likelihood:** Medium
- **Statement:** "Clinical practice guidelines or service delivery standards required for accreditation may not reflect the operational realities of primary care facilities or general hospitals without specialized mental health units."
- **Verification data:**
  - Gap analysis: Required vs. available services/equipment
  - Facility capability assessments
  - Denial rates due to clinical standards
- **Literature:** Limited mhGAP services noted in PhilHealth technical assistance report

**H-ACC-03: Eligibility criteria exclude ready facilities**
- **Likelihood:** Low
- **Statement:** "Facility type eligibility criteria (e.g., level of care, ownership type) may exclude facilities that are operationally capable of delivering services."
- **Verification data:**
  - Eligibility criteria documentation
  - Characteristics of non-eligible facilities
  - Service delivery capacity assessments

#### Capacity: Financial

**H-ACC-04: Accreditation costs prohibitive**
- **Likelihood:** Medium-High
- **Statement:** "Direct costs (application fees, inspection fees) or indirect costs (staff time, facility modifications) may be prohibitive, especially for small or public facilities with limited budgets."
- **Verification data:**
  - Fee schedule and actual costs incurred
  - Facility financial statements
  - Accreditation rate by facility size/ownership
  - Survey: Reasons for non-application
- **Literature:** Resource constraints noted in implementation of Mental Health Act (PMC11376523)

**H-ACC-05: Return on investment unclear**
- **Likelihood:** Medium
- **Statement:** "Facilities may perceive accreditation investment as risky if patient demand is uncertain or reimbursement rates are insufficient to cover costs."
- **Verification data:**
  - Expected vs. actual claim volumes
  - Reimbursement rate analysis
  - Facility profitability assessments
  - Surveys: Decision-making factors

#### Capacity: Technical

**H-ACC-06: Health information systems inadequate**
- **Likelihood:** Medium
- **Statement:** "Facilities may lack the health information systems required to document clinical activities, track outcomes, or submit required reports."
- **Verification data:**
  - HIS implementation rates
  - Reporting compliance among accredited facilities
  - Technology infrastructure assessments
- **Literature:** "Complex billing technology" cited as barrier in pharmacy benefit implementation (healthlaw.org)

**H-ACC-07: Infrastructure or equipment gaps**
- **Likelihood:** Medium
- **Statement:** "Physical infrastructure (space for counseling) or equipment (diagnostic tools) required for accreditation may be absent or require significant capital investment."
- **Verification data:**
  - Infrastructure requirements checklist
  - Facility physical plant assessments
  - Capital investment needed estimates

#### Capacity: Human Resources

**H-ACC-08: Mental health workforce shortage**
- **Likelihood:** High
- **Statement:** "Shortage of mental health professionals (psychiatrists, psychologists, trained nurses) may prevent facilities from meeting accreditation requirements."
- **Verification data:**
  - Mental health workforce distribution
  - Accreditation staffing requirements
  - Provider-to-population ratios
- **Literature:** "Scarcity of mental health professionals" noted in PhilHealth technical assistance report

**H-ACC-09: Training gaps for primary care providers**
- **Likelihood:** Medium-High
- **Statement:** "Primary care providers may lack training in mental health service delivery, preventing facilities from offering required services."
- **Verification data:**
  - Provider training records
  - mhGAP or similar training coverage
  - Service delivery patterns

#### Information/Awareness

**H-ACC-10: Benefit package awareness limited**
- **Likelihood:** Medium
- **Statement:** "Eligible facilities may be unaware of the mental health benefit package, accreditation opportunity, or potential reimbursement."
- **Verification data:**
  - Facility surveys: Benefit awareness
  - Information dissemination records
  - Inquiries received by PhilHealth
- **Literature:** Information gaps common in benefit package rollouts

**H-ACC-11: Accreditation process unclear**
- **Likelihood:** Medium
- **Statement:** "Application process, requirements, timelines, or support available may not be clearly communicated to eligible facilities."
- **Verification data:**
  - Process documentation review
  - Facility surveys: Process understanding
  - Incomplete application analysis

#### Administrative/Process

**H-ACC-12: Application processing delays**
- **Likelihood:** Medium
- **Statement:** "Administrative delays in reviewing applications, conducting inspections, or issuing approvals may discourage facilities from completing accreditation."
- **Verification data:**
  - Processing time data (application to approval)
  - Application backlog analysis
  - Inspection scheduling timelines
- **Literature:** "Administrative processes may be slow" noted in accreditation literature

### 2.3 Claims Submission Barriers (10 Hypotheses)

#### Capacity: Technical

**H-CLM-01: Claims system access or usability issues**
- **Likelihood:** High
- **Statement:** "Facilities may face technical barriers in accessing the claims submission system, or the system may be difficult to use without specialized training."
- **Verification data:**
  - System login/usage rates among accredited facilities
  - Technical support requests
  - User experience surveys
- **Literature:** "Technical barriers in claims submission systems" common implementation challenge

**H-CLM-02: Coding and documentation requirements complex**
- **Likelihood:** High
- **Statement:** "ICD-10 coding, procedure coding, or clinical documentation requirements for mental health claims may exceed facility coding capacity."
- **Verification data:**
  - Claim rejection rates (coding errors)
  - Coder training/certification rates
  - Documentation quality audits

#### Capacity: Financial

**H-CLM-03: Insufficient patient volume**
- **Likelihood:** Medium-High
- **Statement:** "Accredited facilities may have low patient volumes, making claims submission effort not worthwhile or indicating limited demand for services."
- **Verification data:**
  - Service delivery volumes (patients seen)
  - Regional mental health burden estimates
  - Patient flow patterns

**H-CLM-04: Cash flow constraints prevent service provision**
- **Likelihood:** Medium
- **Statement:** "Facilities may lack working capital to provide services pending reimbursement, especially if payment delays are common."
- **Verification data:**
  - Payment turnaround times
  - Facility liquidity assessments
  - Service provision patterns

#### Capacity: Human Resources

**H-CLM-05: Billing staff shortage or turnover**
- **Likelihood:** Medium
- **Statement:** "Facilities may lack dedicated billing staff or experience high turnover, disrupting institutional knowledge of claims processes."
- **Verification data:**
  - Billing staff-to-provider ratios
  - Staff turnover rates
  - Outsourcing prevalence

**H-CLM-06: Training gaps in mental health billing**
- **Likelihood:** Medium-High
- **Statement:** "Billing staff may lack training specific to mental health service coding and claims requirements."
- **Verification data:**
  - Training participation records
  - Staff competency assessments
  - Claims error patterns

#### Information/Awareness

**H-CLM-07: Reimbursement rules unclear**
- **Likelihood:** Medium
- **Statement:** "Facilities may be uncertain about which services are covered, documentation requirements, or reimbursement rates."
- **Verification data:**
  - Facility surveys: Reimbursement knowledge
  - Information queries received
  - Claims submission patterns vs. benefit scope

#### Administrative/Process

**H-CLM-08: Prior authorization or pre-approval barriers**
- **Likelihood:** Medium
- **Statement:** "If prior authorization is required, the approval process may be time-consuming or have high denial rates, discouraging facilities from providing services."
- **Verification data:**
  - Prior authorization volume and approval rates
  - Processing timelines
  - Service provision patterns before/after authorization

**H-CLM-09: Claims submission process burdensome**
- **Likelihood:** Medium
- **Statement:** "Number of steps, required documentation, or frequency of submission may impose excessive administrative burden."
- **Verification data:**
  - Process flow analysis
  - Time-motion studies
  - Facility feedback surveys

**H-CLM-10: Limited technical support availability**
- **Likelihood:** Medium
- **Statement:** "Facilities may lack access to responsive technical support for claims submission issues, leading to abandoned submissions."
- **Verification data:**
  - Support request volumes and resolution times
  - Facility satisfaction with support
  - Claims abandonment analysis

### 2.4 Payment Processing Barriers (8 Hypotheses)

#### Administrative/Process

**H-PAY-01: Adjudication delays**
- **Likelihood:** High
- **Statement:** "High claim volumes, insufficient adjudication staff, or complex review processes may cause payment delays that discourage continued service provision."
- **Verification data:**
  - Claims-to-payment turnaround times
  - Adjudication backlog analysis
  - Facility payment satisfaction surveys
- **Literature:** "Adjudication delays" and "payment processing bottlenecks" common in benefit implementation

**H-PAY-02: Documentation deficiencies**
- **Likelihood:** Medium-High
- **Statement:** "Claims may be denied or delayed due to incomplete clinical documentation, missing forms, or insufficient justification for services."
- **Verification data:**
  - Denial reason analysis (documentation-related)
  - Documentation audit results
  - Resubmission rates

**H-PAY-03: Clinical necessity reviews stringent**
- **Likelihood:** Medium
- **Statement:** "Medical necessity criteria or utilization review processes may result in high denial rates, discouraging facilities from submitting future claims."
- **Verification data:**
  - Denial rates by reason
  - Appeals and overturn rates
  - Clinical review criteria documentation

**H-PAY-04: Payment system technical issues**
- **Likelihood:** Medium
- **Statement:** "Electronic payment systems, bank account verification, or payment reconciliation processes may have technical failures causing delayed payments."
- **Verification data:**
  - Payment processing error logs
  - Bank account verification rates
  - Payment reconciliation discrepancies

#### Capacity: Financial

**H-PAY-05: Reimbursement rates insufficient**
- **Likelihood:** Medium-High
- **Statement:** "Reimbursement rates may not cover the true cost of service delivery, leading facilities to stop providing services even after initial claims."
- **Verification data:**
  - Cost-of-service studies
  - Reimbursement rate vs. cost comparison
  - Service discontinuation patterns

#### Policy/Regulatory

**H-PAY-06: Benefit design constraints**
- **Likelihood:** Low-Medium
- **Statement:** "Limits on service frequency, session duration, or patient eligibility may prevent facilities from serving their patient population effectively."
- **Verification data:**
  - Benefit design specifications
  - Utilization patterns vs. limits
  - Facility feedback on benefit adequacy

**H-PAY-07: Fraud and abuse controls excessive**
- **Likelihood:** Low-Medium
- **Statement:** "Anti-fraud measures (prepayment review, pattern analysis) may flag legitimate providers, causing payment holds or audits."
- **Verification data:**
  - Audit rates and findings
  - False-positive rates in fraud detection
  - Provider feedback

#### Information/Awareness

**H-PAY-08: Payment status communication poor**
- **Likelihood:** Medium
- **Statement:** "Facilities may lack visibility into claim status, expected payment dates, or denial reasons, creating uncertainty."
- **Verification data:**
  - Portal usage for status checks
  - Communication frequency and clarity
  - Facility satisfaction with communication

---


### 2.5 Response Options Catalog (28 Options)

#### Accreditation Responses (10 options)

**R-ACC-01: Simplify documentation requirements**
- **Addresses barriers:** H-ACC-01 (documentation capacity)
- **Actor:** PhilHealth (Policy Division)
- **Description:** Reduce number of forms, eliminate redundant information, allow electronic submission, provide templates
- **Prerequisites:**
  - Clinical safety review (ensure simplified requirements maintain quality)
  - Legal authority confirmation (policy change process)
  - Stakeholder consultation (DOH, facility associations)
- **Trade-offs:**
  - May reduce quality assurance oversight
  - Requires enhanced post-accreditation monitoring
  - Could face resistance from quality assurance teams
- **Timeframe:** 3-6 months (policy development and approval)
- **Evidence limitations:**
  - No data on optimal documentation level
  - Unknown impact on service quality
  - Assumes documentation is barrier (requires verification)

**R-ACC-02: Tiered accreditation standards**
- **Addresses barriers:** H-ACC-02 (clinical standards), H-ACC-07 (infrastructure)
- **Actor:** PhilHealth + DOH (joint policy)
- **Description:** Create accreditation tiers based on facility level (primary care vs. specialist), allowing basic tier for limited services
- **Prerequisites:**
  - Service package definition by tier
  - Quality standards development
  - Legislative or regulatory authority
- **Trade-offs:**
  - More complex to administer
  - May create two-tiered system
  - Reimbursement differentiation needed
- **Timeframe:** 6-12 months (policy development + implementation)
- **Evidence limitations:**
  - No evidence on patient safety in tiered models for mental health
  - Unknown demand for basic vs. comprehensive services

**R-ACC-03: Waive or subsidize accreditation fees**
- **Addresses barriers:** H-ACC-04 (costs prohibitive)
- **Actor:** PhilHealth (Finance Division)
- **Description:** Eliminate application/inspection fees for public facilities or small private clinics, or provide time-limited subsidy
- **Prerequisites:**
  - Budget allocation
  - Targeting criteria (which facilities qualify)
  - Fee revenue impact assessment
- **Trade-offs:**
  - Moral hazard (facilities apply without commitment)
  - May not address non-financial barriers
  - Ongoing budget implications
- **Timeframe:** Immediate (if budget available), 3-6 months (if budget approval needed)
- **Evidence limitations:**
  - Unknown whether fees are primary barrier
  - Risk: Subsidize facilities that would have applied anyway

**R-ACC-04: Provide technical assistance for accreditation**
- **Addresses barriers:** H-ACC-01 (documentation), H-ACC-06 (HIS), H-ACC-11 (process unclear)
- **Actor:** DOH + PhilHealth (collaborative)
- **Description:** Establish TA program: application support, documentation help, readiness assessments, peer mentoring
- **Prerequisites:**
  - Budget allocation (TA provider contracts or staff)
  - TA provider identification (consultants, facility associations, academic institutions)
  - TA curriculum development
- **Trade-offs:**
  - Resource-intensive (staff time, travel, materials)
  - May favor facilities near TA providers
  - Scalability limits (can't reach all 1,500 facilities)
- **Timeframe:** 1-3 months to launch program, ongoing implementation
- **Evidence limitations:**
  - Unknown TA effectiveness (need pilot evaluation)
  - Facility willingness to engage uncertain

**R-ACC-05: Accelerate application processing**
- **Addresses barriers:** H-ACC-12 (processing delays)
- **Actor:** PhilHealth (Accreditation Department)
- **Description:** Increase adjudication staff, implement fast-track review, set service standards (e.g., 30-day decision)
- **Prerequisites:**
  - Workload analysis (current vs. needed capacity)
  - Budget for additional staff or overtime
  - Process redesign (identify bottlenecks)
- **Trade-offs:**
  - May reduce review thoroughness
  - Temporary fix if application volume increases
  - Does not address root causes of low application rates
- **Timeframe:** 1-3 months (staff hiring/reassignment)
- **Evidence limitations:**
  - Assumes delays are barrier (requires verification with facilities)
  - Unknown optimal processing time

**R-ACC-06: Training program for mental health service provision**
- **Addresses barriers:** H-ACC-08 (workforce shortage), H-ACC-09 (training gaps)
- **Actor:** DOH (Health Human Resources Development)
- **Description:** mhGAP or similar training for primary care providers, task-shifting protocols, continuing education
- **Prerequisites:**
  - Training curriculum development or adaptation
  - Trainer identification and training
  - Budget (course delivery, participant time)
  - Endorsement from professional associations
- **Trade-offs:**
  - Training ≠ service provision (other barriers may persist)
  - Ongoing training needs (turnover, updates)
  - May create expectations for specialized compensation
- **Timeframe:** 3-6 months (program development), 12-24 months (scale-up)
- **Evidence limitations:**
  - Training effectiveness evidence mixed (need evaluation)
  - Unknown provider willingness to expand scope

**R-ACC-07: Public awareness campaign for facilities**
- **Addresses barriers:** H-ACC-10 (benefit awareness), H-ACC-11 (process unclear)
- **Actor:** PhilHealth (Communications) + Facility Associations
- **Description:** Information campaign: Benefit package details, accreditation process, reimbursement rates, success stories
- **Prerequisites:**
  - Campaign materials development
  - Distribution channels (email, workshops, website)
  - Budget (design, printing, events)
- **Trade-offs:**
  - Information alone may not overcome other barriers
  - Reach may be limited (not all facilities engaged)
  - One-time campaign vs. ongoing communication needs
- **Timeframe:** 1-3 months (campaign development and launch)
- **Evidence limitations:**
  - Assumes awareness is barrier (requires verification)
  - Unknown information gaps

**R-ACC-08: Establish accreditation support hotline**
- **Addresses barriers:** H-ACC-11 (process unclear)
- **Actor:** PhilHealth (Accreditation Department)
- **Description:** Dedicated phone/email support for accreditation questions, troubleshooting, application status inquiries
- **Prerequisites:**
  - Staff allocation (or outsource to call center)
  - FAQ and troubleshooting guide development
  - Communication plan (publicize hotline)
- **Trade-offs:**
  - Staff time diverted from processing
  - May be underutilized if other barriers more significant
  - Requires ongoing maintenance
- **Timeframe:** 1-2 months (setup and launch)
- **Evidence limitations:**
  - Unknown demand for support
  - Effectiveness depends on staff knowledge and responsiveness

**R-ACC-09: Modify eligibility criteria**
- **Addresses barriers:** H-ACC-03 (eligibility exclusions)
- **Actor:** PhilHealth + DOH (policy)
- **Description:** Expand eligible facility types (e.g., include barangay health stations, NGO clinics), remove restrictive criteria
- **Prerequisites:**
  - Policy rationale and evidence
  - Clinical safety assessment
  - Budget impact (more facilities = more potential claims)
- **Trade-offs:**
  - May include facilities unable to deliver quality services
  - Monitoring burden increases
  - Equity vs. quality trade-off
- **Timeframe:** 3-6 months (policy change)
- **Evidence limitations:**
  - No data on excluded facilities' capacity
  - Unknown quality implications

**R-ACC-10: Provide capital grants for infrastructure**
- **Addresses barriers:** H-ACC-07 (infrastructure gaps)
- **Actor:** DOH (Facilities Enhancement Program) or LGU
- **Description:** Grants or loans for mental health infrastructure: Counseling rooms, privacy modifications, basic equipment
- **Prerequisites:**
  - Substantial budget allocation
  - Grant application and selection process
  - Facility commitment to accreditation upon completion
- **Trade-offs:**
  - Very resource-intensive
  - Long timeframe (construction/renovation)
  - Benefits limited facilities (grant recipients only)
  - Infrastructure alone insufficient (need staff, systems)
- **Timeframe:** 6-12 months (grant program), 12-24 months (facility improvements)
- **Evidence limitations:**
  - Unknown infrastructure demand
  - Cost-effectiveness vs. other responses unclear

#### Claims Submission Responses (10 options)

**R-CLM-01: Simplify claims submission process**
- **Addresses barriers:** H-CLM-02 (coding complexity), H-CLM-09 (process burdensome)
- **Actor:** PhilHealth (Claims Management)
- **Description:** Reduce documentation requirements, accept simplified coding, allow bulk submission, streamline forms
- **Prerequisites:**
  - Claims process redesign
  - System modifications
  - Anti-fraud implications assessment
- **Trade-offs:**
  - May reduce claims data quality
  - Could increase fraud risk
  - Utilization review may become more difficult
- **Timeframe:** 3-6 months (process and system changes)
- **Evidence limitations:**
  - Unknown optimal simplification level
  - Trade-off between burden and data quality uncertain

**R-CLM-02: Enhance claims system usability**
- **Addresses barriers:** H-CLM-01 (system access/usability)
- **Actor:** PhilHealth (IT Department)
- **Description:** User interface improvements, mobile-friendly design, guided workflows, auto-save features, error checking
- **Prerequisites:**
  - User experience research
  - System development budget
  - User acceptance testing
- **Trade-offs:**
  - Development time and cost
  - May not address capacity barriers
  - Requires ongoing maintenance
- **Timeframe:** 6-12 months (system development and testing)
- **Evidence limitations:**
  - System usability vs. capacity barriers unknown
  - ROI difficult to estimate

**R-CLM-03: Provide coding and billing training**
- **Addresses barriers:** H-CLM-02 (coding complexity), H-CLM-06 (training gaps)
- **Actor:** PhilHealth + Professional Associations
- **Description:** Training program for facility billing staff: Mental health coding, documentation requirements, system navigation
- **Prerequisites:**
  - Training curriculum and materials
  - Trainer recruitment
  - Budget (course delivery, participant time)
- **Trade-offs:**
  - Staff turnover requires ongoing training
  - Training effectiveness variable
  - Does not address system or policy barriers
- **Timeframe:** 2-4 months (program development), ongoing delivery
- **Evidence limitations:**
  - Training impact on claims submission uncertain
  - Optimal training format unknown

**R-CLM-04: Establish claims support helpdesk**
- **Addresses barriers:** H-CLM-01 (system issues), H-CLM-07 (rules unclear), H-CLM-10 (support unavailable)
- **Actor:** PhilHealth (Claims Management)
- **Description:** Dedicated support for claims submission: Technical troubleshooting, coding questions, documentation guidance
- **Prerequisites:**
  - Staff allocation or outsourcing
  - Knowledge base and FAQ development
  - Communication plan
- **Trade-offs:**
  - Staff time and cost
  - Reactive (doesn't prevent issues)
  - Quality depends on staff expertise
- **Timeframe:** 1-2 months (setup and launch)
- **Evidence limitations:**
  - Demand for support uncertain
  - Impact on submission rates unknown

**R-CLM-05: Provide advance payments or working capital**
- **Addresses barriers:** H-CLM-04 (cash flow constraints)
- **Actor:** PhilHealth (Finance) or Development Finance Institution
- **Description:** Partial advance payment upon service provision, working capital loans, or payment guarantee program
- **Prerequisites:**
  - Budget allocation (advance payment pool)
  - Risk assessment (default likelihood)
  - Eligibility criteria (which facilities qualify)
  - Legal authority for advance payments
- **Trade-offs:**
  - Fraud and abuse risk
  - Budget implications (funds tied up)
  - May benefit only facilities with other capacity in place
- **Timeframe:** 3-6 months (program design and approval)
- **Evidence limitations:**
  - Cash flow as barrier uncertain (requires verification)
  - Repayment risk unknown

**R-CLM-06: Conduct patient demand generation**
- **Addresses barriers:** H-CLM-03 (insufficient patient volume)
- **Actor:** DOH (Health Promotion) + Mental Health Advocacy Groups
- **Description:** Public awareness campaign on mental health services, benefit coverage, facility availability, stigma reduction
- **Prerequisites:**
  - Campaign strategy and materials
  - Distribution channels (media, community outreach)
  - Budget
  - Coordination with facilities (ensure capacity to serve)
- **Trade-offs:**
  - Demand generation without capacity may frustrate patients
  - Long-term behavior change needed
  - Difficult to attribute demand increase to campaign
- **Timeframe:** 2-4 months (campaign development), ongoing implementation
- **Evidence limitations:**
  - Patient demand vs. facility barriers unclear
  - Campaign effectiveness uncertain

**R-CLM-07: Revise reimbursement rates**
- **Addresses barriers:** H-CLM-03 (insufficient volume - if rate issue)
- **Actor:** PhilHealth (Benefit Pricing)
- **Description:** Increase reimbursement rates to better reflect costs or incentivize service provision
- **Prerequisites:**
  - Cost-of-service study
  - Budget impact assessment
  - Policy approval (rate-setting authority)
- **Trade-offs:**
  - Budget implications
  - May incentivize over-provision
  - Does not address non-financial barriers
- **Timeframe:** 3-6 months (study and policy change)
- **Evidence limitations:**
  - Cost data may be limited
  - Rate sensitivity unknown

**R-CLM-08: Eliminate or streamline prior authorization**
- **Addresses barriers:** H-CLM-08 (prior authorization barriers)
- **Actor:** PhilHealth (Utilization Management)
- **Description:** Remove prior authorization requirement for specified services, or expedite approval process (auto-approval under conditions)
- **Prerequisites:**
  - Utilization and cost impact analysis
  - Anti-fraud measures design
  - Policy approval
- **Trade-offs:**
  - May increase inappropriate utilization
  - Budget risk (open-ended)
  - Requires post-service review enhancements
- **Timeframe:** 2-4 months (policy change)
- **Evidence limitations:**
  - Prior authorization impact on access vs. utilization unknown
  - Budget risk difficult to estimate

**R-CLM-09: Provide claims submission outsourcing support**
- **Addresses barriers:** H-CLM-05 (billing staff shortage), H-CLM-06 (training gaps)
- **Actor:** Facility Associations or Private Sector
- **Description:** Third-party billing services, shared billing pools for small facilities, or billing service subsidies
- **Prerequisites:**
  - Service provider identification/accreditation
  - Payment mechanism (facility-funded or subsidized)
  - Data sharing agreements
- **Trade-offs:**
  - Facilities dependent on third party
  - Cost to facilities (unless subsidized)
  - Data security concerns
- **Timeframe:** 3-6 months (program design), immediate for facilities if services exist
- **Evidence limitations:**
  - Outsourcing demand and effectiveness uncertain
  - Cost vs. in-house billing unknown

**R-CLM-10: Publish facility performance benchmarks**
- **Addresses barriers:** H-CLM-07 (rules unclear) - indirectly through transparency
- **Actor:** PhilHealth (Public Reporting)
- **Description:** Public dashboard showing facility-level claims submission rates, approval rates, payment timelines (anonymized or identified)
- **Prerequisites:**
  - Data quality verification
  - Privacy and consent considerations
  - Dashboard development
- **Trade-offs:**
  - May stigmatize low-performing facilities
  - Could be misinterpreted without context
  - Gaming risk (facilities submit to avoid bad metrics)
- **Timeframe:** 3-6 months (dashboard development)
- **Evidence limitations:**
  - Transparency impact on behavior uncertain
  - Risk: Name-and-shame without addressing barriers

#### Payment Processing Responses (8 options)

**R-PAY-01: Accelerate claims adjudication**
- **Addresses barriers:** H-PAY-01 (adjudication delays)
- **Actor:** PhilHealth (Claims Management)
- **Description:** Increase adjudication staff, implement auto-adjudication for low-complexity claims, set service standards (e.g., pay within 30 days)
- **Prerequisites:**
  - Workload analysis
  - Budget for staff or system automation
  - Auto-adjudication rules development
- **Trade-offs:**
  - May reduce review thoroughness
  - Automation may miss fraud or errors
  - Ongoing capacity needs if claim volume grows
- **Timeframe:** 1-3 months (staff), 6-12 months (automation)
- **Evidence limitations:**
  - Optimal processing time unclear
  - Impact on facility behavior uncertain

**R-PAY-02: Improve documentation clarity**
- **Addresses barriers:** H-PAY-02 (documentation deficiencies)
- **Actor:** PhilHealth (Claims Management) + Provider Education
- **Description:** Clear documentation standards, checklists, examples, real-time feedback on submission errors
- **Prerequisites:**
  - Standards review and update
  - Communication plan
  - System modifications (real-time validation)
- **Trade-offs:**
  - Standards may still be demanding
  - Does not address facility capacity
  - Requires ongoing communication
- **Timeframe:** 2-4 months (standards and tools)
- **Evidence limitations:**
  - Whether deficiencies are clarity or capacity issue unknown
  - Optimal documentation level uncertain

**R-PAY-03: Revise medical necessity criteria**
- **Addresses barriers:** H-PAY-03 (clinical necessity reviews)
- **Actor:** PhilHealth (Medical Affairs)
- **Description:** Review and liberalize medical necessity criteria, align with clinical guidelines, reduce denial rates
- **Prerequisites:**
  - Clinical expert consultation
  - Evidence review
  - Policy approval
- **Trade-offs:**
  - Budget risk (more approvals)
  - May allow inappropriate services
  - Requires post-payment review enhancements
- **Timeframe:** 3-6 months (review and policy change)
- **Evidence limitations:**
  - Whether criteria are overly restrictive uncertain
  - Clinical appropriateness vs. access trade-off

**R-PAY-04: Enhance payment system reliability**
- **Addresses barriers:** H-PAY-04 (payment system technical issues)
- **Actor:** PhilHealth (IT Department)
- **Description:** System upgrades, redundancy, error handling, bank integration improvements, reconciliation automation
- **Prerequisites:**
  - Technical assessment
  - System development budget
  - Testing and rollout plan
- **Trade-offs:**
  - Development time and cost
  - May not address non-technical payment barriers
  - Requires ongoing maintenance
- **Timeframe:** 6-12 months (system improvements)
- **Evidence limitations:**
  - Technical issues frequency and impact uncertain
  - ROI difficult to estimate

**R-PAY-05: Conduct reimbursement rate adequacy study**
- **Addresses barriers:** H-PAY-05 (reimbursement rates insufficient)
- **Actor:** PhilHealth (Actuarial/Benefit Pricing)
- **Description:** Comprehensive cost-of-service study, benchmark against private rates, assess provider satisfaction
- **Prerequisites:**
  - Study design and methodology
  - Data collection (facility cost data)
  - Budget for study
- **Trade-offs:**
  - Study takes time (no immediate action)
  - May reveal need for rate increases (budget implications)
  - Cost data may be incomplete
- **Timeframe:** 6-12 months (study completion)
- **Evidence limitations:**
  - This is investigative step, not intervention
  - Findings may not support rate change

**R-PAY-06: Modify benefit design constraints**
- **Addresses barriers:** H-PAY-06 (benefit design constraints)
- **Actor:** PhilHealth (Benefit Design)
- **Description:** Increase session limits, extend duration, broaden eligibility, add service types
- **Prerequisites:**
  - Utilization and cost impact analysis
  - Clinical evidence review
  - Budget allocation
  - Policy approval
- **Trade-offs:**
  - Budget implications
  - May incentivize over-utilization
  - Requires monitoring enhancements
- **Timeframe:** 3-6 months (analysis and policy change)
- **Evidence limitations:**
  - Whether current limits are binding unknown
  - Optimal benefit design uncertain

**R-PAY-07: Refine fraud detection algorithms**
- **Addresses barriers:** H-PAY-07 (fraud controls excessive)
- **Actor:** PhilHealth (Audit and Investigation)
- **Description:** Review false-positive rates, calibrate detection thresholds, expedite resolution of flagged claims
- **Prerequisites:**
  - Algorithm performance analysis
  - Stakeholder input (providers)
  - Balance fraud prevention vs. payment speed
- **Trade-offs:**
  - Fraud risk may increase
  - Difficult to measure optimal threshold
  - Requires ongoing calibration
- **Timeframe:** 2-4 months (review and adjustment)
- **Evidence limitations:**
  - False-positive rate unknown
  - Provider frustration vs. fraud prevention trade-off

**R-PAY-08: Implement claim status transparency**
- **Addresses barriers:** H-PAY-08 (payment status communication)
- **Actor:** PhilHealth (IT + Claims Management)
- **Description:** Online portal with real-time claim status, expected payment date, denial reasons with appeal instructions, payment history
- **Prerequisites:**
  - System development or enhancement
  - Data integration (claims, payments, denials)
  - User communication and training
- **Trade-offs:**
  - Development cost
  - May increase inquiries initially
  - Transparency alone doesn't speed payments
- **Timeframe:** 3-6 months (system development)
- **Evidence limitations:**
  - Communication gaps vs. payment delays impact unclear
  - Portal usage and satisfaction uncertain

---


### 2.6 Monitoring Indicator Framework (42 Indicators)

#### Indicator Types

1. **Leading indicators** — Early signals of response implementation (within weeks to months)
2. **Process indicators** — Implementation progress and outputs (months to year)
3. **Outcome indicators** — Impact on cascade and service delivery (6 months to 2 years)

#### Accreditation Monitoring (14 indicators)

**Leading Indicators:**

**I-ACC-L01: Policy/process change adoption**
- **Definition:** Date of policy approval for accreditation simplification or support programs
- **Data source:** PhilHealth policy documentation
- **Frequency:** One-time (policy adoption), then annual review
- **Interpretation:** Confirms response implementation initiated

**I-ACC-L02: Technical assistance program launch**
- **Definition:** Number of TA providers engaged, geographic coverage, launch date
- **Data source:** DOH/PhilHealth TA program records
- **Frequency:** One-time (launch), then quarterly monitoring
- **Interpretation:** Confirms TA response operational

**I-ACC-L03: Training program participation**
- **Definition:** Number of providers/facilities participating in accreditation readiness training
- **Data source:** Training attendance records
- **Frequency:** Monthly
- **Interpretation:** Early demand signal, capacity building underway

**I-ACC-L04: Information campaign reach**
- **Definition:** Number of facilities contacted, materials distributed, event attendance
- **Data source:** Campaign tracking systems
- **Frequency:** Monthly during campaign
- **Interpretation:** Awareness-building effort intensity

**Process Indicators:**

**I-ACC-P01: Accreditation application rate**
- **Definition:** Number of accreditation applications submitted per month
- **Data source:** PhilHealth accreditation database
- **Frequency:** Monthly
- **Interpretation:** Facility interest and initial barrier mitigation

**I-ACC-P02: Application approval rate**
- **Definition:** Percentage of applications approved (vs. denied or withdrawn)
- **Data source:** PhilHealth accreditation database
- **Frequency:** Quarterly
- **Interpretation:** Whether facilities meet standards, standards appropriateness

**I-ACC-P03: Application processing time**
- **Definition:** Median days from application submission to decision
- **Data source:** PhilHealth accreditation database
- **Frequency:** Monthly
- **Interpretation:** Administrative efficiency, process bottleneck reduction

**I-ACC-P04: Application completion rate**
- **Definition:** Percentage of started applications submitted (vs. abandoned)
- **Data source:** PhilHealth accreditation system logs
- **Frequency:** Quarterly
- **Interpretation:** Application usability, TA effectiveness

**I-ACC-P05: TA utilization rate**
- **Definition:** Percentage of eligible facilities using TA services
- **Data source:** TA program records
- **Frequency:** Quarterly
- **Interpretation:** TA accessibility and perceived value

**I-ACC-P06: Fee waiver utilization**
- **Definition:** Number and percentage of facilities using fee waiver (if implemented)
- **Data source:** PhilHealth finance records
- **Frequency:** Quarterly
- **Interpretation:** Whether cost was barrier

**Outcome Indicators:**

**I-ACC-O01: Accreditation rate**
- **Definition:** Percentage of eligible facilities accredited
- **Data source:** PhilHealth accreditation database + facility registry
- **Frequency:** Quarterly
- **Interpretation:** PRIMARY outcome - cascade improvement

**I-ACC-O02: Accreditation rate by facility type**
- **Definition:** Accreditation % for public vs. private, hospital vs. clinic, urban vs. rural
- **Data source:** PhilHealth accreditation database + facility characteristics
- **Frequency:** Quarterly
- **Interpretation:** Equity of access, differential barrier impacts

**I-ACC-O03: Accreditation sustainment**
- **Definition:** Percentage of accredited facilities maintaining accreditation at renewal
- **Data source:** PhilHealth accreditation database
- **Frequency:** Annually
- **Interpretation:** Long-term sustainability of response

**I-ACC-O04: Time to accreditation**
- **Definition:** Median days from facility decision to pursue accreditation to approval
- **Data source:** Facility surveys + accreditation database
- **Frequency:** Annually
- **Interpretation:** Overall process efficiency including facility preparation time

#### Claims Submission Monitoring (14 indicators)

**Leading Indicators:**

**I-CLM-L01: System enhancement deployment**
- **Definition:** Date of claims system usability improvements go-live
- **Data source:** PhilHealth IT deployment records
- **Frequency:** One-time per enhancement
- **Interpretation:** Confirms technical response implemented

**I-CLM-L02: Training program delivery**
- **Definition:** Number of billing staff trained in mental health claims processes
- **Data source:** Training records
- **Frequency:** Monthly
- **Interpretation:** Capacity building progress

**I-CLM-L03: Helpdesk operationalization**
- **Definition:** Claims support helpdesk launch date, staffing levels, hours of operation
- **Data source:** PhilHealth claims management records
- **Frequency:** One-time (launch), then quarterly review
- **Interpretation:** Support infrastructure in place

**I-CLM-L04: Policy change implementation**
- **Definition:** Date of claims simplification policy effective
- **Data source:** PhilHealth policy documentation
- **Frequency:** One-time
- **Interpretation:** Process barrier reduction initiated

**Process Indicators:**

**I-CLM-P01: Claims submission rate (among accredited)**
- **Definition:** Percentage of accredited facilities submitting at least one claim
- **Data source:** PhilHealth claims database
- **Frequency:** Monthly
- **Interpretation:** Transition from accreditation to service provision

**I-CLM-P02: Claims volume per facility**
- **Definition:** Median number of claims submitted per facility per month
- **Data source:** PhilHealth claims database
- **Frequency:** Monthly
- **Interpretation:** Service volume, capacity utilization

**I-CLM-P03: Claim submission errors/rejections**
- **Definition:** Percentage of claims rejected due to submission errors (coding, documentation)
- **Data source:** PhilHealth claims database
- **Frequency:** Monthly
- **Interpretation:** System usability, training effectiveness, documentation clarity

**I-CLM-P04: Helpdesk utilization**
- **Definition:** Number of helpdesk inquiries, resolution rate, satisfaction scores
- **Data source:** Helpdesk tracking system
- **Frequency:** Monthly
- **Interpretation:** Support demand and effectiveness

**I-CLM-P05: System login and usage rates**
- **Definition:** Percentage of accredited facilities logging into claims system, frequency
- **Data source:** Claims system logs
- **Frequency:** Weekly
- **Interpretation:** System accessibility and engagement

**I-CLM-P06: Training completion and competency**
- **Definition:** Training completion rates, post-training assessment scores
- **Data source:** Training program records
- **Frequency:** Monthly
- **Interpretation:** Training quality and knowledge transfer

**Outcome Indicators:**

**I-CLM-O01: Active claims submission rate**
- **Definition:** Percentage of accredited facilities submitting claims regularly (e.g., monthly)
- **Data source:** PhilHealth claims database
- **Frequency:** Quarterly
- **Interpretation:** PRIMARY outcome - sustained service provision

**I-CLM-O02: Patient service volume**
- **Definition:** Total patients served (per claims), per facility and overall
- **Data source:** PhilHealth claims data
- **Frequency:** Monthly
- **Interpretation:** Service delivery scale, population coverage progress

**I-CLM-O03: Claim submission consistency**
- **Definition:** Percentage of facilities with continuous monthly submissions (no gaps > 1 month)
- **Data source:** PhilHealth claims database
- **Frequency:** Quarterly
- **Interpretation:** Service delivery sustainability

**I-CLM-O04: Geographic service coverage**
- **Definition:** Percentage of regions/provinces with active claims submission
- **Data source:** PhilHealth claims database + facility location data
- **Frequency:** Quarterly
- **Interpretation:** Equity of service availability across areas

#### Payment Processing Monitoring (14 indicators)

**Leading Indicators:**

**I-PAY-L01: Adjudication capacity enhancement**
- **Definition:** Number of additional adjudication staff hired or system automation deployed
- **Data source:** PhilHealth HR and IT records
- **Frequency:** Quarterly
- **Interpretation:** Processing capacity increase

**I-PAY-L02: Policy/criteria revision**
- **Definition:** Date of medical necessity criteria or payment policy changes effective
- **Data source:** PhilHealth policy documentation
- **Frequency:** One-time per policy change
- **Interpretation:** Payment barrier reduction initiated

**I-PAY-L03: System upgrade deployment**
- **Definition:** Payment system reliability improvements or portal enhancements go-live
- **Data source:** PhilHealth IT deployment records
- **Frequency:** One-time per upgrade
- **Interpretation:** Technical infrastructure improvement

**I-PAY-L04: Provider communication enhancement**
- **Definition:** New provider portal launch, communication protocol implementation
- **Data source:** PhilHealth communications records
- **Frequency:** One-time (launch), quarterly review
- **Interpretation:** Transparency and engagement improvement

**Process Indicators:**

**I-PAY-P01: Claims adjudication time**
- **Definition:** Median days from claim submission to adjudication decision
- **Data source:** PhilHealth claims database
- **Frequency:** Weekly
- **Interpretation:** Administrative efficiency, capacity adequacy

**I-PAY-P02: Payment processing time**
- **Definition:** Median days from claim approval to payment disbursement
- **Data source:** PhilHealth finance system
- **Frequency:** Weekly
- **Interpretation:** Payment system efficiency

**I-PAY-P03: Claims approval rate**
- **Definition:** Percentage of submitted claims approved (vs. denied)
- **Data source:** PhilHealth claims database
- **Frequency:** Monthly
- **Interpretation:** Clinical criteria appropriateness, documentation quality

**I-PAY-P04: Denial reasons distribution**
- **Definition:** Percentage of denials by reason category (documentation, medical necessity, technical, other)
- **Data source:** PhilHealth claims database
- **Frequency:** Monthly
- **Interpretation:** Identifies specific barriers for targeted intervention

**I-PAY-P05: Appeals and overturns**
- **Definition:** Appeal rate (% of denials appealed), overturn rate (% of appeals approved)
- **Data source:** PhilHealth appeals database
- **Frequency:** Quarterly
- **Interpretation:** Initial decision quality, criteria stringency

**I-PAY-P06: Payment system error rate**
- **Definition:** Percentage of payments with technical errors (incorrect amount, routing errors)
- **Data source:** PhilHealth IT error logs + reconciliation reports
- **Frequency:** Monthly
- **Interpretation:** System reliability

**Outcome Indicators:**

**I-PAY-O01: Payment receipt rate**
- **Definition:** Percentage of facilities filing claims that receive at least one payment
- **Data source:** PhilHealth payment database
- **Frequency:** Monthly
- **Interpretation:** PRIMARY outcome - cascade completion

**I-PAY-O02: Payment consistency**
- **Definition:** Percentage of facilities with continuous monthly payments (among active claimants)
- **Data source:** PhilHealth payment database
- **Frequency:** Quarterly
- **Interpretation:** Sustained service delivery

**I-PAY-O03: Average reimbursement per facility**
- **Definition:** Mean monthly reimbursement amount per facility
- **Data source:** PhilHealth finance system
- **Frequency:** Monthly
- **Interpretation:** Service volume proxy, financial viability indicator

**I-PAY-O04: Provider satisfaction with payment process**
- **Definition:** Satisfaction scores from facility surveys on payment timeliness, communication, predictability
- **Data source:** Provider satisfaction surveys
- **Frequency:** Semi-annually
- **Interpretation:** Perceived effectiveness of payment improvements, continued participation likelihood

---

## 3. Data Model Architecture

### 3.1 Existing Data Structures (Preserved)

```typescript
// From scenarios.ts - NO CHANGES
type Stage = {
  key: string;
  label: string;
  short: string;
  count: number;
  description: string;
};

type Scenario = {
  id: string;
  name: string;
  available: boolean;
  stages?: Stage[];
};

// Existing calculation functions - NO CHANGES
function conversions(stages: Stage[]): Conversion[];
function largestDropoff(stages: Stage[]): Conversion;
function absoluteGaps(stages: Stage[]): AbsoluteGap[];
function largestAbsoluteGap(stages: Stage[]): AbsoluteGap;
function getDiagnosticInsights(stages: Stage[]): DiagnosticInsights;
```

### 3.2 New Data Structures (Non-Breaking Additions)

```typescript
// decision-knowledge.ts

/**
 * Barrier categories across health financing implementation cascade
 */
type BarrierCategory =
  | "policy_regulatory"
  | "capacity_financial"
  | "capacity_technical"
  | "capacity_human_resources"
  | "information_awareness"
  | "administrative_process";

/**
 * Likelihood assessment based on implementation science literature
 */
type Likelihood = "high" | "medium" | "low";

/**
 * Cascade stage keys matching existing Stage.key
 */
type CascadeStage = "accredited" | "claims" | "paid";

/**
 * Institutional actors in health financing system
 */
type Actor =
  | "PhilHealth"
  | "DOH"
  | "LGU"
  | "Facility"
  | "Multi-stakeholder"
  | "External"; // Development partners, private sector

/**
 * Implementation timeframe categories
 */
type Timeframe =
  | "immediate"        // < 1 month
  | "short"            // 1-3 months
  | "medium"           // 3-6 months
  | "long"             // 6-12 months
  | "very_long";       // 12+ months

/**
 * Indicator types for monitoring framework
 */
type IndicatorType = "leading" | "process" | "outcome";

/**
 * Hypothesis - plausible explanation for implementation barrier
 */
interface Hypothesis {
  id: string;                    // e.g., "H-ACC-01"
  stage: CascadeStage;           // Which cascade stage
  category: BarrierCategory;     // Type of barrier
  name: string;                  // Short name (for UI)
  statement: string;             // Plain language explanation (2-3 sentences)
  verificationData: string[];    // Data needed to confirm/refute
  likelihood: Likelihood;        // Based on literature
  literatureNotes?: string;      // Optional: Supporting evidence citations
}

/**
 * Response option - potential intervention to address barriers
 */
interface ResponseOption {
  id: string;                         // e.g., "R-ACC-01"
  stage: CascadeStage;                // Which stage it addresses
  addressesBarriers: BarrierCategory[]; // Which barrier types
  addressesHypotheses: string[];      // Specific hypothesis IDs
  name: string;                       // Short name
  description: string;                // 2-3 sentence description
  actor: Actor;                       // Primary responsible actor
  secondaryActors?: Actor[];          // Supporting actors
  prerequisites: string[];            // What must be in place
  tradeoffs: string[];                // Downsides or risks
  timeframe: Timeframe;               // Implementation timeline
  evidenceLimitations: string[];      // Assumptions and unknowns
  relatedResponses?: string[];        // Complementary response IDs
}

/**
 * Monitoring indicator - metric for tracking implementation
 */
interface Indicator {
  id: string;                    // e.g., "I-ACC-P01"
  stage: CascadeStage;           // Which stage
  type: IndicatorType;           // Leading, process, or outcome
  name: string;                  // Short name
  definition: string;            // Precise metric definition
  dataSource: string;            // Where data come from
  frequency: string;             // How often to measure
  interpretation: string;        // What it tells you
  relatedResponses: string[];    // Which responses it monitors
}

/**
 * Decision support context - what system knows about current situation
 */
interface DecisionContext {
  scenario: Scenario;            // Current scenario
  primaryGap: {
    stage: CascadeStage;
    proportionalRate: number;
    absoluteCount: number;
    isAligned: boolean;          // Proportional and absolute same stage
  };
  secondaryGaps?: {              // If proportional ≠ absolute
    stage: CascadeStage;
    measure: "proportional" | "absolute";
    value: number;
  }[];
}

/**
 * Generated decision support output
 */
interface DecisionSupport {
  context: DecisionContext;
  hypotheses: Hypothesis[];           // Relevant to primary gap
  topHypotheses: Hypothesis[];        // Top 2-3 for executive view
  responseOptions: ResponseOption[];  // All relevant options
  topResponses: ResponseOption[];     // Top 2-3 for executive view
  indicators: {
    leading: Indicator[];
    process: Indicator[];
    outcome: Indicator[];
  };
  disclaimers: string[];              // Context-specific warnings
}
```

### 3.3 Knowledge Base Structure

```typescript
// decision-knowledge.ts

/**
 * Complete knowledge base of hypotheses, responses, and indicators
 * Loaded at application startup, immutable at runtime
 */
export const DECISION_KNOWLEDGE = {
  hypotheses: {
    accredited: Hypothesis[];  // 12 hypotheses for accreditation
    claims: Hypothesis[];      // 10 hypotheses for claims
    paid: Hypothesis[];        // 8 hypotheses for payment
  },
  responses: {
    accredited: ResponseOption[];  // 10 responses for accreditation
    claims: ResponseOption[];      // 10 responses for claims
    paid: ResponseOption[];        // 8 responses for payment
  },
  indicators: {
    accredited: Indicator[];   // 14 indicators for accreditation
    claims: Indicator[];       // 14 indicators for claims
    paid: Indicator[];         // 14 indicators for payment
  },
} as const;

/**
 * Total knowledge base size:
 * - 30 hypotheses
 * - 28 response options
 * - 42 indicators
 * = ~15-20KB JSON (uncompressed)
 */
```

### 3.4 Decision Logic Functions

```typescript
// decision-support.ts

/**
 * Generate decision support for current scenario
 */
export function getDecisionSupport(scenario: Scenario): DecisionSupport {
  if (!scenario.stages) {
    throw new Error("Scenario has no stage data");
  }

  const context = buildDecisionContext(scenario);
  const hypotheses = getRelevantHypotheses(context);
  const topHypotheses = selectTopHypotheses(hypotheses, 3);
  const responseOptions = getResponseOptions(hypotheses);
  const topResponses = selectTopResponses(responseOptions, 3);
  const indicators = getMonitoringIndicators(responseOptions);
  const disclaimers = generateDisclaimers(context);

  return {
    context,
    hypotheses,
    topHypotheses,
    responseOptions,
    topResponses,
    indicators,
    disclaimers,
  };
}

/**
 * Build decision context from scenario
 */
function buildDecisionContext(scenario: Scenario): DecisionContext {
  const stages = scenario.stages!;
  const proportionalGap = largestDropoff(stages);
  const absoluteGap = largestAbsoluteGap(stages);
  
  return {
    scenario,
    primaryGap: {
      stage: proportionalGap.key as CascadeStage,
      proportionalRate: proportionalGap.rate,
      absoluteCount: absoluteGap.gap,
      isAligned: proportionalGap.key === absoluteGap.key,
    },
    secondaryGaps: proportionalGap.key !== absoluteGap.key
      ? [{
          stage: absoluteGap.key as CascadeStage,
          measure: "absolute",
          value: absoluteGap.gap,
        }]
      : undefined,
  };
}

/**
 * Get hypotheses relevant to identified gap
 */
function getRelevantHypotheses(context: DecisionContext): Hypothesis[] {
  const { primaryGap } = context;
  return DECISION_KNOWLEDGE.hypotheses[primaryGap.stage];
}

/**
 * Select top hypotheses for executive view
 * Prioritize by likelihood, then by barrier category diversity
 */
function selectTopHypotheses(
  hypotheses: Hypothesis[],
  count: number
): Hypothesis[] {
  const likelihoodOrder = { high: 0, medium: 1, low: 2 };
  
  return hypotheses
    .sort((a, b) => {
      // Primary: Likelihood
      const likelihoodDiff = likelihoodOrder[a.likelihood] - likelihoodOrder[b.likelihood];
      if (likelihoodDiff !== 0) return likelihoodDiff;
      
      // Secondary: Category diversity (prefer different categories)
      return 0; // Maintain order if same likelihood
    })
    .slice(0, count);
}

/**
 * Get response options addressing relevant hypotheses
 */
function getResponseOptions(hypotheses: Hypothesis[]): ResponseOption[] {
  const stage = hypotheses[0]?.stage;
  if (!stage) return [];
  
  const allResponses = DECISION_KNOWLEDGE.responses[stage];
  const hypothesisIds = new Set(hypotheses.map(h => h.id));
  
  // Filter to responses addressing at least one relevant hypothesis
  return allResponses.filter(response =>
    response.addressesHypotheses.some(hid => hypothesisIds.has(hid))
  );
}

/**
 * Select top responses for executive view
 * Prioritize by: number of hypotheses addressed, timeframe, actor diversity
 */
function selectTopResponses(
  responses: ResponseOption[],
  count: number
): ResponseOption[] {
  return responses
    .map(response => ({
      response,
      score: calculateResponseScore(response),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, count)
    .map(item => item.response);
}

function calculateResponseScore(response: ResponseOption): number {
  let score = 0;
  
  // More hypotheses addressed = higher score
  score += response.addressesHypotheses.length * 10;
  
  // Shorter timeframe = higher score
  const timeframeScore = {
    immediate: 5,
    short: 4,
    medium: 3,
    long: 2,
    very_long: 1,
  };
  score += timeframeScore[response.timeframe];
  
  // Multi-stakeholder = slight bonus (indicates coordination opportunity)
  if (response.actor === "Multi-stakeholder") score += 2;
  
  return score;
}

/**
 * Get monitoring indicators for selected responses
 */
function getMonitoringIndicators(
  responses: ResponseOption[]
): { leading: Indicator[]; process: Indicator[]; outcome: Indicator[] } {
  const stage = responses[0]?.stage;
  if (!stage) {
    return { leading: [], process: [], outcome: [] };
  }
  
  const allIndicators = DECISION_KNOWLEDGE.indicators[stage];
  const responseIds = new Set(responses.map(r => r.id));
  
  // Filter to indicators relevant to selected responses
  const relevantIndicators = allIndicators.filter(indicator =>
    indicator.relatedResponses.some(rid => responseIds.has(rid))
  );
  
  return {
    leading: relevantIndicators.filter(i => i.type === "leading"),
    process: relevantIndicators.filter(i => i.type === "process"),
    outcome: relevantIndicators.filter(i => i.type === "outcome"),
  };
}

/**
 * Generate context-specific disclaimers
 */
function generateDisclaimers(context: DecisionContext): string[] {
  const disclaimers = [
    "These hypotheses are plausible explanations requiring investigation, not verified causes.",
    "Response options require institutional review, stakeholder consultation, and approval before implementation.",
    "This analysis is based on synthetic scenarios for demonstration purposes only. Real-world decisions require validated data.",
  ];
  
  // Add context-specific disclaimers
  if (!context.primaryGap.isAligned) {
    disclaimers.push(
      "The proportional bottleneck and largest absolute gap occur at different stages. Consider which measure better reflects your policy priorities."
    );
  }
  
  if (context.primaryGap.proportionalRate < 10) {
    disclaimers.push(
      "The identified gap shows a very low conversion rate, suggesting systemic barriers that may require comprehensive policy reform rather than incremental adjustments."
    );
  }
  
  return disclaimers;
}
```

### 3.5 Data Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│ EXISTING DATA LAYER (scenarios.ts)                          │
│                                                              │
│  ┌──────────┐                                              │
│  │ Scenario │──has──> Stage[] (count, label, key)         │
│  └──────────┘                                              │
│       │                                                     │
│       └──calculates──> Conversion[] (proportional gaps)    │
│       └──calculates──> AbsoluteGap[] (facility count gaps) │
│       └──generates──> DiagnosticInsights (existing)        │
└─────────────────────────────────────────────────────────────┘
                            ↓ provides context
┌─────────────────────────────────────────────────────────────┐
│ NEW DECISION LAYER (decision-support.ts)                    │
│                                                              │
│  DecisionContext                                            │
│       │                                                     │
│       ├──queries──> DECISION_KNOWLEDGE                     │
│       │                  ├──> Hypothesis[]                 │
│       │                  ├──> ResponseOption[]             │
│       │                  └──> Indicator[]                  │
│       │                                                     │
│       └──generates──> DecisionSupport                      │
│                         ├──> Top hypotheses (3)            │
│                         ├──> Top responses (3)             │
│                         ├──> Monitoring indicators          │
│                         └──> Disclaimers                    │
└─────────────────────────────────────────────────────────────┘
                            ↓ consumed by
┌─────────────────────────────────────────────────────────────┐
│ UI LAYER (index.tsx, explore.tsx)                          │
│                                                              │
│  Executive View: Display top 2-3 items (collapsed)         │
│  Explore View: Full catalog (tabbed, filterable)            │
└─────────────────────────────────────────────────────────────┘
```

**Key design decisions:**

1. **Non-breaking:** All new types and functions added, no existing code modified
2. **Separation of concerns:** Decision knowledge separate from cascade calculations
3. **Static knowledge base:** No runtime modification, version-controlled
4. **Rule-based logic:** All selection/filtering deterministic and testable
5. **Future-ready:** Actor, timeframe, barrier categories support future filtering/customization

---


## 4. Example Decision Outputs

### 4.1 Scenario: Moderate Activity (Mixed Bottlenecks)

**Current Cascade:**
- Eligible: 1,500 facilities
- Accredited: 216 facilities (14.4%)
- Filing claims: 84 facilities (38.9% of accredited)
- Receiving payment: 69 facilities (82.1% of filing)

**Primary Gap:** Accreditation (proportional 14.4%, absolute 1,284 facilities)

#### Executive Intelligence View Output

```
┌────────────────────────────────────────────────────────────┐
│ DECISION SUPPORT (collapsed by default)                   │
│ ▼ What might explain this gap?                            │
└────────────────────────────────────────────────────────────┘

[Expanded view:]

┌────────────────────────────────────────────────────────────┐
│ What might explain this gap?                               │
│                                                             │
│ These are plausible explanations requiring investigation:  │
│                                                             │
│ 1. Documentation requirements exceed facility capacity     │
│    [HIGH LIKELIHOOD]                                       │
│    Accreditation documentation may exceed administrative   │
│    capacity of smaller facilities, particularly rural      │
│    facilities without dedicated staff.                     │
│                                                             │
│    Data needed to verify:                                  │
│    • Application completion rates by facility type         │
│    • Rejection reasons (documentation-related)             │
│    • Facility administrative staffing levels               │
│                                                             │
│ 2. Accreditation costs prohibitive [MEDIUM-HIGH]           │
│    Direct costs (fees) or indirect costs (staff time,      │
│    modifications) may be prohibitive for small or public   │
│    facilities with limited budgets.                        │
│                                                             │
│    Data needed to verify:                                  │
│    • Fee schedule and actual costs incurred                │
│    • Facility financial statements                         │
│    • Survey: Reasons for non-application                   │
│                                                             │
│ 3. Mental health workforce shortage [HIGH]                 │
│    Shortage of mental health professionals may prevent     │
│    facilities from meeting accreditation requirements.     │
│                                                             │
│    Data needed to verify:                                  │
│    • Mental health workforce distribution                  │
│    • Accreditation staffing requirements                   │
│    • Provider-to-population ratios                         │
│                                                             │
│ ⚠️ Disclaimer: These hypotheses require investigation      │
│    and verification before policy action.                  │
│                                                             │
│ See all 12 hypotheses in Explore Evidence →               │
└────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────┐
│ ▼ What response options exist?                            │
└────────────────────────────────────────────────────────────┘

[Expanded view:]

┌────────────────────────────────────────────────────────────┐
│ What response options exist?                               │
│                                                             │
│ Consider these options (institutional review required):    │
│                                                             │
│ 1. Provide technical assistance for accreditation          │
│    WHO: DOH + PhilHealth | WHEN: 1-3 months to launch     │
│                                                             │
│    Establish TA program: Application support,              │
│    documentation help, readiness assessments, peer         │
│    mentoring.                                               │
│                                                             │
│    Prerequisites:                                           │
│    • Budget allocation                                     │
│    • TA provider identification                            │
│    • TA curriculum development                             │
│                                                             │
│    Trade-offs:                                              │
│    • Resource-intensive (staff time, travel)               │
│    • May favor facilities near TA providers                │
│    • Scalability limits                                    │
│                                                             │
│ 2. Simplify documentation requirements                     │
│    WHO: PhilHealth (Policy) | WHEN: 3-6 months            │
│                                                             │
│    Reduce forms, eliminate redundancy, allow electronic    │
│    submission, provide templates.                          │
│                                                             │
│    Prerequisites:                                           │
│    • Clinical safety review                                │
│    • Legal authority confirmation                          │
│    • Stakeholder consultation                              │
│                                                             │
│    Trade-offs:                                              │
│    • May reduce quality assurance                          │
│    • Requires enhanced monitoring                          │
│                                                             │
│ 3. Training program for mental health service provision    │
│    WHO: DOH (HR Development) | WHEN: 3-6 months to start  │
│                                                             │
│    mhGAP or similar training for primary care providers,   │
│    task-shifting protocols.                                │
│                                                             │
│    Prerequisites:                                           │
│    • Training curriculum development                       │
│    • Trainer identification                                │
│    • Budget                                                 │
│                                                             │
│    Trade-offs:                                              │
│    • Training ≠ service provision (other barriers)         │
│    • Ongoing needs (turnover, updates)                     │
│                                                             │
│ ⚠️ Disclaimer: These options require institutional         │
│    review, stakeholder consultation, and approval.         │
│                                                             │
│ See all 10 response options in Explore Evidence →         │
└────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────┐
│ ▼ How would we monitor progress?                          │
└────────────────────────────────────────────────────────────┘

[Expanded view:]

┌────────────────────────────────────────────────────────────┐
│ How would we monitor progress?                             │
│                                                             │
│ Sample indicators (select responses to see full plan):     │
│                                                             │
│ LEADING INDICATORS (early signals)                         │
│ • TA program launch date and coverage                      │
│ • Policy approval for documentation simplification         │
│ • Training program participation rates                     │
│                                                             │
│ PROCESS INDICATORS (implementation progress)               │
│ • Accreditation application rate (monthly)                 │
│ • Application processing time (median days)                │
│ • TA utilization rate (% of eligible facilities)           │
│                                                             │
│ OUTCOME INDICATORS (impact)                                │
│ • Accreditation rate (% of eligible facilities)            │
│ • Accreditation rate by facility type (equity)             │
│ • Time to accreditation (facility decision to approval)    │
│                                                             │
│ See full monitoring framework in Explore Evidence →        │
└────────────────────────────────────────────────────────────┘
```

#### Explore Evidence View Output

**New Section 6: Decision Support** (after existing "Insights" section)

**Tab 1: Hypotheses**

```
┌────────────────────────────────────────────────────────────┐
│ HYPOTHESES FOR ACCREDITATION GAP                           │
│                                                             │
│ Filter: [All Categories ▼] [All Likelihoods ▼] [Reset]    │
│ Show: 12 hypotheses                                        │
└────────────────────────────────────────────────────────────┘

[Grouped by barrier category:]

POLICY/REGULATORY (3 hypotheses)

┌────────────────────────────────────────────────────────────┐
│ H-ACC-01: Documentation requirements exceed capacity       │
│ Likelihood: HIGH                                           │
│                                                             │
│ [Expanded details]                                         │
│ Accreditation documentation requirements may exceed the    │
│ administrative capacity of smaller facilities,             │
│ particularly those in rural areas without dedicated        │
│ administrative staff.                                      │
│                                                             │
│ Verification data needed:                                  │
│ ✓ Accreditation application completion rates by type       │
│ ✓ Application rejection reasons (documentation-related)    │
│ ✓ Facility administrative staffing levels                  │
│ ✓ Time-to-complete application surveys                     │
│                                                             │
│ Literature support: PhilHealth 2024 mental health          │
│ implementation study notes administrative capacity         │
│ challenges.                                                 │
└────────────────────────────────────────────────────────────┘

[Similar cards for H-ACC-02, H-ACC-03...]

CAPACITY: FINANCIAL (2 hypotheses)

┌────────────────────────────────────────────────────────────┐
│ H-ACC-04: Accreditation costs prohibitive                  │
│ Likelihood: MEDIUM-HIGH                                    │
│                                                             │
│ [Details as above...]                                      │
└────────────────────────────────────────────────────────────┘

[Continue for all 6 barrier categories, 12 total hypotheses]
```

**Tab 2: Response Options**

```
┌────────────────────────────────────────────────────────────┐
│ RESPONSE OPTIONS FOR ACCREDITATION GAP                     │
│                                                             │
│ Filter: [All Actors ▼] [All Timeframes ▼] [All Barriers ▼]│
│ Compare: [ ] R-ACC-04  [ ] R-ACC-01  [ ] R-ACC-06          │
│ Show: 10 response options                                  │
└────────────────────────────────────────────────────────────┘

[List view:]

┌────────────────────────────────────────────────────────────┐
│ R-ACC-04: Provide technical assistance                     │
│ Actor: DOH + PhilHealth | Timeframe: 1-3 months           │
│ Addresses: Documentation capacity, HIS gaps, Process       │
│            clarity                                          │
│                                                             │
│ [View Details] [Add to Compare] [See Related Indicators]   │
└────────────────────────────────────────────────────────────┘

[Expanded details view:]

┌────────────────────────────────────────────────────────────┐
│ R-ACC-04: Provide technical assistance for accreditation   │
│                                                             │
│ PRIMARY ACTOR: DOH + PhilHealth (collaborative)            │
│ SECONDARY ACTORS: Facility associations, academic          │
│                    institutions                            │
│ TIMEFRAME: 1-3 months to launch, ongoing implementation    │
│                                                             │
│ DESCRIPTION                                                 │
│ Establish TA program with application support,             │
│ documentation help, readiness assessments, and peer        │
│ mentoring for facilities pursuing accreditation.           │
│                                                             │
│ ADDRESSES THESE HYPOTHESES                                 │
│ • H-ACC-01: Documentation requirements exceed capacity     │
│ • H-ACC-06: Health information systems inadequate          │
│ • H-ACC-11: Accreditation process unclear                  │
│                                                             │
│ ADDRESSES THESE BARRIER TYPES                              │
│ • Capacity: Technical                                      │
│ • Information/Awareness                                    │
│ • Administrative/Process                                   │
│                                                             │
│ PREREQUISITES                                               │
│ ✓ Budget allocation (TA provider contracts or staff)       │
│ ✓ TA provider identification (consultants, associations)   │
│ ✓ TA curriculum development                                │
│                                                             │
│ TRADE-OFFS AND LIMITATIONS                                 │
│ ⚠️ Resource-intensive (staff time, travel, materials)      │
│ ⚠️ May favor facilities near TA providers (equity issue)   │
│ ⚠️ Scalability limits (cannot reach all 1,500 facilities)  │
│                                                             │
│ EVIDENCE LIMITATIONS                                       │
│ • Unknown TA effectiveness (need pilot evaluation)         │
│ • Facility willingness to engage uncertain                 │
│ • Assumes capacity barriers are primary (requires verify)  │
│                                                             │
│ RELATED RESPONSES                                          │
│ • R-ACC-01: Simplify documentation (complementary)         │
│ • R-ACC-07: Public awareness campaign (supports TA uptake) │
│                                                             │
│ [View Monitoring Indicators for This Response]             │
└────────────────────────────────────────────────────────────┘

[Similar detailed views for all 10 responses]

[Comparison view when 2-3 responses selected:]

┌──────────────────────────────────────────────────────────────────────────────────────┐
│ COMPARE RESPONSES                                                                     │
│                                                                                       │
│                    R-ACC-04: TA         R-ACC-01: Simplify    R-ACC-03: Subsidize    │
│                                         Documentation         Fees                   │
│ ───────────────────────────────────────────────────────────────────────────────────  │
│ Actor              DOH + PhilHealth     PhilHealth (Policy)   PhilHealth (Finance)   │
│ Timeframe          1-3 months           3-6 months            Immediate              │
│ Hypotheses         3                    1                     1                      │
│ Addressed                                                                             │
│ Prerequisites      3                    3                     3                      │
│ Trade-offs         3                    2                     3                      │
│ Evidence           2                    2                     2                      │
│ Limitations                                                                           │
│                                                                                       │
│ [View Side-by-Side Details] [Export Comparison] [Add Another Response]               │
└──────────────────────────────────────────────────────────────────────────────────────┘
```

**Tab 3: Monitoring Framework**

```
┌────────────────────────────────────────────────────────────┐
│ MONITORING INDICATORS FOR ACCREDITATION RESPONSES           │
│                                                             │
│ Filter by response: [All Responses ▼] [All Types ▼]       │
│ Show: 14 indicators                                        │
└────────────────────────────────────────────────────────────┘

LEADING INDICATORS (4)

┌────────────────────────────────────────────────────────────┐
│ I-ACC-L02: Technical assistance program launch             │
│ Type: Leading | Related responses: R-ACC-04                │
│                                                             │
│ DEFINITION                                                  │
│ Number of TA providers engaged, geographic coverage,       │
│ launch date                                                 │
│                                                             │
│ DATA SOURCE                                                 │
│ DOH/PhilHealth TA program records                          │
│                                                             │
│ FREQUENCY                                                   │
│ One-time (launch), then quarterly monitoring               │
│                                                             │
│ INTERPRETATION                                              │
│ Confirms TA response operational. Early signal that        │
│ capacity-building support is available to facilities.      │
│                                                             │
│ WHEN TO REVIEW                                              │
│ Week 1: Confirm launch                                     │
│ Month 3: Assess coverage and utilization                   │
│ Quarterly: Track participation trends                      │
└────────────────────────────────────────────────────────────┘

[Similar detailed cards for all 14 indicators]

PROCESS INDICATORS (6)

[Indicators with monthly/quarterly frequency, facility-level data]

OUTCOME INDICATORS (4)

[Primary cascade metrics with quarterly frequency]

[Export options:]

┌────────────────────────────────────────────────────────────┐
│ EXPORT MONITORING PLAN                                     │
│                                                             │
│ Select responses to monitor:                               │
│ ☑ R-ACC-04: Technical assistance                           │
│ ☑ R-ACC-01: Simplify documentation                         │
│ ☐ R-ACC-03: Subsidize fees                                │
│                                                             │
│ Select indicator types:                                    │
│ ☑ Leading  ☑ Process  ☑ Outcome                           │
│                                                             │
│ Export format: [Excel ▼] [CSV] [PDF]                      │
│ [Generate Monitoring Plan Template]                        │
└────────────────────────────────────────────────────────────┘
```

### 4.2 Scenario: High Activity (Mixed Bottlenecks)

**Current Cascade:**
- Eligible: 1,500 facilities
- Accredited: 514 facilities (34.3%)
- Filing claims: 358 facilities (69.6% of accredited)
- Receiving payment: 292 facilities (81.6% of filing)

**Primary Gap:** Still Accreditation, but with different implications

#### Decision Support Differences

**Hypothesis prioritization changes:**
- H-ACC-04 (costs) moves down (moderate activity suggests costs not prohibitive)
- H-ACC-10 (awareness) moves down (higher rate suggests awareness exists)
- H-ACC-02 (clinical standards) becomes more prominent (may explain plateau)

**Response prioritization changes:**
- R-ACC-04 (TA) less urgent (34% already succeeding)
- R-ACC-02 (tiered standards) more relevant (to reach next 20-30%)
- R-ACC-06 (training) more important (workforce may be constraint at scale)

**Monitoring emphasis:**
- Focus shifts from launch indicators to sustainment and quality
- Equity indicators more important (which facilities in 34% vs. 66%?)
- Outcome indicators on service delivery volume gain importance

### 4.3 Scenario: Low Activity (Mixed Bottlenecks)

**Current Cascade:**
- Eligible: 1,500 facilities
- Accredited: 69 facilities (4.6%) — CRISIS LEVEL
- Filing claims: 42 facilities (60.9% of accredited)
- Receiving payment: 31 facilities (73.8% of filing)

**Primary Gap:** Accreditation, but systemic failure indicated

#### Decision Support Differences

**Hypothesis prioritization:**
- Multiple high-likelihood hypotheses (system breakdown)
- H-ACC-03 (eligibility exclusions) becomes more prominent
- H-ACC-02 (clinical standards) very high priority (4.6% suggests misalignment)

**Response prioritization:**
- R-ACC-02 (tiered standards) critical priority
- R-ACC-09 (modify eligibility) moves to top consideration
- Single-response solutions unlikely (need comprehensive reform)

**Special disclaimers added:**
```
⚠️ CRITICAL: Conversion rate of 4.6% suggests systemic policy
or design barriers. Incremental operational improvements unlikely
to achieve substantial progress. Comprehensive policy review and
stakeholder consultation recommended before selecting responses.
```

**Monitoring approach:**
- Diagnostic monitoring essential (understand why so low)
- Leading indicators: Policy review initiation, stakeholder engagement
- Outcome targets: Aim for 15-20% in 12 months (not 50%)

---


## 5. Interface Structure

### 5.1 Component Architecture

```
src/
├── components/
│   └── finvanta/
│       ├── Shell.tsx                    [Existing - no changes]
│       ├── Cascade.tsx                  [Existing - no changes]
│       └── decision/                    [NEW]
│           ├── DecisionSummary.tsx      - Executive view collapsed cards
│           ├── HypothesisCard.tsx       - Single hypothesis display
│           ├── HypothesisList.tsx       - Full catalog with filters
│           ├── ResponseCard.tsx         - Single response display
│           ├── ResponseList.tsx         - Full catalog with filters
│           ├── ResponseComparison.tsx   - Side-by-side comparison
│           ├── IndicatorCard.tsx        - Single indicator display
│           ├── IndicatorList.tsx        - Monitoring framework
│           └── DisclaimerBanner.tsx     - Decision-specific warnings
├── data/
│   ├── scenarios.ts                     [Existing - no changes]
│   ├── decision-knowledge.ts            [NEW] - Hypothesis/Response/Indicator data
│   └── decision-support.ts              [NEW] - Decision logic functions
└── routes/
    ├── index.tsx                        [Modified] - Add DecisionSummary
    └── explore.tsx                      [Modified] - Add Decision Support section
```

### 5.2 Executive Intelligence View Modifications

**File:** `src/routes/index.tsx`

**Changes:**

1. Import decision support
```typescript
import { getDecisionSupport } from "@/data/decision-support";
import { DecisionSummary } from "@/components/finvanta/decision/DecisionSummary";
```

2. Generate decision support in component
```typescript
function Content({ stages, name }: { stages: Stage[]; name: string }) {
  const scenario = { name, stages, available: true, id: "current" };
  const decisionSupport = getDecisionSupport(scenario);
  
  // ... existing code ...
}
```

3. Add DecisionSummary after existing investigation card (around line 85)
```tsx
<section className="mt-8 space-y-6">
  <DecisionSummary 
    decisionSupport={decisionSupport}
    mode="executive"  // Collapsed by default, top 2-3 items only
  />
</section>
```

**Visual placement:**

```
[Existing Layout]
  Headline: "Only 69 of 1,500..."
  Cascade (left) + Finding/Investigation cards (right)
  Stage conversion metrics

[NEW SECTION - AFTER stage metrics]
  Decision Support (3 collapsed cards)
    ▼ What might explain this gap?
    ▼ What response options exist?
    ▼ How would we monitor progress?
```

### 5.3 Explore Evidence View Modifications

**File:** `src/routes/explore.tsx`

**Changes:**

1. Add new section to `SECTIONS` array
```typescript
const SECTIONS = [
  { id: "overview", label: "Overview", lede: "..." },
  { id: "cascade", label: "Facility cascade", lede: "..." },
  { id: "claims", label: "Claims processing", lede: "..." },
  { id: "regional", label: "Regional analysis", lede: "..." },
  { id: "insights", label: "Diagnostic insights", lede: "..." },
  { id: "decision", label: "Decision support", lede: "Hypotheses, responses, and monitoring framework for this gap." }, // NEW
] as const;
```

2. Import decision components
```typescript
import { getDecisionSupport } from "@/data/decision-support";
import { HypothesisList } from "@/components/finvanta/decision/HypothesisList";
import { ResponseList } from "@/components/finvanta/decision/ResponseList";
import { IndicatorList } from "@/components/finvanta/decision/IndicatorList";
```

3. Add Decision section rendering (after Insights)
```tsx
{section === "decision" && <DecisionSupport stages={scenario.stages} />}
```

4. New `DecisionSupport` component (in same file or separate)
```tsx
function DecisionSupport({ stages }: { stages: Stage[] }) {
  const scenario = { stages, available: true, id: "current", name: "Current" };
  const decisionSupport = getDecisionSupport(scenario);
  const [activeTab, setActiveTab] = useState<"hypotheses" | "responses" | "indicators">("hypotheses");

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-950">
        <p className="text-sm text-blue-900 dark:text-blue-100">
          <strong>Decision support based on synthetic scenarios.</strong> These hypotheses and response options 
          are illustrative examples for demonstration purposes. Real-world decisions require validated data, 
          stakeholder consultation, and institutional approval.
        </p>
      </div>

      <nav className="flex gap-2 border-b">
        <button
          onClick={() => setActiveTab("hypotheses")}
          className={`px-4 py-2 text-sm transition-colors ${
            activeTab === "hypotheses"
              ? "border-b-2 border-accent font-medium text-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Hypotheses ({decisionSupport.hypotheses.length})
        </button>
        <button
          onClick={() => setActiveTab("responses")}
          className={`px-4 py-2 text-sm transition-colors ${
            activeTab === "responses"
              ? "border-b-2 border-accent font-medium text-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Response Options ({decisionSupport.responseOptions.length})
        </button>
        <button
          onClick={() => setActiveTab("indicators")}
          className={`px-4 py-2 text-sm transition-colors ${
            activeTab === "indicators"
              ? "border-b-2 border-accent font-medium text-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Monitoring ({Object.values(decisionSupport.indicators).flat().length})
        </button>
      </nav>

      <div className="mt-6">
        {activeTab === "hypotheses" && (
          <HypothesisList 
            hypotheses={decisionSupport.hypotheses}
            context={decisionSupport.context}
          />
        )}
        {activeTab === "responses" && (
          <ResponseList 
            responses={decisionSupport.responseOptions}
            hypotheses={decisionSupport.hypotheses}
            context={decisionSupport.context}
          />
        )}
        {activeTab === "indicators" && (
          <IndicatorList 
            indicators={decisionSupport.indicators}
            responses={decisionSupport.responseOptions}
            context={decisionSupport.context}
          />
        )}
      </div>
    </div>
  );
}
```

### 5.4 Component Specifications

#### DecisionSummary Component

**Props:**
```typescript
interface DecisionSummaryProps {
  decisionSupport: DecisionSupport;
  mode: "executive" | "explore";  // Executive = collapsed, explore = expanded
}
```

**Behavior:**
- Renders 3 collapsible cards (hypotheses, responses, monitoring)
- Executive mode: Shows top 2-3 items only, link to Explore
- Explore mode: Shows all items, expandable details
- State: Each card independently collapsible
- Links: "See full analysis in Explore Evidence" from Executive cards

#### HypothesisCard Component

**Props:**
```typescript
interface HypothesisCardProps {
  hypothesis: Hypothesis;
  expanded?: boolean;
  onToggle?: () => void;
}
```

**Display:**
- Title: Hypothesis name + likelihood badge
- Summary: Statement (plain language)
- Expanded: Verification data list, literature notes
- Visual: Likelihood color-coded (high=green, medium=yellow, low=gray)

#### ResponseCard Component

**Props:**
```typescript
interface ResponseCardProps {
  response: ResponseOption;
  expanded?: boolean;
  onToggle?: () => void;
  onCompare?: () => void;  // Add to comparison
}
```

**Display:**
- Title: Response name
- Meta: Actor + timeframe badges
- Summary: Description + addresses X hypotheses
- Expanded: Prerequisites, trade-offs, evidence limitations
- Actions: [View Details] [Add to Compare] [See Indicators]

#### ResponseComparison Component

**Props:**
```typescript
interface ResponseComparisonProps {
  responses: ResponseOption[];  // 2-3 responses
  onRemove: (id: string) => void;
  onExport: () => void;
}
```

**Display:**
- Side-by-side table: Actor, timeframe, hypotheses, prereqs, trade-offs
- Row-by-row comparison
- Export to PDF or Excel for decision memos

#### IndicatorList Component

**Props:**
```typescript
interface IndicatorListProps {
  indicators: { leading: Indicator[]; process: Indicator[]; outcome: Indicator[] };
  responses: ResponseOption[];
  context: DecisionContext;
}
```

**Display:**
- Grouped by type (leading, process, outcome)
- Each indicator card: Name, definition, data source, frequency, interpretation
- Filter by related response
- Export monitoring plan template

### 5.5 Visual Design Patterns

**Decision-specific styling:**
- Hypothesis cards: Left border color-coded by likelihood
- Response cards: Actor badge colors (PhilHealth=primary, DOH=secondary, Multi=accent)
- Indicator cards: Type badge icons (leading=🚦, process=⚙️, outcome=🎯)
- Disclaimers: Blue informational banner (consistent with existing)

**Progressive disclosure:**
- Default: Collapsed cards with 2-line summary
- Hover: Subtle highlight, "Click to expand" hint
- Expanded: Full details, smooth height transition
- Print-friendly: Expanded state exports cleanly

**Responsive behavior:**
- Desktop (>1024px): Side-by-side comparison, 3-column indicator grid
- Tablet (768-1024px): Stacked cards, 2-column indicators
- Mobile (<768px): Single column, simplified filters, bottom sheet for comparison

---

## 6. Implementation Roadmap

### Phase 3A: Knowledge Base Development
**Duration:** 8-12 hours  
**Dependencies:** None (can start immediately)

#### Tasks:

1. **Create decision-knowledge.ts structure (2 hours)**
   - Define TypeScript types (Hypothesis, ResponseOption, Indicator, etc.)
   - Create DECISION_KNOWLEDGE object structure
   - Add JSDoc documentation
   - Export types for use in decision-support.ts

2. **Populate accreditation knowledge (3 hours)**
   - 12 hypotheses with all fields (id, statement, verification data, likelihood, literature)
   - 10 response options with all fields (description, actor, prerequisites, trade-offs, timeframe)
   - 14 indicators with all fields (definition, data source, frequency, interpretation)
   - Internal review: Completeness, consistency, accuracy

3. **Populate claims knowledge (2 hours)**
   - 10 hypotheses
   - 10 response options
   - 14 indicators

4. **Populate payment knowledge (2 hours)**
   - 8 hypotheses
   - 8 response options
   - 14 indicators

5. **Quality assurance (1-2 hours)**
   - Cross-reference: Response → Hypothesis mappings correct
   - Indicator → Response mappings correct
   - Verification data lists actionable and specific
   - Trade-offs and prerequisites realistic
   - Disclaimers appropriate

**Deliverables:**
- `src/data/decision-knowledge.ts` (~800 lines)
- Knowledge base JSON export for future reference

**Acceptance Criteria:**
- ✅ 30 hypotheses across 3 stages
- ✅ 28 response options across 3 stages
- ✅ 42 indicators across 3 stages
- ✅ All fields populated (no TODOs or placeholders)
- ✅ TypeScript compiles without errors
- ✅ Literature references included where applicable

---

### Phase 3B: Decision Logic Implementation
**Duration:** 6-8 hours  
**Dependencies:** Phase 3A complete

#### Tasks:

1. **Create decision-support.ts (2 hours)**
   - Implement `buildDecisionContext()` — Extract gap information from scenario
   - Implement `getRelevantHypotheses()` — Filter by stage
   - Implement `selectTopHypotheses()` — Prioritize by likelihood
   - Implement `getResponseOptions()` — Filter by hypotheses addressed
   - Implement `selectTopResponses()` — Prioritize by score
   - Implement `getMonitoringIndicators()` — Filter by responses
   - Implement `generateDisclaimers()` — Context-specific warnings
   - Main function: `getDecisionSupport()` — Orchestrate all logic

2. **Unit tests for decision logic (2-3 hours)**
   - Test `buildDecisionContext()` with all 6 scenarios
   - Test hypothesis selection (top 3 includes high likelihood)
   - Test response filtering (only relevant to hypotheses)
   - Test indicator grouping (leading, process, outcome)
   - Test disclaimer generation (context-specific)
   - Test edge cases (no stages, empty knowledge base)

3. **Integration with existing code (1 hour)**
   - Import decision-support in index.tsx and explore.tsx
   - Call `getDecisionSupport()` with current scenario
   - Verify no breaking changes to existing functions
   - Verify TypeScript compilation

4. **Performance optimization (1 hour)**
   - Profile decision logic execution time (target: <10ms)
   - Memoize knowledge base queries if needed
   - Lazy load knowledge base if bundle size concern

**Deliverables:**
- `src/data/decision-support.ts` (~400 lines)
- `src/data/decision-support.test.ts` (~300 lines)
- Integration verified with existing codebase

**Acceptance Criteria:**
- ✅ `getDecisionSupport()` returns valid DecisionSupport object
- ✅ Top hypotheses include high likelihood items
- ✅ Response options relevant to hypotheses
- ✅ Indicators grouped correctly by type
- ✅ All 6 scenarios work correctly
- ✅ Test coverage >80%
- ✅ Execution time <10ms per scenario
- ✅ No breaking changes to existing code

---

### Phase 3C: UI Components Development
**Duration:** 10-14 hours  
**Dependencies:** Phase 3B complete

#### Tasks:

1. **Create base components (3 hours)**
   - `HypothesisCard.tsx` — Card with likelihood badge, expandable
   - `ResponseCard.tsx` — Card with actor/timeframe badges, expandable
   - `IndicatorCard.tsx` — Card with type badge, data source info
   - Shared styling: Border colors, badges, hover states

2. **Create list components (3 hours)**
   - `HypothesisList.tsx` — Filterable list, group by category
   - `ResponseList.tsx` — Filterable list, comparison mode
   - `IndicatorList.tsx` — Grouped by type, export functionality

3. **Create summary component for Executive view (2 hours)**
   - `DecisionSummary.tsx` — 3 collapsible cards
   - Show top 2-3 items per card
   - Link to Explore Evidence for full catalog
   - Mobile-responsive

4. **Create comparison component (2 hours)**
   - `ResponseComparison.tsx` — Side-by-side table
   - Add/remove responses to compare
   - Export to PDF/Excel

5. **Integrate into routes (2-3 hours)**
   - Modify `index.tsx` — Add DecisionSummary after stage metrics
   - Modify `explore.tsx` — Add Decision Support section (Tab 6)
   - Navigation: Add "Decision Support" to section list
   - State management: Tab selection, card expansion

6. **Responsive design and testing (2 hours)**
   - Test on desktop (1920x1080, 1366x768)
   - Test on tablet (iPad, 768px)
   - Test on mobile (iPhone, 375px)
   - Adjust layouts for each breakpoint

**Deliverables:**
- 8 new React components (~1200 lines total)
- Updated `index.tsx` and `explore.tsx`
- Responsive styling verified

**Acceptance Criteria:**
- ✅ All components render without errors
- ✅ Executive view shows collapsed cards with top items
- ✅ Explore view shows full catalogs with filters
- ✅ Comparison mode works (add/remove responses)
- ✅ Mobile responsive (no horizontal scroll, readable text)
- ✅ Existing UI unchanged (no visual regressions)
- ✅ Disclaimers visible and prominent
- ✅ Links between views work correctly

---

### Phase 3D: Quality Assurance & Documentation
**Duration:** 4-6 hours  
**Dependencies:** Phase 3C complete

#### Tasks:

1. **Analytical review (2 hours)**
   - Review hypothesis quality: Are they plausible? Literature-grounded?
   - Review response feasibility: Are prerequisites realistic? Trade-offs accurate?
   - Review indicator definitions: Are they measurable? Data sources exist?
   - Verify no causal overreach in language
   - Verify no prescriptive recommendations (all conditional)

2. **Language audit (1 hour)**
   - Search for prohibited terms: "should," "must," "proven," "will work"
   - Verify conditional phrasing: "If X, consider Y"
   - Verify disclaimers present and prominent
   - Verify "illustrative" / "synthetic" labels everywhere

3. **Scenario testing (2 hours)**
   - Test all 6 scenarios end-to-end
   - Verify decision support adapts to each (different hypothesis priorities)
   - Verify low activity scenario shows crisis disclaimers
   - Verify high activity scenario adjusts recommendations
   - Screenshot documentation of each scenario

4. **Documentation and handoff (1 hour)**
   - Update README with Phase 3 overview
   - Create PHASE3_IMPLEMENTATION_SUMMARY.md
   - Document knowledge base maintenance process
   - Create video demo or GIF walkthrough

**Deliverables:**
- Analytical review checklist (completed)
- Language audit report (issues resolved)
- Scenario test documentation (6 scenarios verified)
- PHASE3_IMPLEMENTATION_SUMMARY.md

**Acceptance Criteria:**
- ✅ All hypotheses plausible and literature-grounded
- ✅ All responses feasible with realistic prerequisites
- ✅ No causal or prescriptive language
- ✅ Disclaimers prominent on all views
- ✅ All 6 scenarios tested and working
- ✅ Documentation complete

---

### Estimated Effort Summary

| Phase | Duration | Deliverables |
|-------|----------|--------------|
| 3A: Knowledge Base | 8-12 hours | decision-knowledge.ts (30 hypotheses, 28 responses, 42 indicators) |
| 3B: Decision Logic | 6-8 hours | decision-support.ts + tests (functions + 80% coverage) |
| 3C: UI Components | 10-14 hours | 8 components + route updates (Executive + Explore views) |
| 3D: QA & Docs | 4-6 hours | Reviews, tests, documentation |
| **Total** | **28-40 hours** | Complete Phase 3 Decision Intelligence |

**Parallel work opportunities:**
- 3A and 3B can partially overlap (knowledge base drafted while logic designed)
- 3C component development can start before all of 3B complete (use mocks)

**Critical path:**
- Knowledge base → Decision logic → UI integration → QA

---

## 7. Risk Assessment & Acceptance Criteria

### 7.1 High-Risk Areas

#### Risk 1: Causal Overreach ⚠️ CRITICAL
**Description:** Hypotheses mistaken for verified causes, leading to inappropriate policy decisions

**Likelihood:** HIGH (without mitigation)  
**Impact:** CRITICAL (loss of credibility, flawed decisions)

**Mitigation strategies:**
1. **Language discipline:**
   - All hypotheses prefixed: "If [condition], consider..."
   - Never use: "The gap is caused by..."
   - Always use: "Data needed to verify" section

2. **Visual design:**
   - Red disclaimer banner on Decision Support section
   - "HYPOTHESIS" badge on every hypothesis card
   - Likelihood explicitly labeled (high/medium/low)

3. **User education:**
   - Tooltip on first visit: "These are plausible explanations, not conclusions"
   - Disclaimer footer on every decision support view
   - Link to methodology document

4. **Testing:**
   - Language audit: Scan for "cause," "due to," "because of," "proven"
   - User testing: Ask users "What causes this gap?" — Correct answer: "Unknown, requires investigation"

**Acceptance Criteria:**
- ✅ Zero instances of causal language in UI
- ✅ Every hypothesis has "verification data" section
- ✅ Disclaimers present on all decision support views
- ✅ User testing confirms understanding (n≥5)

---

#### Risk 2: Inappropriate Recommendations ⚠️ HIGH
**Description:** Response options perceived as PhilHealth-endorsed policy, bypassing institutional processes

**Likelihood:** MEDIUM-HIGH  
**Impact:** HIGH (political backlash, stakeholder conflict)

**Mitigation strategies:**
1. **Framing discipline:**
   - Never: "PhilHealth should..."
   - Always: "Options to consider include..."
   - Attribution: "Finvanta analysis" not "PhilHealth recommendation"

2. **Prerequisites explicit:**
   - Every response lists: Stakeholder consultation required
   - Every response lists: Institutional approval required
   - Trade-offs clearly stated

3. **Actor identification:**
   - Clearly label who can act (PhilHealth, DOH, LGU, etc.)
   - No response suggests unilateral PhilHealth action on multi-stakeholder issues

4. **Synthetic data disclaimers:**
   - "This analysis is based on synthetic scenarios"
   - "Real-world decisions require validated data"
   - "Institutional review and approval required"

**Acceptance Criteria:**
- ✅ No response uses prescriptive language ("should," "must")
- ✅ Every response includes prerequisites and trade-offs
- ✅ Disclaimers on synthetic data present on all views
- ✅ Actor clearly identified for each response

---

#### Risk 3: Synthetic Data Confusion ⚠️ HIGH
**Description:** Decision support outputs mistaken for real-world guidance based on actual PhilHealth data

**Likelihood:** MEDIUM (users may forget demonstration context)  
**Impact:** HIGH (decisions made on synthetic data)

**Mitigation strategies:**
1. **Persistent reminders:**
   - Blue informational banner on all pages (already implemented)
   - Additional decision support-specific banner: "Decision support based on synthetic scenarios"
   - "Illustrative example" label on every decision output

2. **Visual differentiation:**
   - Decision support section has distinct visual treatment
   - Synthetic scenario badge in header
   - Watermark (subtle): "DEMONSTRATION" on decision cards

3. **Real-world transition planning:**
   - Document clearly: "To use with real data, replace SCENARIOS array with actual PhilHealth data"
   - Flag required data: Facility registry, accreditation database, claims database, payment database
   - Data quality requirements specified

**Acceptance Criteria:**
- ✅ Blue banner present on all pages
- ✅ Decision support-specific disclaimer present
- ✅ "Illustrative" label on decision outputs
- ✅ Documentation for real-world transition exists

---

#### Risk 4: Decision-Maker Overload ⚠️ MEDIUM
**Description:** Too much detail overwhelms executive audience, defeating purpose of decision support

**Likelihood:** MEDIUM (common in health informatics)  
**Impact:** MEDIUM (tool not used, or used incorrectly)

**Mitigation strategies:**
1. **Progressive disclosure:**
   - Executive view: Top 2-3 items only, collapsed by default
   - Expand on demand: User controls detail level
   - Link to Explore view for full catalog

2. **Clear hierarchy:**
   - Primary gap → Why (hypotheses) → What (responses) → Monitor (indicators)
   - Each step optional (user can stop after gap identification)

3. **Scannable design:**
   - Headlines: 1-sentence summaries
   - Badges and icons: Visual shortcuts
   - Expandable sections: Don't show everything at once

4. **User testing:**
   - Test with non-technical users
   - Time to comprehend: <2 minutes for executive view
   - Usability metrics: SUS score >70

**Acceptance Criteria:**
- ✅ Executive view scannable in 30 seconds
- ✅ Details available on demand (expandable)
- ✅ User testing: Comprehension score >80% (n≥5)
- ✅ Link to Explore view for deeper dive

---

### 7.2 Medium-Risk Areas

#### Risk 5: Knowledge Base Completeness ⚠️ MEDIUM
**Description:** Missing critical barriers or responses, limiting usefulness

**Likelihood:** MEDIUM (impossible to be exhaustive)  
**Impact:** MEDIUM (user doesn't find relevant options)

**Mitigation strategies:**
1. **Literature grounding:**
   - Base taxonomy on WHO, World Bank, implementation science literature
   - Reference PhilHealth studies where available
   - Cite sources for hypotheses

2. **Framework extensibility:**
   - Design allows adding hypotheses/responses without code changes
   - JSON structure for future user customization
   - Versioning: Track knowledge base updates

3. **Explicit limitations:**
   - Disclaimer: "This framework is not exhaustive"
   - Encourage user input: "Contact us with additional barriers"
   - Roadmap: Community-contributed knowledge base

**Acceptance Criteria:**
- ✅ 30+ hypotheses cover major barrier types
- ✅ 28+ responses cover major intervention types
- ✅ Literature citations included
- ✅ Extensibility documented

---

#### Risk 6: Context Sensitivity ⚠️ MEDIUM
**Description:** Generic advice not applicable to specific contexts (facility types, regions, activity levels)

**Likelihood:** MEDIUM  
**Impact:** MEDIUM (advice not actionable)

**Mitigation strategies:**
1. **Conditional logic:**
   - Severity-based disclaimers (low activity = crisis warning)
   - Activity-level adjustments (high activity = different priorities)

2. **Contextual filters:**
   - Response filtering by actor (show only DOH options, only PhilHealth options)
   - Future: Facility type filter, region filter

3. **Explicit generalizations:**
   - Disclaimer: "These options may not apply to all facility types"
   - Recommendation: "Conduct context-specific assessment"

**Acceptance Criteria:**
- ✅ Low activity scenarios show crisis disclaimers
- ✅ High activity scenarios adjust priorities
- ✅ Contextual filtering available
- ✅ Generalization limitations stated

---

### 7.3 Acceptance Criteria Summary

#### Functional Requirements

✅ **Decision support generation:**
- Input: Scenario with stage data
- Output: Hypotheses, responses, indicators, disclaimers
- Performance: <10ms per scenario
- Compatibility: All 6 scenarios work

✅ **User interface:**
- Executive view: Top 2-3 items, collapsed cards
- Explore view: Full catalog, tabs, filters
- Responsive: Desktop, tablet, mobile
- Accessibility: Keyboard navigation, screen reader compatible

✅ **Content quality:**
- 30 hypotheses (literature-grounded)
- 28 response options (feasible, prerequisites clear)
- 42 indicators (measurable, data sources specified)
- Disclaimers (prominent, comprehensive)

#### Non-Functional Requirements

✅ **Credibility:**
- No causal language
- No prescriptive recommendations
- Prerequisites and trade-offs explicit
- Evidence limitations stated

✅ **Usability:**
- Executive view scannable in 30 seconds
- Progressive disclosure (expand for detail)
- Comparison mode for response evaluation
- Export functionality for monitoring plans

✅ **Maintainability:**
- Knowledge base separate from logic
- TypeScript strict mode
- Test coverage >80%
- Documentation complete

✅ **Safety:**
- Synthetic data disclaimers prominent
- Prevents inappropriate policy decisions
- Real-world transition documented
- Data quality requirements specified

---

## 8. Future Enhancements (Post-Phase 3)

### Real-World Data Integration

When PhilHealth has validated facility-level data:

1. **Replace SCENARIOS array:**
   ```typescript
   // Instead of synthetic scenarios
   const scenarios = await fetchPhilHealthData({
     dateRange: "2024-Q1 to 2024-Q4",
     region: "all",
     facilityType: "all"
   });
   ```

2. **Dynamic hypothesis likelihood:**
   - Use regression or ML to estimate likelihood from facility characteristics
   - "High likelihood" becomes data-driven, not literature-based

3. **Response impact estimation:**
   - Historical data: What happened when similar responses tried elsewhere?
   - Causal inference: Estimate effect size with confidence intervals

### AI-Powered Features

1. **Natural language queries:**
   - "What if we simplify accreditation and provide TA?"
   - Parse query, run scenario, explain trade-offs

2. **Anomaly detection:**
   - Flag unusual patterns: "Region X has 50% accreditation but 10% claims (expected 40%)"
   - Generate hypotheses for investigation

3. **Chatbot interface:**
   - Conversational exploration of decision space
   - "Why is this hypothesis high likelihood?" → Explain evidence

### User Customization

1. **Custom hypotheses:**
   - Allow users to add institution-specific barriers
   - Share across organization

2. **Custom responses:**
   - Document responses actually tried
   - Track outcomes (did it work?)

3. **Custom indicators:**
   - Define organization-specific metrics
   - Dashboard integration

### Advanced Analytics

1. **Cascade simulation:**
   - "If accreditation improves to 25%, claims would reach..."
   - Monte Carlo uncertainty ranges

2. **Cost-effectiveness analysis:**
   - Estimate cost per response
   - Estimate impact per response
   - Calculate cost per additional facility activated

3. **Multi-stage optimization:**
   - "Given budget X, which combination of responses maximizes outcome?"
   - Constraint programming or optimization algorithms

---

## Conclusion

This specification provides a complete design for Phase 3 Decision Intelligence, transforming Finvanta from a diagnostic tool into a decision-support framework for health financing stakeholders.

**Key innovations:**
1. **Hypothesis-driven** — No causal claims, only testable explanations
2. **Institutionally grounded** — Every response identifies who can act
3. **Monitoring-first** — Every response comes with tracking indicators
4. **Credibility-focused** — Explicit limitations, transparent evidence gaps

**Implementation readiness:**
- Detailed component specifications
- Complete data model
- 28-40 hour roadmap
- Risk mitigation strategies

**Awaiting approval to proceed with implementation.**

---

**End of Specification Document**

**Related Documents:**
- `PHASE3_EXECUTIVE_SUMMARY.md` — High-level overview for stakeholders
- `PRODUCT_CREDIBILITY_ASSESSMENT.md` — Analysis driving Phase 3 design
- `PR2_FINAL_REVIEW.md` — Current state (evidence transparency baseline)

**Last Updated:** October 25, 2026
