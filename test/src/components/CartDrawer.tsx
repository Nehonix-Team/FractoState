import { useFlow } from "fractostate";
import {
  CartFlow,
  CartTotalFlow,
  UIFlow,
  CheckoutFlow,
  StressFlow,
} from "../store/flows";

export default function CartDrawer() {
  const [ui, { ops: uiOps }] = useFlow(UIFlow);
  const [cart, { ops: cartOps }] = useFlow(CartFlow);
  const [total] = useFlow(CartTotalFlow);
  const [, { ops: checkoutOps }] = useFlow(CheckoutFlow);
  const [stress, { ops: stressOps }] = useFlow(StressFlow);

  if (!ui.cartOpen) return null;

  return (
    <div className="fixed inset-0 z-[100]">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => uiOps.self.cartOpen._set(false)}
      />
      <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-[#0d0d0d] border-l border-white/10 p-6 flex flex-col shadow-2xl">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold flex items-center gap-3">
            Your Cart{" "}
            <span className="text-sm font-normal text-white/40">
              ({cart.items.length} items)
            </span>
          </h2>
          <button
            onClick={() => uiOps.self.cartOpen._set(false)}
            className="text-2xl hover:text-brand cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-4">
          {/* Concurrency Stress Test Area */}
          <div className="bg-brand/10 border border-brand/20 p-4 rounded-xl mb-4">
            <h3 className="text-[10px] font-black text-brand uppercase tracking-[0.2em] mb-3">
              Sync/Concurrency Test
            </h3>
            <div className="flex items-center justify-between mb-4">
              <div className="flex gap-4 text-sm font-mono bg-black/40 px-3 py-1.5 rounded-lg border border-white/5">
                <div>
                  A:{" "}
                  <span className="text-brand font-bold">
                    {stress.counterA}
                  </span>
                </div>
                <div>
                  B:{" "}
                  <span className="text-white font-bold">
                    {stress.counterB}
                  </span>
                </div>
              </div>
              <span className="text-[9px] text-white/30 uppercase font-bold">
                {stress.lastUpdated || "None"}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  stressOps.self.counterA._add(1);
                  stressOps.self.counterB._add(1);
                  stressOps.self.lastUpdated._set("Dual Add");
                }}
                className="py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-[9px] font-black tracking-wider transition-all"
              >
                ADD A & B (+1)
              </button>
              <button
                onClick={() => {
                  stressOps.self.counterA._set(0);
                  stressOps.self.counterB._set(0);
                  stressOps.self.lastUpdated._set("Reset");
                }}
                className="py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-[9px] font-black tracking-wider transition-all"
              >
                RESET BOTH
              </button>
            </div>
          </div>

          {cart.items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-white/20">
              <span className="text-6xl mb-4">🛒</span>
              <p>Your cart is empty</p>
            </div>
          ) : (
            cart.items.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-4 bg-white/10 p-4 rounded-xl relative overflow-hidden group border border-white/5"
              >
                <div className="text-3xl">{item.image}</div>
                <div className="flex-1">
                  <h4 className="font-bold">{item.name}</h4>
                  <p className="text-brand font-bold">${item.price}</p>
                </div>
                <button
                  onClick={() => cartOps.self.items._removeAt(idx)}
                  className="p-2 text-white/20 hover:text-red-500 transition-colors"
                >
                  🗑️
                </button>
              </div>
            ))
          )}
        </div>

        {cart.items.length > 0 && (
          <div className="mt-6 pt-6 border-t border-white/10">
            <div className="flex justify-between text-xl font-bold mb-6">
              <span>Total</span>
              <span className="text-brand">${total}</span>
            </div>
            <button
              onClick={() => checkoutOps.self.isOpen._set(true)}
              className="w-full btn-primary py-4 text-lg font-bold shadow-brand/40"
            >
              Checkout Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
