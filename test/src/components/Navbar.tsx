import { useFlow } from "fractostate";
import { CartFlow, UserFlow, UIFlow } from "../store/flows";

export default function Navbar() {
  const [user] = useFlow(UserFlow);
  const [cart] = useFlow(CartFlow);
  const [, { ops: ui }] = useFlow(UIFlow);

  const cartCount = cart.items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 glass z-50 flex items-center justify-between px-6">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-brand rounded flex items-center justify-center font-bold text-lg select-none">
          F
        </div>
        <span className="font-bold text-xl tracking-tight hidden sm:inline">
          FractoShop
        </span>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-white/60 hidden md:inline">
            Hello, <span className="text-white">{user.name}</span>
          </span>
          <img
            src={user.avatar}
            className="w-8 h-8 rounded-full border border-white/10"
            alt="Avatar"
          />
        </div>

        <button
          onClick={() => ui.self.cartOpen._set(true)}
          className="relative p-2 hover:bg-white/5 rounded-full transition-colors cursor-pointer"
        >
          <span className="text-2xl">🛒</span>
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-brand text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full ring-2 ring-black">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
}
