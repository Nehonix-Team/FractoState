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
4.  **Security Risks**: Application state is often stored in plain objects easily accessible via browser dev tools or memory dumps.

## The Solution

FractoState transforms state management into a "Side-Car" service through three core innovations:

- **Secure Memory Vault**: State is isolated in a private JavaScript instance. Data is stored in an obfuscated format to prevent easy inspection and is protected against unauthorized global access.
- **Surgical Proxy Mutations**: Instead of manually handling immutability, FractoState uses recursive Proxies. You interact with state as if it were a direct object, while the engine performs atomic, immuable updates under the hood.
- **Provider-less Decoupling**: Components subscribe directly to the Vault. This eliminates the need for context providers and ensures that state updates only trigger re-renders in the exact components that consume the modified data.

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
    <button onClick={() => ops.self.items.push(product)}>Add to Cart</button>
  );
}

// 3. React to updates elsewhere
function CartIcon() {
  const [cart] = useFlow(CartFlow);
  return <span>{cart.items.length} items</span>;
}
```

## Documentation

For detailed information on the library, please refer to the modular documentation files:

- [Architecture Overview](./docs/architecture.md): Deep dive into the Vault and Proxy engine.
- [Getting Started](./docs/getting-started.md): Installation and basic setup guide.
- [API Reference](./docs/api-reference.md): Detailed documentation of hooks and operations.

---

FractoState - Engineered for Performance. Created for Developers.
