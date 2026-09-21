"use client";

import React, { useState, useMemo } from "react";
import PosHeader from "./components/PosHeader";
import CategoryBar from "./components/CategoryBar";
import ProductCard from "./components/ProductCard";
import OrderCart from "./components/OrderCart";
import PaymentModal from "./components/PaymentModal";
import { PRODUCTS, Product, CartItem } from "./data/mockData";
import { AppliedDiscount } from "@/app/owner/data/promoMockData";
import { SearchX, Sparkles } from "lucide-react";
import StickerBadge from "@/components/ornaments/StickerBadge";

export default function PosTerminalPage() {
  const [activeCategory, setActiveCategory] = useState<string>("semua");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [orderType, setOrderType] = useState<"dine-in" | "take-away">("dine-in");
  const [tableNumber, setTableNumber] = useState<string>("Meja 04");
  const [customerName, setCustomerName] = useState<string>("");
  const [isPaymentOpen, setIsPaymentOpen] = useState<boolean>(false);
  const [appliedDiscount, setAppliedDiscount] = useState<AppliedDiscount | null>(null);

  // Cart state
  const [cart, setCart] = useState<CartItem[]>([
    {
      product: PRODUCTS[0], // Kopi Susu Aren Tokova
      qty: 2,
    },
    {
      product: PRODUCTS[12], // Croissant Butter Paris
      qty: 1,
    },
  ]);

  const subtotal = cart.reduce(
    (acc, curr) => acc + curr.product.price * curr.qty,
    0
  );

  const discountAmount = useMemo(() => {
    if (!appliedDiscount) return 0;
    if (appliedDiscount.type === "percentage") {
      return Math.round(subtotal * (appliedDiscount.value / 100));
    }
    return Math.min(appliedDiscount.calculatedAmount, subtotal);
  }, [appliedDiscount, subtotal]);

  // Filtered products based on category and search query
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      const matchCat =
        activeCategory === "semua" || item.category === activeCategory;
      const q = searchQuery.toLowerCase();
      const matchSearch =
        item.name.toLowerCase().includes(q) ||
        item.sku.toLowerCase().includes(q) ||
        (item.barcode && item.barcode.toLowerCase().includes(q)) ||
        item.description.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  // Add product to cart
  const handleAddToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }
      return [...prev, { product, qty: 1 }];
    });
  };

  // Update quantity in cart
  const handleUpdateQty = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const nextQty = item.qty + delta;
            return nextQty > 0 ? { ...item, qty: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  // Clear all items in cart
  const handleClearCart = () => {
    if (window.confirm("Kosongkan semua pesanan di keranjang kasir?")) {
      setCart([]);
      setAppliedDiscount(null);
    }
  };

  // Transaction completed callback
  const handleCompleteTransaction = () => {
    setCart([]);
    setCustomerName("");
    setAppliedDiscount(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F5] text-[#111827]">
      {/* Kasir Top Navigation */}
      <PosHeader
        orderType={orderType}
        setOrderType={setOrderType}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Main Terminal Workspace */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden pb-20 lg:pb-0">
        {/* Left Area: Categories & Products Catalog */}
        <main className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-5">
          {/* Category Tabs & Quick Badge */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <CategoryBar
              activeCategory={activeCategory}
              onSelectCategory={setActiveCategory}
            />

            <div className="hidden xl:flex items-center gap-2 shrink-0">
              <StickerBadge variant="yellow" rotate={-1}>
                ⚡ Mode Kasir Cepat
              </StickerBadge>
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 bg-white rounded-3xl border-2 border-dashed border-[#111827] text-center">
              <SearchX className="w-12 h-12 text-gray-400 mb-2" />
              <h3 className="font-extrabold text-base text-[#111827]">
                Produk Tidak Ditemukan
              </h3>
              <p className="text-xs text-gray-500 max-w-sm mt-1 font-medium">
                Tidak ada produk dengan kata kunci &ldquo;{searchQuery}&rdquo; di kategori ini.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("semua");
                }}
                className="mt-4 px-4 py-2 rounded-xl border-2 border-[#111827] bg-[#FBBF24] font-bold text-xs"
              >
                Reset Pencarian
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
              {filteredProducts.map((product) => {
                const cartItem = cart.find(
                  (item) => item.product.id === product.id
                );
                const quantityInCart = cartItem ? cartItem.qty : 0;

                return (
                  <ProductCard
                    key={product.id}
                    product={product}
                    quantityInCart={quantityInCart}
                    onAddToCart={handleAddToCart}
                  />
                );
              })}
            </div>
          )}
        </main>

        {/* Right Area: Order Cart Panel */}
        <OrderCart
          cart={cart}
          onUpdateQty={handleUpdateQty}
          onClearCart={handleClearCart}
          tableNumber={tableNumber}
          setTableNumber={setTableNumber}
          customerName={customerName}
          setCustomerName={setCustomerName}
          onProceedToPayment={() => setIsPaymentOpen(true)}
          orderType={orderType}
          appliedDiscount={appliedDiscount}
          onApplyDiscount={setAppliedDiscount}
          discountAmount={discountAmount}
        />
      </div>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        cart={cart}
        tableNumber={tableNumber}
        customerName={customerName}
        orderType={orderType}
        onCompleteTransaction={handleCompleteTransaction}
        appliedDiscount={appliedDiscount}
        discountAmount={discountAmount}
      />
    </div>
  );
}
