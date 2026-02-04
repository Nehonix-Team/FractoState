# Getting Started with FractoState

FractoState is a lightweight, high-performance state management library for React applications. It uses a unique "Flow" concept to provide reactive, immutable state streams without the boilerplate of Redux or the complexity of Context.

This guide will walk you through installing FractoState and building your first reactive component.

## 1. Installation

Install `fractostate` using your preferred package manager.

### Using xfpm (Recommended)

```bash
xfpm i fractostate
```

### Using npm, yarn, or bun

```bash
# npm
npm install fractostate

# yarn
yarn add fractostate

# bun
bun add fractostate
```

## 2. Core Concepts

FractoState revolves around **Flows** and **Operations**.

- **Flow**: A reactive stream of data, identified by a unique key.
- **Operations (`ops`)**: A proxy-based system to mutate state intuitively (e.g., `ops.self.count._increment()`).

## 3. Creating Your First Flow

Centralize your state logic by defining a Flow. This definition acts as a blueprint for your state, ensuring type safety across your app.

Create a file `store/flows.ts`:

```typescript
// store/flows.ts
import { defineFlow } from "fractostate";

// Define the shape of your state
interface UserState {
  name: string;
  settings: {
    theme: "light" | "dark";
    notifications: boolean;
  };
}

export const UserFlow = defineFlow<UserState>("user", {
  name: "Guest",
  settings: {
    theme: "dark",
    notifications: true,
  },
});
```

## 4. Connecting Components

Use the `useFlow` hook to connect any component to your state. No providers or context wrappers are needed.

```tsx
import { useFlow } from "fractostate";
import { UserFlow } from "./store/flows";

export function Profile() {
  // state: Clean, immutable snapshot of the current data
  // ops: The toolbox for updating state
  const [state, { ops }] = useFlow(UserFlow);

  return (
    <div className={`profile ${state.settings.theme}`}>
      <h1>Welcome, {state.name}</h1>

      {/* Update state directly using the ops proxy */}
      <button onClick={() => ops.self.name._set("Alice")}>
        Login as Alice
      </button>

      <button onClick={() => ops.self.settings.theme._set("light")}>
        Switch to Light Mode
      </button>
    </div>
  );
}
```

## 5. Sharing State

To share state between components, simply use the same `UserFlow` definition. Updates in one component automatically trigger re-renders in all other subscribed components.

```tsx
import { useFlow } from "fractostate";
import { UserFlow } from "./store/flows";

export function Header() {
  const [user] = useFlow(UserFlow); // Read-only access if you don't need ops

  return <header>Current User: {user.name}</header>;
}
```

## 6. Advanced Configuration (Optional)

FractoState comes with powerful built-in features like **Time Travel** and **Middleware**.

### Enabling Time Travel (Undo/Redo)

Enable history tracking in your flow definition:

```typescript
export const CartFlow = defineFlow(
  "cart",
  { items: [] },
  {
    timeTravel: true, // Enable Undo/Redo
  },
);
```

Now you can use `undo` and `redo` functions returned by `useFlow`:

```tsx
export function CartControls() {
  const [cart, { undo, redo, canUndo }] = useFlow(CartFlow);

  return (
    <div>
      <button onClick={undo} disabled={!canUndo}>
        Undo
      </button>
      <button onClick={redo}>Redo</button>
    </div>
  );
}
```

## Next Steps

- **[Advanced Features](./advanced-features.md)**: Learn about `_set` vs `_patch`, underscore methods, and direct state access.
- **[API Reference](./api-reference.md)**: Detailed documentation of all methods and options.
- **[Computed Flows](./computed-flows.md)**: Create derived state that updates automatically.