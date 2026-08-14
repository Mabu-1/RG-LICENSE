'use client'
import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { supabaseBrowser } from '@/lib/supabase'

const DESIGNS = ['Natural', 'Equal Height', 'Masonry']
const TIDYCAL_URL = 'https://tidycal.com/mahdi/shop-review'

function CheckoutContent() {
  const searchParams = useSearchParams()
  const planKey = searchParams.get('plan') || 'starter'

  const [plan, setPlan]                         = useState(null)
  const [planLoading, setPlanLoading]           = useState(true)
  const [addonDomain, setAddonDomain]           = useState(false)
  const [extraDomainValue, setExtraDomainValue] = useState('')
  const [extraDesigns, setExtraDesigns]         = useState(0)
  const [selectedDesigns, setSelectedDesigns]   = useState(['', '', ''])
  const [form, setForm]                         = useState({ name: '', email: '', domain: '', message: '' })
  const [loading, setLoading]                   = useState(false)
  const [errors, setErrors]                     = useState({})

  useEffect(() => {
    async function loadPlan() {
      if (!supabaseBrowser) {
        setPlan({ name: planKey.charAt(0).toUpperCase() + planKey.slice(1), price: 39.99, cents: '', desc: '', features: [] })
        setPlanLoading(false)
        return
      }
      const { data } = await supabaseBrowser
        .from('pricing_plans')
        .select('*')
        .ilike('name', planKey)
        .single()
      if (data) {
        setPlan({
          name: data.name,
          price: parseFloat(data.price),
          cents: data.cents || '',
          desc: data.description || '',
          features: Array.isArray(data.features) ? data.features : [],
        })
      }
      setPlanLoading(false)
    }
    loadPlan()
  }, [planKey])

  const isStarter = planKey === 'starter'
  const totalDesigns = 1 + extraDesigns
  const total = plan ? plan.price + (addonDomain ? 10 : 0) + (extraDesigns * 20) : 0

  function setDesign(index, value) {
    const u = [...selectedDesigns]; u[index] = value; setSelectedDesigns(u)
  }

  function getAvailable(currentIndex) {
    const chosen = selectedDesigns.filter((d, i) => i !== currentIndex && d)
    return DESIGNS.filter(d => !chosen.includes(d))
  }

  function validate() {
    const e = {}
    if (!form.name.trim()) e.name = 'Required'
    if (!form.email.trim() || !form.email.includes('@')) e.email = 'Valid email required'
    if (!form.domain.trim()) e.domain = 'Required'
    if (addonDomain && !extraDomainValue.trim()) e.extraDomain = 'Required'
    if (isStarter) {
      for (let i = 0; i < totalDesigns; i++) {
        if (!selectedDesigns[i]) { e.designs = 'Please select all design styles'; break }
      }
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function handleSubmit() {
    if (!validate()) return
    setLoading(true)
    const { error } = await supabaseBrowser.from('orders').insert({
      name: form.name,
      email: form.email,
      domain: form.domain.toLowerCase().replace(/^www\./, '').replace(/\/$/, ''),
      plan: plan.name,
      plan_price: plan.price,
      addon_domain: addonDomain,
      addon_domain_list: addonDomain ? [extraDomainValue.toLowerCase().replace(/^www\./, '').replace(/\/$/, '')] : [],
      addon_design: extraDesigns > 0,
      addon_design_count: extraDesigns,
      selected_designs: isStarter ? selectedDesigns.slice(0, totalDesigns) : [],
      total: total,
      notes: form.message,
      status: 'pending'
    })
    if (error) console.error('Order save error:', error)
    window.location.href = TIDYCAL_URL
  }

  const inputStyle = { width:'100%', padding:'11px 14px', border:'1px solid #e2e8f0', borderRadius:10, fontSize:14, boxSizing:'border-box', fontFamily:'inherit', outline:'none' }
  const selectStyle = { width:'100%', padding:'11px 14px', border:'1px solid #e2e8f0', borderRadius:10, fontSize:14, boxSizing:'border-box', fontFamily:'inherit', outline:'none', background:'white', cursor:'pointer' }
  const labelStyle = { fontSize:12, fontWeight:600, color:'#64748b', display:'block', marginBottom:5 }

  if (planLoading) return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'#F8F7F4' }}>
      <div style={{ color:'#64748b' }}>Loading...</div>
    </div>
  )

  if (!plan) return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'#F8F7F4' }}>
      <div style={{ color:'#dc2626' }}>Plan not found.</div>
    </div>
  )

  return (
    <div style={{ minHeight:'100vh', background:'#F8F7F4', padding:'40px 24px' }}>
      <div style={{ maxWidth:960, margin:'0 auto' }}>
        <div style={{ display:'flex', alignItems:'center', marginBottom:40 }}>
          <Link href="/#pricing" style={{ fontSize:13, color:'#64748b', textDecoration:'none' }}>← Back</Link>
          <div style={{ fontFamily:'serif', fontSize:20, fontWeight:700, color:'#0F172A', marginLeft:'auto' }}>★ Shop Review</div>
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

            {isStarter && (
              <div style={{ background:'white', borderRadius:16, padding:28, marginBottom:16, border:'1px solid #e2e8f0' }}>
                <div style={{ fontSize:14, fontWeight:700, color:'#0F172A', marginBottom:16 }}>2. Choose Your Design Style</div>
                <div style={{ marginBottom:12 }}>
                  <label style={labelStyle}>Included Design *</label>
                  <select value={selectedDesigns[0]} onChange={e=>setDesign(0,e.target.value)} style={{ ...selectStyle, borderColor: errors.designs && !selectedDesigns[0] ? '#ef4444' : '#e2e8f0' }}>
                    <option value="">— Select a design —</option>
                    {getAvailable(0).map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                {extraDesigns >= 1 && (
                  <div style={{ marginBottom:12 }}>
                    <label style={labelStyle}>Extra Design 1 <span style={{ color:'#F59E0B' }}>+$20</span></label>
                    <select value={selectedDesigns[1]} onChange={e=>setDesign(1,e.target.value)} style={{ ...selectStyle, borderColor: errors.designs && !selectedDesigns[1] ? '#ef4444' : '#e2e8f0' }}>
                      <option value="">— Select a design —</option>
                      {getAvailable(1).map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>
                )}
                {extraDesigns >= 2 && (
                  <div style={{ marginBottom:12 }}>
                    <label style={labelStyle}>Extra Design 2 <span style={{ color:'#F59E0B' }}>+$20</span></label>
                    <select value={selectedDesigns[2]} onChange={e=>setDesign(2,e.target.value)} style={{ ...selectStyle, borderColor: errors.designs && !selectedDesigns[2] ? '#ef4444' : '#e2e8f0' }}>
                      <option value="">— Select a design —</option>
                      {getAvailable(2).map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>
                )}
                {errors.designs && <div style={{ fontSize:11, color:'#ef4444', marginTop:4 }}>{errors.designs}</div>}
                <div style={{ marginTop:16, padding:16, border: extraDesigns > 0 ? '2px solid #F59E0B' : '2px solid #e2e8f0', borderRadius:12, background: extraDesigns > 0 ? '#FFFBEB' : '#f8f7f4', transition:'all 0.2s' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:16 }}>
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:13, fontWeight:600, color:'#0F172A' }}>Add Extra Design Style</div>
                      <div style={{ fontSize:12, color:'#64748b' }}>Up to 2 extra (3 total) · $20 each</div>
                    </div>
                    <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                      <button onClick={()=>setExtraDesigns(Math.max(0,extraDesigns-1))} style={{ width:30, height:30, borderRadius:6, border:'1px solid #e2e8f0', background:'white', fontSize:18, cursor:'pointer', fontWeight:700, color:'#0F172A' }}>−</button>
                      <span style={{ fontFamily:'serif', fontSize:20, fontWeight:900, color: extraDesigns > 0 ? '#F59E0B' : '#0F172A', minWidth:24, textAlign:'center' }}>{extraDesigns}</span>
                      <button onClick={()=>setExtraDesigns(Math.min(2,extraDesigns+1))} style={{ width:30, height:30, borderRadius:6, border:'1px solid #e2e8f0', background:'white', fontSize:18, cursor:'pointer', fontWeight:700, color:'#0F172A' }}>+</button>
                    </div>
                    <div style={{ fontFamily:'serif', fontSize:18, fontWeight:900, color: extraDesigns > 0 ? '#F59E0B' : '#94a3b8', minWidth:60, textAlign:'right' }}>
                      {extraDesigns > 0 ? `+$${extraDesigns * 20}` : '$20'}
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div style={{ background:'white', borderRadius:16, padding:28, border:'1px solid #e2e8f0' }}>
              <div style={{ fontSize:14, fontWeight:700, color:'#0F172A', marginBottom:16 }}>{isStarter ? '3' : '2'}. Optional Add-ons</div>
              <div onClick={()=>{ setAddonDomain(!addonDomain); setExtraDomainValue('') }}
                style={{ display:'flex', alignItems:'center', gap:16, padding:16, border: addonDomain ? '2px solid #F59E0B' : '2px solid #e2e8f0', borderRadius:12, cursor:'pointer', transition:'all 0.2s', background: addonDomain ? '#FFFBEB' : 'white', marginBottom: addonDomain ? 12 : 0 }}>
                <div style={{ width:22, height:22, borderRadius:6, border: addonDomain ? '2px solid #F59E0B' : '2px solid #d1d5db', background: addonDomain ? '#F59E0B' : 'white', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                  {addonDomain && <span style={{ color:'white', fontSize:13, fontWeight:700 }}>✓</span>}
                </div>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:14, fontWeight:600, color:'#0F172A' }}>Extra Domain</div>
                  <div style={{ fontSize:12, color:'#64748b' }}>License one more Shopify store</div>
                </div>
                <div style={{ fontFamily:'serif', fontSize:20, fontWeight:900, color: addonDomain ? '#F59E0B' : '#0F172A' }}>+$10</div>
              </div>
              {addonDomain && (
                <div style={{ padding:16, background:'#FFFBEB', border:'1px solid #FDE68A', borderRadius:12 }}>
                  <label style={{ fontSize:12, fontWeight:600, color:'#92400E', display:'block', marginBottom:5 }}>Extra Domain Name *</label>
                  <input value={extraDomainValue} onChange={e=>setExtraDomainValue(e.target.value)} placeholder="extrastore.myshopify.com"
                    style={{ ...inputStyle, borderColor: errors.extraDomain ? '#ef4444' : '#FDE68A', background:'white' }} />
                  {errors.extraDomain && <div style={{ fontSize:11, color:'#ef4444', marginTop:3 }}>{errors.extraDomain}</div>}
                </div>
              )}
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
                <div style={{ fontWeight:700, fontSize:15, color:'#0F172A' }}>${plan.price}{plan.cents}</div>
              </div>
              <ul style={{ listStyle:'none', marginBottom:16, padding:0 }}>
                {plan.features.map((f,i) => (
                  <li key={i} style={{ fontSize:12, color:'#64748b', padding:'3px 0', display:'flex', alignItems:'center', gap:6 }}>
                    <span style={{ color:'#F59E0B', fontSize:9 }}>★</span> {f}
                  </li>
                ))}
              </ul>
              {isStarter && selectedDesigns[0] && (
                <div style={{ padding:'8px 12px', background:'#f1f5f9', borderRadius:8, marginBottom:8, fontSize:12, color:'#64748b' }}>
                  Designs: {selectedDesigns.slice(0, totalDesigns).filter(Boolean).map((d,i) => (
                    <strong key={i} style={{ color: i === 0 ? '#0F172A' : '#F59E0B' }}>{i > 0 ? ', ' : ''}{d}</strong>
                  ))}
                </div>
              )}
              {addonDomain && (
                <div style={{ display:'flex', justifyContent:'space-between', padding:'8px 12px', background:'#FFFBEB', borderRadius:8, marginBottom:8, border:'1px solid #FDE68A' }}>
                  <div style={{ fontSize:13, fontWeight:600, color:'#92400E' }}>Extra Domain {extraDomainValue && <span style={{ fontWeight:400, fontSize:11 }}>({extraDomainValue})</span>}</div>
                  <div style={{ fontSize:13, fontWeight:700, color:'#92400E' }}>+$10</div>
                </div>
              )}
              {extraDesigns > 0 && (
                <div style={{ display:'flex', justifyContent:'space-between', padding:'8px 12px', background:'#FFFBEB', borderRadius:8, marginBottom:8, border:'1px solid #FDE68A' }}>
                  <div style={{ fontSize:13, fontWeight:600, color:'#92400E' }}>Extra Design x{extraDesigns}</div>
                  <div style={{ fontSize:13, fontWeight:700, color:'#92400E' }}>+${extraDesigns * 20}</div>
                </div>
              )}
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', paddingTop:16, borderTop:'2px solid #f1f5f9', marginTop:8 }}>
                <div>
                  <div style={{ fontSize:13, fontWeight:600, color:'#64748b' }}>Total</div>
                  <div style={{ fontSize:11, color:'#94a3b8' }}>One-time payment</div>
                </div>
                <div style={{ fontFamily:'serif', fontSize:32, fontWeight:900, color:'#0F172A', letterSpacing:-1 }}>${total.toFixed(2)}</div>
              </div>
            </div>
            <button onClick={handleSubmit} disabled={loading}
              style={{ width:'100%', padding:'16px', background: loading ? '#94a3b8' : '#0F172A', color:'white', border:'none', borderRadius:100, fontSize:15, fontWeight:700, cursor: loading ? 'not-allowed' : 'pointer', marginBottom:12, transition:'all 0.2s' }}>
              {loading ? '⏳ Saving order...' : `Place Order — $${total.toFixed(2)}`}
            </button>
            <div style={{ textAlign:'center', fontSize:12, color:'#94a3b8', lineHeight:1.7 }}>
              🔒 No payment now — we will invoice you after setup<br/>
              ⚡ You will book your setup meeting on the next step
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
