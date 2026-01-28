import { useFlow } from "fractostate";
import { AuthFlow } from "../store/auth";
import { CartFlow, UIFlow } from "../store/flows";
import { Link } from "react-router-dom";
import CartDrawer from "../components/CartDrawer";
import CheckoutOverlay from "../components/CheckoutOverlay";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [auth, toolbox] = useFlow(AuthFlow);
  const [cart] = useFlow(CartFlow);
  const [, { ops: uiOps }] = useFlow(UIFlow);

  const cartCount = cart.items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#050505] selection:bg-brand selection:text-white pb-20">
      {/* Header Global */}
      <nav className="fixed top-0 left-0 right-0 h-16 glass z-50 flex items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-brand rounded flex items-center justify-center font-bold text-lg select-none">
            F
          </div>
          <span className="font-bold text-xl tracking-tight hidden sm:inline">
            FractoShop
          </span>
        </Link>

        {auth.isAuthenticated && (
          <div className="flex items-center gap-4">
            {/* Cart Button */}
            <button
              onClick={() => uiOps.self.cartOpen._set(true)}
              className="relative p-2 hover:bg-white/5 rounded-full transition-colors cursor-pointer mr-2"
            >
              <span className="text-2xl">🛒</span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full ring-2 ring-black">
                  {cartCount}
                </span>
              )}
            </button>

            <Link
              to="/profile"
              className="flex items-center gap-3 hover:bg-white/5 p-1.5 pr-4 rounded-full transition-colors"
            >
              <img
                src={auth.user?.avatar}
                className="w-8 h-8 rounded-full border border-white/10"
                alt="Avatar"
              />
              <span className="text-sm font-medium text-white/80 hidden md:inline">
                {auth.user?.username}
              </span>
            </Link>
            <button
              onClick={() => toolbox.actions.logout()}
              className="text-xs text-red-400 hover:text-red-300 font-bold tracking-wider px-3 py-1.5 border border-red-500/20 rounded-lg hover:bg-red-500/10 transition-all"
            >
              LOGOUT
            </button>
          </div>
        )}
      </nav>

      {/* Main Content Injection */}
      {children}

      {/* Global Modals/Drawers */}
      <CartDrawer />
      <CheckoutOverlay />
    </div>
  );
}
