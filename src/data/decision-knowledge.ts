/**
 * Phase 3: Decision Intelligence - Knowledge Base
 * 
 * This module contains the structured knowledge base for health financing
 * implementation barriers, response options, and monitoring indicators.
 * 
 * EVIDENCE INTEGRITY: All hypotheses in this MVP are derived from synthetic
 * scenarios and labeled "hypothesis" status. They represent plausible explanations
 * requiring verification, NOT verified causes of observed gaps.
 */

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

/**
 * Evidence status for hypotheses
 * - hypothesis: Plausible explanation requiring investigation (DEFAULT for MVP)
 * - suggestive: Some data support, not conclusive
 * - verified: Multiple data sources confirm
 * - refuted: Data contradict this explanation
 */
export type EvidenceStatus = "hypothesis" | "suggestive" | "verified" | "refuted";

/**
 * Barrier categories across implementation cascade
 */
export type BarrierCategory =
  | "policy_regulatory"
  | "capacity_financial"
  | "capacity_technical"
  | "capacity_human_resources"
  | "information_awareness"
  | "administrative_process";

/**
 * Cascade stage keys (matching existing Stage.key from scenarios.ts)
 */
export type CascadeStage = "accredited" | "claims" | "paid";

/**
 * Institutional actors in Philippine health financing system
 * NOTE: Actor assignments are ASSUMPTIONS requiring validation
 */
export type Actor =
  | "PhilHealth"
  | "DOH"
  | "LGU"
  | "Multi-stakeholder";

/**
 * Hypothesis - plausible explanation for implementation barrier
 */
export interface Hypothesis {
  id: string;
  stage: CascadeStage;
  category: BarrierCategory;
  name: string;
  statement: string;
  evidenceStatus: EvidenceStatus;
  
  /** Why this explanation is plausible (theoretical, analogous cases, context) */
  plausibilityBasis: {
    theory: string;
    analogousCases: string;
    contextualFactors: string;
  };
  
  /** What evidence exists (direct, alternatives, contribution) */
  verificationStatus: {
    directEvidence: string;
    alternativeExplanations: string[];
    quantifiedContribution: string;
  };
  
  /** Data needed to verify or refute this hypothesis */
  verificationData: {
    toVerify: string[];
    toRefute: string[];
  };
}

/**
 * Response option - potential intervention to address barriers
 */
export interface ResponseOption {
  id: string;
  stage: CascadeStage;
  addressesHypotheses: string[];
  name: string;
  description: string;
  actor: Actor;
  
  /** Key assumptions requiring validation before implementation */
  assumptions: {
    institutional: string[];
    temporal: string[];
    financial: string[];
    legal: string[];
  };
  
  /** What must be validated before considering implementation */
  validationNeeded: string[];
  
  /** Prerequisites assuming assumptions validated */
  prerequisites: string[];
  
  /** Trade-offs and risks */
  tradeoffs: string[];
  
  /** Timeframe (highly uncertain, assumption-dependent) */
  timeframeNote: string;
}

/**
 * Monitoring indicator - metric for tracking implementation
 */
export interface Indicator {
  id: string;
  stage: CascadeStage;
  type: "leading" | "process" | "outcome";
  name: string;
  definition: string;
  numerator: string;
  denominator?: string;
  dataSource: string;
  frequency: string;
  interpretation: string;
  limitations: string[];
}

// ============================================================================
// KNOWLEDGE BASE: HYPOTHESES
// ============================================================================

/**
 * Accreditation stage hypotheses (4 selected for MVP)
 * Selection criteria: Barrier category diversity
 */
