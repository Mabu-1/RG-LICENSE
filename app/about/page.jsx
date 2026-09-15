import Link from "next/link";

const LOGO_URL =
  "https://cdn.shopify.com/s/files/1/0673/0275/2339/files/main_logo_d9a41a64-87f3-442f-bfa0-3b8cf7e16514.png?v=1786536373";

const cardStyle = {
  display: "flex",
  alignItems: "center",
  gap: 20,
  background: "white",
  borderRadius: 16,
  padding: "20px 24px",
  border: "1px solid #BFDBFE",
  textDecoration: "none",
  boxShadow: "0 4px 16px rgba(37,99,235,0.06)",
};

const iconBoxBase = {
  width: 48,
  height: 48,
  borderRadius: 12,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
};

const contacts = [
  {
    href: "https://wa.me/8801971914828",
    target: "_blank",
    iconBg: "#25D366",
    title: "WhatsApp",
    sub: "+880 1971 914828 — fastest response",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
  {
    href: "mailto:support@shopreview.app",
    target: "_self",
    iconBg: "#2563EB",
    title: "Email",
    sub: "support@shopreview.app",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
  {
    href: "https://tidycal.com/mahdi/shop-review",
    target: "_blank",
    iconBg: "#0F172A",
    title: "Book a Call",
    sub: "Schedule a setup or support meeting",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
      </svg>
    ),
  },
];

export default function ContactPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #ffffff 0%, #EFF6FF 60%, #DBEAFE 100%)",
        padding: "40px 24px 80px",
      }}
    >
      <div style={{ maxWidth: 640, margin: "0 auto" }}>
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
          <img
            src={LOGO_URL}
            alt="ShopReview"
            style={{ height: 36, display: "block", marginLeft: "auto" }}
          />
        </div>

        {/* Hero */}
        <div style={{ marginBottom: 40 }}>
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
            Get in Touch
          </div>
          <h1
            style={{
              fontFamily: "serif",
              fontSize: 44,
              fontWeight: 900,
              color: "#0F172A",
              letterSpacing: -2,
              lineHeight: 1.05,
              marginBottom: 12,
            }}
          >
            Contact Us
          </h1>
          <p style={{ fontSize: 15, color: "#64748b", lineHeight: 1.7 }}>
            Have a question or need help? Reach out through any of the options
            below and we will get back to you within 24 hours.
          </p>
        </div>

        {/* Cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {contacts.map((c) => (
            <a
              key={c.title}
              href={c.href}
              target={c.target}
              rel="noopener noreferrer"
              style={cardStyle}
            >
              <div style={{ ...iconBoxBase, background: c.iconBg }}>
                {c.icon}
              </div>
              <div>
                <div
                  style={{
                    fontSize: 15,
                    fontWeight: 700,
                    color: "#0F172A",
                    marginBottom: 2,
                  }}
                >
                  {c.title}
                </div>
                <div style={{ fontSize: 13, color: "#64748b" }}>{c.sub}</div>
              </div>
              <div
                style={{ marginLeft: "auto", fontSize: 20, color: "#BFDBFE" }}
              >
                →
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
