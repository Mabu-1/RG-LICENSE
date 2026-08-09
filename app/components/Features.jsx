import GoogleSheets  from './features/GoogleSheets'
import CardLayouts   from './features/CardLayouts'
import SearchFilter  from './features/SearchFilter'
import Lightbox      from './features/Lightbox'
import ThemeSettings from './features/ThemeSettings'
import DomainLock    from './features/DomainLock'

export default function Features() {
  return (
    <>
      <GoogleSheets />
      <CardLayouts />
      <SearchFilter />
      <Lightbox />
      <ThemeSettings />
      <DomainLock />
    </>
  )
}