const ACCREDITATION_HYPOTHESES: Hypothesis[] = [
  {
    id: "H-ACC-01",
    stage: "accredited",
    category: "administrative_process",
    name: "Documentation requirements exceed facility capacity",
    statement: "Accreditation documentation requirements may exceed the administrative capacity of smaller facilities, particularly those in rural areas without dedicated administrative staff.",
    evidenceStatus: "hypothesis",
    
    plausibilityBasis: {
      theory: "Transaction cost theory suggests that administrative burden deters participation when staff capacity is limited. Implementation science literature identifies documentation requirements as common barriers in low-resource settings.",
      analogousCases: "Gavi implementation studies show facility paperwork burden correlates with lower participation rates. Medicare accreditation in the US shows smaller facilities struggle more with documentation than large hospitals.",
      contextualFactors: "PhilHealth 2024 mental health implementation study mentions 'administrative capacity challenges' in general (not specific to documentation). Primary care facilities in Philippines typically have limited administrative staff."
    },
    
    verificationStatus: {
      directEvidence: "None available (synthetic scenario)",
      alternativeExplanations: [
        "H-ACC-04: Accreditation costs prohibitive",
        "H-ACC-08: Mental health workforce shortage",
        "H-ACC-10: Benefit package awareness limited"
      ],
      quantifiedContribution: "Unknown - requires investigation"
    },
    
    verificationData: {
      toVerify: [
        "Application completion rates <60% by facility size",
        "Rejection reasons show >30% documentation-related issues",
        "Facilities with <2 administrative staff have significantly lower accreditation rates",
        "Time-to-complete application surveys indicate documentation burden"
      ],
      toRefute: [
        "Application completion rates >80%",
        "Documentation-related rejections <10%",
        "No correlation between administrative staffing levels and accreditation success",
        "Similar benefits with different documentation requirements show same accreditation rate"
      ]
    }
  },
  
  {
    id: "H-ACC-04",
    stage: "accredited",
    category: "capacity_financial",
    name: "Accreditation costs prohibitive",
    statement: "Direct costs (application fees, inspection fees) or indirect costs (staff time, facility modifications) may be prohibitive, especially for small or public facilities with limited budgets.",
    evidenceStatus: "hypothesis",
    
    plausibilityBasis: {
      theory: "Economic theory suggests participation decisions are cost-sensitive, particularly for budget-constrained facilities. Fixed costs create barriers to entry for smaller facilities.",
      analogousCases: "Studies on provider participation in insurance networks show fee structures influence participation decisions. LMIC facility accreditation literature cites costs as barrier.",
      contextualFactors: "Mental Health Act implementation in Philippines noted 'limited financial resources' as challenge. Public facilities often have constrained budgets."
    },
    
    verificationStatus: {
      directEvidence: "None available (synthetic scenario)",
      alternativeExplanations: [
        "H-ACC-01: Documentation requirements exceed capacity",
        "H-ACC-08: Mental health workforce shortage",
        "H-ACC-10: Benefit package awareness limited"
      ],
      quantifiedContribution: "Unknown - requires investigation"
    },
    
    verificationData: {
      toVerify: [
        "Fee schedule shows material costs (>₱10,000 total)",
        "Facility surveys cite cost as primary barrier",
        "Accreditation rate correlates with facility size/budget",
        "Cost subsidy experiments show increased participation"
      ],
      toRefute: [
        "Fees are minimal (<₱5,000 total)",
        "Facilities cite other barriers more frequently than cost",
        "No correlation between facility financial status and accreditation",
        "High-cost facilities have same low accreditation rate as low-cost"
      ]
    }
  },
  
  {
    id: "H-ACC-08",
    stage: "accredited",
    category: "capacity_human_resources",
    name: "Mental health workforce shortage",
    statement: "Shortage of mental health professionals (psychiatrists, psychologists, trained nurses) may prevent facilities from meeting accreditation staffing requirements.",
    evidenceStatus: "hypothesis",
    
    plausibilityBasis: {
      theory: "Human capital theory suggests service provision requires trained workforce. Health systems research shows workforce distribution affects service availability.",
      analogousCases: "Mental health workforce shortages documented across LMICs. Specialized service accreditation often depends on specialist availability.",
      contextualFactors: "PhilHealth 2024 technical assistance report notes 'scarcity of mental health professionals.' Philippines has estimated low psychiatrist-to-population ratios."
    },
    
    verificationStatus: {
      directEvidence: "None available (synthetic scenario)",
      alternativeExplanations: [
        "H-ACC-01: Documentation requirements exceed capacity",
        "H-ACC-04: Accreditation costs prohibitive",
        "H-ACC-10: Benefit package awareness limited"
      ],
      quantifiedContribution: "Unknown - requires investigation"
    },
    
    verificationData: {
      toVerify: [
        "Accreditation requirements specify mental health staffing",
        "Facility workforce surveys show insufficient trained staff",
        "Geographic distribution of mental health professionals correlates with accreditation rates",
        "Facilities cite workforce unavailability as barrier"
      ],
      toRefute: [
        "Accreditation does not require specialized mental health staff",
        "Facilities have adequate workforce but still don't apply",
        "No correlation between mental health professional availability and accreditation",
        "Task-shifting allows primary care providers to meet requirements"
      ]
    }
  },
  
  {
    id: "H-ACC-10",
    stage: "accredited",
    category: "information_awareness",
    name: "Benefit package awareness limited",
    statement: "Eligible facilities may be unaware of the mental health benefit package, accreditation opportunity, or potential reimbursement rates.",
    evidenceStatus: "hypothesis",
    
    plausibilityBasis: {
      theory: "Information economics suggests participation requires awareness. Diffusion of innovation theory shows information dissemination affects adoption rates.",
      analogousCases: "New benefit rollouts commonly face awareness challenges. Health policy implementation studies show information gaps delay uptake.",
      contextualFactors: "Mental health benefit package is relatively new. PhilHealth communication reach to all eligible facilities uncertain."
    },
    
    verificationStatus: {
      directEvidence: "None available (synthetic scenario)",
      alternativeExplanations: [
        "H-ACC-01: Documentation requirements exceed capacity",
        "H-ACC-04: Accreditation costs prohibitive",
        "H-ACC-08: Mental health workforce shortage"
      ],
      quantifiedContribution: "Unknown - requires investigation"
    },
    
    verificationData: {
      toVerify: [
        "Facility surveys show <50% awareness of benefit package",
        "Information dissemination records show incomplete coverage",
        "Inquiries to PhilHealth about benefit are low",
        "Awareness campaigns correlate with increased applications"
      ],
      toRefute: [
        "Facility surveys show >80% awareness",
        "Comprehensive information dissemination documented",
        "Facilities aware of benefit but don't apply for other reasons",
        "No correlation between information campaigns and application rates"
      ]
    }
  }
];

/**
 * Claims submission stage hypotheses (3 selected for MVP)
 */
