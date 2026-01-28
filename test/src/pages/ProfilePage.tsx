import { useFlow } from "fractostate";
import { AuthFlow } from "../store/auth";

export default function ProfilePage() {
  const [auth] = useFlow(AuthFlow);

  return (
    <div className="pt-32 px-6 max-w-4xl mx-auto">
      <div className="glass p-8 rounded-2xl border border-white/5 flex items-start gap-8">
        <img
          src={auth.user?.avatar}
          className="w-32 h-32 rounded-2xl border-2 border-brand shadow-lg shadow-brand/20"
          alt="Profile"
        />
        <div className="space-y-4 flex-1">
          <div>
            <h1 className="text-3xl font-bold">{auth.user?.username}</h1>
            <span className="bg-brand/20 text-brand text-[10px] font-bold px-2 py-1 rounded uppercase tracking-widest border border-brand/20">
              {auth.user?.role}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="bg-white/5 p-4 rounded-xl">
              <span className="text-xs text-white/40 font-bold block mb-1">
                SESSION TOKEN
              </span>
              <code className="text-xs font-mono text-brand truncate block">
                {auth.token}
              </code>
            </div>
            <div className="bg-white/5 p-4 rounded-xl">
              <span className="text-xs text-white/40 font-bold block mb-1">
                AUTH STATUS
              </span>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs font-bold text-white/80">
                  Active & Secure
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
