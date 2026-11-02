import { describe, it, expect } from "vitest";
import {
  SCENARIOS,
  conversions,
  largestDropoff,
  getDiagnosticInsights,
  pct,
  num,
  type Stage,
} from "./scenarios";

describe("SCENARIOS data integrity", () => {
  it("should have exactly 6 scenarios", () => {
    expect(SCENARIOS).toHaveLength(6);
  });

  it("should have all scenarios marked as available", () => {
    SCENARIOS.forEach((scenario) => {
      expect(scenario.available).toBe(true);
      expect(scenario.stages).toBeDefined();
      expect(scenario.stages).toHaveLength(4);
    });
  });

  it("should have correct IDs for all scenarios", () => {
    const expectedIds = [
      "low-bottleneck",
      "low-neutral",
      "moderate-bottleneck",
      "moderate-neutral",
      "high-bottleneck",
      "high-neutral",
    ];
    const actualIds = SCENARIOS.map((s) => s.id);
    expect(actualIds).toEqual(expectedIds);
  });

  it("should have all eligible counts equal to 1500", () => {
    SCENARIOS.forEach((scenario) => {
      expect(scenario.stages![0]!.count).toBe(1500);
    });
  });
});

describe("Low Activity scenarios - Phase 4 data accuracy", () => {
  it("low-bottleneck should match Phase 4 low_bottleneck_mix_analytics.json", () => {
    const scenario = SCENARIOS.find((s) => s.id === "low-bottleneck")!;
    expect(scenario.stages).toEqual([
      { key: "eligible", label: "Eligible facilities", short: "Eligible", count: 1500, description: expect.any(String) },
      { key: "accredited", label: "Accredited facilities", short: "Accredited", count: 69, description: expect.any(String) },
      { key: "claims", label: "Facilities filing claims", short: "Filing claims", count: 15, description: expect.any(String) },
      { key: "paid", label: "Facilities receiving payment", short: "Paid", count: 12, description: expect.any(String) },
    ]);
  });

  it("low-bottleneck should calculate 4.6% accreditation rate", () => {
    const scenario = SCENARIOS.find((s) => s.id === "low-bottleneck")!;
    const convs = conversions(scenario.stages!);
    expect(convs[0]!.rate).toBeCloseTo(4.6, 1);
  });

  it("low-neutral should match Phase 4 low_neutral_analytics.json", () => {
    const scenario = SCENARIOS.find((s) => s.id === "low-neutral")!;
    expect(scenario.stages![0]!.count).toBe(1500);
    expect(scenario.stages![1]!.count).toBe(69);
    expect(scenario.stages![2]!.count).toBe(14);
    expect(scenario.stages![3]!.count).toBe(14); // 100% payment rate
  });
});

describe("Moderate Activity scenarios - Phase 4 data accuracy", () => {
  it("moderate-bottleneck should match Phase 4 moderate_bottleneck_mix_analytics.json", () => {
    const scenario = SCENARIOS.find((s) => s.id === "moderate-bottleneck")!;
    expect(scenario.stages![0]!.count).toBe(1500);
    expect(scenario.stages![1]!.count).toBe(216);
    expect(scenario.stages![2]!.count).toBe(84);
    expect(scenario.stages![3]!.count).toBe(69);
  });

  it("moderate-bottleneck should calculate 14.4%, 38.9%, 82.1% conversion rates", () => {
    const scenario = SCENARIOS.find((s) => s.id === "moderate-bottleneck")!;
    const convs = conversions(scenario.stages!);
    
    // Accreditation: 216/1500 = 14.4%
    expect(convs[0]!.rate).toBeCloseTo(14.4, 1);
    
    // Claims: 84/216 = 38.9%
    expect(convs[1]!.rate).toBeCloseTo(38.9, 1);
    
    // Payment: 69/84 = 82.1%
    expect(convs[2]!.rate).toBeCloseTo(82.1, 1);
  });

  it("moderate-neutral should match Phase 4 moderate_neutral_analytics.json", () => {
    const scenario = SCENARIOS.find((s) => s.id === "moderate-neutral")!;
    expect(scenario.stages![0]!.count).toBe(1500);
    expect(scenario.stages![1]!.count).toBe(222);
    expect(scenario.stages![2]!.count).toBe(89);
    expect(scenario.stages![3]!.count).toBe(89); // 100% payment rate
  });
});