const CLAIMS_HYPOTHESES: Hypothesis[] = [
  {
    id: "H-CLM-01",
    stage: "claims",
    category: "capacity_technical",
    name: "Claims system access or usability issues",
    statement: "Facilities may face technical barriers in accessing the claims submission system, or the system may be difficult to use without specialized training.",
    evidenceStatus: "hypothesis",
    
    plausibilityBasis: {
      theory: "Technology adoption literature shows usability affects utilization. Health IT research demonstrates that system complexity deters use.",
      analogousCases: "Electronic health record implementations often face usability challenges. Claims systems in other contexts show learning curve effects.",
      contextualFactors: "Facilities vary in IT infrastructure and staff technical capacity. Rural facilities may have connectivity issues."
    },
    
    verificationStatus: {
      directEvidence: "None available (synthetic scenario)",
      alternativeExplanations: [
        "H-CLM-03: Insufficient patient volume",
        "H-CLM-07: Reimbursement rules unclear"
      ],
      quantifiedContribution: "Unknown - requires investigation"
    },
    
    verificationData: {
      toVerify: [
        "System login rates <50% among accredited facilities",
        "Technical support requests are high",
        "User experience surveys show usability problems",
        "System improvements correlate with increased submissions"
      ],
      toRefute: [
        "System login rates >80%",
        "Few technical support requests",
        "User satisfaction with system is high",
        "Facilities access system but don't submit claims"
      ]
    }
  },
  
  {
    id: "H-CLM-03",
    stage: "claims",
    category: "capacity_financial",
    name: "Insufficient patient volume",
    statement: "Accredited facilities may have low patient volumes for mental health services, making claims submission effort not worthwhile or indicating limited demand.",
    evidenceStatus: "hypothesis",
    
    plausibilityBasis: {
      theory: "Economic viability requires sufficient volume. Provider participation in programs depends on expected revenue vs. administrative cost.",
      analogousCases: "Specialty service provision literature shows volume thresholds affect sustainability. Rural health facility studies show demand variations.",
      contextualFactors: "Mental health stigma may limit help-seeking. Service availability does not automatically create demand."
    },
    
    verificationStatus: {
      directEvidence: "None available (synthetic scenario)",
      alternativeExplanations: [
        "H-CLM-01: Claims system access or usability issues",
        "H-CLM-07: Reimbursement rules unclear"
      ],
      quantifiedContribution: "Unknown - requires investigation"
    },
    
    verificationData: {
      toVerify: [
        "Facility service delivery records show <10 patients/month",
        "Regional mental health burden estimates exceed observed utilization",
        "Facilities cite low demand as reason for not filing claims",
        "Patient volumes correlate with claims submission rates"
      ],
      toRefute: [
        "Facilities see adequate patient volumes but don't file claims",
        "No correlation between patient volume and claims submission",
        "Demand generation campaigns don't increase claims",
        "Facilities in high-burden areas have same low submission rate"
      ]
    }
  },
  
  {
    id: "H-CLM-07",
    stage: "claims",
    category: "information_awareness",
    name: "Reimbursement rules unclear",
    statement: "Facilities may be uncertain about which services are covered, documentation requirements, or reimbursement rates, creating hesitation to file claims.",
    evidenceStatus: "hypothesis",
    
    plausibilityBasis: {
      theory: "Uncertainty aversion suggests providers avoid processes with unclear rules. Implementation research shows rule clarity affects compliance.",
      analogousCases: "Insurance reimbursement literature shows billing complexity affects provider participation. Clear guidance improves submission rates.",
      contextualFactors: "Mental health benefit package is new. Claims rules may not be widely disseminated or understood."
    },
    
    verificationStatus: {
      directEvidence: "None available (synthetic scenario)",
      alternativeExplanations: [
        "H-CLM-01: Claims system access or usability issues",
        "H-CLM-03: Insufficient patient volume"
      ],
      quantifiedContribution: "Unknown - requires investigation"
    },
    
    verificationData: {
      toVerify: [
        "Facility surveys show confusion about covered services",
        "Inquiries to PhilHealth about rules are frequent",
        "Guidance materials distribution is incomplete",
        "Clarification of rules correlates with increased submissions"
      ],
      toRefute: [
        "Comprehensive guidance is available and accessed",
        "Facilities demonstrate understanding of rules but don't submit",
        "No correlation between clarity interventions and submission rates",
        "Rules are simple and facilities cite other barriers"
      ]
    }
  }
];

/**
 * Payment processing stage hypotheses (3 selected for MVP)
 */
const PAYMENT_HYPOTHESES: Hypothesis[] = [
  {
    id: "H-PAY-01",
    stage: "paid",
    category: "administrative_process",
    name: "Adjudication delays",
    statement: "High claim volumes, insufficient adjudication staff, or complex review processes may cause payment delays that discourage continued service provision.",
    evidenceStatus: "hypothesis",
    
    plausibilityBasis: {
      theory: "Cash flow theory suggests delays undermine facility financial viability. Behavioral economics shows negative experiences reduce future participation.",
      analogousCases: "Health insurance adjudication literature documents delay impacts. Provider surveys in other contexts show payment timeliness affects participation.",
      contextualFactors: "Mental health claims may require specialized review. PhilHealth processing capacity for new benefit uncertain."
    },
    
    verificationStatus: {
      directEvidence: "None available (synthetic scenario)",
      alternativeExplanations: [
        "H-PAY-02: Documentation deficiencies",
        "H-PAY-05: Reimbursement rates insufficient"
      ],
      quantifiedContribution: "Unknown - requires investigation"
    },
    
    verificationData: {
      toVerify: [
        "Median adjudication time >60 days",
        "Backlog analysis shows capacity constraints",
        "Facilities cite delays as reason for discontinuing service",
        "Accelerated processing correlates with continued claims submission"
      ],
      toRefute: [
        "Median adjudication time <30 days",
        "No processing backlog documented",
        "Facilities receive timely payments but still discontinue",
        "Processing time doesn't correlate with facility participation"
      ]
    }
  },
  
  {
    id: "H-PAY-02",
    stage: "paid",
    category: "capacity_technical",
    name: "Documentation deficiencies",
    statement: "Claims may be denied or delayed due to incomplete clinical documentation, missing forms, or insufficient justification for services rendered.",
    evidenceStatus: "hypothesis",
    
    plausibilityBasis: {
      theory: "Information asymmetry requires documentation for verification. Quality assurance literature shows documentation standards affect approval rates.",
      analogousCases: "Claims denial studies across insurance systems show documentation as common reason. Training on documentation improves approval rates.",
      contextualFactors: "Mental health documentation requirements may differ from general care. Facility staff may lack training on mental health documentation."
    },
    
    verificationStatus: {
      directEvidence: "None available (synthetic scenario)",
      alternativeExplanations: [
        "H-PAY-01: Adjudication delays",
        "H-PAY-05: Reimbursement rates insufficient"
      ],
      quantifiedContribution: "Unknown - requires investigation"
    },
    
    verificationData: {
      toVerify: [
        "Denial reason analysis shows >40% documentation issues",
        "Documentation audits find frequent deficiencies",
        "Training on documentation improves approval rates",
        "Documentation quality scores correlate with payment receipt"
      ],
      toRefute: [
        "Documentation-related denials <10%",
        "Audits show adequate documentation quality",
        "Training doesn't improve approval rates",
        "Well-documented claims still denied at high rates"
      ]
    }
  },
  
  {
    id: "H-PAY-05",
    stage: "paid",
    category: "capacity_financial",
    name: "Reimbursement rates insufficient",
    statement: "Reimbursement rates may not cover the true cost of service delivery, leading facilities to stop providing services even after receiving initial payments.",
    evidenceStatus: "hypothesis",
    
    plausibilityBasis: {
      theory: "Economic sustainability requires revenue ≥ cost. Provider economics literature shows rate adequacy affects service provision decisions.",
      analogousCases: "Medicaid and Medicare rate adequacy studies show rate impacts on participation. LMIC benefit package studies cite inadequate rates.",
      contextualFactors: "Mental health service costs may exceed general care. Cost-of-service data for Philippines may be limited."
    },
    
    verificationStatus: {
      directEvidence: "None available (synthetic scenario)",
      alternativeExplanations: [
        "H-PAY-01: Adjudication delays",
        "H-PAY-02: Documentation deficiencies"
      ],
      quantifiedContribution: "Unknown - requires investigation"
    },
    
    verificationData: {
      toVerify: [
        "Cost-of-service studies show rates <80% of costs",
        "Facility surveys cite inadequate rates as barrier",
        "Service discontinuation correlates with financial viability concerns",
        "Rate increases correlate with sustained participation"
      ],
      toRefute: [
        "Rates exceed or match service costs",
        "Facilities don't cite rates as barrier",
        "Profitable facilities still discontinue service",
        "Rate changes don't affect participation"
      ]
    }
  }
];

