import { ThemeProvider } from "./theme-provider"
import './globals.css'
export const metadata = {
  metadataBase: new URL('https://hemanthr.xyz'),

  title: {
    default: 'Hemanth Rachapalli - SDE & Backend Engineer',
    template: '%s | Hemanth Rachapalli'
  },

  description:
    'Hemanth Rachapalli is a Software Development Engineer and Backend Engineer specializing in scalable web applications, Node.js, and modern backend systems.',

  keywords: [
    'Hemanth Rachapalli',
    'Hemanth',
    'Hemanth Rachapali',
    'Arachlapaalli',
    'Backend Engineer',
    'Full Stack Developer',
    'Node.js Developer',
    'Next.js Developer',
    'Portfolio Hemanth',
  ],

  authors: [
    { name: 'Hemanth Rachapalli', url: 'https://github.com/hemanth5544' }
  ],

  creator: 'Hemanth Rachapalli',
  publisher: 'Hemanth Rachapalli',

  alternates: {
    canonical: 'https://hemanthr.xyz',
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://hemanthr.xyz',
    title: 'Hemanth Rachapalli | SDE & Backend Engineer',
    description:
      'Portfolio of Hemanth Rachapalli – Backend Engineer building scalable APIs and modern web applications.',
    images: [
      {
        url: 'https://hemanthr.xyz/social-preview.png',
        width: 1200,
        height: 630,
        alt: 'Hemanth Rachapalli Portfolio',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Hemanth Rachapalli | Backend Engineer',
    description:
      'Portfolio of Hemanth Rachapalli – Backend Engineer & Software Developer.',
    images: ['https://hemanthr.xyz/social-preview.png'],
  },

  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },

  manifest: '/site.webmanifest',
  category: 'technology',
}

export function generateViewport() {
  return {
    width: 'device-width',
    initialScale: 1,
    themeColor: [
      { media: '(prefers-color-scheme: light)', color: '#6366F1' },
      { media: '(prefers-color-scheme: dark)', color: '#1E293B' }
    ]
  }
}

export default function RootLayout({ children }) {
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Hemanth Rachapalli",
  "alternateName": [
    "Hemanth",
    "Hemanth Rachapali",
    "Arachlapaalli"
  ],
  "url": "https://hemanthr.xyz",
  "image": "https://hemanthr.xyz/social-preview.png",
  "jobTitle": "Software Development Engineer",
  "description": "Backend Engineer specializing in Node.js, scalable APIs, and modern web apps.",
  "sameAs": [
    "https://github.com/hemanth5544",
    "https://in.linkedin.com/in/hemanthrachapalli"
  ]
}

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}