# Computed Flows

Computed Flows (also known as derived state) allow you to create reactive calculations based on other flows. They automatically update when their source flow changes, eliminating the need for manual `useEffect` synchronization or complex memoization selectors.

## Key Concept

A Computed Flow is read-only. It subscribes to a source flow and transforms its value using a selector function. Because it runs within the reactive cycle of FractoState, it is highly optimized and only re-renders components when the _result_ of the computation changes.

## defineDerived

The `defineDerived` function creates a definition for a computed flow.

```typescript
import { defineFlow, defineDerived, useFlow } from "fractostate";

// 1. Define the source flow
const CartFlow = defineFlow("cart", { items: [{ price: 10 }, { price: 20 }] });

// 2. Define the computed flow
// The selector receives the source state and returns a derived value.
export const TotalPriceFlow = defineDerived(CartFlow, (state) => {
  return state.items.reduce((acc, item) => acc + item.price, 0);
});
```

### Usage in Components

You use `useFlow` with a derived definition exactly as you would with a standard flow. The hook detects the derived nature and operates in read-only mode.

```tsx
const CartTotal = () => {
  // Returns the computed value directly
  // The second element (toolbox) is empty for derived flows
  const [total] = useFlow(TotalPriceFlow);

  return <div>Total: ${total}</div>;
};
```

### API Signature

```typescript
function defineDerived<T, R>(
  source: FlowDefinition<T, any>,
  selector: (state: T) => R,
  derivedKey?: string,
): DerivedFlowDefinition<T, R>;
```

- **source**: The parent `FlowDefinition` to observe.
- **selector**: A pure function `(state) => result`. This function runs whenever the source state changes.
- **derivedKey**: Optional unique key. If omitted, one is auto-generated.