// ============================================================================
// KNOWLEDGE BASE: RESPONSE OPTIONS
// ============================================================================

/**
 * Accreditation stage responses (3 selected for MVP)
 */
const ACCREDITATION_RESPONSES: ResponseOption[] = [
  {
    id: "R-ACC-04",
    stage: "accredited",
    addressesHypotheses: ["H-ACC-01", "H-ACC-08"],
    name: "Provide technical assistance for accreditation",
    description: "Establish TA program with application support, documentation help, readiness assessments, and peer mentoring for facilities pursuing accreditation.",
    actor: "Multi-stakeholder",
    
    assumptions: {
      institutional: [
        "DOH and PhilHealth can establish joint TA program",
        "TA providers (consultants, academic institutions, facility associations) are available and willing",
        "Both agencies have budget authority for TA programs"
      ],
      temporal: [
        "Program can launch in 1-3 months (highly uncertain)",
        "TA provider procurement doesn't require lengthy bidding process",
        "Curriculum development can occur concurrently with provider engagement"
      ],
      financial: [
        "Budget available for TA provider contracts or staff",
        "Travel and materials costs are acceptable",
        "Cost per facility reached is sustainable at scale"
      ],
      legal: [
        "No legislative approval required for TA program",
        "Procurement regulations allow TA contracts",
        "Data sharing between DOH/PhilHealth and TA providers is permissible"
      ]
    },
    
    validationNeeded: [
      "Confirm DOH and PhilHealth authority for joint TA program",
      "Identify available TA providers and assess capacity",
      "Estimate budget requirements and confirm availability",
      "Map procurement process and realistic timeline",
      "Assess geographic coverage feasibility (can reach rural facilities?)"
    ],
    
    prerequisites: [
      "Budget allocation confirmed",
      "TA provider identification and contracting complete",
      "TA curriculum and materials developed",
      "Coordination mechanism between DOH and PhilHealth established"
    ],
    
    tradeoffs: [
      "Resource-intensive: Requires staff time, travel, materials",
      "Geographic bias: May favor facilities near TA providers or urban areas",
      "Scalability limits: Cannot reach all 1,500 eligible facilities simultaneously",
      "Dependency: Facilities may become dependent on TA rather than building internal capacity"
    ],
    
    timeframeNote: "Estimated 1-3 months to launch, but highly uncertain. Could be faster if existing TA networks leveraged, or slower (6-12 months) if procurement or budget approval required. Ongoing implementation over 12-24 months."
  },
  
  {
    id: "R-ACC-03",
    stage: "accredited",
    addressesHypotheses: ["H-ACC-04"],
    name: "Waive or subsidize accreditation fees",
    description: "Eliminate application and inspection fees for public facilities or small private clinics, or provide time-limited subsidy to reduce financial barriers.",
    actor: "PhilHealth",
    
    assumptions: {
      institutional: [
        "PhilHealth has authority to waive or subsidize fees",
        "Fee waiver doesn't require legislative approval",
        "PhilHealth Finance Division can implement quickly"
      ],
      temporal: [
        "Can implement immediately if budget available",
        "Policy change (if needed) takes 1-3 months",
        "No lengthy approval process required"
      ],
      financial: [
        "Current fees are material enough to be barrier",
        "Fee revenue is not critical to PhilHealth operations",
        "Budget impact of foregone revenue is acceptable",
        "Subsidy costs are sustainable"
      ],
      legal: [
        "Legal authority exists to waive fees",
        "No regulatory mandates require fee collection",
        "Targeting criteria (which facilities qualify) is legally permissible"
      ]
    },
    
    validationNeeded: [
      "Confirm actual accreditation fee amounts",
      "Assess fee revenue impact on PhilHealth budget",
      "Verify legal authority to waive fees",
      "Define targeting criteria (public vs. private, size thresholds)",
      "Estimate uptake and budget impact"
    ],
    
    prerequisites: [
      "Budget allocated (if subsidy rather than waiver)",
      "Targeting criteria defined and approved",
      "Policy change implemented (if required)",
      "Application process updated to reflect fee waiver"
    ],
    
    tradeoffs: [
      "Moral hazard: Facilities may apply without serious commitment",
      "May not address non-financial barriers (doesn't help if workforce is constraint)",
      "Ongoing budget implications if subsidy rather than one-time",
      "Risk: Subsidize facilities that would have applied anyway (deadweight loss)"
    ],
    
    timeframeNote: "Potentially immediate if authority exists and budget available. More realistically 1-3 months for policy change and implementation. Assumption: Fees are significant enough to matter."
  },
  
  {
    id: "R-ACC-07",
    stage: "accredited",
    addressesHypotheses: ["H-ACC-10"],
    name: "Public awareness campaign for facilities",
    description: "Information campaign targeting eligible facilities: Benefit package details, accreditation process, reimbursement rates, and success stories from participating facilities.",
    actor: "Multi-stakeholder",
    
    assumptions: {
      institutional: [
        "PhilHealth Communications and facility associations can coordinate",
        "Communication channels exist to reach eligible facilities",
        "Facility associations willing to participate"
      ],
      temporal: [
        "Campaign can develop and launch in 1-3 months",
        "Materials development doesn't require lengthy approval",
        "Distribution can occur concurrently with development"
      ],
      financial: [
        "Budget available for materials design, printing, events",
        "Cost per facility reached is acceptable",
        "Campaign costs are one-time or time-limited"
      ],
      legal: [
        "No approval required for informational campaign",
        "Benefit information can be publicly shared",
        "Facility contact information is available"
      ]
    },
    
    validationNeeded: [
      "Assess current facility awareness levels",
      "Identify effective distribution channels",
      "Estimate budget requirements",
      "Coordinate with facility associations on participation",
      "Develop campaign strategy and materials"
    ],
    
    prerequisites: [
      "Campaign strategy approved",
      "Materials developed (brochures, presentations, website content)",
      "Distribution channels confirmed (email, workshops, associations)",
      "Budget allocated"
    ],
    
    tradeoffs: [
      "Information alone may not overcome other barriers (cost, workforce, documentation)",
      "Reach may be incomplete (not all facilities have email, attend workshops)",
      "One-time campaign vs. ongoing communication needs",
      "Effectiveness difficult to measure (awareness ≠ application)"
    ],
    
    timeframeNote: "Estimated 1-3 months for campaign development and launch. Assumes existing communication channels. Could be immediate if materials exist, or slower if extensive development needed."
  }
];

