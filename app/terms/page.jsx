import Link from 'next/link'

const LOGO_URL = 'https://cdn.shopify.com/s/files/1/0673/0275/2339/files/main_logo_d9a41a64-87f3-442f-bfa0-3b8cf7e16514.png?v=1786536373'

export default function TermsPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #ffffff 0%, #EFF6FF 60%, #DBEAFE 100%)', padding: '40px 24px 80px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 48 }}>
          <Link href="/" style={{ fontSize: 13, color: '#64748b', textDecoration: 'none' }}>← Back</Link>
          <a href="/" style={{ marginLeft: 'auto', display: 'block' }}><img src={LOGO_URL} alt="ShopRevew" style={{ height: 36, display: 'block' }} /></a>
        </div>
        <div style={{ marginBottom: 40 }}>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, color: '#2563EB', marginBottom: 12 }}>Legal</div>
          <h1 style={{ fontFamily: 'serif', fontSize: 44, fontWeight: 900, color: '#0F172A', letterSpacing: -2, lineHeight: 1.05, marginBottom: 12 }}>Terms & Conditions</h1>
          <p style={{ fontSize: 14, color: '#94a3b8' }}>Effective date: September 16, 2026 · ShopRevew</p>
        </div>
        <div style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: 14, padding: '18px 22px', marginBottom: 40, fontSize: 14, color: '#1e40af', lineHeight: 1.7 }}>
          Please read these Terms and Conditions carefully before purchasing or using ShopRevew. By completing a purchase or using the service, you agree to be bound by these terms.
        </div>
        <div style={{ background: 'white', borderRadius: 20, padding: '48px 44px', border: '1px solid #BFDBFE', boxShadow: '0 8px 32px rgba(37,99,235,0.07)' }}>
          {[
            { title: '1. About ShopRevew', body: 'ShopRevew is a Shopify review gallery product that allows Shopify store owners to display customer reviews using a Google Sheet as the data source. The product is delivered as a Shopify Liquid section installed directly on your store theme.' },
            { title: '2. License Grant', body: 'Upon successful purchase, ShopRevew grants you a lifetime, non-exclusive, non-transferable license to use the ShopRevew script on the single Shopify store domain you provided at checkout. This license does not expire as long as you continue to operate that domain. Additional domains require separate license purchases at +$10 per domain after the first 3 free domains.' },
            { title: '3. $1 Trial & Payment Terms', body: 'ShopRevew offers a 3-day trial for $1. By entering your card details and paying $1, you authorize ShopRevew to automatically charge the remaining full plan amount after 3 days. This is a one-time payment — not a subscription. No further charges will be made after the trial conversion payment.' },
            { title: '4. One-Time Payment', body: 'ShopRevew is sold as a one-time payment product. There are no monthly fees, annual renewals, or hidden charges. The price you pay after the trial is the total cost for your selected plan. Prices are in US dollars and subject to change for future purchases — your existing license is not affected.' },
            { title: '5. Installation Service', body: 'All plans include a personal installation service. After booking your setup call via TidyCal, our team will install ShopRevew on your Shopify theme within 24 hours of the scheduled meeting. You must provide collaborator or staff access to your Shopify store during the installation window.' },
            { title: '6. Google Sheets & Data', body: 'ShopRevew fetches review data from a publicly shared Google Sheet CSV URL that you provide. You are solely responsible for the accuracy, legality, and authenticity of the review data displayed on your store. ShopRevew is not responsible for any reviews or content published through the section on your store.' },
            { title: '7. Domain Licensing', body: 'The first 3 domains are included in your plan at no extra charge. Each additional domain beyond 3 is licensed at +$10 per domain as a one-time charge. Your license is tied to the domains you provide at checkout and may not be transferred without written consent.' },
            { title: '8. Prohibited Uses', body: 'You may not: (a) resell, sublicense, or redistribute the ShopRevew script; (b) use the license on more domains than permitted; (c) reverse engineer or modify the script for redistribution; (d) use the product to display false or misleading reviews; or (e) transfer the license without written consent.' },
            { title: '9. Refund Policy', body: 'The $1 trial payment is non-refundable. Once the remaining amount has been charged after the 3-day trial and installation has been completed, all sales are final. If installation has not yet taken place, refund requests submitted within 48 hours of the charge will be considered on a case-by-case basis. If you experience technical issues post-installation, contact us and we will resolve them at no extra cost.' },
            { title: '10. Support & Updates', body: 'Your purchase includes bug fixes and support for the installed version of ShopRevew. We will make reasonable efforts to maintain compatibility with major Shopify theme updates. New feature additions or major customization requests are outside standard support scope and may be quoted separately. Support is provided via WhatsApp at +880 1971 914828.' },
            { title: '11. Intellectual Property', body: 'All code, design, and materials associated with ShopRevew remain the intellectual property of ShopRevew. Your license grants you the right to use the product — it does not transfer ownership of any intellectual property.' },
            { title: '12. Limitation of Liability', body: 'To the maximum extent permitted by law, ShopRevew shall not be liable for any indirect, incidental, special, consequential, or punitive damages. Our total liability for any claim shall not exceed the amount you paid for your license.' },
            { title: '13. Governing Law', body: 'These Terms are governed by the laws of Bangladesh. Any disputes shall be subject to the exclusive jurisdiction of the courts of Dhaka, Bangladesh.' },
            { title: '14. Changes to Terms', body: 'We reserve the right to update these Terms at any time. Continued use of the product after changes are posted constitutes acceptance of the revised terms.' },
            { title: '15. Contact', body: 'Questions about these Terms? Contact us via WhatsApp at +880 1971 914828 or visit shoprevew.com/contact.' },
          ].map((s, i) => (
            <div key={i} style={{ marginBottom: 32, paddingBottom: 32, borderBottom: i < 14 ? '1px solid #EFF6FF' : 'none' }}>
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
