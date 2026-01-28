import { useFlow } from "fractostate";
import { AuthFlow } from "../store/auth";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [auth, toolbox] = useFlow(AuthFlow);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const username = (form.elements[0] as HTMLInputElement).value;

    await toolbox.actions.login(username); // Call native async action
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505] p-4">
      <div className="glass p-8 rounded-2xl w-full max-w-md border border-white/5 space-y-6">
        <div className="text-center">
          <div className="w-12 h-12 bg-brand rounded-lg mx-auto mb-4 flex items-center justify-center font-bold text-xl">
            F
          </div>
          <h1 className="text-2xl font-bold">Welcome Back</h1>
          <p className="text-white/40 text-sm">
            Sign in to access the FractoState Demo
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-white/60 ml-1">
              USERNAME
            </label>
            <input
              type="text"
              defaultValue="demo_user"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-brand/50 transition-colors text-sm font-medium"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-white/60 ml-1">
              PASSWORD
            </label>
            <input
              type="password"
              defaultValue="password"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-brand/50 transition-colors text-sm font-medium"
            />
          </div>

          <button
            disabled={auth.isLoading}
            className="w-full btn-primary py-3 font-bold mt-4 flex items-center justify-center gap-2"
          >
            {auth.isLoading ? (
              <span className="animate-spin text-lg">⏳</span>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <button
          className="btn-primary mt-4"
          onClick={() => {
            toolbox.actions.performLog(
              "User clicked the system auditor button",
            );

            // On utilise une constante stable pour éviter les "init: init:"
            const baseName = "Auth Auditor";

            // Étape 1 : Mise à jour immédiate (Forceful _set)
            toolbox.ops.self.callback.name._set("REFRESHING...");

            // Étape 2 : On attend 10ms pour "casser" le batching et voir l'étape dans l'historique
            setTimeout(() => {
              toolbox.ops.self.callback.name._patch(`View logs`);
              console.log("History step created for:", baseName);
            }, 100);
          }}
        >
          {auth.callback.name}
        </button>

        <p className="text-center text-xs text-white/20">
          Powered by FractoState Secure Vault
        </p>
      </div>
    </div>
  );
}