/**
 * Claims submission stage responses (3 selected for MVP)
 */
const CLAIMS_RESPONSES: ResponseOption[] = [
  {
    id: "R-CLM-02",
    stage: "claims",
    addressesHypotheses: ["H-CLM-01"],
    name: "Enhance claims system usability",
    description: "User interface improvements, guided workflows, auto-save features, error checking, and simplified navigation to reduce technical barriers.",
    actor: "PhilHealth",
    
    assumptions: {
      institutional: [
        "PhilHealth IT Department has authority to modify system",
        "No external vendor approval required for changes",
        "IT department has capacity for enhancements"
      ],
      temporal: [
        "System changes can complete in 6-12 months (highly uncertain)",
        "Testing and rollout don't require extended downtime",
        "User acceptance testing can occur concurrently"
      ],
      financial: [
        "Budget available for system development",
        "Development costs are acceptable",
        "Ongoing maintenance costs are sustainable"
      ],
      legal: [
        "System modifications don't require regulatory approval",
        "Security and data protection standards can be maintained",
        "No procurement required if internal development"
      ]
    },
    
    validationNeeded: [
      "Conduct user experience research with facilities",
      "Assess current system pain points through support data",
      "Estimate development budget and timeline",
      "Verify IT department capacity",
      "Define specific enhancements to prioritize"
    ],
    
    prerequisites: [
      "User research completed",
      "Enhancement specifications defined",
      "Budget allocated",
      "Development and testing plan approved",
      "Training materials updated"
    ],
    
    tradeoffs: [
      "Development time and cost significant",
      "May not address capacity barriers (facilities still need billing staff)",
      "Requires ongoing maintenance and support",
      "Risk: Enhancements don't address actual usability issues"
    ],
    
    timeframeNote: "Estimated 6-12 months for development and testing. Highly uncertain - could be 3-6 months for minor changes or 12-24 months for major redesign. Assumes internal IT capacity."
  },
  
  {
    id: "R-CLM-06",
    stage: "claims",
    addressesHypotheses: ["H-CLM-03"],
    name: "Conduct patient demand generation",
    description: "Public awareness campaign on mental health services, benefit coverage, facility availability, and stigma reduction to increase patient utilization.",
    actor: "Multi-stakeholder",
    
    assumptions: {
      institutional: [
        "DOH Health Promotion and mental health advocacy groups can coordinate",
        "PhilHealth willing to support demand generation",
        "Facilities have capacity to serve increased demand"
      ],
      temporal: [
        "Campaign can develop in 2-4 months",
        "Behavior change requires long-term effort (12-24 months)",
        "Facilities can prepare concurrently"
      ],
      financial: [
        "Budget available for media, community outreach, materials",
        "Campaign costs are substantial but acceptable",
        "Cost per incremental patient reached is reasonable"
      ],
      legal: [
        "No approval required for health promotion campaign",
        "Mental health messaging doesn't require special clearance",
        "Facility capacity to serve patients is assured"
      ]
    },
    
    validationNeeded: [
      "Assess baseline awareness and service utilization",
      "Confirm facility capacity to meet increased demand",
      "Coordinate with mental health advocacy groups",
      "Develop campaign strategy and materials",
      "Estimate budget and expected impact"
    ],
    
    prerequisites: [
      "Campaign strategy approved",
      "Materials developed",
      "Distribution channels confirmed",
      "Facilities prepared for potential demand increase",
      "Budget allocated"
    ],
    
    tradeoffs: [
      "Demand generation without capacity may frustrate patients",
      "Long-term behavior change needed (not quick fix)",
      "Difficult to attribute demand increase to campaign",
      "May reveal facility capacity constraints (workforce, space)"
    ],
    
    timeframeNote: "Campaign development 2-4 months, but impact on demand requires 12-24 months. Long-term effort, not immediate solution. Success depends on many factors beyond campaign."
  },
  
  {
    id: "R-CLM-04",
    stage: "claims",
    addressesHypotheses: ["H-CLM-07"],
    name: "Establish claims support helpdesk",
    description: "Dedicated phone/email support for claims submission: Technical troubleshooting, coding questions, documentation guidance, and rule clarification.",
    actor: "PhilHealth",
    
    assumptions: {
      institutional: [
        "PhilHealth Claims Management can allocate staff",
        "Staff have expertise to answer facility questions",
        "Helpdesk can integrate with existing support infrastructure"
      ],
      temporal: [
        "Can launch in 1-2 months with existing staff",
        "Training for helpdesk staff takes <1 month",
        "No lengthy approval process required"
      ],
      financial: [
        "Budget available for staff allocation or outsourcing",
        "Costs are sustainable over time",
        "Call volume is manageable with allocated staff"
      ],
      legal: [
        "No regulatory approval required for support service",
        "Staff can access facility and claims information securely",
        "Data protection standards can be maintained"
      ]
    },
    
    validationNeeded: [
      "Estimate helpdesk demand (call/email volume)",
      "Assess staff capacity and expertise",
      "Develop knowledge base and FAQs",
      "Define service level standards (response time)",
      "Estimate budget for staff or outsourcing"
    ],
    
    prerequisites: [
      "Staff allocated or outsource partner contracted",
      "Knowledge base and FAQ developed",
      "Communication plan to publicize helpdesk",
      "Tracking system for inquiries and resolutions"
    ],
    
    tradeoffs: [
      "Staff time diverted from other activities",
      "May be underutilized if other barriers more significant",
      "Requires ongoing maintenance (FAQ updates, training)",
      "Reactive support (doesn't prevent issues)"
    ],
    
    timeframeNote: "Estimated 1-2 months for setup and launch. Assumes staff can be allocated or outsourcing is straightforward. Ongoing operation required."
  }
];