describe("High Activity scenarios - Phase 4 data accuracy", () => {
  it("high-bottleneck should match Phase 4 high_bottleneck_mix_analytics.json", () => {
    const scenario = SCENARIOS.find((s) => s.id === "high-bottleneck")!;
    expect(scenario.stages![0]!.count).toBe(1500);
    expect(scenario.stages![1]!.count).toBe(514);
    expect(scenario.stages![2]!.count).toBe(358);
    expect(scenario.stages![3]!.count).toBe(292);
  });

  it("high-neutral should match Phase 4 high_neutral_analytics.json", () => {
    const scenario = SCENARIOS.find((s) => s.id === "high-neutral")!;
    expect(scenario.stages![0]!.count).toBe(1500);
    expect(scenario.stages![1]!.count).toBe(528);
    expect(scenario.stages![2]!.count).toBe(370);
    expect(scenario.stages![3]!.count).toBe(370); // 100% payment rate
  });
});

describe("conversions() calculation", () => {
  it("should calculate correct stage-to-stage conversions", () => {
    const stages: Stage[] = [
      { key: "eligible", label: "Eligible", short: "Eligible", count: 1000, description: "" },
      { key: "accredited", label: "Accredited", short: "Accredited", count: 200, description: "" },
      { key: "claims", label: "Claims", short: "Claims", count: 100, description: "" },
      { key: "paid", label: "Paid", short: "Paid", count: 80, description: "" },
    ];

    const convs = conversions(stages);
    
    expect(convs).toHaveLength(3);
    expect(convs[0]!.rate).toBe(20); // 200/1000
    expect(convs[1]!.rate).toBe(50); // 100/200
    expect(convs[2]!.rate).toBe(80); // 80/100
  });

  it("should use correct denominator for each conversion", () => {
    const stages: Stage[] = [
      { key: "eligible", label: "Eligible", short: "Eligible", count: 1500, description: "" },
      { key: "accredited", label: "Accredited", short: "Accredited", count: 216, description: "" },
      { key: "claims", label: "Claims", short: "Claims", count: 84, description: "" },
      { key: "paid", label: "Paid", short: "Paid", count: 69, description: "" },
    ];

    const convs = conversions(stages);
    
    // Accreditation uses eligible as denominator
    expect(convs[0]!.from.count).toBe(1500);
    expect(convs[0]!.to.count).toBe(216);
    
    // Claims uses accredited as denominator
    expect(convs[1]!.from.count).toBe(216);
    expect(convs[1]!.to.count).toBe(84);
    
    // Payment uses claims as denominator
    expect(convs[2]!.from.count).toBe(84);
    expect(convs[2]!.to.count).toBe(69);
  });
});

describe("largestDropoff() bottleneck identification", () => {
  it("should identify accreditation bottleneck in low-bottleneck scenario", () => {
    const scenario = SCENARIOS.find((s) => s.id === "low-bottleneck")!;
    const bottleneck = largestDropoff(scenario.stages!);
    
    expect(bottleneck.key).toBe("accredited");
    expect(bottleneck.name).toBe("Accreditation");
    expect(bottleneck.rate).toBeCloseTo(4.6, 1);
  });

  it("should identify accreditation bottleneck in moderate-bottleneck scenario", () => {
    const scenario = SCENARIOS.find((s) => s.id === "moderate-bottleneck")!;
    const bottleneck = largestDropoff(scenario.stages!);
    
    expect(bottleneck.key).toBe("accredited");
    expect(bottleneck.rate).toBeCloseTo(14.4, 1);
  });

  it("should identify accreditation bottleneck in high-bottleneck scenario", () => {
    const scenario = SCENARIOS.find((s) => s.id === "high-bottleneck")!;
    const bottleneck = largestDropoff(scenario.stages!);
    
    expect(bottleneck.key).toBe("accredited");
    expect(bottleneck.rate).toBeCloseTo(34.3, 1);
  });

  it("should identify claims bottleneck when accreditation is higher", () => {
    const stages: Stage[] = [
      { key: "eligible", label: "Eligible", short: "Eligible", count: 1000, description: "" },
      { key: "accredited", label: "Accredited", short: "Accredited", count: 900, description: "" }, // 90%
      { key: "claims", label: "Claims", short: "Claims", count: 100, description: "" }, // 11.1%
      { key: "paid", label: "Paid", short: "Paid", count: 80, description: "" }, // 80%
    ];

    const bottleneck = largestDropoff(stages);
    expect(bottleneck.key).toBe("claims");
  });

  it("should identify payment bottleneck when it is the lowest", () => {
    const stages: Stage[] = [
      { key: "eligible", label: "Eligible", short: "Eligible", count: 1000, description: "" },
      { key: "accredited", label: "Accredited", short: "Accredited", count: 900, description: "" }, // 90%
      { key: "claims", label: "Claims", short: "Claims", count: 800, description: "" }, // 88.9%
      { key: "paid", label: "Paid", short: "Paid", count: 100, description: "" }, // 12.5%
    ];

    const bottleneck = largestDropoff(stages);
    expect(bottleneck.key).toBe("paid");
  });
});

