'use client'

import { useEffect, useState } from 'react'
import { AnimatedEmoji } from './animated-emoji'

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
  
  const getColor = () => {
    if (score < 20) return 'from-accent to-accent/70'
    if (score < 40) return 'from-accent to-primary/70'
    if (score < 60) return 'from-primary to-secondary/70'
    if (score < 80) return 'from-secondary to-destructive/70'
    return 'from-destructive to-destructive/70'
  }
  
  return (
    <div className="relative">
      <div className="p-8 bg-card rounded-3xl border-2 shadow-xl">
        <div className="text-center space-y-6">
          {/* Animated Emoji */}
          <div 
            className="flex justify-center items-center transition-all duration-500 ease-out transform hover:scale-110"
            style={{
              animation: score > 60 ? 'bounce 1s infinite' : 'none',
              transform: `rotate(${score > 80 ? Math.sin(Date.now() / 200) * 10 : 0}deg)`,
            }}
          >
            <AnimatedEmoji 
              emoji={getEmoji()} 
              size={144}
              loop={true}
              autoplay={true}
            />
          </div>
          
          {/* Score Display */}
          <div className="space-y-2">
            <div className="text-7xl md:text-8xl font-black bg-gradient-to-br from-primary via-secondary to-accent bg-clip-text text-transparent">
              {displayScore}
            </div>
            <div className="text-2xl md:text-3xl font-black text-foreground">
              {getMessage()}
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full h-6 bg-muted rounded-full overflow-hidden">
            <div 
              className={`h-full bg-gradient-to-r ${getColor()} transition-all duration-500 ease-out`}
              style={{ width: `${displayScore}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
