'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { fadeInUp } from '@/lib/animations'
import { useState, useEffect } from 'react'
import { Link } from '@/i18n/routing'
import { FONT_OPTIONS, DEFAULT_FONT, getFontStack, getFallbackFont } from '@/lib/fonts'

export default function FontSettingsPage() {
  const t = useTranslations('settings.fonts')
  const tCommon = useTranslations('common')
  const [selectedFont, setSelectedFont] = useState<string>(DEFAULT_FONT)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Load font preference from localStorage
    const savedFont = localStorage.getItem('fontPreference')
    if (savedFont && FONT_OPTIONS.find(f => f.id === savedFont)) {
      setSelectedFont(savedFont)
    } else {
      setSelectedFont(DEFAULT_FONT)
    }
  }, [])

  useEffect(() => {
    if (mounted) {
      // Apply font selection
      applyFont(selectedFont)
    }
  }, [selectedFont, mounted])

  const applyFont = (fontId: string) => {
    const font = FONT_OPTIONS.find(f => f.id === fontId) || FONT_OPTIONS.find(f => f.id === DEFAULT_FONT)!
    const fontStack = getFontStack(fontId)
    
    // Update CSS custom property for ALL text (headings and body)
    document.documentElement.style.setProperty('--selected-heading-font', fontStack)
    
    // Inject a style tag with !important to override all CSS rules
    let styleElement = document.getElementById('dynamic-font-style') as HTMLStyleElement
    if (!styleElement) {
      styleElement = document.createElement('style')
      styleElement.id = 'dynamic-font-style'
      document.head.appendChild(styleElement)
    }
    
    // Create CSS that overrides everything with !important
    // Escape the font stack for CSS (handle both single and double quotes)
    const escapedFontStack = fontStack.replace(/"/g, '\\"').replace(/'/g, "\\'")
    styleElement.textContent = `
      /* Universal selector for ALL elements containing text - absolute highest priority */
      *:not(script):not(style):not(svg):not(path):not(circle):not(rect):not(line):not(polygon):not(ellipse):not(g):not(defs):not(clipPath):not(mask):not(pattern):not(linearGradient):not(radialGradient):not(stop) {
        font-family: ${escapedFontStack} !important;
      }
      /* Specific selectors for common text elements - double coverage */
      html, body, h1, h2, h3, h4, h5, h6, p, span, div, a, li, td, th, label, input, textarea, select, button,
      article, section, aside, nav, header, footer, main, blockquote, cite, code, pre, em, strong, b, i, u, small, sub, sup,
      ul, ol, dl, dt, dd, table, thead, tbody, tfoot, tr, caption, form, fieldset, legend, optgroup, option,
      .font-heading, [class*="font-heading"], [class*="container"], [class*="mx-auto"], [class*="px-4"], [class*="py-20"],
      [class*="text-"], [class*="font-"], [class*="mb-"], [class*="mt-"], [class*="p-"], [class*="m-"] {
        font-family: ${escapedFontStack} !important;
      }
      /* Force font on all children */
      * * {
        font-family: inherit !important;
      }
    `
    
    // Apply directly to html and body for immediate effect - BEFORE requestAnimationFrame
    if (document.documentElement) {
      document.documentElement.style.fontFamily = fontStack
    }
    if (document.body) {
      document.body.style.fontFamily = fontStack
    }
    
    // Apply to ALL text elements IMMEDIATELY - synchronous first pass
    // This ensures instant visual feedback
    const textSelectors = 'html, body, h1, h2, h3, h4, h5, h6, p, span, div, a, li, td, th, label, input, textarea, select, button, article, section, aside, nav, header, footer, main, blockquote, cite, code, pre, em, strong, b, i, u, small, sub, sup, ul, ol, dl, dt, dd, table, thead, tbody, tfoot, tr, caption, form, fieldset, legend, optgroup, option, .font-heading, [class*="font-heading"]'
    const textElements = document.querySelectorAll(textSelectors)
    textElements.forEach((el) => {
      const htmlEl = el as HTMLElement
      htmlEl.style.fontFamily = fontStack
    })
    
    // Apply to ALL elements synchronously for immediate effect
    const allElements = document.querySelectorAll('*:not(script):not(style):not(svg):not(path):not(circle):not(rect):not(line):not(polygon):not(ellipse):not(g):not(defs)')
    allElements.forEach((el) => {
      const htmlEl = el as HTMLElement
      htmlEl.style.fontFamily = fontStack
    })
    
    // Then use requestAnimationFrame for any dynamically rendered content
    requestAnimationFrame(() => {
      // Re-apply to catch any elements that might have been missed
      const allElementsAgain = document.querySelectorAll('*:not(script):not(style):not(svg):not(path):not(circle):not(rect):not(line):not(polygon):not(ellipse):not(g):not(defs)')
      allElementsAgain.forEach((el) => {
        const htmlEl = el as HTMLElement
        htmlEl.style.fontFamily = fontStack
      })
      
      // Force font on all text nodes by applying to parent elements
      const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        null
      )
      
      let node
      while (node = walker.nextNode()) {
        if (node.parentElement) {
          node.parentElement.style.fontFamily = fontStack
        }
      }
      
      // Force a reflow to ensure changes are visible
      void document.documentElement.offsetHeight
    })
    
    // If font doesn't support Cyrillic, set fallback
    const fallback = getFallbackFont(fontId)
    if (fallback) {
      document.documentElement.style.setProperty('--heading-fallback-font', `var(${fallback})`)
    } else {
      document.documentElement.style.removeProperty('--heading-fallback-font')
    }
    
    // Trigger a custom event to notify components
    window.dispatchEvent(new CustomEvent('fontChanged', { detail: fontId }))
  }

  const handleFontChange = (fontId: string) => {
    // Apply font immediately before state update
    applyFont(fontId)
    // Save to localStorage
    localStorage.setItem('fontPreference', fontId)
    // Update state (this will trigger re-render but font is already applied)
    setSelectedFont(fontId)
  }

  if (!mounted) {
    return null
  }

  const selectedFontData = FONT_OPTIONS.find(f => f.id === selectedFont)!

  return (
    <div className="container mx-auto px-4 py-20">
      <motion.div
        initial="initial"
        animate="animate"
        variants={fadeInUp}
      >
        <div className="mb-6">
          <Link 
            href="/settings"
            className="inline-flex items-center text-deep-sea-blue-200 hover:text-accent-teal transition-colors mb-4"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {tCommon('back')} to Settings
          </Link>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-deep-sea-blue-100 to-accent-teal bg-clip-text text-transparent font-heading">{t('title')}</h1>
        <p className="text-xl text-deep-sea-blue-50 mb-12">
          {t('description')}
        </p>
        
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-deep-sea-blue-400/30 mb-6">
          <h2 className="text-2xl font-bold mb-4 text-deep-sea-blue-50 font-heading">{t('current')}</h2>
          <div className="p-4 bg-deep-sea-blue-900/50 rounded-lg border border-deep-sea-blue-600/30">
            <div className="text-lg font-semibold text-accent-teal mb-2">{selectedFontData.name}</div>
            <div className="text-sm text-deep-sea-blue-300 mb-2">{selectedFontData.description}</div>
            {!selectedFontData.supportsCyrillic && (
              <div className="text-xs text-accent-orange mt-2">
                ⚠️ {t('cyrillicWarning')}
              </div>
            )}
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-deep-sea-blue-400/30">
          <h2 className="text-2xl font-bold mb-6 text-deep-sea-blue-50 font-heading">{t('selectFont')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {FONT_OPTIONS.map((font) => (
              <button
                key={font.id}
                onClick={() => handleFontChange(font.id)}
                className={`p-6 rounded-lg border-2 transition-all text-left ${
                  selectedFont === font.id
                    ? 'border-accent-teal bg-accent-teal/20'
                    : 'border-deep-sea-blue-600/30 bg-deep-sea-blue-800/30 hover:border-accent-teal/50'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className={`text-xl font-bold mb-1 ${selectedFont === font.id ? 'text-accent-teal' : 'text-deep-sea-blue-50'}`}>
                      {font.name}
                    </div>
                    <div className="text-sm text-deep-sea-blue-300 mb-2">{font.description}</div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className={`text-xs px-2 py-1 rounded ${
                        font.category === 'gaming' ? 'bg-accent-purple/20 text-accent-purple' :
                        font.category === 'modern' ? 'bg-accent-teal/20 text-accent-teal' :
                        font.category === 'classic' ? 'bg-accent-gold/20 text-accent-gold' :
                        'bg-accent-orange/20 text-accent-orange'
                      }`}>
                        {font.category}
                      </span>
                      {font.supportsCyrillic && (
                        <span className="text-xs px-2 py-1 rounded bg-green-500/20 text-green-400">
                          {t('supportsAllLanguages')}
                        </span>
                      )}
                      {!font.supportsCyrillic && (
                        <span className="text-xs px-2 py-1 rounded bg-yellow-500/20 text-yellow-400">
                          {t('latinOnly')}
                        </span>
                      )}
                    </div>
                  </div>
                  {selectedFont === font.id && (
                    <svg className="w-6 h-6 text-accent-teal ml-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

