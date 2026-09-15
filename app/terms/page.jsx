import Link from "next/link";

const LOGO_URL =
  "https://cdn.shopify.com/s/files/1/0673/0275/2339/files/main_logo_d9a41a64-87f3-442f-bfa0-3b8cf7e16514.png?v=1786536373";

export default function TermsPage() {
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
            Legal
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
            Terms & Conditions
          </h1>
          <p style={{ fontSize: 14, color: "#94a3b8" }}>
            Effective date: September 15, 2026 · ShopRevewby Brands Bro LLC
          </p>
        </div>

        {/* Intro box */}
        <div
          style={{
            background: "#EFF6FF",
            border: "1px solid #BFDBFE",
            borderRadius: 14,
            padding: "18px 22px",
            marginBottom: 40,
            fontSize: 14,
            color: "#1e40af",
            lineHeight: 1.7,
          }}
        >
          Please read these Terms and Conditions carefully before purchasing or
          using ShopReview. By completing a purchase or using the service, you
          agree to be bound by these terms.
        </div>

        {/* Content */}
        <div
          style={{
            background: "white",
            borderRadius: 20,
            padding: "48px 44px",
            border: "1px solid #BFDBFE",
            boxShadow: "0 8px 32px rgba(37,99,235,0.07)",
          }}
        >
          {[
            {
              title: "1. About ShopReview",
              body: "ShopRevewis a Shopify review gallery product developed and operated by Brands Bro LLC. It allows Shopify store owners to display customer reviews (photo, video, and star ratings) using a Google Sheet as the data source. The product is delivered as a Shopify Liquid section installed directly on your store theme.",
            },
            {
              title: "2. License Grant",
              body: "Upon successful purchase, Brands Bro LLC grants you a lifetime, non-exclusive, non-transferable license to use the ShopRevewscript on the single Shopify store domain you provided at checkout. This license does not expire as long as you continue to operate that domain. Additional domains require separate license purchases or the Extra Domain add-on.",
            },
            {
              title: "3. One-Time Payment & Pricing",
              body: "ShopRevewis sold as a one-time payment product. There are no monthly fees, annual renewals, or hidden charges. The price you pay at checkout is the total cost for your selected plan and any chosen add-ons. Prices are displayed in US dollars and are subject to change for future purchases — your existing license is not affected by price changes.",
            },
            {
              title: "4. $1 Trial",
              body: "Where a $1 trial offer is available, you pay $1 to begin the setup process. After the trial period (3 days), you will be invoiced for the remaining balance of your selected plan. Failure to complete payment within 7 days of invoicing will result in removal of the installation from your store. The $1 trial payment is non-refundable.",
            },
            {
              title: "5. Installation Service",
              body: "All plans include a personal installation service. After booking your setup call via TidyCal, our team will install the ShopRevewsection on your Shopify theme within 24 hours of the scheduled meeting. You are required to provide temporary collaborator or staff access to your Shopify store during the installation window. We will not store your credentials or access your store beyond the scope of the installation.",
            },
            {
              title: "6. Google Sheets & Data",
              body: "ShopRevewfetches review data from a publicly shared Google Sheet CSV URL that you provide. You are solely responsible for the accuracy, legality, and authenticity of the review data you display on your store. Brands Bro LLC is not responsible for any reviews, claims, or content published through the ShopRevewsection on your store.",
            },
            {
              title: "7. Prohibited Uses",
              body: "You may not: (a) resell, sublicense, or redistribute the ShopRevewscript or any part of it; (b) use the license on more domains than permitted by your plan; (c) reverse engineer, decompile, or modify the script for redistribution; (d) use the product to display false, misleading, or defamatory reviews; or (e) transfer the license to another party without written consent from Brands Bro LLC.",
            },
            {
              title: "8. Refund Policy",
              body: "Due to the digital and service-based nature of ShopRevew— which includes personal installation — all sales are final and non-refundable once the installation has been completed. If installation has not yet taken place, refund requests submitted within 48 hours of purchase will be considered on a case-by-case basis. If you experience technical issues with the product post-installation, contact us and we will resolve them at no additional cost.",
            },
            {
              title: "9. Support & Updates",
              body: "Your purchase includes bug fixes and support for the installed version of ShopReview. We will make reasonable efforts to maintain compatibility with major Shopify theme updates. New feature additions or major redesign requests are outside the scope of standard support and may be quoted separately. Support is provided via WhatsApp and email during business hours (GMT+6).",
            },
            {
              title: "10. Intellectual Property",
              body: "All code, design, and materials associated with ShopRevewremain the intellectual property of Brands Bro LLC. Your license grants you the right to use the product — it does not transfer ownership of any intellectual property to you.",
            },
            {
              title: "11. Limitation of Liability",
              body: "To the maximum extent permitted by law, Brands Bro LLC shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of ShopReview, including but not limited to loss of revenue, data, or business opportunities. Our total liability to you for any claim arising from your purchase shall not exceed the amount you paid for your license.",
            },
            {
              title: "12. Governing Law",
              body: "These Terms and Conditions are governed by and construed in accordance with the laws of Bangladesh. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts of Dhaka, Bangladesh.",
            },
            {
              title: "13. Changes to These Terms",
              body: "We reserve the right to update these Terms and Conditions at any time. When we do, we will update the effective date at the top of this page. Continued use of the product after changes are posted constitutes your acceptance of the revised terms.",
            },
            {
              title: "14. Contact Us",
              body: "If you have any questions about these Terms and Conditions, please contact us: via WhatsApp at +880 1971 914828, or through our contact page at rg-license.vercel.app/contact. We aim to respond within 24 hours.",
            },
          ].map((s, i) => (
            <div
              key={i}
              style={{
                marginBottom: 36,
                paddingBottom: 36,
                borderBottom: i < 13 ? "1px solid #EFF6FF" : "none",
              }}
            >
              <h2
                style={{
                  fontFamily: "serif",
                  fontSize: 19,
                  fontWeight: 800,
                  color: "#0F172A",
                  marginBottom: 10,
                  letterSpacing: -0.3,
                }}
              >
                {s.title}
              </h2>
              <p
                style={{
                  fontSize: 15,
                  color: "#475569",
                  lineHeight: 1.85,
                  margin: 0,
                }}
              >
                {s.body}
              </p>
            </div>
          ))}
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
