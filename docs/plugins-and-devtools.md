# Plugins and DevTools

This document describes the modular plugin system and the developer tools available in FractoState.

## Modular Plugin System

FractoState provides an optional plugin system to extend the behavior of state flows. Plugins interact with the state lifecycle events including initialization, updates, hydration, and can even expose custom runtime operations.

### Usage

Plugins are applied via the `plugins` array in the `FlowOptions` object when defining a flow or using the hook.

```typescript
import { defineFlow } from "fractostate";
import { persist, logger } from "fractostate/plugins";

const ThemeFlow = defineFlow(
  "theme",
  { mode: "dark" },
  {
    plugins: [persist({ key: "app_theme" }), logger({ collapsed: true })],
  },
);
```

### Built-in Plugins

#### persist(options?)

Automatically synchronizes the flow state with browser storage (`localStorage`, `sessionStorage`, or `indexedDB`).

- **options.storage**: "localStorage" | "sessionStorage" | "indexedDB" (default: "localStorage")
- **options.key**: Custom storage key string. Defaults to `fracto_flow_{flowKey}`.

**Extended Operations (`ops.self._persist`)**:
The persist plugin exposes runtime controls accessible via the toolbox:

- `clear()`: Wipes the persisted data for this flow from storage.
- `update()`: Manually pushes the current in-memory state to storage.
- `refresh()`: Re-reads the data from storage and forces a state update.

#### logger(options?)

Logs state changes and lifecycle events to the browser console for debugging purposes.

- **options.collapsed**: If true, log groups are collapsed by default.

### Extending Flows with `getOps`

Plugins can expose custom methods to the user via the `getOps` hook. These methods are nested under `ops.self._[pluginName]`.

```typescript
export interface FlowPlugin<T = any> {
  name: string;
  onInit?: (ctx: { key: string; initial: T; store: any }) => void;
  onUpdate?: (ctx: { key: string; prev: T; next: T; store: any }) => void;
  onHydrate?: (ctx: { key: string; store: any }) => T | Promise<T> | undefined;
  /** Return methods that will be exposed under ops.self._[pluginName] */
  getOps?: (ctx: { key: string; store: any }) => Record<string, Function>;
}
```

- **onHydrate**: Called before initialization. Can return a stored state (or a Promise) to override the initial value.
- **onInit**: Called immediately after the flow is initialized in the store.
- **onUpdate**: Called whenever the flow state is updated.
- **getOps**: Returns an object of functions available at runtime.

---

## DevTools Ecosystem

FractoState includes a premium, zero-config visual inspector suite: the **Mental Map** and the **Plugin Architect**.

### Installation

Import the `FractoDevTools` component and render it once in your application root (e.g., in `App.tsx` or your main layout).

```tsx
import { FractoDevTools } from "fractostate/devtools";

function App() {
  return (
    <>
      <MainContent />
      <FractoDevTools
        position="left"
        initialOpen={false}
        maximizeMode="overlay"
      />
    </>
  );
}
```

### 1. Mental Map & Trace Engine

The **Mental Map** provides a high-level view of your application's state topology and a real-time ledger of every operation.

#### Key Features

1.  **Flow System Registry (Sidebar)**: A searchable list of all active flows in your system with real-time health indicators.
2.  **Smart Search**: Instantly filter flows, actors, or even data patterns within your entire state tree.
3.  **Mental Map Canvas**: Powered by React Flow, it visualizes the relationship between your "Actors" (components/modules) and your "Flows" (state). It dynamically creates a neural graph of your application's data flow.
4.  **Activity Trace Ledger**: A real-time, chronological log of all state operations (`_set`, `_patch`, `_push`, etc.). Every trace includes the actor name, timestamp, and a JSON preview of the data changed.
5.  **Interactive Overlays**: Click any flow node in the graph to open a detailed activity overlay for that specific flow.

#### How to Use the Mental Map

Follow these steps to explore your application's state topology.

**Step 1: Open the Advanced Inspector**
Click the floating **"F"** button to open the main inspector panel.

![Main Inspector UI](https://dll.nehonix.com/assets/FractoState/devtools_fmap_ui_tuto_st1.png)

**Step 2: Launch the Mental Map**
In the toolbar, click the **Activity/Pulse icon** to launch the full-screen Mental Map.

**Step 3: Analyze your Topology**
Click any **Flow Node** to see its specific history and JSON structure. Use the search bar to filter patterns.

#### How to Populate the Mental Map (Technical Guide)

**1. Name your Actors**
Identify your components using the `actor` or `name` property in the `useFlow` hook.

```tsx
const [cart, { actions }] = useFlow(CartFlow, {
  actor: "CartDrawerUI", // <--- This name will appear in the Mental Map
});
```

**2. Perform Operations**
When this component calls an action, FractoState records the link.

```tsx
const handleAdd = () => {
  actions.addItem({ id: 1 });
  // Neural Link created between 'CartDrawerUI' and 'CartFlow'
};
```

**3. Result: Dynamic Neural Graph**
The canvas will render purple nodes (Actors), blue nodes (Flows), and animated fibers (Data flow).

![Mental Map UI](https://dll.nehonix.com/assets/FractoState/devtools_fmap_ui_tuto_st2.png)

### 2. Plugin Architect & Activity Inspector

The **Plugin Architect** provides global tracking and runtime control for all attached plugins.

#### Key Features:

- **Global Plugin Registry**: Access via the **Database icon** in the toolbar. Indicated by a golden Zap icon on flows.
- **Runtime Control**: Perform `persist.update` or `persist.clear` directly from the UI.
- **Activity Timeline**: Click any plugin to open the **Inspector Panel** showing a timeline of events (Auto-saves, Hydrations, Manual Syncs).

---

### Interaction Modes

- **Draggable Logo**: Drag the floating "F" button anywhere.
- **Indicators**: Traffic-light style dots show health:
  - **Red**: Recent `_undo` or `_reset`.
  - **Yellow**: State write/read activity.
  - **Green**: Engine online.
- **Minimized/Fullscreen**: Toggle between subtle monitoring and deep diving.
- **Undo/Redo Tracking**: Watch the graph and ledger react as you navigate history.
