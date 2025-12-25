// Font configuration and management
export interface FontOption {
  id: string
  name: string
  variable: string
  supportsCyrillic: boolean
  category: 'gaming' | 'modern' | 'classic' | 'universal'
  description: string
}

export const FONT_OPTIONS: FontOption[] = [
  {
    id: 'orbitron',
    name: 'Orbitron (Gaming)',
    variable: '--font-orbitron',
    supportsCyrillic: false,
    category: 'gaming',
    description: 'Futuristic gaming font - supports Latin only'
  },
  {
    id: 'rajdhani',
    name: 'Rajdhani (Gaming)',
    variable: '--font-rajdhani',
    supportsCyrillic: false,
    category: 'gaming',
    description: 'Gaming-style font - supports Latin only'
  },
  {
    id: 'playfair-display',
    name: 'Playfair Display (Elegant)',
    variable: '--font-playfair-display',
    supportsCyrillic: true,
    category: 'classic',
    description: 'Elegant serif font - supports all languages'
  },
  {
    id: 'montserrat',
    name: 'Montserrat (Modern)',
    variable: '--font-montserrat',
    supportsCyrillic: true,
    category: 'modern',
    description: 'Modern geometric sans-serif - supports all languages'
  },
  {
    id: 'raleway',
    name: 'Raleway (Elegant)',
    variable: '--font-raleway',
    supportsCyrillic: true,
    category: 'modern',
    description: 'Elegant sans-serif with unique character - supports all languages'
  },
  {
    id: 'poppins',
    name: 'Poppins (Friendly)',
    variable: '--font-poppins',
    supportsCyrillic: false,
    category: 'modern',
    description: 'Modern, friendly rounded font - supports Latin only'
  },
  {
    id: 'lato',
    name: 'Lato (Professional)',
    variable: '--font-lato',
    supportsCyrillic: false,
    category: 'modern',
    description: 'Clean, professional sans-serif - supports Latin only'
  },
  {
    id: 'merriweather',
    name: 'Merriweather (Readable)',
    variable: '--font-merriweather',
    supportsCyrillic: true,
    category: 'classic',
    description: 'Highly readable serif font - supports all languages'
  },
  {
    id: 'nunito',
    name: 'Nunito (Rounded)',
    variable: '--font-nunito',
    supportsCyrillic: true,
    category: 'modern',
    description: 'Rounded, friendly sans-serif - supports all languages'
  },
  {
    id: 'comfortaa',
    name: 'Comfortaa (Modern)',
    variable: '--font-comfortaa',
    supportsCyrillic: true,
    category: 'modern',
    description: 'Rounded, modern geometric font - supports all languages'
  },
  {
    id: 'bebas-neue',
    name: 'Bebas Neue (Bold)',
    variable: '--font-bebas-neue',
    supportsCyrillic: false,
    category: 'gaming',
    description: 'Bold, impactful display font - supports Latin only'
  },
  {
    id: 'roboto',
    name: 'Roboto (Universal)',
    variable: '--font-roboto',
    supportsCyrillic: true,
    category: 'universal',
    description: 'Modern, clean font - supports all languages'
  },
  {
    id: 'inter',
    name: 'Inter (Modern)',
    variable: '--font-inter',
    supportsCyrillic: true,
    category: 'modern',
    description: 'Modern, readable font - supports all languages'
  },
  {
    id: 'open-sans',
    name: 'Open Sans (Classic)',
    variable: '--font-open-sans',
    supportsCyrillic: true,
    category: 'classic',
    description: 'Classic, professional font - supports all languages'
  },
]

export const DEFAULT_FONT = 'roboto' // Universal font that supports all languages

export function getFontStack(fontId: string): string {
  const font = FONT_OPTIONS.find(f => f.id === fontId) || FONT_OPTIONS.find(f => f.id === DEFAULT_FONT)!
  
  // Map font IDs to their actual Google Fonts names (handles multi-word names)
  const fontNameMap: Record<string, string> = {
    'orbitron': 'Orbitron',
    'rajdhani': 'Rajdhani',
    'playfair-display': 'Playfair Display',
    'montserrat': 'Montserrat',
    'raleway': 'Raleway',
    'poppins': 'Poppins',
    'lato': 'Lato',
    'merriweather': 'Merriweather',
    'nunito': 'Nunito',
    'comfortaa': 'Comfortaa',
    'bebas-neue': 'Bebas Neue',
    'roboto': 'Roboto',
    'inter': 'Inter',
    'open-sans': 'Open Sans'
  }
  
  // Determine if font is serif or sans-serif
  const serifFonts = ['playfair-display', 'merriweather']
  const fallbackType = serifFonts.includes(fontId) ? 'serif' : 'sans-serif'
  
  const actualFontName = fontNameMap[fontId] || font.name.split(' (')[0]
  
  // If gaming font doesn't support Cyrillic, add a universal fallback
  if (!font.supportsCyrillic) {
    const universalFont = FONT_OPTIONS.find(f => f.supportsCyrillic && f.category === 'universal')
    if (universalFont) {
      const universalFontName = fontNameMap[universalFont.id] || universalFont.name.split(' (')[0]
      // Return font stack with CSS variables AND font names for maximum compatibility
      return `var(${font.variable}), var(${universalFont.variable}), "${actualFontName}", "${universalFontName}", ${fallbackType}`
    }
  }
  
  // Return font stack with CSS variable and font name
  return `var(${font.variable}), "${actualFontName}", ${fallbackType}`
}

export function getFallbackFont(fontId: string): string {
  const font = FONT_OPTIONS.find(f => f.id === fontId)
  if (!font || font.supportsCyrillic) {
    return ''
  }
  const universalFont = FONT_OPTIONS.find(f => f.supportsCyrillic && f.category === 'universal')
  return universalFont ? universalFont.variable : ''
}

