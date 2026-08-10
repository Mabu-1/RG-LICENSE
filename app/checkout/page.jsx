'use client'
import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

const PLANS = {
  starter: {
    name: 'Starter',
    price: 39.99,
    desc: '1 Gallery Design Style + 1 Licensed Domain',
    features: ['1 Gallery Design Style', '1 Licensed Domain', 'All 3 Card Layouts', 'Full Theme Editor Controls', 'Photo & Video Lightbox', 'Installation Included', 'Lifetime License'],
    addon: { label: 'Extra Design Style', desc: 'Unlock an additional gallery style', price: 20 }
  },
  growth: {
    name: 'Growth',
    price: 69.99,
    desc: '1 Gallery Design Style + 3 Licensed Domains',
    features: ['1 Gallery Design Style', '3 Licensed Domains', 'Everything in Starter', 'Priority Installation', 'Priority Support'],
    addon: { label: 'Extra Domain', desc: 'License one more Shopify store', price: 10 }
  },
  studio: {
    name: 'Studio',
    price: 89.99,
    desc: '3 Gallery Design Styles + 3 Licensed Domains',
    features: ['3 Gallery Design Styles', '3 Licensed Domains', 'Everything in Growth', 'Early Access to New Designs', 'Priority Support'],
    addon: { label: 'Extra Domain', desc: 'License one more Shopify store', price: 10 }
  }
}

