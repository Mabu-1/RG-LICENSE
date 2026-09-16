import Link from 'next/link'

const LOGO_URL = 'https://cdn.shopify.com/s/files/1/0673/0275/2339/files/main_logo_d9a41a64-87f3-442f-bfa0-3b8cf7e16514.png?v=1786536373'

export default function CookiesPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #ffffff 0%, #EFF6FF 60%, #DBEAFE 100%)', padding: '40px 24px 80px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 48 }}>
          <Link href="/" style={{ fontSize: 13, color: '#64748b', textDecoration: 'none' }}>← Back</Link>
          <a href="/" style={{ marginLeft: 'auto', display: 'block' }}><img src={LOGO_URL} alt="ShopRevew" style={{ height: 36, display: 'block' }} /></a>
        </div>
        <div style={{ marginBottom: 40 }}>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, color: '#2563EB', marginBottom: 12 }}>Legal</div>
          <h1 style={{ fontFamily: 'serif', fontSize: 44, fontWeight: 900, color: '#0F172A', letterSpacing: -2, lineHeight: 1.05, marginBottom: 12 }}>Cookie Policy</h1>
          <p style={{ fontSize: 14, color: '#94a3b8' }}>Effective date: September 16, 2026 · ShopRevew</p>
        </div>
        <div style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: 14, padding: '18px 22px', marginBottom: 40, fontSize: 14, color: '#1e40af', lineHeight: 1.7 }}>
          This Cookie Policy explains how ShopRevew uses cookies and similar technologies on our website.
        </div>
        <div style={{ background: 'white', borderRadius: 20, padding: '48px 44px', border: '1px solid #BFDBFE', boxShadow: '0 8px 32px rgba(37,99,235,0.07)' }}>
          {[
            { title: '1. What Are Cookies', body: 'Cookies are small text files placed on your device when you visit a website. They help websites remember your preferences and improve your browsing experience.' },
            { title: '2. How We Use Cookies', body: 'ShopRevew uses only essential cookies required for the website to function properly. We do not use advertising cookies, tracking cookies, or third-party marketing cookies.' },
            { title: '3. Essential Cookies', body: 'Essential cookies are necessary for the website to work correctly. They enable core functionality such as session management and security. Without these cookies, the website cannot function properly. These cookies do not collect personal information and cannot be disabled.' },
            { title: '4. Session Storage', body: 'We use browser session storage (not cookies) to temporarily store your checkout form data so you do not need to re-enter it if you navigate back during the checkout process. This data is automatically cleared when you close your browser tab.' },
            { title: '5. Third-Party Services', body: 'Our website integrates with the following third-party services that may set their own cookies: Stripe (payment processing — for fraud prevention and security); Supabase (database — for API authentication). These cookies are governed by the respective third-party privacy policies.' },
            { title: '6. No Advertising Cookies', body: 'We do not use Google Analytics, Facebook Pixel, or any other advertising or tracking technologies on the ShopRevew website. We do not track your behaviour across other websites.' },
            { title: '7. Managing Cookies', body: 'You can control cookies through your browser settings. Most browsers allow you to refuse cookies, delete existing cookies, or be notified when cookies are set. Please note that disabling essential cookies may affect the functionality of our website.' },
            { title: '8. Changes to This Policy', body: 'We may update this Cookie Policy from time to time. Changes will be reflected by updating the effective date at the top of this page.' },
            { title: '9. Contact', body: 'For questions about our use of cookies, contact us via WhatsApp at +880 1971 914828 or visit shoprevew.com/contact.' },
          ].map((s, i) => (
            <div key={i} style={{ marginBottom: 32, paddingBottom: 32, borderBottom: i < 8 ? '1px solid #EFF6FF' : 'none' }}>
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
