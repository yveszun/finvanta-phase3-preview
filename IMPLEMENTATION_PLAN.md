# Focused Improvement Milestone: Implementation Plan
**Repository:** `yveszun/screenshot-exact-match`  
**Planned Branch:** `feature/evidence-transparency-improvements`  
**Estimated Effort:** 4-5 hours  
**Status:** ⏸️ **AWAITING APPROVAL**

---

## Scope Summary

### ✅ INCLUDED
1. **Strengthen synthetic data disclosure** - Larger, more visible banner with warning icon
2. **Plain language for executives** - Replace technical terms ("proportional drop-off" → "implementation gap")
3. **Distinguish proportional vs. absolute** - Show both metrics, explain when they diverge
4. **Preserve Phase 4 scenarios** - All 6 scenarios unchanged (data, IDs, structure)

### ❌ EXCLUDED
1. **No severity bands** - No arbitrary thresholds (crisis/serious/concerning)
2. **No invented scenarios** - Preserve Phase 4 validated dataset integrity
3. **No causal claims** - No cost estimates or intervention effectiveness statements
4. **No visual redesign** - Only clarity improvements to existing design

---

## File-by-File Changes

### 1. `src/components/finvanta/Shell.tsx` (~15 lines)
**Purpose:** Strengthen synthetic data disclosure

**Current (line 12-17):**
```tsx
<div className="relative z-10 bg-ink text-ink-foreground" role="note">
  <div className="mx-auto flex max-w-6xl items-center gap-2 px-5 py-2 text-xs">
    <span className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
    <span className="min-w-0">
      Synthetic demonstration data. Not actual PhilHealth performance.
    </span>
  </div>
</div>
```

**Proposed:**
```tsx
<div className="relative z-10 bg-amber-50 dark:bg-amber-950 border-b border-amber-200 dark:border-amber-800" 
     role="alert" aria-label="Data disclosure">
  <div className="mx-auto flex max-w-6xl items-center gap-3 px-5 py-2.5">
    <svg className="h-4 w-4 shrink-0 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
    </svg>
    <span className="min-w-0 text-sm font-medium text-amber-900 dark:text-amber-100">
      Illustrative demonstration: All data shown are synthetic scenarios, not actual PhilHealth records.
    </span>
  </div>
</div>
```

**Also add below scenario selector (line 44):**
```tsx
<p className="mt-1 text-[11px] text-muted-foreground">
  Synthetic scenarios based on illustrative benefit implementation patterns
</p>
```

**Changes:**
- Font size: `text-xs` (10px) → `text-sm` (14px) = 40% larger
- Background: Dark (`bg-ink`) → Amber alert color (`bg-amber-50`)
- Icon: Dot → Warning triangle (standard alert icon)
- Wording: "Synthetic demonstration data" → "Illustrative demonstration: All data shown are synthetic scenarios"

**Rationale:** Makes disclosure unmistakable without cluttering design.

---

### 2. `src/data/scenarios.ts` (+30 lines)
**Purpose:** Add absolute drop-off calculation, no data changes

**New functions:**
```typescript
/**
 * Calculate absolute drop-offs (facility counts lost at each stage).
 * Used alongside proportional drop-offs to provide complete picture.
 */
export function absoluteDropoffs(stages: Stage[]) {
  return stages.slice(1).map((s, i) => ({
    key: s.key,
    name: conversionNames[s.key] ?? s.label,
    from: stages[i]!,
    to: s,
    facilitiesLost: stages[i]!.count - s.count,
  }));
}

/**
 * Find the stage with the largest absolute drop-off (most facilities lost).
 */
export function largestAbsoluteDropoff(stages: Stage[]) {
  return absoluteDropoffs(stages).reduce((a, b) => 
    (b.facilitiesLost > a.facilitiesLost ? b : a)
  );
}
```

**Example output (Moderate scenario):**
```
absoluteDropoffs() returns:
  - Accreditation: 1,284 facilities lost (1500 - 216)
  - Claims: 132 facilities lost (216 - 84)
  - Payment: 15 facilities lost (84 - 69)

largestAbsoluteDropoff() returns:
  - Stage: "Accreditation"
  - Facilities lost: 1,284
```

**Rationale:** Complements existing `largestDropoff()` (proportional) with absolute metric. Simple subtraction, mathematically straightforward.

---

### 3. `src/routes/index.tsx` (~25 lines)
**Purpose:** Plain language, distinguish proportional vs. absolute

