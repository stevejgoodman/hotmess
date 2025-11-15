'use client'

import { useEffect, useState } from 'react'

interface ChaosMeterProps {
  score: number
}

export function ChaosMeter({ score }: ChaosMeterProps) {
  const [displayScore, setDisplayScore] = useState(0)
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayScore(score)
    }, 100)
    return () => clearTimeout(timer)
  }, [score])
  
  const getEmoji = () => {
    if (score === 0) return '😌'
    if (score < 20) return '😊'
    if (score < 40) return '😅'
    if (score < 60) return '😰'
    if (score < 80) return '🥵'
    return '🔥'
  }
  
  const getMessage = () => {
    if (score === 0) return 'Zen Master'
    if (score < 20) return 'Slightly Spicy'
    if (score < 40) return 'Warming Up'
    if (score < 60) return 'Getting Toasty'
    if (score < 80) return 'Full Chaos Mode'
    return 'ABSOLUTE INFERNO'
  }
  
  return (
    <div className="relative">
      <div className="p-8 md:p-12 bg-card/30 backdrop-blur-sm rounded-lg border border-border/50">
        <div className="text-center space-y-8">
          {/* Animated Emoji */}
          <div 
            className="text-8xl md:text-9xl transition-all duration-500 ease-out transform hover:scale-110"
            style={{
              animation: score > 60 ? 'bounce 1s infinite' : 'none',
              transform: `rotate(${score > 80 ? Math.sin(Date.now() / 200) * 10 : 0}deg)`,
            }}
          >
            {getEmoji()}
          </div>
          
          {/* Score Display */}
          <div className="space-y-3">
            <div className="text-6xl md:text-7xl lg:text-8xl font-light text-foreground tracking-wide" style={{ fontFamily: 'var(--font-serif)' }}>
              {displayScore}
            </div>
            <div className="text-xl md:text-2xl font-light text-foreground/90 tracking-wide">
              {getMessage()}
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full h-2 bg-muted/30 rounded-full overflow-hidden">
            <div 
              className="h-full bg-foreground/30 transition-all duration-500 ease-out"
              style={{ width: `${displayScore}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
