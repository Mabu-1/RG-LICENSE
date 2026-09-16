import Link from "next/link";

const LOGO_URL =
  "https://cdn.shopify.com/s/files/1/0673/0275/2339/files/main_logo_d9a41a64-87f3-442f-bfa0-3b8cf7e16514.png?v=1786536373";

export default function AboutPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #ffffff 0%, #EFF6FF 60%, #DBEAFE 100%)",
        padding: "40px 24px 80px",
      }}
    >
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        {/* Header */}
        <div
          style={{ display: "flex", alignItems: "center", marginBottom: 48 }}
        >
          <Link
            href="/"
            style={{ fontSize: 13, color: "#64748b", textDecoration: "none" }}
          >
            ← Back
          </Link>
          <a href="/" className="rgl-logo">
            <img src={LOGO_URL} alt="Logo" />
          </a>
        </div>

        {/* Hero */}
        <div style={{ marginBottom: 48 }}>
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: 2,
              color: "#2563EB",
              marginBottom: 12,
            }}
          >
            About
          </div>
          <h1
            style={{
              fontFamily: "serif",
              fontSize: 48,
              fontWeight: 900,
              color: "#0F172A",
              letterSpacing: -2,
              lineHeight: 1.05,
              marginBottom: 20,
            }}
          >
            We built ShopRevew because review apps were charging too much for
            too little.
          </h1>
          <p style={{ fontSize: 17, color: "#64748B", lineHeight: 1.8 }}>
            Every month, thousands of Shopify store owners pay $15, $30, even
            $50 just to show customer reviews on their storefront. The features
            are locked behind tiers. The branding is theirs, not yours. And the
            bill never stops.
          </p>
        </div>

        {/* Story */}
        <div
          style={{
            background: "white",
            borderRadius: 20,
            padding: "44px 40px",
            border: "1px solid #BFDBFE",
            boxShadow: "0 8px 32px rgba(37,99,235,0.07)",
            marginBottom: 24,
          }}
        >
          <h2
            style={{
              fontFamily: "serif",
              fontSize: 26,
              fontWeight: 800,
              color: "#0F172A",
              marginBottom: 16,
              letterSpacing: -0.5,
            }}
          >
            Our Story
          </h2>
          <p
            style={{
              fontSize: 15,
              color: "#475569",
              lineHeight: 1.85,
              marginBottom: 20,
            }}
          >
            ShopRevewstarted as a simple idea: what if you could manage all your
            customer reviews inside a Google Sheet, and have them display
            beautifully on your Shopify store — without paying a monthly fee
            ever again?
          </p>
          <p
            style={{
              fontSize: 15,
              color: "#475569",
              lineHeight: 1.85,
              marginBottom: 20,
            }}
          >
            We built it, tested it on real stores, and the results spoke for
            themselves. Clean layouts, fast loading, full theme editor controls
            — and a one-time price that pays for itself in the first month.
          </p>
          <p style={{ fontSize: 15, color: "#475569", lineHeight: 1.85 }}>
            Today ShopRevewpowers review galleries on Shopify stores across
            multiple countries. Every customer gets a personal installation — we
            set it up for you, test it, and make sure it works perfectly before
            we hand it over.
          </p>
        </div>

        {/* Values */}
        <div
          style={{
            background: "white",
            borderRadius: 20,
            padding: "44px 40px",
            border: "1px solid #BFDBFE",
            boxShadow: "0 8px 32px rgba(37,99,235,0.07)",
            marginBottom: 24,
          }}
        >
          <h2
            style={{
              fontFamily: "serif",
              fontSize: 26,
              fontWeight: 800,
              color: "#0F172A",
              marginBottom: 28,
              letterSpacing: -0.5,
            }}
          >
            What We Stand For
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {[
              {
                icon: "💸",
                title: "No Subscriptions. Ever.",
                desc: "You pay once and own it forever. We believe software tools should not drain your revenue month after month.",
              },
              {
                icon: "🛠️",
                title: "We Install It For You.",
                desc: "You should not need to be a developer to get a great review gallery. We handle the full setup on your store.",
              },
              {
                icon: "📊",
                title: "Your Data, Your Control.",
                desc: "Reviews live in your Google Sheet. You own the data. No lock-in, no export fees, no surprises.",
              },
              {
                icon: "⚡",
                title: "Built for Real Stores.",
                desc: "ShopRevewis designed for Shopify stores that need speed, reliability, and a layout that actually converts.",
              },
            ].map((v, i) => (
              <div
                key={i}
                style={{ display: "flex", gap: 18, alignItems: "flex-start" }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    background: "#EFF6FF",
                    borderRadius: 12,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 20,
                    flexShrink: 0,
                  }}
                >
                  {v.icon}
                </div>
                <div>
                  <div
                    style={{
                      fontSize: 15,
                      fontWeight: 700,
                      color: "#0F172A",
                      marginBottom: 4,
                    }}
                  >
                    {v.title}
                  </div>
                  <div
                    style={{ fontSize: 14, color: "#64748B", lineHeight: 1.7 }}
                  >
                    {v.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div
          style={{
            background: "#2563EB",
            borderRadius: 20,
            padding: "40px",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontFamily: "serif",
              fontSize: 28,
              fontWeight: 900,
              color: "#fff",
              letterSpacing: -1,
              marginBottom: 10,
            }}
          >
            Ready to ditch the monthly fee?
          </h2>
          <p
            style={{
              fontSize: 15,
              color: "rgba(255,255,255,0.8)",
              marginBottom: 28,
            }}
          >
            One payment. We install it. Yours forever.
          </p>
          <a
            href="/#pricing"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "#fff",
              color: "#2563EB",
              padding: "14px 32px",
              borderRadius: 100,
              fontWeight: 700,
              fontSize: 15,
              textDecoration: "none",
            }}
          >
            See Plans →
          </a>
        </div>

        {/* Footer note */}
        <div
          style={{
            textAlign: "center",
            marginTop: 40,
            fontSize: 13,
            color: "#94a3b8",
          }}
        >
          Questions?{" "}
          <a
            href="/contact"
            style={{
              color: "#2563EB",
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            Contact us →
          </a>
        </div>
      </div>
    </div>
  );
}