**Current primary finding (lines 62-67):**
```tsx
<h3 className="mt-3 font-display text-2xl leading-snug sm:text-3xl">
  Largest proportional drop-off: {worst.name.toLowerCase()}.
</h3>
<p className="mt-2 text-sm text-muted-foreground">
  Only {pct(worst.rate)} of eligible facilities progressed through this stage 
  in the illustrative dataset ({num(worst.to.count)} of {num(worst.from.count)}). 
  This locates the drop-off; it does not establish its cause.
</p>
```

**Proposed:**
```tsx
<h3 className="mt-3 font-display text-2xl leading-snug sm:text-3xl">
  Largest implementation gap: {worst.name.toLowerCase()}.
</h3>
<p className="mt-2 text-sm text-muted-foreground">
  Only {pct(worst.rate)} of facilities progress through this stage 
  ({num(worst.to.count)} of {num(worst.from.count)} facilities).
</p>
<p className="mt-2 text-xs text-muted-foreground">
  <strong>Proportional:</strong> {worst.name} has the lowest conversion rate.{' '}
  <strong>Absolute:</strong> {num(largestAbsolute.facilitiesLost)} facilities lost at {largestAbsolute.name}.
  {worst.key === largestAbsolute.key 
    ? " Proportional and absolute measures both identify this stage." 
    : " Further investigation needed to determine priority between these stages."}
</p>
```

**Also update investigation card (lines 66-71):**
```tsx
<p className="mt-3 font-display text-xl leading-snug">
  {investigation}
</p>
<p className="mt-2 text-xs text-muted-foreground">
  This suggestion is generated by rule-based logic identifying the stage with 
  the lowest conversion rate. Investigation is required to determine root causes 
  and evaluate potential interventions.
</p>
```

**Changes:**
- "Largest proportional drop-off" → "Largest implementation gap"
- Add separate line showing proportional vs. absolute comparison
- Add disclaimer to investigation card
- Explicit statement when measures diverge

**Rationale:** 
- Plain language ("implementation gap" vs. "proportional drop-off")
- Transparency about metrics (shows both, explains alignment or divergence)
- Honest about limitations (investigation required for causation/interventions)

---

### 4. `src/routes/explore.tsx` (~15 lines)
**Purpose:** Enhance Diagnostic Insights with absolute drop-off

**Current Step 1 (line 164-166):**
```tsx
<Step kind="observed" n={1} title="What the data show">
  {bottleneck.name} has the lowest stage conversion: {pct(bottleneck.rate)} 
  ({num(bottleneck.to.count)} of {num(bottleneck.from.count)} eligible facilities).
</Step>
```

**Proposed:**
```tsx
<Step kind="observed" n={1} title="What the data show">
  {bottleneck.name} has the lowest stage conversion: {pct(bottleneck.rate)} 
  ({num(bottleneck.to.count)} of {num(bottleneck.from.count)} facilities).
  <br/><br/>
  <strong>Absolute drop-off:</strong> {num(largestAbsolute.facilitiesLost)} 
  facilities lost at {largestAbsolute.name}.
  {bottleneck.key !== largestAbsolute.key && (
    <span className="text-accent"> Note: Proportional and absolute measures 
    identify different stages.</span>
  )}
</Step>
```

**Current Step 2 (lines 167-170):**
```tsx
<Step kind="rule" n={2} title="What the rule concludes">
  The stage with the lowest conversion is flagged as the largest proportional 
  drop-off. This locates the drop-off; it does not explain it.
</Step>
```

**Proposed:**
```tsx
<Step kind="rule" n={2} title="What the rule concludes">
  Finvanta identifies the stage with the lowest conversion rate as the 
  proportional bottleneck. This locates where the largest percentage of 
  facilities drop out, but does not determine the most actionable intervention 
  point or explain causation.
</Step>
```

