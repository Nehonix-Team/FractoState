# FractoState: Advanced Features & Conventions

FractoState has been upgraded with a set of futuristic features to ensure zero name collisions, superior performance, and absolute tactical control over your state updates.

## 1. Underscore System (Built-in Methods)

To prevent your business data (e.g., a field named `set` or `delete`) from colliding with FractoState's internal logic, all built-in methods are now prefixed with an underscore `_`.

- **Old:** `ops.self.user.set("Jean")`
- **New:** `ops.self.user._set("Jean")`

This applies to **everything** in the toolbox: `_merge`, `_push`, `_increment`, `_toggle`, `_undo`, `_reset`, etc.

## 2. Forceful vs. Smart Updates

You now have total control over how history and updates are recorded.

| Method       | Behavior                                                                      | Use Case                                            |
| :----------- | :---------------------------------------------------------------------------- | :-------------------------------------------------- |
| **`_set`**   | **Forceful Update**. Always commits a change, even if the value is identical. | Triggering repeated effects or manual snapshots.    |
| **`_patch`** | **Smart Update**. Compares old and new values. Skips update if identical.     | Optimized frequent updates (e.g., cursor tracking). |

> 📖 **Deep Dive:** For a full comparison and more examples, check out **[\_set vs \_patch](./set-vs-patch.md)**.

> **Note:** Most specific operators like `_increment` or `_push` behave like `_patch` (they only update if the logic changes the state).

## 3. Direct State Access (`ops.state`)

Inside your actions, you no longer need to "unwrap" proxies to read values. You can access the **raw, immutable current state** directly via `ops.state`.

```typescript
login: (username: string) => async (ops) => {
  // Read directly - 100% Type-safe
  if (ops.state.isAuthenticated) return;

  // Modify via proxy
  ops.self.user._set({ username, role: "admin" });
};
```

## 4. Raw Value Retrieval (`._val`)

If you are deep inside a proxy chain and need the literal value of a node, use the `._val` property. It stops the proxy recursion and returns the data.

```typescript
const count = ops.self.basket.items.length._val;
```

## 5. Direct Function Invocation

If your state contains functions (callbacks, dynamic logic), you can now call them **directly on the proxy path**. FractoState's proxy trap detect types and executes the function for you.

```typescript
// If 'callback' is in your state
ops.self.system.callback("Operation successful");
```

## 6. Type-Safe Action Overloads

The `defineFlow` and `useFlow` functions now support 100% perfect type inference for actions. No more `any` in your component code—everything is strictly typed from the definition to the usage.

## 7. Internal Action Orchestration (`__actions__`)

You can now call defined actions from within other actions or auto-run effects using the magic proxy property `ops.self.__actions__`. This eliminates the need for external imports and allows for powerful, self-contained business logic.

```typescript
actions: {
  notify: (msg) => (ops) => { /* ... */ },
  triggerError: () => (ops) => {
    // Orchestrate actions internally
    ops.self.__actions__.notify("A critical error occurred");
  }
}
```
