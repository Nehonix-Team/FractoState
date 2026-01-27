# Architecture: Isolated Memory Vault

FractoState operates on a paradigm shift in state management. Instead of relying on a hierarchical data flow injected through component trees, it utilizes a decentralized, side-car architecture.

## The Memory Vault

At the core of FractoState is the MemoryVault. This is a pure JavaScript singleton that exists independently of the React lifecycle. It holds the application state in a isolated memory space.

### State Isolation

Data within the Vault is stored in a closed scope. This strict isolation ensures that user data is not accidentally mutated by external scripts and promotes a disciplined data flow. Access is controlled through the FractoState internal engine, returning copies of the data to components to prevent accidental direct mutations.

## Proxy-Based Mutation Engine

FractoState leverages JavaScript Proxies to provide a surgical update mechanism. When you access `ops.self`, you are interacting with a recursive proxy that maps your state structure to specific atomic operations.

### Type-Aware Operations

The proxy identifies the data type at any given path (Number, String, Array, or Object) and presents relevant, type-safe methods. This allows for complex state updates—like pushing to a nested array or merging into a deep object—without the need for manual immutability boilerplate.

## Decoupled React Integration

The `useFlow` hook acts as a high-performance bridge. It subscribes components to specific segments of the Vault.

- **Selective Re-rendering**: Components are only notified when the specific key they are watching is updated.
- **Provider-less Execution**: Since the store is external, there is no need for context providers. This eliminates the "Wrapper Hell" and ensures that any component, at any depth, can access state with zero performance penalty.
- **Microtask Batching**: Multiple state changes within the same execution cycle are batched into a single microtask, ensuring optimal UI performance and preventing unnecessary render cycles.
