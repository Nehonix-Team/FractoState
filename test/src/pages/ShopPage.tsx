import { useFlow } from "fractostate";
import { ShopFlow, StressFlow } from "../store/flows";
import ProductList from "../components/ProductList";
import Notifications from "../components/Notifications";

export default function ShopPage() {
  const [shop, { ops: shopOps }] = useFlow(ShopFlow);
  const [, { ops: stressOps }] = useFlow(StressFlow);

  return (
    <>
      <Notifications />

      <main className="max-w-7xl mx-auto pb-20">
        <div className="fixed bottom-6 left-6 z-40">
          <button
            onClick={() => stressOps.self.counterA._add(5)}
            className="glass px-4 py-3 rounded-xl border border-white/10 text-[10px] font-bold text-brand flex items-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-2xl"
          >
            ⚡ RAPID A-BOOST (+5)
          </button>
        </div>
        <header className="px-6 pt-32 pb-4 text-center">
          <h1 className="text-4xl md:text-6xl font-black mb-4 bg-gradient-to-r from-white to-white/40 bg-clip-text text-transparent italic tracking-tighter">
            THE FUTURE OF STATE.
          </h1>
          <p className="text-white/40 font-medium max-w-xl mx-auto">
            This entire application runs on{" "}
            <span className="text-brand font-bold uppercase tracking-widest text-xs px-1">
              FractoState
            </span>
            . Zero Prop-Drilling. Zero Context Providers. Ultra-fast surgical
            updates.
          </p>
        </header>

        <section className="mt-8">
          <div className="px-6 flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <span className="w-8 h-[2px] bg-brand inline-block" /> Latest
              Drops
            </h2>
            <div className="flex gap-2">
              {["All", "Electronics", "Apparel", "Accessories"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => shopOps.self.category._set(cat)}
                  className={`text-xs font-bold px-4 py-1.5 rounded-full transition-all cursor-pointer ${shop.category === cat ? "bg-brand text-white shadow-lg shadow-brand/20" : "bg-white/5 hover:bg-white/10 text-white/60"}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <ProductList />
        </section>
      </main>
    </>
  );
}
