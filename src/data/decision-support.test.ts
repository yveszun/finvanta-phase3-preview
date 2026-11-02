import { describe, it, expect } from "vitest";
import { getDecisionSupport } from "./decision-support";
import { SCENARIOS } from "./scenarios";

describe("getDecisionSupport", () => {
  it("should return decision support for moderate-bottleneck scenario", () => {
    const scenario = SCENARIOS.find((s) => s.id === "moderate-bottleneck")!;
    const support = getDecisionSupport(scenario);

    // Should identify accreditation as primary gap
    expect(support.context.primaryGap.stage).toBe("accredited");
    expect(support.context.primaryGap.proportionalRate).toBeCloseTo(14.4, 1);

    // Should return 4 accreditation hypotheses
    expect(support.hypotheses).toHaveLength(4);
    expect(support.hypotheses.every((h) => h.stage === "accredited")).toBe(true);

    // Should return 3 accreditation responses
    expect(support.responses).toHaveLength(3);
    expect(support.responses.every((r) => r.stage === "accredited")).toBe(true);

    // Should return 4 accreditation indicators
    expect(support.indicators).toHaveLength(4);
    expect(support.indicators.every((i) => i.stage === "accredited")).toBe(true);
  });

  it("should work for all 6 scenarios", () => {
    SCENARIOS.forEach((scenario) => {
      if (!scenario.stages) return;

      const support = getDecisionSupport(scenario);

      // Should have context
      expect(support.context.scenario.id).toBe(scenario.id);
      expect(support.context.primaryGap.stage).toMatch(/accredited|claims|paid/);

      // Should have hypotheses, responses, indicators
      expect(support.hypotheses.length).toBeGreaterThan(0);
      expect(support.responses.length).toBeGreaterThan(0);
      expect(support.indicators.length).toBeGreaterThan(0);

      // All should be for same stage as primary gap
      expect(support.hypotheses.every((h) => h.stage === support.context.primaryGap.stage)).toBe(true);
      expect(support.responses.every((r) => r.stage === support.context.primaryGap.stage)).toBe(true);
      expect(support.indicators.every((i) => i.stage === support.context.primaryGap.stage)).toBe(true);
    });
  });

  it("should throw error for scenario without stages", () => {
    const scenario = { id: "test", name: "Test", available: false };
    expect(() => getDecisionSupport(scenario)).toThrow("Scenario has no stage data");
  });

  it("all hypotheses should have evidence status 'hypothesis'", () => {
    const scenario = SCENARIOS.find((s) => s.id === "moderate-bottleneck")!;
    const support = getDecisionSupport(scenario);

    support.hypotheses.forEach((h) => {
      expect(h.evidenceStatus).toBe("hypothesis");
    });
  });

  it("all responses should have assumptions defined", () => {
    const scenario = SCENARIOS.find((s) => s.id === "moderate-bottleneck")!;
    const support = getDecisionSupport(scenario);

    support.responses.forEach((r) => {
      expect(r.assumptions).toBeDefined();
      expect(r.assumptions.institutional).toBeInstanceOf(Array);
      expect(r.assumptions.temporal).toBeInstanceOf(Array);
      expect(r.assumptions.financial).toBeInstanceOf(Array);
      expect(r.assumptions.legal).toBeInstanceOf(Array);
      expect(r.validationNeeded).toBeInstanceOf(Array);
      expect(r.validationNeeded.length).toBeGreaterThan(0);
    });
  });

  it("all indicators should have limitations defined", () => {
    const scenario = SCENARIOS.find((s) => s.id === "moderate-bottleneck")!;
    const support = getDecisionSupport(scenario);

    support.indicators.forEach((i) => {
      expect(i.limitations).toBeInstanceOf(Array);
      expect(i.limitations.length).toBeGreaterThan(0);
    });
  });
});
