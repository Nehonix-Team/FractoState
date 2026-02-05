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

  return <button>Add to Cart</button>; // ops.self.items._push(product)
}

// ◈ Focused reactivity
function CartIcon() {
  const [cart] = useFlow(CartFlow);
  return <span>{cart.items.length} units</span>;
}
```

## Engineering Highlights (v4)

FractoState v4 introduces advanced primitives designed for enterprise-scale requirements, featuring our most optimized Surgical Engine to date.

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

### Immediate Effects & Hydration

Auto-executing side effects with dependency tracking and pre-mount hydration capabilities.

- [Documentation: Effects](https://fractostate.nehonix.com/docs/immediate-effects)

## Performance Benchmarks

FractoState is engineered for high-throughput environments. Our latest Stress Test (v4) demonstrates how the **Surgical Engine v4** handles massive states with near-zero overhead.

<p align="center">
  <img src="https://dll.nehonix.com/assets/FractoState/diag_ops_sec.png" alt="Operations Per Second" width="800" />
</p>

### The Quantum Leap (v4 Stress Test)

We simulated an "Enterprise-Scale" environment with **10,000+ nested objects** and executed thousands of deep surgical updates in rapid succession.

| Metric                   | Result           | Optimization Impact                       |
| :----------------------- | :--------------- | :---------------------------------------- |
| **Max Throughput**       | **3,400+ ops/s** | Surgical Engine v4 Optimization           |
| **Init (50k items)**     | **1.3ms**        | Instant cold-start via Memory Vault       |
| **Update Latency (p50)** | **18µs**         | Direct path-traversal without full clones |
| **Batching Efficiency**  | **99.9%**        | 10k actions batched into 1 micro-task     |

<p align="center">
  <img src="https://dll.nehonix.com/assets/FractoState/diag_perf_over.png" alt="Performance Evolution" width="800" />
</p>

### Analysis & Conclusion

As shown in the latency distribution below, FractoState maintains a consistent performance profile even at the P99 percentile. By bypassing traditional deep-cloning for internal operations and utilizing a **Live-Access Proxy**, we've eliminated the primary performance bottleneck of immutable state management.

<p align="center">
  <img src="https://dll.nehonix.com/assets/FractoState/diag_update_latency.png" alt="Latency Distribution" width="800" />
</p>

## Conclusion

FractoState v4 focuses on architectural simplicity, fine-grained updates, and predictable performance at scale. Its decoupled state model ensures consistent responsiveness across both small and large applications, making it a solid foundation for performance-critical React interfaces.

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
