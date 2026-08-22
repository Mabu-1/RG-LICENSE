import './globals.css'

export const metadata = {
  title: 'Shop Review — Shopify Review Gallery',
  description: 'One-time Shopify review gallery powered by Google Sheets',
  icons: {
    icon: 'https://cdn.shopify.com/s/files/1/0673/0275/2339/files/main_logo_dd549f2b-041c-44ad-8ccb-4b17787e2e02.png?v=1787411976',
    shortcut: 'https://cdn.shopify.com/s/files/1/0673/0275/2339/files/main_logo_dd549f2b-041c-44ad-8ccb-4b17787e2e02.png?v=1787411976',
    apple: 'https://cdn.shopify.com/s/files/1/0673/0275/2339/files/main_logo_dd549f2b-041c-44ad-8ccb-4b17787e2e02.png?v=1787411976',
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
