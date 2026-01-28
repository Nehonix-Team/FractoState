import { useFlow } from "fractostate";
import { ShopProducts, CartFlow, UIFlow, ShopFlow } from "../store/flows";

export default function ProductList() {
  const [, { ops: cart }] = useFlow(CartFlow);
  const [, { ops: ui }] = useFlow(UIFlow);
  const [shop] = useFlow(ShopFlow);

  const addToCart = (product: any) => {
    cart.self.items._push({ ...product, quantity: 1 });

    const id = Date.now();
    ui.self.notifications._push({
      id,
      text: `Added ${product.name} to cart!`,
      type: "success",
    });
    setTimeout(() => {
      ui.self.notifications._filter((m: any) => m.id !== id);
    }, 3000);
  };

  const filteredProducts = ShopProducts.filter(
    (p) => shop.category === "All" || p.category === shop.category,
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6 pt-12">
      {filteredProducts.map((p) => (
        <div
          key={p.id}
          className="glass rounded-2xl p-4 group hover:scale-[1.02] transition-transform duration-300"
        >
          <div className="h-40 bg-white/5 rounded-xl flex items-center justify-center text-6xl mb-4 group-hover:bg-white/10 transition-colors">
            {p.image}
          </div>
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-bold text-lg">{p.name}</h3>
              <p className="text-white/40 text-xs uppercase tracking-widest">
                {p.category}
              </p>
            </div>
            <span className="text-brand font-bold">${p.price}</span>
          </div>
          <button
            onClick={() => addToCart(p)}
            className="w-full mt-4 btn-primary"
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}
