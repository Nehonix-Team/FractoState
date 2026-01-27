# Atomic Updates: \_set vs \_patch

FractoState gives you surgical control over how your state changes are committed. Understanding the difference between `_set` and `_patch` is key to building high-performance applications with meaningful history.

## Quick Comparison

| Feature            | `_set` (Forceful)        | `_patch` (Smart)               |
| :----------------- | :----------------------- | :----------------------------- |
| **Equality Check** | Ignored. Always commits. | Performed. Skips if identical. |
| **React Rerender** | Always triggered.        | Triggered only on change.      |
| **History Entry**  | Always created.          | Created only on change.        |
| **Performance**    | O(1) + Commit overhead.  | O(DeepEqual) comparison.       |

---

## 🛠 `_set` (The Forceful Hammer)

The `_set` method bypasses the internal deep-equality check. It tells FractoState: _"I don't care if the data is the same, I want a new state reference now."_

### Use Cases:

1.  **Triggering Side Effects:** If you have a `useEffect` watching a state property and you want it to fire again, even if the value hasn't changed.
2.  **Explicit History Milestones:** When building a "Save" feature where every click must be recorded in the Undo/Redo history as a distinct snapshot.
3.  **Visual Feedback:** Forcing a component to re-mount or play an animation that depends on a state transition.

### Example:

```typescript
// Even if name is already "John", this creates a new history entry
// and triggers all subscribed components to re-render.
ops.self.user.name._set("John");
```

---

##  `_patch` (The Smart Shield)

The `_patch` method is the default recommended way to update state. It performs a deep equality check between the current value and the new one before committing.

### Use Cases:

1.  **High-Frequency Updates:** Real-time data like mouse coordinates, scroll positions, or search input fields.
2.  **Data Synchronization:** When receiving updates from a WebSocket or API where the data might be identical to what you already have.
3.  **Performance Optimization:** Preventing expensive React component sub-trees from re-rendering unnecessarily.

### Example:

```typescript
// If category is already "Electronics", FractoState stops here.
// No CPU cycles spent on React rendering or Plugin notifications.
ops.self.filter.category._patch("Electronics");
```

---

##  Recommendation

- **Use `_patch` by default.** It keeps your application fast and your history clean.
- **Use `_set` only when you need the "side-effect"** of an update (forcing a render or a history snapshot) regardless of the data content.

> **Note:** Most specific operators like `_increment(1)`, `_push(item)`, or `_toggle()` internally use the **Smart** logic (similar to `_patch`) because their purpose is to change the data.
