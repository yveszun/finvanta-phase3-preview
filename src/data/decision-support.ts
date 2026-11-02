/**
 * Phase 3: Decision Intelligence - Decision Support Logic
 * 
 * This module provides functions to generate decision support outputs
 * based on identified implementation gaps from the cascade.
 */

import type { Scenario, Stage } from "./scenarios";
import { largestDropoff, largestAbsoluteGap } from "./scenarios";
import { DECISION_KNOWLEDGE, type Hypothesis, type ResponseOption, type Indicator, type CascadeStage } from "./decision-knowledge";

// ============================================================================
// TYPES
// ============================================================================

/**
 * Decision context - what we know about the current situation
 */
export interface DecisionContext {
  scenario: Scenario;
  primaryGap: {
    stage: CascadeStage;
    proportionalRate: number;
    absoluteCount: number;
    isAligned: boolean;
  };
}

/**
 * Complete decision support output
 */
export interface DecisionSupport {
  context: DecisionContext;
  hypotheses: Hypothesis[];
  responses: ResponseOption[];
  indicators: Indicator[];
}

// ============================================================================
// MAIN FUNCTION
// ============================================================================

/**
 * Generate decision support for a scenario
 * 
 * @param scenario - Scenario with stage data
 * @returns Complete decision support (hypotheses, responses, indicators)
 */
export function getDecisionSupport(scenario: Scenario): DecisionSupport {
  if (!scenario.stages) {
    throw new Error("Scenario has no stage data");
  }

  const context = buildDecisionContext(scenario);
  const hypotheses = getRelevantHypotheses(context);
  const responses = getRelevantResponses(hypotheses);
  const indicators = getRelevantIndicators(context.primaryGap.stage);

  return {
    context,
    hypotheses,
    responses,
    indicators,
  };
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

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
  };
}

/**
 * Get hypotheses relevant to the identified gap stage
 * 
 * No prioritization - returns all hypotheses for the stage
 */
function getRelevantHypotheses(context: DecisionContext): Hypothesis[] {
  const { primaryGap } = context;
  return DECISION_KNOWLEDGE.hypotheses[primaryGap.stage];
}

/**
 * Get responses relevant to the hypotheses
 * 
 * Returns all responses for the gap stage (they address relevant hypotheses)
 */
function getRelevantResponses(hypotheses: Hypothesis[]): ResponseOption[] {
  if (hypotheses.length === 0) return [];
  
  const stage = hypotheses[0]!.stage;
  return DECISION_KNOWLEDGE.responses[stage];
}

/**
 * Get monitoring indicators for the stage
 * 
 * Returns all indicators for the gap stage
 */
function getRelevantIndicators(stage: CascadeStage): Indicator[] {
  return DECISION_KNOWLEDGE.indicators[stage];
}
