import { ThemeProvider } from "./theme-provider"
import './globals.css'
export const metadata = {
  title: {
    default: 'Hemanth Rachapalli - SDE & Backend Engineer',
    template: '%s | Hemanth Rachapalli'
  },
  description: 'Hemanth Rachapalli is a Software Development Engineer and Backend Engineer specializing in building scalable web applications and services.',
  keywords: [
    'Hemanth Rachapalli',
    'Full Stack Developer',
    'Web Development',
    'React Developer',
    'Next.js Developer',
    'Python Developer',
    'Datopic',
    'Lovely Professional University'
  ],
  authors: [{ name: 'Hemanth Rachapalli', url: 'https://github.com/hemanth5544' }],
  creator: 'Hemanth Rachapalli',
  publisher: 'Hemanth Rachapall',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Hemanth Rachapalli | SDE & Backend Engineer',
    description: 'Hemanth Rachapalli is a Software Development Engineer and Backend Engineer specializing in building scalable web applications and services.',
    url: 'https://hemanthr.xyz/',
    images: [
      {
        url: '/social-preview.png',
        width: 1200,
        height: 630,
        alt: 'Hemanth Rachapalli Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hemanth Rachapalli | SDE & Backend Engineer',
    description: 'Hemanth Rachapalli is a Software Development Engineer and Backend Engineer specializing in building scalable web applications and services.',
    images: ['/social-preview.png'],
  },
 
  icons: {
    icon: [
      { url: '/favicon.png', type: 'image/png' },
      { url: '/favicon.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/favicon.png',
    shortcut: '/favicon.png',
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
    "jobTitle": "Full Stack Developer & Machine Learning Engineer",
    "worksFor": {
      "@type": "Organization",
      "name": "TekLingo"
    },
    "sameAs": [
      "https://github.com/hemanth5544",
      "https://in.linkedin.com/in/hemanthrachapalli"
    ],
    
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