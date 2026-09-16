import Link from "next/link"

export default function NotFound() {
  return (
    <>
      <style>{`
        .nf-wrap { min-height: 100vh; background: linear-gradient(135deg,#ffffff 0%,#EFF6FF 60%,#DBEAFE 100%); display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 40px 24px; text-align: center; }
        .nf-code { font-family: serif; font-size: clamp(80px,15vw,160px); font-weight: 900; color: #BFDBFE; letter-spacing: -8px; line-height: 1; margin-bottom: 0; }
        .nf-eyebrow { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; color: #2563EB; margin-bottom: 12px; }
        .nf-h1 { font-family: serif; font-size: clamp(24px,4vw,40px); font-weight: 900; color: #0F172A; letter-spacing: -1px; margin-bottom: 12px; line-height: 1.1; }
        .nf-sub { font-size: 15px; color: #64748b; margin-bottom: 40px; line-height: 1.7; max-width: 420px; }
        .nf-btn { display: inline-flex; align-items: center; gap: 8px; padding: 14px 32px; background: #2563EB; color: white; border-radius: 100px; font-size: 15px; font-weight: 700; text-decoration: none; transition: all 0.25s; box-shadow: 0 8px 24px rgba(37,99,235,0.3); margin-bottom: 16px; }
        .nf-btn:hover { background: #1D4ED8; transform: translateY(-2px); }
        .nf-link { font-size: 13px; color: #64748b; text-decoration: none; }
        .nf-link:hover { color: #2563EB; }
        @media (max-width: 480px) { .nf-code { letter-spacing: -4px; } }
      `}</style>

      <div className="nf-wrap">
        <div className="nf-code">404</div>
        <div className="nf-eyebrow">Page not found</div>
        <h1 className="nf-h1">Oops! This page does not exist.</h1>
        <p className="nf-sub">The page you are looking for might have been moved, deleted, or never existed in the first place.</p>
        <Link href="/" className="nf-btn">← Back to Home</Link>
        <br />
        <Link href="/#pricing" className="nf-link">View pricing →</Link>
      </div>
    </>
  )
}