describe("getDiagnosticInsights() dynamic text generation", () => {
  it("should return accreditation insights for accreditation bottleneck", () => {
    const scenario = SCENARIOS.find((s) => s.id === "moderate-bottleneck")!;
    const insights = getDiagnosticInsights(scenario.stages!);
    
    expect(insights.bottleneck.key).toBe("accredited");
    expect(insights.hypothesis).toContain("Accreditation requirements");
    expect(insights.investigation).toContain("accreditation requirements");
  });

  it("should return claims insights for claims bottleneck", () => {
    const stages: Stage[] = [
      { key: "eligible", label: "Eligible", short: "Eligible", count: 1000, description: "" },
      { key: "accredited", label: "Accredited", short: "Accredited", count: 900, description: "" },
      { key: "claims", label: "Claims", short: "Claims", count: 100, description: "" },
      { key: "paid", label: "Paid", short: "Paid", count: 80, description: "" },
    ];

    const insights = getDiagnosticInsights(stages);
    
    expect(insights.bottleneck.key).toBe("claims");
    expect(insights.hypothesis).toContain("operational capacity");
    expect(insights.investigation).toContain("claims submission infrastructure");
  });

  it("should return payment insights for payment bottleneck", () => {
    const stages: Stage[] = [
      { key: "eligible", label: "Eligible", short: "Eligible", count: 1000, description: "" },
      { key: "accredited", label: "Accredited", short: "Accredited", count: 900, description: "" },
      { key: "claims", label: "Claims", short: "Claims", count: 800, description: "" },
      { key: "paid", label: "Paid", short: "Paid", count: 100, description: "" },
    ];

    const insights = getDiagnosticInsights(stages);
    
    expect(insights.bottleneck.key).toBe("paid");
    expect(insights.hypothesis).toContain("adjudication delays");
    expect(insights.investigation).toContain("adjudication timelines");
  });

  it("should always return hypothesis and investigation text", () => {
    SCENARIOS.forEach((scenario) => {
      const insights = getDiagnosticInsights(scenario.stages!);
      
      expect(insights.hypothesis).toBeTruthy();
      expect(insights.investigation).toBeTruthy();
      expect(typeof insights.hypothesis).toBe("string");
      expect(typeof insights.investigation).toBe("string");
      expect(insights.hypothesis.length).toBeGreaterThan(50);
      expect(insights.investigation.length).toBeGreaterThan(50);
    });
  });
});

describe("pct() and num() formatting utilities", () => {
  it("should format percentages with 1 decimal place", () => {
    expect(pct(14.4)).toBe("14.4%");
    expect(pct(38.888)).toBe("38.9%");
    expect(pct(100)).toBe("100.0%");
    expect(pct(0)).toBe("0.0%");
  });

  it("should format numbers with locale separators", () => {
    expect(num(1500)).toBe("1,500");
    expect(num(216)).toBe("216");
    expect(num(1000000)).toBe("1,000,000");
  });
});

describe("Cascade monotonicity (data sanity check)", () => {
  it("all scenarios should have monotonically decreasing counts", () => {
    SCENARIOS.forEach((scenario) => {
      const stages = scenario.stages!;
      for (let i = 1; i < stages.length; i++) {
        expect(stages[i]!.count).toBeLessThanOrEqual(stages[i - 1]!.count);
      }
    });
  });

  it("neutral scenarios should have 100% payment rate", () => {
    const neutralScenarios = SCENARIOS.filter((s) => s.id.includes("neutral"));
    
    neutralScenarios.forEach((scenario) => {
      const stages = scenario.stages!;
      const claimsCount = stages[2]!.count;
      const paidCount = stages[3]!.count;
      
      expect(paidCount).toBe(claimsCount);
    });
  });

  it("bottleneck scenarios should have payment rate < 100%", () => {
    const bottleneckScenarios = SCENARIOS.filter((s) => s.id.includes("bottleneck"));
    
    bottleneckScenarios.forEach((scenario) => {
      const stages = scenario.stages!;
      const claimsCount = stages[2]!.count;
      const paidCount = stages[3]!.count;
      
      expect(paidCount).toBeLessThan(claimsCount);
    });
  });
});
