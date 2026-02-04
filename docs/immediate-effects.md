# Immediate Effects & Hydration

FractoState v3.2 introduces **Flow Effects**, a powerful system for attaching lifecycle hooks and reactive side-effects directly to your flow definitions.

Unlike `useEffect` which is tied to the React component lifecycle, Flow Effects are **attached to the store itself**. They can run:

1.  **Immediately** when the flow is initialized (even before React renders).
2.  **Reactively** whenever specific parts of the state change.

## The `effects` API

You can define effects inside the `defineFlow` options object.

```typescript
const MyFlow = defineFlow(
  "my-flow",
  { count: 0, status: "idle" },
  {
    effects: [
      // Effect 1: Immediate Setup (Run Once)
      {
        run: (ops) => {
          console.log("Flow initialized!");
          // Perfect for initial data fetching
          fetchData().then((data) => ops.self._merge(data));
        },
        // No 'deps' = runs only once on mount
      },

      // Effect 2: Reactive Watcher
      {
        run: (ops) => {
          if (ops.state.count > 10) {
            console.warn("Count is high!", ops.state.count);
          }
        },
        // Runs on init AND whenever 'count' changes
        deps: (state) => [state.count],
      },
    ],
  },
);
```

### Effect Interface

```typescript
interface FlowEffect<T> {
  // The function to execute. Async is supported.
  run: (ops: FlowOpsObject<T>) => void | Promise<void>;

  // Optional dependencies selector.
  // If omitted, the effect runs exactly once (on flow initialization).
  // If provided, it runs on init + whenever the returned values change (deep equality check).
  deps?: (state: T) => any[];
}
```

---

## Pre-Mount Hydration (`initFlow`) - Optional

By default, FractoState flows are **lazy**. They (and their effects) initialize the first time you call `useFlow` in a component. In most cases, this is perfectly fine and performant.

However, if you need an effect to run **as soon as the JavaScript file is imported** (e.g., to check auth before the app even mounts), you can use `initFlow`.

### Usage

Simply call `initFlow` passing your flow definition. This is typically done in your main entry point (e.g., `store/index.ts` or `src/index.ts`) or directly in the flow file itself.

```typescript
// store/auth.ts
import { defineFlow, initFlow } from "fractostate";

export const AuthFlow = defineFlow(
  "auth",
  { user: null },
  {
    effects: [
      {
        run: (ops) => {
          // This runs IMMEDIATELY when the file is imported
          const token = localStorage.getItem("token");
          if (token) validateToken(token);
        },
      },
    ],
  },
);

// Force initialization immediately
initFlow(AuthFlow);
```

### Why use `initFlow`?

1.  **Router Guards**: Check authentication state before the Router even renders.
2.  **Global Listeners**: Setup global event listeners (WebSocket, Keyboard) that should persist regardless of component unmounting.
3.  **Data Prefetching**: Start fetching critical data (User Profile, Config) as early as possible in the JS bundle execution.

## Best Practices

- **Keep it clean**: Avoid putting heavy logic in `initFlow` if it blocks the main thread. Effects are synchronous by default unless you make the `run` function async.
- **Encapsulation**: Use `initFlow` inside the file where the flow is defined to keep the logic self-contained.
- **Avoid React Deps**: Flow effects run outside of React's render cycle. Do not try to use React hooks inside them.
