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
            . No prop drilling. No context providers. No useState. Blazing-fast,
            surgical state updates. Exactly where you need them.
          </p>

          <div className="mt-6 flex justify-center">
            <a
              href="https://github.com/Nehonix-Team/FractoState"
              target="_blank"
              rel="noopener noreferrer"
              className="group glass px-6 py-3 rounded-xl border border-white/10 text-sm font-bold text-white/80 hover:text-white flex items-center gap-3 hover:scale-105 hover:border-brand/50 active:scale-95 transition-all shadow-lg hover:shadow-brand/20"
            >
              <svg
                className="w-5 h-5 group-hover:rotate-12 transition-transform"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Clone & Test Yourself</span>
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          </div>
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
