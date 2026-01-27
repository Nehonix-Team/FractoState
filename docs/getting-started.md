# Getting Started with FractoState

This guide will walk you through the integration of FractoState into a React application.

## Installation

Ensure you have the library within your project's source directory (currently in development).

## Core Concepts

FractoState is built around "Flows". A Flow is a reactive stream of data identified by a unique key.

### 1. Defining a Flow

Centralize your state structure and initial values using `defineFlow`. This promotes reusability and type safety.

```typescript
// store/flows.ts
import { defineFlow } from "fractostate";

export const UserFlow = defineFlow("user", {
  name: "Default User",
  settings: { theme: "dark" },
});
```

### 2. Using a Flow in a Component

Use the `useFlow` hook to connect any component to the state.

```tsx
import { useFlow } from "fractostate";
import { UserFlow } from "./store/flows";

export default function Profile() {
  const [state, { ops }] = useFlow(UserFlow);

  return (
    <div>
      <h1>User: {state.name}</h1>
      <button onClick={() => ops.self.name._set("New Name")}>Update Name</button>
    </div>
  );
}
```

### 3. Sharing State Across Components

To consume or modify the same state in another component, simply use the same `UserFlow` definition. No providers or context required.

```tsx
import { useFlow } from "fractostate";
import { UserFlow } from "./store/flows";

export default function Sidebar() {
  const [state] = useFlow(UserFlow); // Automatically synchronizes with the Profile component
  return <aside>Active theme: {state.settings.theme}</aside>;
}
```

### 4. Advanced Configuration

You can enable features like Time Travel or Middleware directly in the definition or the hook.

```typescript
// Enable Undo/Redo and middleware for logging
export const CartFlow = defineFlow(
  "cart",
  { items: [] },
  {
    timeTravel: true,
    middleware: [
      (state) => {
        console.log("Cart updated:", state);
        return state;
      },
    ],
  },
);
```

Using Time Travel in a component:

```tsx
function CartControls() {
  const [cart, { undo, redo, canUndo }] = useFlow(CartFlow);

  return (
    <button onClick={undo} disabled={!canUndo}>
      Undo Last Item
    </button>
  );
}
```