/**
 * Payment processing stage responses (2 selected for MVP)
 */
const PAYMENT_RESPONSES: ResponseOption[] = [
  {
    id: "R-PAY-01",
    stage: "paid",
    addressesHypotheses: ["H-PAY-01"],
    name: "Accelerate claims adjudication",
    description: "Increase adjudication staff, implement auto-adjudication for straightforward claims, and set service standards (e.g., decisions within 30 days).",
    actor: "PhilHealth",
    
    assumptions: {
      institutional: [
        "PhilHealth has authority to hire staff or reallocate",
        "Auto-adjudication rules can be implemented",
        "Service standards can be set without external approval"
      ],
      temporal: [
        "Staff hiring/reallocation takes 1-3 months",
        "Auto-adjudication development takes 3-6 months",
        "Process improvements can begin immediately"
      ],
      financial: [
        "Budget available for additional staff or overtime",
        "Auto-adjudication development costs acceptable",
        "Ongoing staffing costs sustainable"
      ],
      legal: [
        "Auto-adjudication doesn't violate review requirements",
        "Service standards are policy-level (not legislative)",
        "Faster processing maintains quality assurance"
      ]
    },
    
    validationNeeded: [
      "Conduct workload analysis (current vs. needed capacity)",
      "Assess auto-adjudication feasibility for mental health claims",
        "Estimate budget for staff or technology",
      "Define which claims qualify for auto-adjudication",
      "Set realistic service standards"
    ],
    
    prerequisites: [
      "Workload analysis completed",
      "Budget allocated",
      "Staff hired/reallocated or auto-adjudication implemented",
      "Service standards defined and communicated",
      "Monitoring system for tracking timelines"
    ],
    
    tradeoffs: [
      "May reduce review thoroughness if rushed",
      "Auto-adjudication may miss fraud or errors",
      "Temporary fix if claim volume continues growing",
      "Doesn't address root causes of low participation"
    ],
    
    timeframeNote: "Staff-based: 1-3 months. Automation-based: 3-6 months for development. Assumption: Processing delays are actually the barrier (requires verification)."
  },
  
  {
    id: "R-PAY-02",
    stage: "paid",
    addressesHypotheses: ["H-PAY-02"],
    name: "Improve documentation clarity",
    description: "Clear documentation standards, checklists, examples, and real-time feedback on submission errors to reduce denials due to documentation deficiencies.",
    actor: "PhilHealth",
    
    assumptions: {
      institutional: [
        "PhilHealth Medical Affairs can update standards",
        "Claims Management can provide real-time feedback",
        "Communication channels exist to reach facilities"
      ],
      temporal: [
        "Standards review and update takes 2-4 months",
        "System modifications for feedback take 3-6 months",
        "Materials development concurrent with standards review"
      ],
      financial: [
        "Budget available for materials development and system changes",
        "Costs are one-time or limited",
        "Training delivery costs acceptable"
      ],
      legal: [
        "Standards are policy-level (not regulatory)",
        "No approval required for clarification",
        "Quality assurance requirements maintained"
      ]
    },
    
    validationNeeded: [
      "Analyze denial reasons to confirm documentation is primary issue",
      "Review current standards for clarity",
      "Assess feasibility of real-time feedback system",
      "Estimate budget and timeline",
      "Consult with facilities on documentation challenges"
    ],
    
    prerequisites: [
      "Denial reason analysis completed",
      "Standards reviewed and updated",
      "Checklists and examples developed",
      "Communication plan for dissemination",
      "Training materials prepared"
    ],
    
    tradeoffs: [
      "Standards may still be demanding even if clarified",
      "Doesn't address facility capacity to produce documentation",
      "Requires ongoing communication and updates",
      "Clarity alone may not reduce denials if capacity is constraint"
    ],
    
    timeframeNote: "Estimated 2-4 months for standards and materials. System feedback features add 3-6 months. Assumes clarity is the issue, not capacity."
  }
];

