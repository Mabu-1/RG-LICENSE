import Link from 'next/link'

export default function SuccessPage() {
  return (
    <div style={{ minHeight:'100vh', background:'#F8F7F4', display:'flex', alignItems:'center', justifyContent:'center', padding:24 }}>
      <div style={{ maxWidth:480, width:'100%', background:'white', borderRadius:20, padding:48, textAlign:'center', boxShadow:'0 20px 60px rgba(0,0,0,0.08)' }}>
        <div style={{ fontSize:56, marginBottom:16 }}>🎉</div>
        <h2 style={{ fontFamily:'serif', fontSize:28, fontWeight:900, color:'#0F172A', marginBottom:12, letterSpacing:-1 }}>You're all set!</h2>
        <p style={{ fontSize:15, color:'#64748b', lineHeight:1.7, marginBottom:24 }}>
          Your order is confirmed and your setup meeting is booked. We'll see you soon!
        </p>
        <div style={{ background:'#FFFBEB', border:'1px solid #FDE68A', borderRadius:12, padding:16, marginBottom:28 }}>
          <div style={{ fontSize:13, fontWeight:600, color:'#92400E', marginBottom:6 }}>What happens next?</div>
          <div style={{ fontSize:13, color:'#78350F', lineHeight:1.7 }}>
            1. Check your email for the meeting confirmation<br/>
            2. We will install the section on your Shopify theme<br/>
            3. You add reviews to your Google Sheet and go live
          </div>
        </div>
        <Link href="/" style={{ display:'inline-flex', padding:'10px 24px', background:'transparent', color:'#64748b', borderRadius:100, fontSize:13, fontWeight:500, textDecoration:'none', border:'1px solid #e2e8f0' }}>← Back to Home</Link>
      </div>
    </div>
  )
}
