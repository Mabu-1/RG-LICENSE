import Link from 'next/link'

const LOGO_URL = 'https://cdn.shopify.com/s/files/1/0673/0275/2339/files/main_logo_d9a41a64-87f3-442f-bfa0-3b8cf7e16514.png?v=1786536373'

export default function RefundPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #ffffff 0%, #EFF6FF 60%, #DBEAFE 100%)', padding: '40px 24px 80px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 48 }}>
          <Link href="/" style={{ fontSize: 13, color: '#64748b', textDecoration: 'none' }}>← Back</Link>
          <a href="/" style={{ marginLeft: 'auto', display: 'block' }}><img src={LOGO_URL} alt="ShopRevew" style={{ height: 36, display: 'block' }} /></a>
        </div>
        <div style={{ marginBottom: 40 }}>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, color: '#2563EB', marginBottom: 12 }}>Legal</div>
          <h1 style={{ fontFamily: 'serif', fontSize: 44, fontWeight: 900, color: '#0F172A', letterSpacing: -2, lineHeight: 1.05, marginBottom: 12 }}>Refund Policy</h1>
          <p style={{ fontSize: 14, color: '#94a3b8' }}>Effective date: September 16, 2026 · ShopRevew</p>
        </div>
        <div style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: 14, padding: '18px 22px', marginBottom: 40, fontSize: 14, color: '#1e40af', lineHeight: 1.7 }}>
          We stand behind our product and want you to be completely satisfied. Please read our refund policy carefully before purchasing.
        </div>
        <div style={{ background: 'white', borderRadius: 20, padding: '48px 44px', border: '1px solid #BFDBFE', boxShadow: '0 8px 32px rgba(37,99,235,0.07)' }}>
          {[
            { title: '1. The $1 Trial Payment', body: 'The $1 trial payment is non-refundable. This payment initiates your 3-day trial period and covers the cost of beginning your account setup. By paying $1 you authorize us to automatically charge the remaining plan amount after 3 days.' },
            { title: '2. The Remaining Plan Payment', body: 'After your 3-day trial, the remaining plan amount is automatically charged to the card you provided. Once this charge has been processed and installation has been completed on your Shopify store, all sales are final and non-refundable.' },
            { title: '3. Refund Eligibility Window', body: 'If the remaining amount has been charged but installation has NOT yet been completed, you may request a refund within 48 hours of the charge. Refund requests after installation has been completed will not be accepted, as the digital service has been fully delivered.' },
            { title: '4. How to Request a Refund', body: 'To request a refund within the eligible window, contact us immediately via WhatsApp at +880 1971 914828 or through our contact page at shoprevew.com/contact. Please include your order email and Shopify store domain in your message.' },
            { title: '5. Installation Issues', body: 'If you experience technical issues with ShopRevew after installation, we will resolve them at no additional cost. Technical issues are not grounds for a refund once installation is complete — we will fix any bugs or compatibility issues free of charge.' },
            { title: '6. Payment Failures', body: 'If the automatic charge after your 3-day trial fails, your trial status will be marked as payment failed. We will attempt to contact you via WhatsApp and email to resolve the payment. Failure to resolve payment within 7 days may result in removal of the installation from your store.' },
            { title: '7. Domain Changes', body: 'Your license is tied to the domain(s) specified at checkout. If you need to change your domain, contact us — we can transfer your license at no additional charge in most cases.' },
            { title: '8. Contact Us', body: 'For refund requests or payment-related questions, contact us via WhatsApp at +880 1971 914828 or visit shoprevew.com/contact. We aim to respond within 24 hours.' },
          ].map((s, i) => (
            <div key={i} style={{ marginBottom: 32, paddingBottom: 32, borderBottom: i < 7 ? '1px solid #EFF6FF' : 'none' }}>
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
