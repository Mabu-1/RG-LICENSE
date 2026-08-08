import './styles/landing.css'

export const metadata = {
  title: 'ReviewGallery Pro — Beautiful Review Sections for Shopify',
  description: 'Domain-locked Shopify review gallery powered by Google Sheets. One-time license. No monthly fees.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