// ============================================================================
// KNOWLEDGE BASE: MONITORING INDICATORS
// ============================================================================

/**
 * Accreditation monitoring indicators (4 for MVP)
 */
const ACCREDITATION_INDICATORS: Indicator[] = [
  {
    id: "I-ACC-O01",
    stage: "accredited",
    type: "outcome",
    name: "Accreditation rate",
    definition: "Percentage of eligible facilities that are accredited for the mental health benefit package",
    numerator: "Number of facilities accredited",
    denominator: "Number of facilities eligible (meeting facility type and basic requirements)",
    dataSource: "PhilHealth accreditation database + facility registry",
    frequency: "Monthly",
    interpretation: "PRIMARY outcome metric. Higher rate indicates accreditation barrier reduction. Track changes after interventions.",
    limitations: [
      "Denominator depends on clear 'eligible' definition",
      "Accreditation status point-in-time (some may lapse)",
      "Does not measure quality of accredited facilities",
      "Does not indicate actual service delivery"
    ]
  },
  
  {
    id: "I-ACC-P01",
    stage: "accredited",
    type: "process",
    name: "Monthly application volume",
    definition: "Number of new accreditation applications submitted per month",
    numerator: "Count of applications submitted in month",
    denominator: "Not applicable (absolute count)",
    dataSource: "PhilHealth accreditation database",
    frequency: "Monthly",
    interpretation: "Leading indicator of accreditation pipeline. Increase suggests awareness or barrier interventions working. Compare to baseline.",
    limitations: [
      "Applications ≠ approvals (need approval rate too)",
      "Seasonal variations possible",
      "Does not indicate application quality",
      "Spikes may be temporary (awareness campaigns)"
    ]
  },
  
  {
    id: "I-ACC-P03",
    stage: "accredited",
    type: "process",
    name: "Median processing time",
    definition: "Median days from application submission to final decision (approved or denied)",
    numerator: "For each application: decision date minus submission date",
    denominator: "All applications with decisions in period",
    dataSource: "PhilHealth accreditation database",
    frequency: "Monthly",
    interpretation: "Administrative efficiency indicator. <30 days = efficient, >90 days = backlog. Faster is better if quality maintained.",
    limitations: [
      "Does not capture applications abandoned before decision",
      "May not reflect facility preparation time before submission",
      "Faster processing doesn't address other barriers",
      "Quality vs. speed trade-off"
    ]
  },
  
  {
    id: "I-ACC-O02",
    stage: "accredited",
    type: "outcome",
    name: "Accreditation rate by facility type",
    definition: "Percentage of eligible facilities accredited, stratified by facility characteristics (public/private, hospital/clinic, urban/rural)",
    numerator: "Number accredited in each category",
    denominator: "Number eligible in each category",
    dataSource: "PhilHealth accreditation database + facility characteristics registry",
    frequency: "Quarterly",
    interpretation: "Equity indicator. Differences across types suggest differential barriers. Monitor to ensure interventions don't favor certain facility types.",
    limitations: [
      "Requires facility classification data",
      "Categories may have different eligible populations",
      "Does not explain why differences exist",
      "Small cell sizes may limit statistical power"
    ]
  }
];

/**
 * Claims submission monitoring indicators (4 for MVP)
 */
const CLAIMS_INDICATORS: Indicator[] = [
  {
    id: "I-CLM-P01",
    stage: "claims",
    type: "process",
    name: "Claims submission rate among accredited",
    definition: "Percentage of accredited facilities submitting at least one claim per month",
    numerator: "Number of accredited facilities submitting ≥1 claim in month",
    denominator: "Total number of accredited facilities",
    dataSource: "PhilHealth claims database + accreditation database",
    frequency: "Monthly",
    interpretation: "PRIMARY process metric for transition from accreditation to service provision. Track changes after claims barrier interventions.",
    limitations: [
      "≥1 claim per month is low bar (facility could submit 1 and stop)",
      "Does not measure service volume or quality",
      "Facilities may submit sporadically",
      "Does not indicate profitability or sustainability"
    ]
  },
  
  {
    id: "I-CLM-P02",
    stage: "claims",
    type: "process",
    name: "Median claims per active facility",
    definition: "Median number of claims submitted per month by facilities submitting ≥1 claim",
    numerator: "For each active facility: count of claims submitted in month",
    denominator: "Active facilities (those submitting ≥1 claim in month)",
    dataSource: "PhilHealth claims database",
    frequency: "Monthly",
    interpretation: "Service volume proxy. Higher median suggests sustained activity. Compare across time and facility types. Baseline: establish distribution.",
    limitations: [
      "Volume ≠ quality or appropriateness",
      "Does not account for facility size or patient population",
      "May be influenced by seasonal patterns",
      "Denominator only includes active facilities (selection bias)"
    ]
  },
  
  {
    id: "I-CLM-P03",
    stage: "claims",
    type: "process",
    name: "Claim rejection rate",
    definition: "Percentage of submitted claims rejected at initial submission (before resubmission)",
    numerator: "Number of claims rejected in month",
    denominator: "Total claims submitted in month",
    dataSource: "PhilHealth claims database",
    frequency: "Monthly",
    interpretation: "Documentation/coding quality indicator. <10% suggests smooth process, >30% suggests system or capacity issues. Track by rejection reason.",
    limitations: [
      "Does not capture claims abandoned before submission",
      "Initial rejection may be corrected on resubmission",
      "Reasons for rejection vary (technical, documentation, eligibility)",
      "Low rate could indicate lax review or well-prepared facilities"
    ]
  },
  
  {
    id: "I-CLM-O02",
    stage: "claims",
    type: "outcome",
    name: "Total patients served",
    definition: "Total unique patients appearing in submitted claims (quarterly)",
    numerator: "Count of unique patient identifiers in claims",
    denominator: "Estimated mental health burden (if available) or total eligible population",
    dataSource: "PhilHealth claims database (patient identifiers)",
    frequency: "Quarterly",
    interpretation: "Ultimate outcome metric: service delivery to population. Compare to burden estimates. Track growth over time.",
    limitations: [
      "Requires unique patient identifiers in claims",
      "Denominator (burden estimate) may be unavailable or inaccurate",
      "Patients served ≠ appropriate care or good outcomes",
      "Does not capture care outside insurance system"
    ]
  }
];

