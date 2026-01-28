import { useFlow } from "fractostate";
import { UIFlow } from "../store/flows";

export default function Notifications() {
  const [ui] = useFlow(UIFlow);

  return (
    <div className="fixed bottom-6 right-6 z-[200] flex flex-col gap-3 pointer-events-none">
      {ui.notifications.map((n) => (
        <div
          key={n.id}
          className="glass py-3 px-6 rounded-full border-brand/20 flex items-center gap-3 animate-slide-in shadow-2xl"
        >
          <span className="w-2 h-2 bg-brand rounded-full animate-pulse shadow-[0_0_10px_brand]" />
          <span className="text-sm font-bold text-white/90">{n.text}</span>
        </div>
      ))}
      <style>{`
        @keyframes slide-in {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .animate-slide-in { animation: slide-in 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
      `}</style>
    </div>
  );
}
