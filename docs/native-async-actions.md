# Native Async Actions

FractoState v2 introduces Native Async Actions to handle business logic and side effects directly within your flow definitions. This replaces the need for external middleware like Thunks or Sagas, keeping your logic co-located with your state.

## Key Concept

Actions are functions attached to a flow that have direct access to the `ops` (operations) proxy. This allows you to perform "surgical" updates to the state at any point during an asynchronous operation (start, success, failure).

## Defining Actions

Actions are defined in the `actions` property of the `FlowOptions` object passed to `defineFlow`.

```typescript
import { defineFlow } from "fractostate";
import { api } from "./api"; // hypothetical api

const UserFlow = defineFlow(
  "user",
  {
    profile: null,
    isLoading: false,
    error: null,
  },
  {
    actions: {
      // The outer function receives your arguments.
      // It returns an inner function that receives the 'ops' proxy.
      login: (username, password) => async (ops) => {
        // 1. Set loading state
        ops.self.isLoading._set(true);
        ops.self.error._set(null);

        try {
          // 2. Perform async operation
          const user = await api.login({ username, password });

          // 3. Update state with result
          ops.self.profile._set(user);
          return true;
        } catch (err) {
          // 4. Handle error
          ops.self.error._set(err.message);
          return false;
        } finally {
          // 5. Reset loading state
          ops.self.isLoading._set(false);
        }
      },

      logout: () => (ops) => {
        ops.self._set({ profile: null, isLoading: false, error: null });
      },
    },
  },
);
```

## Consuming Actions

When you use the flow in a component, the actions are available in the toolbox (the second return value). They are automatically bound, so you do not pass `ops` when calling them.

```tsx
import { useFlow } from "fractostate";

const LoginButton = () => {
  const [userState, { actions }] = useFlow(UserFlow);

  const handleLogin = async () => {
    // Call the action directly with your arguments
    const success = await actions.login("john_doe", "secret123");

    if (success) {
      console.log("Welcome back!");
    }
  };

  return (
    <button onClick={handleLogin} disabled={userState.isLoading}>
      {userState.isLoading ? "Logging in..." : "Login"}
    </button>
  );
};
```

## Internal Action Orchestration

FractoState v4.1+ allows actions to call other actions defined within the same flow without external helpers. This is powerful for breaking down complex logic into reusable small actions.

### Usage via `ops.actions` (Recommended)

The `ops` object injected into your actions (and effects) contains an `actions` property holding all bound actions of the current flow.

```typescript
actions: {
  sayHello: (name: string) => (ops) => {
    console.log(`Hello ${name}!`);
  },

  welcomeUser: () => (ops) => {
    // Call another action directly
    ops.actions.sayHello(ops.state.profile.username);
  }
}
```

### Usage via `ops.self.__actions__`

You can also access actions from anywhere in the state proxy tree using the magic `__actions__` property. This is useful if you are deep inside a proxy chain.

```typescript
ops.self.settings.notifications.__actions__.sayHello("System");
```

## Actions in Effects

Auto-run effects also have full access to your flow's actions, allowing you to trigger business logic automatically in response to lifecycle events or dependency changes.

```typescript
effects: [
  {
    run: (ops) => {
      ops.actions.performInitialSync();
    },
    // deps: ...
  },
];
```
