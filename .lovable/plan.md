

## Problem Analysis

Every page and component uses extremely low opacity values that make text and UI elements nearly invisible against the dark background (`hsl(240 6% 3%)`). This is a systematic issue across **12 files**.

### Opacity Mapping (Current → Fixed)

The fix follows a consistent rule set:

| Element Type | Current Opacity | Target Opacity |
|---|---|---|
| Section labels, tracking text | `/0.10` - `/0.15` | `/0.40` - `/0.50` |
| Descriptive text, subtitles | `/0.20` - `/0.25` | `/0.50` - `/0.60` |
| Body text, secondary content | `/0.30` - `/0.35` | `/0.55` - `/0.65` |
| Primary text, labels | `/0.40` - `/0.50` | `/0.70` - `/0.80` |
| Interactive/hover states | `/0.50` - `/0.60` | `/0.80` - `/0.90` |
| Borders | `/0.02` - `/0.04` | `/0.06` - `/0.10` |
| Backgrounds | `/0.03` - `/0.04` | `/0.06` - `/0.08` |
| Icons | `/0.10` - `/0.20` | `/0.35` - `/0.50` |
| Animated breathing text | `[0.08, 0.18, 0.08]` | `[0.3, 0.6, 0.3]` |

### Files to Fix (12 files)

#### Pages (7):
1. **`src/pages/Landing.tsx`** — Nav text, subtitle, prompt suggestions, footer labels all near-invisible
2. **`src/pages/Dashboard.tsx`** — Suggestions, session items, status text too dim
3. **`src/pages/Capabilities.tsx`** — Stats labels, module items, capability descriptions, source list invisible
4. **`src/pages/Engine.tsx`** — Foundation records, maturity percentages, module details, chain steps invisible
5. **`src/pages/Architecture.tsx`** — Layer subtitles, capabilities text, tool contract rows, maturity descriptions, flow steps invisible
6. **`src/pages/Connections.tsx`** — Source records, capability chips (hidden on hover only), connector descriptions invisible
7. **`src/pages/Workspace.tsx`** — Quick prompts, capability hints, meta text, governance text, agent dots, top bar stats invisible

#### Components (5):
8. **`src/components/workspace/ToolActivationBar.tsx`** — Chain steps, tool labels, source tags, "TOOLS"/"FONTI" labels invisible
9. **`src/components/workspace/ApprovalPanel.tsx`** — Description, detail labels, governance strip text invisible
10. **`src/components/workspace/CanvasViews.tsx`** — KPI labels, source indicators, table headers, audit trail entries, delivery plan text invisible
11. **`src/components/workspace/ExecutionFlow.tsx`** — Step labels, detail text, progress percentage invisible
12. **`src/components/workspace/VoicePresence.tsx`** — State label, ElevenLabs text invisible
13. **`src/components/workspace/TemplateSuggest.tsx`** — Button label invisible

#### Also (minor):
14. **`src/components/layout/FloatingDock.tsx`** — Inactive icons slightly too dim
15. **`src/components/ai/AiEntity.tsx`** — Ring border too faint

### Approach

Apply the opacity mapping systematically across all files. Keep the premium dark aesthetic but ensure every element is **readable**. No layout or structural changes — purely opacity/color adjustments for contrast.

