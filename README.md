# FractoState: Think Fractal. Code Simple.

<p align="center">
  <img src="https://dll.nehonix.com/assets/FractoState/logo.png" alt="FractoState Logo" width="600" />
</p>

FractoState is a high-performance, decentralized state management library for React. It is engineered to provide surgical state updates with zero boilerplate, absolute type safety, and an architecture that exists independently of the React component tree.

## See it in Action

<p align="center">
  <video
    src="https://dll.nehonix.com/assets/FractoState/fracto_demo.mp4"
    width="100%"
    controls
    loop
    muted
  ></video>
</p>

> ⚠️ **GitHub Limitation**  
> Autoplay is disabled on GitHub. Click the link below to view the demo video.

<p align="center">
  <a href="https://dll.nehonix.com/assets/FractoState/fracto_demo.mp4">
    ▶️ <strong>Watch the FractoState Demo (MP4)</strong>
  </a>
</p>

## The Problem

Traditional state management solutions often suffer from specific architectural bottlenecks:

1.  **Prop-Drilling & Context Overhead**: Managing shared state requires wrapping the application in multiple providers, often leading to unnecessary re-renders of the entire sub-tree when a small value changes.
2.  **Boilerplate Complexity**: Redux and similar libraries introduce a heavy cognitive load with actions, reducers, and selectors for even the simplest state transitions.
3.  **Performance Degit**: JavaScript's standard object handling for deep state often forces developers into expensive deep-cloning patterns for every modification.
4.  **Uncontrolled Access**: Application state is often dangerously exposed in the global scope, leading to accidental mutations and difficult-to-trace bugs.

## The Solution

FractoState transforms state management into a "Side-Car" service through three core innovations:

- **Isolated Memory Vault**: State is held within a private closure rather than the global scope. This strict isolation prevents accidental external mutations and ensures all state changes occur through the defined React hooks.
- **Surgical Proxy Mutations**: Instead of manually handling immutability, FractoState uses recursive Proxies. You interact with state as if it were a direct object, while the engine performs atomic, immuable updates under the hood.
- **Provider-less Decoupling**: Components subscribe directly to the Vault. This eliminates the need for context providers and ensures that state updates only trigger re-renders in the exact components that consume the modified data.

## Installation

```bash
# xfpm
xfpm install fractostate

# npm
npm install fractostate

# yarn
yarn add fractostate

# pnpm
pnpm add fractostate
```

## Quick Example

Setting up a shared ecommerce cart state:

```tsx
import { defineFlow, useFlow } from "fractostate";

// 1. Define the business logic flow
const CartFlow = defineFlow("cart", { items: [], total: 0 });

// 2. Consume and modify in any component
function AddToCartButton({ product }) {
  const [, { ops }] = useFlow(CartFlow);

  return (
    <button onClick={() => ops.self.items._push(product)}>Add to Cart</button>
  );
}

// 3. React to updates elsewhere
function CartIcon() {
  const [cart] = useFlow(CartFlow);
  return <span>{cart.items.length} items</span>;
}
```

## What's New in v2

FractoState v2 introduces powerful architectural primitives to handle complex state requirements with zero boilerplate.

### [Computed Flows](./docs/computed-flows.md)

Create reactive, read-only state derived from other flows. No selectors, no `useMemo`.

```typescript
const TotalPrice = defineDerived(CartFlow, (state) =>
  state.items.reduce((acc, item) => acc + item.price, 0),
);
```

### [Native Async Actions](./docs/native-async-actions.md)

Handle business logic and side effects directly within your flow definitions. Built-in access to surgical state operations.

```typescript
actions: {
  login: (creds) => async (ops) => {
    ops.self.loading._set(true);
    await api.login(creds);
    ops.self.loading._set(false);
  };
}
```

### [Modular Plugin System](./docs/plugins-and-devtools.md)

Opt-in capabilities for persistence, logging, and more.

```typescript
plugins: [persist(), logger()];
```

### [Ghost Inspector](./docs/plugins-and-devtools.md#ghost-inspector-devtools)

A zero-config visual overlay to debug your flows in real-time.

```tsx
<FractoDevTools />
```

### [Advanced State Control](./docs/advanced-features.md)

FractoState v2.1 introduces surgical methods and raw access patterns:

- **Underscore Convention**: All built-ins are now prefixed (e.g., `_set`, `_merge`, `_push`) to prevent collisions with your data.
- **Force vs Patch**: Use `_set` to force history recording, or `_patch` for optimized smart-updates.
- **Direct Access**: Use `ops.state` for raw immutable reads and `._val` to unwrap proxies.

## Documentation

- [Getting Started](./docs/getting-started.md)
- [API Reference](./docs/api-reference.md)
- [Architecture](./docs/architecture.md)
- [Computed Flows](./docs/computed-flows.md)
- [Native Async Actions](./docs/native-async-actions.md)
- [Plugins & DevTools](./docs/plugins-and-devtools.md)
- [Advanced Features (v2.1)](./docs/advanced-features.md)
- [Surgical Updates: \_set vs \_patch](./docs/set-vs-patch.md)

## Installation

---

FractoState - Engineered for Performance. Created for Developers.
