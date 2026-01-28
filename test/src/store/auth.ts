import { defineFlow } from "fractostate";
import { logger, persist } from "fractostate/plugins";

export interface AuthState {
  isAuthenticated: boolean;
  user: { username: string; avatar: string; role: string } | null;
  token: string | null;
  isLoading: boolean;
  callback: {
    lastLog: string;
    name: string;
  };
}

const initial: AuthState = {
  isAuthenticated: false,
  user: null,
  token: null,
  isLoading: false,
  callback: {
    lastLog: "Initializing...",
    name: "Auth Auditor",
  },
};

export const AuthFlow = defineFlow("auth", initial, {
  timeTravel: true,
  actions: {
    login: (username: string) => async (ops) => {
      ops.self.isLoading._set(true);
      await new Promise((r) => setTimeout(r, 1000));

      const token = btoa(username + Date.now()).slice(0, 32);

      ops.self._merge({
        isAuthenticated: true,
        user: {
          username,
          avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${username}`,
          role: "Core Archetype",
        },
        token,
        isLoading: false,
      });

      // On utilise ops.state pour accéder à la donnée actuelle
      console.log(`[${ops.state.callback.name}] User ${username} logged in.`);
      return true;
    },

    logout: () => (ops) => {
      ops.self._set({
        ...initial,
        callback: { ...initial.callback, lastLog: "Deconnected" },
      });
    },

    performLog: (message: string) => (ops) => {
      const timestamp = new Date().toLocaleTimeString();
      const finalMsg = `${timestamp} - ${message}`;

      // Logique centralisée
      console.log(
        `%c[${ops.state.callback.name}]`,
        "color: #00f2ff; font-weight: bold",
        finalMsg,
      );

      // Mise à jour du state
      ops.self.callback.lastLog._set(finalMsg);
    },
  },
  plugins: [persist({ storage: "localStorage", key: "ok::test_fr_auth", }), logger({ collapsed: true })],
  // plugins: [logger({ collapsed: true })],
});
