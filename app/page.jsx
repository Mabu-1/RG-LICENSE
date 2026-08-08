import Nav        from './components/Nav'
import Hero       from './components/Hero'
import StatsBar   from './components/StatsBar'
import Features   from './components/Features'
import HowItWorks from './components/HowItWorks'
import Pricing    from './components/Pricing'
import FAQ        from './components/FAQ'
import CTABanner  from './components/CTABanner'
import Footer     from './components/Footer'

export default function Page() {
  return (
    <>
      <Nav />
      <Hero />
      <StatsBar />
      <Features />
      <HowItWorks />
      <Pricing />
      <FAQ />
      <CTABanner />
      <Footer />
    </>
  )
}
