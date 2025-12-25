'use client'

import { useEffect } from 'react'
import { DEFAULT_FONT, getFontStack, getFallbackFont } from '@/lib/fonts'

export function FontLoader() {
  useEffect(() => {
    // Initialize font on mount
    const applyFont = (fontId: string) => {
      const fontStack = getFontStack(fontId)
      
      // Set CSS custom property immediately for ALL text (headings and body)
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
          
          // Force a reflow to ensure CSS is applied immediately
          void document.documentElement.offsetHeight
        })
      
      // If font doesn't support Cyrillic, set fallback
      const fallback = getFallbackFont(fontId)
      if (fallback) {
        document.documentElement.style.setProperty('--heading-fallback-font', `var(${fallback})`)
      } else {
        document.documentElement.style.removeProperty('--heading-fallback-font')
      }
    }
    
    // Load initial font
    const savedFont = localStorage.getItem('fontPreference')
    const fontId = savedFont || DEFAULT_FONT
    applyFont(fontId)
    
    // Listen for font changes from anywhere in the app
    const handleFontChange = (event: CustomEvent) => {
      const newFontId = event.detail
      applyFont(newFontId)
    }
    
    window.addEventListener('fontChanged', handleFontChange as EventListener)
    
    // Also listen for storage changes (in case font is changed in another tab)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'fontPreference' && e.newValue) {
        applyFont(e.newValue)
      }
    }
    
    window.addEventListener('storage', handleStorageChange)
    
    return () => {
      window.removeEventListener('fontChanged', handleFontChange as EventListener)
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  return null
}

