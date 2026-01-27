# API Reference

A detailed breakdown of the FractoState interface.

## defineFlow<T>(key, initialValue, options?)

Creates a reusable definition for a state flow.

- **key**: A unique string identifying the flow in the global vault.
- **initialValue**: The default state structure.
- **options**: Configuration object (timeTravel, debounce, middleware).

Returns a `FlowDefinition<T>`.

## defineDerived<T, R>(source, selector, key?)

Creates a read-only computed flow derived from a source flow.

- **source**: The parent `FlowDefinition`.
- **selector**: Function `(state: T) => R` to compute the derived value.
- **key**: Optional unique identifier.

Returns a `DerivedFlowDefinition<T, R>`.

## useFlow<T>(identifier, initialValue?, options?)

The primary hook to interact with the state vault.

- **identifier**: Either a string `key` or a `FlowDefinition`.
- **initialValue**: Required only if identifier is a string and the flow hasn't been initialized.
- **options**: Overrides for the flow configuration.

Returns `[state, toolbox]`.

### The Toolbox Object

The second element returned by `useFlow` provides powerful control:

- **ops.self**: A recursive proxy providing type-aware methods:
  - **Numbers**: `increment()`, `decrement()`, `add()`, `multiply()`, `divide()`, `set()`.
  - **Strings**: `append()`, `prepend()`, `uppercase()`, `replace()`, `set()`.
  - **Arrays**: `push()`, `pop()`, `filter()`, `map()`, `insertAt()`, `removeAt()`, `set()`.
  - **Objects**: `merge()`, `delete()`, `set()`.
- **actions**: Object containing custom async actions defined in `FlowOptions`.
- **set(value | fn)**: Manually sets the entire state or applies a transformation function.
- **undo()**: Reverts to the previous state.
- **redo()**: Restores the previously undone state.
- **history**: The full history buffer of the flow.
- **canUndo / canRedo**: Boolean flags for UI control.
- **reset()**: Restores the state to its defined initial value.

## FlowOptions

- **timeTravel**: Enable undo/redo functionality (default: false).
- **maxHistory**: Maximum number of states maintained in the circular buffer (default: 100).
- **debounce**: Delay in milliseconds before state updates are applied.
- **middleware**: Array of functions `(state) => state` to intercept and transform values during updates.
