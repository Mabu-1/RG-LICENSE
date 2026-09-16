import Link from 'next/link'

const LOGO_URL = 'https://cdn.shopify.com/s/files/1/0673/0275/2339/files/main_logo_d9a41a64-87f3-442f-bfa0-3b8cf7e16514.png?v=1786536373'

export default function PrivacyPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #ffffff 0%, #EFF6FF 60%, #DBEAFE 100%)', padding: '40px 24px 80px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 48 }}>
          <Link href="/" style={{ fontSize: 13, color: '#64748b', textDecoration: 'none' }}>← Back</Link>
          <a href="/" style={{ marginLeft: 'auto', display: 'block' }}><img src={LOGO_URL} alt="ShopRevew" style={{ height: 36, display: 'block' }} /></a>
        </div>
        <div style={{ marginBottom: 40 }}>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, color: '#2563EB', marginBottom: 12 }}>Legal</div>
          <h1 style={{ fontFamily: 'serif', fontSize: 44, fontWeight: 900, color: '#0F172A', letterSpacing: -2, lineHeight: 1.05, marginBottom: 12 }}>Privacy Policy</h1>
          <p style={{ fontSize: 14, color: '#94a3b8' }}>Effective date: September 16, 2026 · ShopRevew</p>
        </div>
        <div style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: 14, padding: '18px 22px', marginBottom: 40, fontSize: 14, color: '#1e40af', lineHeight: 1.7 }}>
          Your privacy is important to us. This policy explains what data we collect, how we use it, and your rights regarding your personal information.
        </div>
        <div style={{ background: 'white', borderRadius: 20, padding: '48px 44px', border: '1px solid #BFDBFE', boxShadow: '0 8px 32px rgba(37,99,235,0.07)' }}>
          {[
            { title: '1. Who We Are', body: 'ShopRevew is a Shopify review gallery product operated at shoprevew.com. For privacy-related questions, contact us at shoprevew.com/contact or via WhatsApp at +880 1971 914828.' },
            { title: '2. Information We Collect', body: 'We collect the following information when you place an order or contact us: Full name, email address, WhatsApp number, Shopify store domain(s), payment card details (processed securely by Stripe — we never store your full card number), and any notes or messages you provide.' },
            { title: '3. How We Use Your Information', body: 'We use your information to: process and fulfil your order; install ShopRevew on your Shopify store; contact you via WhatsApp or email regarding your setup; automatically charge the remaining plan amount after your 3-day trial via Stripe; and respond to support requests.' },
            { title: '4. Payment Processing', body: 'All payments are processed by Stripe, Inc. We store a Stripe Customer ID and Payment Method ID in our database to enable the automatic charge after your 3-day trial. Your full card number is never stored on our servers. Stripe\'s privacy policy is available at stripe.com/privacy.' },
            { title: '5. Data Storage', body: 'Your order data (name, email, WhatsApp, domain, payment status) is stored securely in our Supabase database hosted on AWS infrastructure. We retain your data for as long as your license is active or as required by law.' },
            { title: '6. Data Sharing', body: 'We do not sell your personal data. We share your data only with: Stripe (payment processing), Supabase (database hosting), and TidyCal (booking your setup call). These third parties process your data only as needed to provide their services.' },
            { title: '7. Your Rights', body: 'You have the right to: access the personal data we hold about you; request correction of inaccurate data; request deletion of your data (subject to legal retention requirements); and withdraw consent for marketing communications. To exercise these rights, contact us at shoprevew.com/contact.' },
            { title: '8. Cookies', body: 'Our website uses essential cookies required for the site to function. We do not use advertising or tracking cookies. See our Cookie Policy for more details.' },
            { title: '9. Security', body: 'We implement industry-standard security measures to protect your personal data, including HTTPS encryption, secure database hosting, and limited staff access to customer data.' },
            { title: '10. Children\'s Privacy', body: 'ShopRevew is not directed at children under 16. We do not knowingly collect personal data from children. If you believe a child has provided us with personal data, please contact us immediately.' },
            { title: '11. Changes to This Policy', body: 'We may update this Privacy Policy from time to time. We will notify you of significant changes by updating the effective date at the top of this page.' },
            { title: '12. Contact', body: 'For privacy-related questions or requests, contact us via WhatsApp at +880 1971 914828 or visit shoprevew.com/contact.' },
          ].map((s, i) => (
            <div key={i} style={{ marginBottom: 32, paddingBottom: 32, borderBottom: i < 11 ? '1px solid #EFF6FF' : 'none' }}>
              <h2 style={{ fontFamily: 'serif', fontSize: 19, fontWeight: 800, color: '#0F172A', marginBottom: 10, letterSpacing: -0.3 }}>{s.title}</h2>
              <p style={{ fontSize: 15, color: '#475569', lineHeight: 1.85, margin: 0 }}>{s.body}</p>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 40, fontSize: 13, color: '#94a3b8' }}>
          Questions? <a href="/contact" style={{ color: '#2563EB', textDecoration: 'none', fontWeight: 600 }}>Contact us →</a>
        </div>
      </div>
    </div>
  )
}
