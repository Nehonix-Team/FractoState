import { useFlow } from "fractostate";
import { CheckoutFlow } from "../store/flows";

export default function CheckoutOverlay() {
  const [checkout, { ops }] = useFlow(CheckoutFlow);

  if (!checkout.isOpen) return null;

  const handleCheckout = () => {
    ops.self._merge({
      orderId: `FRA-${Math.floor(Math.random() * 100000)}`,
      step: "success",
    });
  };

  const close = () => {
    ops.self._merge({
      isOpen: false,
      step: "form",
      formData: { name: "", email: "", address: "" },
    });
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={close}
      />

      <div className="relative glass w-full max-w-lg rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
        {checkout.step === "form" ? (
          <div className="p-8 space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-brand to-cyan-400 bg-clip-text text-transparent">
                Complete Your Order
              </h2>
              <p className="text-white/40 text-sm mt-2">
                Enter your shipping details below
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-white/60 ml-1">
                  FULL NAME
                </label>
                <input
                  type="text"
                  value={checkout.formData.name}
                  onChange={(e) => ops.self.formData.name._set(e.target.value)}
                  placeholder="John Doe"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-brand/50 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-white/60 ml-1">
                  EMAIL ADDRESS
                </label>
                <input
                  type="email"
                  value={checkout.formData.email}
                  onChange={(e) => ops.self.formData.email._set(e.target.value)}
                  placeholder="john@example.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-brand/50 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-white/60 ml-1">
                  SHIPPING ADDRESS
                </label>
                <textarea
                  value={checkout.formData.address}
                  onChange={(e) =>
                    ops.self.formData.address._set(e.target.value)
                  }
                  placeholder="123 Fractal St."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-brand/50 transition-all h-24 resize-none"
                />
              </div>
            </div>

            <div className="pt-2 border-t border-white/5 flex gap-4">
              <button
                onClick={close}
                className="flex-1 py-3 px-4 rounded-xl border border-white/10 font-bold hover:bg-white/5 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleCheckout}
                disabled={!checkout.formData.name || !checkout.formData.email}
                className="flex-[2] btn-primary py-3 px-4 font-bold shadow-brand/20 disabled:opacity-50"
              >
                Place Order
              </button>
            </div>
          </div>
        ) : (
          <div className="p-12 text-center space-y-6">
            <div className="w-24 h-24 bg-green-500/20 border border-green-500/50 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
              <span className="text-5xl">📦</span>
            </div>
            <h1 className="text-4xl font-extrabold">Order Confirmed!</h1>
            <p className="text-white/60">
              Thank you for your purchase,{" "}
              <span className="text-brand font-bold">
                {checkout.formData.name}
              </span>
              .
            </p>
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10 text-left">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-white/40">Order Number:</span>
                <span className="font-mono text-brand">{checkout.orderId}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/40">Ship to:</span>
                <span className="text-right truncate ml-4">
                  {checkout.formData.address}
                </span>
              </div>
            </div>
            <button
              onClick={close}
              className="w-full btn-primary py-4 text-lg font-bold"
            >
              Back to Store
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
