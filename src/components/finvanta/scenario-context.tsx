import { createContext, useContext, useState, type ReactNode } from "react";
import { SCENARIOS, type Scenario } from "@/data/scenarios";

type Ctx = { scenario: Scenario; setScenarioId: (id: string) => void };
const ScenarioCtx = createContext<Ctx | null>(null);

export function ScenarioProvider({ children }: { children: ReactNode }) {
  const [id, setScenarioId] = useState("moderate");
  const scenario = SCENARIOS.find((s) => s.id === id) ?? SCENARIOS[0];
  return <ScenarioCtx.Provider value={{ scenario, setScenarioId }}>{children}</ScenarioCtx.Provider>;
}

export function useScenario() {
  const c = useContext(ScenarioCtx);
  if (!c) throw new Error("useScenario outside provider");
  return c;
}
