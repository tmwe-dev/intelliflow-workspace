

## Consolidation Plan: Tool Operativi, Flussi Demo, Governance

### Current State

The prototype already has substantial infrastructure: 7 scenarios with tool/source mapping, ApprovalPanel, ExecutionFlow, ToolActivationBar with per-scenario tools and sources, governance metadata in messages, and the 8-layer Engine page. The core mechanics work.

### What's Actually Missing or Weak

1. **ToolActivationBar** shows tools statically — no sequential "activation" animation during the thinking phase. Tools appear all at once instead of lighting up one-by-one as the system processes.

2. **Voice scenario** doesn't auto-activate voice state (mic/speaking). The "Leggi ad alta voce" flow should trigger `voiceSpeaking` automatically.

3. **TemplateSuggest** exists in canvases but clicking "Salva" does nothing — no feedback, no toast, no confirmation.

4. **ApprovalPanel** doesn't show governance info (role, permission, policy) — it only shows operational details. The governance strip should be part of the approval moment.

5. **No "Save Template" scenario** — the quick prompt "Salva questo flusso come template operativo" falls through to default churn scenario.

6. **No operational chain visualization** — the full Fonte → Unificazione → Tool → Approvazione → Esecuzione → Audit chain isn't shown inline during flows.

7. **Execution completion** always shows generic "Campagna avviata" in ResultCanvas regardless of scenario.

### Plan

#### 1. Enhanced ToolActivationBar with Sequential Animation
- Add a `phase` prop ("activating" | "active" | "done")
- During "activating" phase, tools light up one-by-one with a 300ms stagger and a brief glow effect
- Add a subtle operational chain strip at the bottom: `FONTE → UNIFICA → ANALISI → TOOL → APPROVAZIONE → ESECUZIONE → AUDIT` with the current phase highlighted

#### 2. Governance Strip in ApprovalPanel
- Add an optional `governance` prop: `{ role, permission, policy }`
- Render a subtle strip below the details showing role badge, permission type, and policy constraint
- Visual style: inline, monospace, very subtle — consistent with the existing aesthetic

#### 3. Voice Auto-Activation
- In `Workspace.tsx`, when the "voice" scenario runs, auto-set `voiceSpeaking = true` after the assistant message appears
- Add a brief delay before auto-speaking to feel natural
- The voice waveform becomes part of the flow, not just a manual toggle

#### 4. Template Save Feedback
- Wire `TemplateSuggest.onSave` to show a toast notification ("Template salvato · Disponibile in Template Library")
- In `Workspace.tsx`, add a "template" scenario for "Salva questo flusso come template operativo" with Save Template + Audit Action tools

#### 5. Scenario-Aware ResultCanvas
- Pass a `resultType` prop to ResultCanvas to show contextual completion info (import result vs campaign result vs template saved)
- Show different KPIs and audit trail entries based on the active scenario

#### 6. Add Missing Scenario: "Invio batch con approvazione step-by-step"
- New scenario `batch` with explicit multi-step approval: validate → preview → governance check → approve → execute wave-by-wave
- Reuses existing ApprovalPanel and ExecutionFlow but with more granular steps

### Files to Modify

- `src/components/workspace/ToolActivationBar.tsx` — sequential animation + chain strip
- `src/components/workspace/ApprovalPanel.tsx` — governance strip
- `src/components/workspace/TemplateSuggest.tsx` — toast on save
- `src/pages/Workspace.tsx` — voice auto-activation, new scenarios (template, batch), scenario-aware result canvas
- `src/components/workspace/CanvasViews.tsx` — ResultCanvas accepts scenario context

