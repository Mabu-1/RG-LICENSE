import CardLayouts from './features/CardLayouts'
import GoogleSheets from './features/GoogleSheets'
import Lightbox from './features/Lightbox'
import SearchFilter from './features/SearchFilter'
import ThemeSettings from './features/ThemeSettings'



export default function Features() {
  return (
    <>
  
      <GoogleSheets />
      <CardLayouts />
      <Lightbox/>
      <SearchFilter/>
      <ThemeSettings/>
    </>
  )
}
