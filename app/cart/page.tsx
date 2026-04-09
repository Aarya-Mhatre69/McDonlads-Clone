"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { items, totalItems, totalPrice, increment, decrement, removeItem, clear } = useCart();

  return (
    <div
      className="min-h-screen page-enter"
      style={{ background: "#1A1A1A" }}
    >
      {/* ── Header ── */}
      <div
        style={{
          background: "linear-gradient(135deg, #DA291C 0%, #b71c1c 100%)",
          padding: "60px 24px 40px",
          textAlign: "center",
        }}
      >
        <p
          style={{
            color: "#FFC72C",
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            marginBottom: "12px",
          }}
        >
          Your Order
        </p>
        <h1
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(48px, 8vw, 80px)",
            color: "#ffffff",
            lineHeight: 1,
          }}
        >
          Cart
          {totalItems > 0 && (
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#FFC72C",
                color: "#1a1a1a",
                fontSize: "24px",
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                marginLeft: "16px",
                verticalAlign: "middle",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              {totalItems}
            </span>
          )}
        </h1>
      </div>

      <div style={{ maxWidth: "760px", margin: "0 auto", padding: "32px 24px 80px" }}>
        {/* ── Empty State ── */}
        {items.length === 0 ? (
          <div className="cart-empty">
            <div className="cart-empty-icon">🛒</div>
            <h2 className="cart-empty-title">Your cart is empty</h2>
            <p className="cart-empty-sub">Add items from our menu to start your order.</p>
            <Link href="/menu" id="cart-explore-menu" className="cart-explore-btn">
              Explore Menu →
            </Link>

            {/* Benefits */}
            <div className="cart-benefits">
              {[
                { icon: "⚡", label: "Fast Delivery" },
                { icon: "🔥", label: "Hot & Fresh" },
                { icon: "🛡️", label: "Safe Packaging" },
              ].map((b) => (
                <div key={b.label} className="cart-benefit-item">
                  <span className="cart-benefit-icon">{b.icon}</span>
                  <span className="cart-benefit-label">{b.label}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            {/* ── Cart Items ── */}
            <div className="cart-actions-top">
              <p className="cart-items-count">
                {totalItems} item{totalItems !== 1 ? "s" : ""} in your order
              </p>
              <button
                id="cart-clear-btn"
                onClick={clear}
                className="cart-clear-btn"
                aria-label="Clear all cart items"
              >
                Clear All
              </button>
            </div>

            <div className="cart-items-list" role="list" aria-label="Cart items">
              {items.map((item) => (
                <div
                  key={item.id}
                  id={`cart-item-${item.id}`}
                  className="cart-item"
                  role="listitem"
                >
                  {/* Image */}
                  <div className="cart-item-image-wrap">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="cart-item-image"
                    />
                  </div>

                  {/* Details */}
                  <div className="cart-item-info">
                    <h3 className="cart-item-name">{item.name}</h3>
                    <p className="cart-item-unit-price">₹{item.price} each</p>
                  </div>

                  {/* Qty controls */}
                  <div className="cart-item-controls">
                    <button
                      id={`decrement-${item.id}`}
                      onClick={() => decrement(item.id)}
                      className="cart-qty-btn"
                      aria-label={`Decrease quantity of ${item.name}`}
                    >
                      −
                    </button>
                    <span className="cart-qty-value" aria-label={`${item.quantity} of ${item.name}`}>
                      {item.quantity}
                    </span>
                    <button
                      id={`increment-${item.id}`}
                      onClick={() => increment(item.id)}
                      className="cart-qty-btn"
                      aria-label={`Increase quantity of ${item.name}`}
                    >
                      +
                    </button>
                  </div>

                  {/* Line total */}
                  <div className="cart-item-line-total">
                    ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                  </div>

                  {/* Remove */}
                  <button
                    id={`remove-${item.id}`}
                    onClick={() => removeItem(item.id)}
                    className="cart-item-remove"
                    aria-label={`Remove ${item.name} from cart`}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            {/* ── Order Summary ── */}
            <div className="cart-summary">
              <h2 className="cart-summary-title">Order Summary</h2>

              <div className="cart-summary-row">
                <span>Subtotal ({totalItems} items)</span>
                <span>₹{totalPrice.toLocaleString("en-IN")}</span>
              </div>
              <div className="cart-summary-row">
                <span>Delivery Fee</span>
                <span className="cart-free">FREE</span>
              </div>
              <div className="cart-summary-row">
                <span>Taxes (5% GST)</span>
                <span>₹{Math.round(totalPrice * 0.05).toLocaleString("en-IN")}</span>
              </div>

              <div className="cart-summary-divider" />

              <div className="cart-summary-total">
                <span>Total</span>
                <span>₹{Math.round(totalPrice * 1.05).toLocaleString("en-IN")}</span>
              </div>

              <button
                id="cart-checkout-btn"
                className="cart-checkout-btn"
                aria-label="Proceed to checkout"
              >
                Proceed to Checkout →
              </button>

              <Link href="/menu" id="cart-add-more" className="cart-add-more-link">
                ← Add More Items
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
