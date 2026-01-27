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

## Ghost Inspector (DevTools)

FractoState includes a zero-config visual inspector to monitor state flows in real-time without external browser extensions.

### Installation

Import the `FractoDevTools` component and render it once in your application root (e.g., in `App.tsx` or your main layout).

```tsx
import { FractoDevTools } from "fractostate/devtools";

function App() {
  return (
    <>
      <MainContent />
      <FractoDevTools />
    </>
  );
}
```

### Features

- **Visual Overlay**: A toggleable floating button opens the inspector panel.
- **Real-time Monitoring**: Displays all active flows and their current state.
- **Live Updates**: The inspector automatically refreshes when any state changes in the system.
- **Secure Integration**: Connects via a restricted global subscription channel specifically designed for debugging.
