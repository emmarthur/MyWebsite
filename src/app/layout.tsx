import type { Metadata } from 'next'
import { 
  Orbitron, 
  Rajdhani, 
  Roboto, 
  Inter, 
  Open_Sans,
  Playfair_Display,
  Montserrat,
  Raleway,
  Poppins,
  Lato,
  Merriweather,
  Nunito,
  Comfortaa,
  Bebas_Neue
} from 'next/font/google'
import '../styles/globals.css'

// Action game style fonts
// Note: Orbitron and Rajdhani don't support Cyrillic, so we use fallback fonts
// The font selection system will automatically use Roboto for Cyrillic characters
const orbitron = Orbitron({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-orbitron',
  display: 'swap',
  preload: true,
  fallback: ['Arial', 'sans-serif'],
})

const rajdhani = Rajdhani({ 
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-rajdhani',
  display: 'swap',
  preload: true,
  fallback: ['Arial', 'sans-serif'],
})

// Universal fonts that support all languages
const roboto = Roboto({ 
  subsets: ['latin', 'cyrillic', 'latin-ext'],
  weight: ['400', '500', '700', '900'],
  variable: '--font-roboto',
  display: 'swap',
  preload: false,
})

const inter = Inter({ 
  subsets: ['latin', 'cyrillic', 'latin-ext'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
  preload: false,
})

const openSans = Open_Sans({ 
  subsets: ['latin', 'cyrillic', 'latin-ext'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-open-sans',
  display: 'swap',
  preload: false,
})

// Fancy fonts
const playfairDisplay = Playfair_Display({ 
  subsets: ['latin', 'cyrillic', 'latin-ext'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-playfair-display',
  display: 'swap',
  preload: false,
})

const montserrat = Montserrat({ 
  subsets: ['latin', 'cyrillic', 'latin-ext'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-montserrat',
  display: 'swap',
  preload: false,
})

const raleway = Raleway({ 
  subsets: ['latin', 'cyrillic', 'latin-ext'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-raleway',
  display: 'swap',
  preload: false,
})

const poppins = Poppins({ 
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
  display: 'swap',
  preload: false,
})

const lato = Lato({ 
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '700', '900'],
  variable: '--font-lato',
  display: 'swap',
  preload: false,
})

const merriweather = Merriweather({ 
  subsets: ['latin', 'cyrillic', 'latin-ext'],
  weight: ['300', '400', '700', '900'],
  variable: '--font-merriweather',
  display: 'swap',
  preload: false,
})

const nunito = Nunito({ 
  subsets: ['latin', 'cyrillic', 'latin-ext'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-nunito',
  display: 'swap',
  preload: false,
})

const comfortaa = Comfortaa({ 
  subsets: ['latin', 'cyrillic', 'latin-ext'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-comfortaa',
  display: 'swap',
  preload: false,
})

const bebasNeue = Bebas_Neue({ 
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-bebas-neue',
  display: 'swap',
  preload: false,
})

export const metadata: Metadata = {
  title: 'My Personal Website & Digital Diary',
  description: 'A portfolio and digital diary documenting life, career, hobbies, and thoughts',
}

// Root layout - provides html/body structure
// The [locale]/layout.tsx provides i18n context
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html suppressHydrationWarning>
      <body className={`
        ${rajdhani.variable} ${orbitron.variable} ${roboto.variable} ${inter.variable} ${openSans.variable}
        ${playfairDisplay.variable} ${montserrat.variable} ${raleway.variable} ${poppins.variable}
        ${lato.variable} ${merriweather.variable} ${nunito.variable} ${comfortaa.variable} ${bebasNeue.variable}
        ${roboto.className}
      `} suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}

