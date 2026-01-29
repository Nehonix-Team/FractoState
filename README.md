# FractoState | Decentralized State Management for React

<p align="center">
  <img src="https://dll.nehonix.com/assets/FractoState/logo.png" alt="FractoState Logo" width="600" />
</p>

FractoState is a high-performance, decentralized state management engine for React applications. It provides surgical state updates through an atomic proxy architecture, ensuring absolute type safety and zero boilerplate.

## Technical Demonstration

<p align="center">
  <video
    src="https://dll.nehonix.com/assets/FractoState/fracto_demo.mp4"
    width="100%"
    controls
    loop
    muted
  ></video>
</p>

> [!NOTE]
> Autoplay is disabled on GitHub. Please click below to view the demonstration video.

<p align="center">
  <a href="https://dll.nehonix.com/assets/FractoState/fracto_demo.mp4">
    <strong>View FractoState Demonstration (MP4)</strong>
  </a>
</p>

## Architectural Objectives

Traditional state management patterns often encounter significant performance and maintainability limitations:

1.  **Context Overhead**: Dependency on high-level providers often results in unnecessary re-renders across the component tree.
2.  **Boilerplate Rigidity**: Redux-like architectures introduce significant cognitive overhead for routine state transitions.
3.  **Memory Latency**: Standard immutable patterns in JavaScript frequently require expensive deep-cloning operations.
4.  **Namespace Pollution**: Global state exposure increases the risk of side effects and non-deterministic mutations.

## Core Engineered Solutions

FractoState redefines state management via three architectural pillars:

- **Isolated Memory Vault**: State is encapsulated within private closures, preventing unauthorized external mutations and ensuring data integrity.
- **Atomic Proxy Engine**: Utilizes recursive Proxies to provide a direct mutation API while maintaining strict immutability and surgical update resolution under the hood.
- **Direct Subscription Model**: Components subscribe directly to specific Vault keys, bypassing the React Context tree to ensure minimal O(1) render targeting.

## Installation

```bash
# xfpm (recommended)
xfpm install fractostate

# standard package managers
npm install fractostate
yarn add fractostate
pnpm add fractostate
```

## Quick Implementation

Example of a decentralized cart state:

```tsx
import { defineFlow, useFlow } from "fractostate";

// ◈ Define the flow definition
const CartFlow = defineFlow("cart", { items: [], total: 0 });

// ◈ Interaction in any component
function AddToCartButton({ product }) {
  const [, { ops }] = useFlow(CartFlow);

  return (
    <button onClick={() => ops.self.items._push(product)}>Add to Cart</button>
  );
}

// ◈ Focused reactivity
function CartIcon() {
  const [cart] = useFlow(CartFlow);
  return <span>{cart.items.length} units</span>;
}
```

## Engineering Highlights (v3.1)

FractoState v3 introduces advanced primitives designed for enterprise-scale requirements.

### Computed Flows

Reactive, read-only state nodes derived from source flows.

- [Documentation: Computed Flows](https://fractostate.nehonix.com/docs/computed-flows)

### Native Async Actions

Encapsulated business logic with direct access to surgical operation proxies.

- [Documentation: Async Actions](https://fractostate.nehonix.com/docs/native-async-actions)

### Extensible Plugin Interface

Unified API for state persistence, telemetry, and debugging.

- [Documentation: Plugins](https://fractostate.nehonix.com/docs/plugins-and-devtools)

### Surgical DevTools

Real-time state inspector with zero-configuration overhead.

- [Documentation: DevTools](https://fractostate.nehonix.com/docs/plugins-and-devtools#ghost-inspector-devtools)

## Performance Benchmarks

FractoState is engineered for high-throughput environments. Current benchmarks demonstrate performance parity with minimalist libraries while significantly outperforming traditional Redux patterns.

| Scenario                   | Objective        | FractoState   | Industry Standard          |
| :------------------------- | :--------------- | :------------ | :------------------------- |
| **Big Data (1M nodes)**    | Mutation Latency | **2.1s**      | 3.1s (Redux Toolkit)       |
| **Deep Update (1k nodes)** | Throughput       | **887 ops/s** | 430 ops/s (Standard React) |
| **Store Initialization**   | Setup Latency    | **2.2ms**     | 6.5ms (Redux Toolkit)      |

### Scalability Analysis

While libraries like Zustand require manual immutable spreading for deep updates, FractoState achieves similar throughput with a declarative API: `ops.registry[id].child._set(data)`. This eliminates developer error in complex state transitions without sacrificing performance.

Detailed technical analysis available in: [Performance Specifications](https://fractostate.nehonix.com/docs/benchmarks).

## Documentation Reference

- [◈ Getting Started](https://fractostate.nehonix.com/docs/getting-started)
- [◈ Computed Flows](https://fractostate.nehonix.com/docs/computed-flows)
- [◈ Native Async Actions](https://fractostate.nehonix.com/docs/native-async-actions)
- [◈ Plugin Architecture](https://fractostate.nehonix.com/docs/plugins-and-devtools)
- [◈ Advanced State Control](https://fractostate.nehonix.com/docs/advanced-features)
- [◈ Surgical Update Logic](https://fractostate.nehonix.com/docs/set-vs-patch)
- [◈ Benchmark Analysis](https://fractostate.nehonix.com/docs/benchmarks)

---

FractoState | Engineered for Precision. Optimized for Performance.
