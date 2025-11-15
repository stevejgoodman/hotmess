'use client'

import { useEffect, useState } from 'react'
import Lottie from 'lottie-react'

// Helper function to convert emoji to Unicode code point
function emojiToUnicode(emoji: string): string {
  // Remove variation selectors (like the one in 🛋️)
  const cleanEmoji = emoji.replace(/\uFE0F/g, '')
  
  // Get the code point(s)
  const codePoints: string[] = []
  for (let i = 0; i < cleanEmoji.length; i++) {
    const code = cleanEmoji.codePointAt(i)
    if (code && code > 0xFFFF) {
      // Surrogate pair
      codePoints.push(code.toString(16))
      i++ // Skip the next character as it's part of the pair
    } else if (code) {
      codePoints.push(code.toString(16))
    }
  }
  
  // Return the main code point (first one)
  return codePoints[0] || ''
}

// Generate Noto Emoji Animation URL from emoji
function getAnimationUrl(emoji: string): string {
  const unicode = emojiToUnicode(emoji)
  if (!unicode) return ''
  
  // Use Google Fonts CDN for Noto Emoji Animation
  // Format: https://fonts.gstatic.com/s/e/notoemoji/latest/{unicode}/lottie.json
  const hexCode = unicode.toLowerCase()
  return `https://fonts.gstatic.com/s/e/notoemoji/latest/${hexCode}/lottie.json`
}

interface AnimatedEmojiProps {
  emoji: string
  className?: string
  size?: number
  loop?: boolean
  autoplay?: boolean
}

export function AnimatedEmoji({ 
  emoji, 
  className = '', 
  size = 64,
  loop = true,
  autoplay = true 
}: AnimatedEmojiProps) {
  const [animationData, setAnimationData] = useState<any>(null)
  const [error, setError] = useState(false)
  const animationUrl = getAnimationUrl(emoji)

  useEffect(() => {
    if (!animationUrl) {
      setError(true)
      return
    }

    // Reset state when URL changes
    setAnimationData(null)
    setError(false)

    // Fetch the Lottie animation
    fetch(animationUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch animation: ${response.status}`)
        }
        return response.json()
      })
      .then((data) => {
        // Validate that we got valid Lottie data
        if (data && (data.v || data.fr !== undefined)) {
          setAnimationData(data)
          setError(false)
        } else {
          throw new Error('Invalid animation data')
        }
      })
      .catch((err) => {
        console.warn(`Failed to load animated emoji for ${emoji}:`, err.message)
        setError(true)
      })
  }, [animationUrl, emoji])

  // Fallback to static emoji if animation fails or isn't available
  if (error || !animationData) {
    return (
      <span className={`inline-block ${className}`} style={{ fontSize: `${size}px` }}>
        {emoji}
      </span>
    )
  }

  return (
    <div 
      className={`inline-block ${className}`}
      style={{ width: `${size}px`, height: `${size}px`, lineHeight: 0 }}
    >
      <Lottie
        animationData={animationData}
        loop={loop}
        autoplay={autoplay}
        style={{ width: '100%', height: '100%', display: 'block' }}
        rendererSettings={{
          preserveAspectRatio: 'xMidYMid meet',
        }}
      />
    </div>
  )
}