**Changes:**
- Add absolute drop-off to observed data (Step 1)
- Highlight when proportional ≠ absolute
- Clarify rule limitations (doesn't determine actionability)

**Rationale:** Complete picture for analysts reviewing evidence.

---

### 5. `src/data/scenarios.test.ts` (+25 lines)
**Purpose:** Test coverage for new calculations

**New test suites:**
```typescript
describe("absoluteDropoffs() calculation", () => {
  it("should calculate facilities lost at each stage", () => {
    const scenario = SCENARIOS.find(s => s.id === "moderate-bottleneck")!;
    const drops = absoluteDropoffs(scenario.stages!);
    
    expect(drops).toHaveLength(3);
    expect(drops[0]!.facilitiesLost).toBe(1284); // 1500 - 216
    expect(drops[1]!.facilitiesLost).toBe(132);  // 216 - 84
    expect(drops[2]!.facilitiesLost).toBe(15);   // 84 - 69
  });

  it("should include stage metadata", () => {
    const scenario = SCENARIOS.find(s => s.id === "moderate-bottleneck")!;
    const drops = absoluteDropoffs(scenario.stages!);
    
    expect(drops[0]!.key).toBe("accredited");
    expect(drops[0]!.name).toBe("Accreditation");
    expect(drops[0]!.from.count).toBe(1500);
    expect(drops[0]!.to.count).toBe(216);
  });
});

describe("largestAbsoluteDropoff() identification", () => {
  it("should identify stage with most facilities lost", () => {
    const scenario = SCENARIOS.find(s => s.id === "moderate-bottleneck")!;
    const largest = largestAbsoluteDropoff(scenario.stages!);
    
    expect(largest.key).toBe("accredited");
    expect(largest.facilitiesLost).toBe(1284);
  });

  it("should work for all 6 scenarios", () => {
    SCENARIOS.forEach(scenario => {
      const largest = largestAbsoluteDropoff(scenario.stages!);
      expect(largest.facilitiesLost).toBeGreaterThan(0);
      expect(largest.key).toMatch(/accredited|claims|paid/);
    });
  });
});

describe("Proportional vs. Absolute alignment", () => {
  it("should document when measures align or diverge", () => {
    SCENARIOS.forEach(scenario => {
      const proportional = largestDropoff(scenario.stages!);
      const absolute = largestAbsoluteDropoff(scenario.stages!);
      
      console.log(`${scenario.id}: Proportional=${proportional.key}, Absolute=${absolute.key}, Align=${proportional.key === absolute.key}`);
      
      expect(proportional.key).toMatch(/accredited|claims|paid/);
      expect(absolute.key).toMatch(/accredited|claims|paid/);
    });
  });
});
```

**Rationale:** Verify calculations correct for all 6 scenarios.

---

## Wording Risk Assessment

### Proposed Language Changes

| Current | Proposed | Risk | Notes |
|---------|----------|------|-------|
| "Proportional drop-off" | "Implementation gap" | ✅ LOW | More accessible, same meaning |
| "This locates the drop-off" | "This identifies where implementation stalls" | ✅ LOW | Plain language |
| "Both measures align" | "Both identify this stage" | ✅ LOW | Avoids implying validation |
| Scenario: "Mixed Bottlenecks" | Keep as-is | ✅ NONE | No change to scenario names |

### Statements Reviewed for Evidence Overreach

**✅ ACCEPTABLE: Investigation card disclaimer**
```
"Investigation is required to determine root causes and evaluate potential interventions."
```
- States investigation needed (honest about limits)
- "Determine" and "evaluate" are investigative verbs (not prescriptive)
- Doesn't claim to know causes or effectiveness

**✅ ACCEPTABLE: Hypothesis text (existing)**
```
"These are hypotheses to test, not findings."
```
- Already explicit about uncertainty
- No changes proposed

**✅ ACCEPTABLE: Absolute vs. proportional divergence**
```
"Further investigation needed to determine priority between these stages."
```
- Acknowledges that data alone doesn't determine priority
- Correctly states investigation needed

**⚠️ MONITOR: "Implementation gap"**
- Could imply there's a target or benchmark
- **Mitigation:** Context makes clear it's descriptive (gap between stages), not normative
- **Verdict:** Acceptable with existing context

---

## Changes Summary

| File | Purpose | Lines Added | Lines Changed | Risk |
|------|---------|-------------|---------------|------|
| `Shell.tsx` | Disclosure banner | 10 | 5 | LOW |
| `scenarios.ts` | Absolute drop-offs | 30 | 0 | LOW |
| `index.tsx` | Plain language + comparison | 15 | 10 | LOW |
| `explore.tsx` | Enhanced Step 1 & 2 | 10 | 5 | LOW |
| `scenarios.test.ts` | Test coverage | 25 | 0 | NONE |
| **Total** | | **90** | **20** | **LOW** |

**Net addition:** ~110 lines  
**Phase 4 scenarios:** Unchanged (0 lines modified)  
**Calculation logic:** New functions added, existing logic untouched

---

## Quality Assurance Checklist

### Automated Testing
- [ ] Add `absoluteDropoffs()` test suite (3 tests)
- [ ] Add `largestAbsoluteDropoff()` test suite (2 tests)
- [ ] Add proportional vs. absolute alignment test (1 test)
- [ ] Run full test suite: `bun test` (expect 35 pass, 0 fail)
- [ ] Run production build: `bun run build` (expect success)

### Manual Verification
- [ ] All 6 scenarios still load correctly
- [ ] Disclosure banner visible on desktop and mobile
- [ ] Proportional vs. absolute comparison shows in Executive view
- [ ] Step 1 shows absolute drop-off in Diagnostic Insights
- [ ] Investigation disclaimer appears below recommendation

### Scenario-Specific Checks
- [ ] Moderate-bottleneck: Verify proportional = absolute (both accreditation)
- [ ] All scenarios: Verify absolute drop-off calculates correctly
- [ ] Verify no scenario names or data changed

---

## Implementation Timeline

**Total: 4-5 hours**

### Hour 1: Disclosure transparency
- Update Shell.tsx disclosure banner (amber background, warning icon, larger text)
- Add scenario selector attribution
- Test on desktop and mobile
- Commit: "feat: strengthen synthetic data disclosure"

### Hour 2: Absolute drop-off calculations
- Add `absoluteDropoffs()` and `largestAbsoluteDropoff()` functions
- Add test suites
- Run tests, verify all pass
- Commit: "feat: add absolute drop-off calculation"

### Hour 3: Executive Intelligence updates
- Update primary finding card (plain language, add comparison)
- Add investigation disclaimer
- Test visual layout
- Commit: "feat: improve executive communication clarity"

### Hour 4: Diagnostic Insights updates
- Enhance Step 1 with absolute drop-off
- Clarify Step 2 limitations
- Test all 6 scenarios
- Commit: "feat: enhance diagnostic insights transparency"

### Hour 5: QA and documentation
- Run full test suite
- Run production build
- Manual testing of all 6 scenarios
- Update CHANGELOG
- Create pull request

---

## Questions for Approval

### 1. Disclosure banner styling
**Proposed:** Amber background (`bg-amber-50`), warning triangle icon, 14px text

**Alternative options:**
- A. Blue informational banner (`bg-blue-50`, info icon)
- B. Current dark banner but larger text only
- C. Amber as proposed

**Which do you prefer?**

---

### 2. Scenario names
**Current:** "Low Activity (Mixed Bottlenecks)", "Moderate Activity (No Payment Bottleneck)"

**Options:**
- A. Keep exactly as-is (no changes)
- B. Add subtitle attribute to data structure (display separately, not in dropdown)
- C. Simplify to "Low Participation", "Moderate Participation", "High Participation" only

**Recommendation:** Option A (no changes) to preserve Phase 4 naming

**Which do you prefer?**

---

### 3. Absolute vs. proportional display
**Proposed:** Show comparison in both Executive Intelligence and Diagnostic Insights

**Alternative:**
- A. Show in both places (more visibility)
- B. Show only in Diagnostic Insights (keep Executive simple)

**Recommendation:** Option A (both places) for consistency

**Which do you prefer?**

---

### 4. Investigation disclaimer strength
**Proposed:** "Investigation is required to determine root causes and evaluate potential interventions."

**Alternatives:**
- A. As proposed (moderate strength)
- B. Stronger: "Further investigation is required before any interventions can be designed or implemented."
- C. Softer: "Further investigation recommended to understand root causes."

**Recommendation:** Option A (balanced - acknowledges limits without overstating them)

**Which do you prefer?**

---

### 5. Scope confirmation
**Excluded from this milestone:**
- ✅ Severity bands (no arbitrary thresholds) - **Confirmed excluded?**
- ✅ New invented scenarios - **Confirmed excluded?**
- ✅ Cost/budget modeling - **Confirmed excluded?**
- ✅ Intervention effectiveness claims - **Confirmed excluded?**

**Are these exclusions correct?**

---

## Approval Required

**Before proceeding with implementation, please confirm:**

1. ✅ Disclosure banner approach is acceptable
2. ✅ Scenario names should remain unchanged
3. ✅ Absolute vs. proportional comparison adds value
4. ✅ Investigation disclaimer language is sufficient
5. ✅ Scope exclusions are correct
6. ✅ Overall plan aligns with your requirements

**Once approved, I will:**
1. Create feature branch `feature/evidence-transparency-improvements`
2. Implement changes in 4-5 hours
3. Run full test suite and build verification
4. Create pull request for your review
5. **Not merge** until you explicitly approve

---

**Status:** ⏸️ **AWAITING YOUR APPROVAL TO PROCEED**
