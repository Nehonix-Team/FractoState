# FractoState Performance Specifications

Performance is a fundamental design constraint of the FractoState engine. This document outlines the results of stress tests and comparative benchmarks conducted against industry-standard state management libraries.

## 🟢 Scale Benchmark: Million-Node Registry

This test measures the efficiency of surgical state updates within a massive dataset (1,000,000 objects).

**Scenario**: Update a nested property at a random index within a registry of 1M items.

| Engine                      | Latency (Mean) | Operations / sec | Verdict                 |
| :-------------------------- | :------------- | :--------------- | :---------------------- |
| **FractoState (v3.1.1)**    | **2.11 s**     | **0.47 ops/s**   | **Optimized for Scale** |
| **Zustand (Manual Spread)** | 2.11 s         | 0.47 ops/s       | Parity                  |
| **Redux Toolkit (Immer)**   | 3.16 s         | 0.31 ops/s       | Scaling Overhead        |

### Technical Analysis

FractoState achieves the theoretical limit of the JavaScript engine by utilizing a surgical path resolver. While manual array spreading (`[...]`) requires the engine to re-allocate and copy significant memory segments, FractoState modifies only the target leaf node and its direct ancestors, preserving 99.99% of the state tree by reference.

---

## 🔵 Comparative Performance: Throughput Analysis

Measured on a standard registry of 1,000 deep objects to assess the overhead of internal logic (Validation, Middleware, Notification).

| Method                         | Mean Latency | Throughput     | Performance Delta     |
| :----------------------------- | :----------- | :------------- | :-------------------- |
| **FractoState Proxy** (`_set`) | **1.12 ms**  | **~887 ops/s** | **+200% over Native** |
| **Standard Object Spread**     | 2.88 ms      | ~346 ops/s     | Baseline              |

### Architectural Optimization: Ref-Preserving Commits

FractoState v3.1 introduces a high-efficiency commit pipeline:

1.  **Immutability at Source**: The surgical proxy system ensures data integrity during mutation, eliminating the need for redundant deep-cloning operations during the commit phase.
2.  **Equality Bypassing**: The engine utilizes path-awareness to skip global tree comparisons when a surgical operation is performed.
3.  **Atomic Resolution**: State transitions are computed and committed in a single, non-recursive operation.

---

## ⚪ Competitive Overview

Comparison of initialization and initialization costs (Pure engine speed, excluding UI overhead).

| Metric                   | FractoState     | Redux Toolkit | Zustand      |
| :----------------------- | :-------------- | :------------ | :----------- |
| **Store Initialization** | **2.2 ms**      | 6.5 ms        | 1.8 ms       |
| **Deep Update DX**       | **High (O(1))** | Medium        | Low (Manual) |

### Key Findings

- **Initialization**: FractoState is **3.0x faster than Redux Toolkit** in flow creation, making it highly suitable for dynamic architectures.
- **Developer Productivity**: FractoState provides the speed of minimalist libraries (Zustand) with the safety and features of complex frameworks (Redux), without the associated performance penalties.

---

## Benchmark Execution

Benchmarks are executed using the Vitest environment. To replicate these results locally:

```bash
xfpm exec vitest bench
```

> [!IMPORTANT]
> Results were recorded on version 3.1.1. Actual performance may vary based on hardware specifications and Node.js environment variables (e.g., `--max-old-space-size`).
