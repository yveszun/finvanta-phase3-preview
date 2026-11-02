# Finvanta Health — Executive Intelligence prototype · Handoff

Standalone design prototype. Synthetic demonstration data only. Not connected to the
existing Finvanta repositories or deployments.

## Repository

`finvanta-health-executive-intelligence` — a brand-new private repository, created and
synced from Project settings → Git. It is the prototype's only home; the existing Finvanta
repositories are never pushed to, and nothing here is deployed to the live Finvanta app.

- Lovable pushes accepted work to the synced branch of this repository automatically.
- Kiro should be added as a collaborator on this repository only.
- Anything Kiro brings back into the live Finvanta application arrives as its own
  separately reviewed change, not as a sync from here.

## Stack
React 19 + TypeScript, Vite 7, TanStack Router/Start, Tailwind CSS v4 (tokens in `src/styles.css`).

## Portable code (what to lift into the existing React/Vite app)
| File | Purpose |
|---|---|
| `src/data/scenarios.ts` | Scenario + stage data, `conversions()`, `largestDropoff()` (the only rule logic — swap for the real engine) |
| `src/components/finvanta/Cascade.tsx` | Interactive facility cascade + stage-detail panel |
| `src/components/finvanta/Shell.tsx` | Disclosure bar, header/nav, scenario selector, `Tag`, `Unavailable` |
| `src/components/finvanta/scenario-context.tsx` | Scenario state (React context) |
| `src/routes/index.tsx` | Executive Intelligence screen |
| `src/routes/explore.tsx` | Explore the Evidence (`?section=overview|cascade|claims|regional|insights`) |
| `src/styles.css` | Design tokens: navy/warm-neutral palette, amber accent, `eyebrow`, `tabular` |

Fonts (Google Fonts link in `src/routes/__root.tsx`): Instrument Serif, IBM Plex Sans, IBM Plex Mono.

Router-specific bits to adapt if the target app uses another router: `Link` imports,
`createFileRoute` wrappers, and `Route.useSearch()` in `explore.tsx`.

## Integration rules
- Feed real data through the `Scenario`/`Stage` shape; components derive all rates from counts.
- Keep evidence types distinct: Observed metric / Rule-based finding / Possible explanation / Suggested investigation.
- Counts are facilities — never relabel as claims or patients.
- Unavailable scenarios/sections must show empty states, never estimated values.

## Run locally
```
bun install   # or npm install
bun run dev
```