function CheckoutContent() {
  const searchParams = useSearchParams()
  const planKey = searchParams.get('plan') || 'starter'
  const plan = PLANS[planKey] || PLANS.starter

  const [addonSelected, setAddonSelected] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', domain: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const total = plan.price + (addonSelected ? plan.addon.price : 0)

  function validate() {
    const e = {}
    if (!form.name.trim()) e.name = 'Required'
    if (!form.email.trim() || !form.email.includes('@')) e.email = 'Valid email required'
    if (!form.domain.trim()) e.domain = 'Required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function handleSubmit() {
    if (!validate()) return
    setLoading(true)
    await new Promise(r => setTimeout(r, 1500))
    setLoading(false)
    setSubmitted(true)
  }

  if (submitted) return (
    <div style={{ minHeight:'100vh', background:'#F8F7F4', display:'flex', alignItems:'center', justifyContent:'center', padding:24 }}>
      <div style={{ maxWidth:480, width:'100%', background:'white', borderRadius:20, padding:48, textAlign:'center', boxShadow:'0 20px 60px rgba(0,0,0,0.08)' }}>
        <div style={{ fontSize:56, marginBottom:16 }}>🎉</div>
        <h2 style={{ fontFamily:'serif', fontSize:28, fontWeight:900, color:'#0F172A', marginBottom:12, letterSpacing:-1 }}>Order Received!</h2>
        <p style={{ fontSize:15, color:'#64748b', lineHeight:1.7, marginBottom:24 }}>
          Thanks <strong>{form.name}</strong>! We received your order for the <strong>{plan.name}</strong> plan.
          We will reach out to <strong>{form.email}</strong> within 24 hours to schedule setup.
        </p>
        <div style={{ background:'#FFFBEB', border:'1px solid #FDE68A', borderRadius:12, padding:16, marginBottom:28 }}>
          <div style={{ fontSize:13, fontWeight:600, color:'#92400E', marginBottom:6 }}>What happens next?</div>
          <div style={{ fontSize:13, color:'#78350F', lineHeight:1.7 }}>
            1. We will email you a Google Meet link to schedule setup<br/>
            2. We will install the section on your Shopify theme<br/>
            3. You add reviews to your Google Sheet and go live
          </div>
        </div>
        <Link href="/" style={{ display:'inline-flex', padding:'12px 28px', background:'#0F172A', color:'white', borderRadius:100, fontSize:14, fontWeight:600, textDecoration:'none' }}>← Back to Home</Link>
      </div>
    </div>
  )

  const inputStyle = { width:'100%', padding:'11px 14px', border:'1px solid #e2e8f0', borderRadius:10, fontSize:14, boxSizing:'border-box', fontFamily:'inherit', outline:'none' }
  const labelStyle = { fontSize:12, fontWeight:600, color:'#64748b', display:'block', marginBottom:5 }

  return (
    <div style={{ minHeight:'100vh', background:'#F8F7F4', padding:'40px 24px' }}>
      <div style={{ maxWidth:960, margin:'0 auto' }}>

        <div style={{ display:'flex', alignItems:'center', marginBottom:40 }}>
          <Link href="/#pricing" style={{ fontSize:13, color:'#64748b', textDecoration:'none' }}>← Back</Link>
          <div style={{ fontFamily:'serif', fontSize:20, fontWeight:700, color:'#0F172A', marginLeft:'auto' }}>★ ReviewGallery Pro</div>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 400px', gap:32, alignItems:'start' }}>

          <div>
            <h1 style={{ fontFamily:'serif', fontSize:32, fontWeight:900, color:'#0F172A', marginBottom:6, letterSpacing:-1 }}>Complete Your Order</h1>
            <p style={{ fontSize:14, color:'#64748b', marginBottom:32 }}>Fill in your details and we will reach out within 24 hours to get you set up.</p>

            <div style={{ background:'white', borderRadius:16, padding:28, marginBottom:16, border:'1px solid #e2e8f0' }}>
              <div style={{ fontSize:14, fontWeight:700, color:'#0F172A', marginBottom:20 }}>1. Your Details</div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, marginBottom:14 }}>
                <div>
                  <label style={labelStyle}>Full Name *</label>
                  <input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="John Smith" style={{ ...inputStyle, borderColor: errors.name ? '#ef4444' : '#e2e8f0' }} />
                  {errors.name && <div style={{ fontSize:11, color:'#ef4444', marginTop:3 }}>{errors.name}</div>}
                </div>
                <div>
                  <label style={labelStyle}>Email Address *</label>
                  <input type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="john@store.com" style={{ ...inputStyle, borderColor: errors.email ? '#ef4444' : '#e2e8f0' }} />
                  {errors.email && <div style={{ fontSize:11, color:'#ef4444', marginTop:3 }}>{errors.email}</div>}
                </div>
              </div>
              <div style={{ marginBottom:14 }}>
                <label style={labelStyle}>Shopify Store Domain *</label>
                <input value={form.domain} onChange={e=>setForm({...form,domain:e.target.value})} placeholder="yourstore.myshopify.com" style={{ ...inputStyle, borderColor: errors.domain ? '#ef4444' : '#e2e8f0' }} />
                {errors.domain && <div style={{ fontSize:11, color:'#ef4444', marginTop:3 }}>{errors.domain}</div>}
                <div style={{ fontSize:11, color:'#94a3b8', marginTop:4 }}>This becomes your license key</div>
              </div>
              <div>
                <label style={labelStyle}>Notes (optional)</label>
                <textarea value={form.message} onChange={e=>setForm({...form,message:e.target.value})} placeholder="Any questions or special requirements..." style={{ ...inputStyle, height:80, resize:'vertical' }} />
              </div>
            </div>

            <div style={{ background:'white', borderRadius:16, padding:28, border:'1px solid #e2e8f0' }}>
              <div style={{ fontSize:14, fontWeight:700, color:'#0F172A', marginBottom:16 }}>2. Optional Add-on</div>
              <div
                onClick={() => setAddonSelected(!addonSelected)}
                style={{ display:'flex', alignItems:'center', gap:16, padding:16, border: addonSelected ? '2px solid #F59E0B' : '2px solid #e2e8f0', borderRadius:12, cursor:'pointer', transition:'all 0.2s', background: addonSelected ? '#FFFBEB' : 'white' }}
              >
                <div style={{ width:22, height:22, borderRadius:6, border: addonSelected ? '2px solid #F59E0B' : '2px solid #d1d5db', background: addonSelected ? '#F59E0B' : 'white', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                  {addonSelected && <span style={{ color:'white', fontSize:13, fontWeight:700 }}>✓</span>}
                </div>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:14, fontWeight:600, color:'#0F172A' }}>{plan.addon.label}</div>
                  <div style={{ fontSize:12, color:'#64748b' }}>{plan.addon.desc}</div>
                </div>
                <div style={{ fontFamily:'serif', fontSize:20, fontWeight:900, color: addonSelected ? '#F59E0B' : '#0F172A' }}>+${plan.addon.price}</div>
              </div>
            </div>
          </div>

          <div style={{ position:'sticky', top:24 }}>
            <div style={{ background:'white', borderRadius:16, padding:28, border:'1px solid #e2e8f0', marginBottom:12 }}>
              <div style={{ fontSize:13, fontWeight:700, color:'#64748b', textTransform:'uppercase', letterSpacing:1, marginBottom:16 }}>Order Summary</div>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', paddingBottom:16, borderBottom:'1px solid #f1f5f9', marginBottom:16 }}>
                <div>
                  <div style={{ fontWeight:700, fontSize:15, color:'#0F172A' }}>{plan.name} Plan</div>
                  <div style={{ fontSize:12, color:'#64748b', marginTop:2 }}>{plan.desc}</div>
                </div>
                <div style={{ fontWeight:700, fontSize:15, color:'#0F172A' }}>${plan.price}</div>
              </div>
              <ul style={{ listStyle:'none', marginBottom:16, padding:0 }}>
                {plan.features.map((f,i) => (
                  <li key={i} style={{ fontSize:12, color:'#64748b', padding:'3px 0', display:'flex', alignItems:'center', gap:6 }}>
                    <span style={{ color:'#F59E0B', fontSize:9 }}>★</span> {f}
                  </li>
                ))}
              </ul>
              {addonSelected && (
                <div style={{ display:'flex', justifyContent:'space-between', padding:'10px 12px', background:'#FFFBEB', borderRadius:8, marginBottom:16, border:'1px solid #FDE68A' }}>
                  <div style={{ fontSize:13, fontWeight:600, color:'#92400E' }}>{plan.addon.label}</div>
                  <div style={{ fontSize:13, fontWeight:700, color:'#92400E' }}>+${plan.addon.price}</div>
                </div>
              )}
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', paddingTop:16, borderTop:'2px solid #f1f5f9' }}>
                <div>
                  <div style={{ fontSize:13, fontWeight:600, color:'#64748b' }}>Total</div>
                  <div style={{ fontSize:11, color:'#94a3b8' }}>One-time payment</div>
                </div>
                <div style={{ fontFamily:'serif', fontSize:32, fontWeight:900, color:'#0F172A', letterSpacing:-1 }}>${total.toFixed(2)}</div>
              </div>
            </div>

            <button onClick={handleSubmit} disabled={loading}
              style={{ width:'100%', padding:'16px', background: loading ? '#94a3b8' : '#0F172A', color:'white', border:'none', borderRadius:100, fontSize:15, fontWeight:700, cursor: loading ? 'not-allowed' : 'pointer', marginBottom:12 }}>
              {loading ? '⏳ Processing...' : `Place Order — $${total.toFixed(2)}`}
            </button>

            <div style={{ textAlign:'center', fontSize:12, color:'#94a3b8', lineHeight:1.7 }}>
              🔒 No payment now — we will invoice you after setup<br/>
              ⚡ Setup within 24 hours of order
            </div>

            <div style={{ display:'flex', justifyContent:'center', gap:16, marginTop:12, flexWrap:'wrap' }}>
              {['✓ No subscription', '✓ Lifetime license', '✓ We install it'].map(t => (
                <div key={t} style={{ fontSize:11, color:'#64748b', fontWeight:500 }}>{t}</div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center' }}>Loading...</div>}>
      <CheckoutContent />
    </Suspense>
  )
}
