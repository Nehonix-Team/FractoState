# Plugins and DevTools

This document describes the modular plugin system and the developer tools available in FractoState.

## Modular Plugin System

FractoState provides an optional plugin system to extend the behavior of state flows. Plugins interact with the state lifecycle events including initialization, updates, and hydration.

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

Automatically synchronizes the flow state with browser storage (`localStorage` or `sessionStorage`).

- **options.storage**: "localStorage" | "sessionStorage" (default: "localStorage")
- **options.key**: Custom storage key string. Defaults to `fracto_flow_{flowKey}`.

#### logger(options?)

Logs state changes and lifecycle events to the browser console for debugging purposes.

- **options.collapsed**: If true, log groups are collapsed by default.

### Creating Custom Plugins

A plugin is an object conforming to the `FlowPlugin` interface:

```typescript
export interface FlowPlugin<T = any> {
  name: string;
  onInit?: (ctx: { key: string; initial: T; store: any }) => void;
  onUpdate?: (ctx: { key: string; prev: T; next: T; store: any }) => void;
  onHydrate?: (ctx: { key: string; store: any }) => T | undefined;
}
```

- **onHydrate**: Called before initialization. Can return a stored state to override the initial value.
- **onInit**: Called immediately after the flow is initialized in the store.
- **onUpdate**: Called whenever the flow state is updated.

## Mental Map & Trace Engine (DevTools)

FractoState includes a premium, zero-config visual inspector: the **Mental Map & Trace Engine**. It provides a high-level view of your application's state topology and a real-time ledger of every operation.

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

### Key Features

1.  **Flow System Registry (Sidebar)**: A searchable list of all active flows in your system with real-time health indicators.
2.  **Smart Search**: Instantly filter flows, actors, or even data patterns within your entire state tree.
3.  **Mental Map Canvas**: Powered by React Flow, it visualizes the relationship between your "Actors" (components/modules) and your "Flows" (state). It dynamically creates a neural graph of your application's data flow.
4.  **Activity Trace Ledger**: A real-time, chronological log of all state operations (`_set`, `_patch`, `_push`, etc.). Every trace includes the actor name, timestamp, and a JSON preview of the data changed.
5.  **Interactive Overlays**: Click any flow node in the graph to open a detailed activity overlay for that specific flow.

### How to Use the Mental Map

Follow these steps to explore your application's state topology.

#### **Step 1: Open the Advanced Inspector**

Click the floating **"F"** button (usually at the bottom corner of your screen) to open the main inspector panel. This panel gives you a quick overview of all active flows.

![Main Inspector UI](https://dll.nehonix.com/assets/FractoState/devtools_fmap_ui_tuto_st1.png)

#### **Step 2: Launch the Mental Map**

In the toolbar of the inspector, click the **Activity/Pulse icon**. This will launch the full-screen **Mental Map & Trace Engine**.

#### **Step 3: Analyze your Topology**

The Mental Map will reveal the connections between your components (Actors) and your state (Flows).

- Use the **Search bar** to find specific patterns.
- Keep the **Ledger** open to watch state updates stream in real-time.
- Click any **Flow Node** to see its specific history and JSON structure.

### How to Populate the Mental Map (Technical Guide)

The Mental Map doesn't just show state; it visualizes the **relationships** between your components (Actors) and your flows. To get a rich graph like the one shown in the images, follow these technical steps:

#### **1. Name your Actors**

By default, FractoState doesn't know which component is talking to which flow. You must identify your components using the `actor` or `name` property in the `useFlow` hook.

```tsx
// In your ShoppingCart component
const [cart, { actions }] = useFlow(CartFlow, {
  actor: "CartDrawerUI", // <--- This name will appear in the Mental Map
});
```

#### **2. Perform Operations**

When this component calls an action or a built-in method (like `_set`), FractoState records the operation and attributes it to the named actor.

```tsx
const handleAdd = () => {
  actions.addItem({ id: 1, name: "Neon Hoodie" });
  // The Mental Map now creates a "Neural Link" between
  // 'CartDrawerUI' and 'CartFlow'
};
```

#### **3. Result: Dynamic Neural Graph**

The **Mental Map Canvas** (Step 3 in UI) will now dynamically render:

- **Purple Nodes**: Your components (Actors).
- **Blue Nodes**: Your state containers (Flows).
- **Animated Fibers**: The live data connections indicating which components are currently "consuming" or "writing to" which flows.

![Mental Map UI](https://dll.nehonix.com/assets/FractoState/devtools_fmap_ui_tuto_st2.png)

### Interaction Modes

- **Draggable Logo**: The floating "F" button can be moved anywhere on the screen.
- **Minimized Mode**: Minimize the Mental Map to a small badge that continues to pulse when state activity is detected.
- **Fullscreen**: Toggle the engine to fill the entire screen for deep debugging sessions.
- **Undo/Redo Tracking**: Watch the graph and ledger react as you navigate through history.