/**
 * Payment processing monitoring indicators (4 for MVP)
 */
const PAYMENT_INDICATORS: Indicator[] = [
  {
    id: "I-PAY-O01",
    stage: "paid",
    type: "outcome",
    name: "Payment receipt rate",
    definition: "Percentage of facilities submitting claims that receive at least one payment",
    numerator: "Number of facilities receiving ≥1 payment in period",
    denominator: "Number of facilities submitting ≥1 claim in period",
    dataSource: "PhilHealth payment database + claims database",
    frequency: "Monthly",
    interpretation: "PRIMARY outcome metric for cascade completion. Track changes after payment barrier interventions. High rate (>80%) suggests smooth payment process.",
    limitations: [
      "≥1 payment is low bar (doesn't measure approval rate)",
      "Time lag between claim submission and payment",
      "Does not indicate payment amount or facility satisfaction",
      "Facilities with low approval rates still counted if ≥1 payment"
    ]
  },
  
  {
    id: "I-PAY-P01",
    stage: "paid",
    type: "process",
    name: "Median adjudication time",
    definition: "Median days from claim submission to adjudication decision (approved or denied)",
    numerator: "For each claim: decision date minus submission date",
    denominator: "All claims with decisions in period",
    dataSource: "PhilHealth claims database",
    frequency: "Weekly (if possible) or monthly",
    interpretation: "Processing efficiency indicator. <30 days = responsive, >60 days = delays. Faster is better but maintain quality review.",
    limitations: [
      "Does not capture claims pending decision (backlog)",
      "May include time waiting for facility to provide additional information",
      "Complex claims may legitimately take longer",
      "Faster doesn't mean better if quality compromised"
    ]
  },
  
  {
    id: "I-PAY-P02",
    stage: "paid",
    type: "process",
    name: "Median payment time",
    definition: "Median days from claim approval to payment disbursement to facility",
    numerator: "For each approved claim: payment date minus approval date",
    denominator: "All approved claims with payments in period",
    dataSource: "PhilHealth payment database",
    frequency: "Weekly or monthly",
    interpretation: "Payment system efficiency indicator. <15 days = efficient, >30 days = delays. Faster is better for facility cash flow.",
    limitations: [
      "Does not capture approved claims not yet paid (payment backlog)",
      "May include delays due to facility bank account issues",
      "Does not indicate whether payment amount is correct",
      "Excludes denied claims (different metric needed)"
    ]
  },
  
  {
    id: "I-PAY-P03",
    stage: "paid",
    type: "process",
    name: "Claims approval rate",
    definition: "Percentage of adjudicated claims that are approved (vs. denied)",
    numerator: "Number of claims approved in period",
    denominator: "Total claims adjudicated (approved + denied) in period",
    dataSource: "PhilHealth claims database",
    frequency: "Monthly",
    interpretation: "Clinical criteria and documentation quality indicator. Very high (>95%) may suggest lax review; very low (<60%) may suggest overly strict criteria. Track by denial reason.",
    limitations: [
      "Does not account for claims pending adjudication",
      "Approval ≠ appropriate care (could approve inappropriate claims)",
      "Denial reasons vary (documentation, medical necessity, eligibility)",
      "Baseline approval rate depends on many factors"
    ]
  }
];

// ============================================================================
// KNOWLEDGE BASE EXPORT
// ============================================================================

/**
 * Complete MVP knowledge base
 */
export const DECISION_KNOWLEDGE = {
  hypotheses: {
    accredited: ACCREDITATION_HYPOTHESES,
    claims: CLAIMS_HYPOTHESES,
    paid: PAYMENT_HYPOTHESES,
  },
  responses: {
    accredited: ACCREDITATION_RESPONSES,
    claims: CLAIMS_RESPONSES,
    paid: PAYMENT_RESPONSES,
  },
  indicators: {
    accredited: ACCREDITATION_INDICATORS,
    claims: CLAIMS_INDICATORS,
    paid: PAYMENT_INDICATORS,
  },
} as const;

/**
 * Helper to get all hypotheses across stages
 */
export function getAllHypotheses(): Hypothesis[] {
  return [
    ...ACCREDITATION_HYPOTHESES,
    ...CLAIMS_HYPOTHESES,
    ...PAYMENT_HYPOTHESES,
  ];
}

/**
 * Helper to get all responses across stages
 */
export function getAllResponses(): ResponseOption[] {
  return [
    ...ACCREDITATION_RESPONSES,
    ...CLAIMS_RESPONSES,
    ...PAYMENT_RESPONSES,
  ];
}

/**
 * Helper to get all indicators across stages
 */
export function getAllIndicators(): Indicator[] {
  return [
    ...ACCREDITATION_INDICATORS,
    ...CLAIMS_INDICATORS,
    ...PAYMENT_INDICATORS,
  ];
}
