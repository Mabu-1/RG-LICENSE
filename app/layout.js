import './globals.css'

export const metadata = {
  title: 'Shop Review — Shopify Review Gallery',
  description: 'One-time Shopify review gallery powered by Google Sheets',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
