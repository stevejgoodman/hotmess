'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { Button } from '@/components/ui/button'
import { ChaosMeter } from '@/components/chaos-meter'
import { HistoryCard } from '@/components/history-card'

interface ChaosMetrics {
  lateForWork: number
  meetingConflict: number
  deadlineMissed: number
  procrastination: number
  coffeeConsumption: number
}

interface ChaosEntry {
  date: string
  score: number
  metrics: ChaosMetrics
  message: string
}

export default function HotMessTracker() {
  const [metrics, setMetrics] = useState<ChaosMetrics>({
    lateForWork: 0,
    meetingConflict: 0,
    deadlineMissed: 0,
    procrastination: 0,
    coffeeConsumption: 0,
  })
  
  const [history, setHistory] = useState<ChaosEntry[]>([])
  const [showMessage, setShowMessage] = useState(false)
  const [currentMessage, setCurrentMessage] = useState('')
  
  // Load history from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('chaosHistory')
    if (saved) {
      setHistory(JSON.parse(saved))
    }
  }, [])
  
  // Calculate total chaos score (0-100)
  const chaosScore = Math.round(
    (metrics.lateForWork + metrics.meetingConflict + metrics.deadlineMissed + metrics.procrastination + metrics.coffeeConsumption) / 5
  )
  
  const motivationalMessages = [
    "At least you're consistently chaotic. We love that for you! 💅",
    "Your chaos is an art form. Keep painting! 🎨",
    "Tomorrow is another day to be a hot mess. Can't wait! ✨",
    "You're not messy, you're just living life in surround sound. 🔊",
    "Chaos level: Expert. Your resume looks great! 📝",
    "Some people plan their day. You're not some people. 🌟",
    "Your organizational skills are... creative! We stan! 💖",
    "You make chaos look iconic, honestly. 👑",
    "Procrastination is just aggressive relaxation. Own it! 🛋️",
    "Who needs schedules when you have vibes? 🌈",
  ]
  
  const handleSave = () => {
    const message = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)]
    const newEntry: ChaosEntry = {
      date: new Date().toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      score: chaosScore,
      metrics: { ...metrics },
      message,
    }
    
    const updatedHistory = [newEntry, ...history].slice(0, 10) // Keep last 10
    setHistory(updatedHistory)
    localStorage.setItem('chaosHistory', JSON.stringify(updatedHistory))
    
    setCurrentMessage(message)
    setShowMessage(true)
    
    setTimeout(() => setShowMessage(false), 5000)
  }
  
  const handleReset = () => {
    setMetrics({
      lateForWork: 0,
      meetingConflict: 0,
      deadlineMissed: 0,
      procrastination: 0,
      coffeeConsumption: 0,
    })
    setShowMessage(false)
  }
  
  return (
    <div className="min-h-screen p-8 md:p-12 lg:p-16">
      <div className="mx-auto max-w-6xl space-y-12 md:space-y-16">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif font-normal text-foreground tracking-wider leading-none" style={{ fontFamily: 'var(--font-serif)' }}>
            HOT MESS TRACKER
          </h1>
          <p className="text-xl md:text-2xl text-foreground/90 font-light max-w-2xl">
            Self-report your chaos level. We won't judge. (Much.) 😏
          </p>
        </div>
        
        {/* Chaos Meter */}
        <ChaosMeter score={chaosScore} />
        
        {/* Sliders Card */}
        <Card className="border border-border/50 bg-card/30 backdrop-blur-sm shadow-none">
          <CardHeader className="pb-4">
            <CardTitle className="text-3xl md:text-4xl font-light text-foreground tracking-wide">
              Today's Chaos Levels
            </CardTitle>
            <CardDescription className="text-base md:text-lg text-foreground/70 font-light mt-2">
              Slide to confess your daily disasters
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-10 pt-6">
            {/* Transport Problems */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-base md:text-lg font-light text-foreground/90 tracking-wide">
                  🚗 Transport Problems
                </label>
                <span className="text-2xl md:text-3xl font-light text-foreground">
                  {metrics.lateForWork}%
                </span>
              </div>
              <Slider
                value={[metrics.lateForWork]}
                onValueChange={(value) => setMetrics({ ...metrics, lateForWork: value[0] })}
                max={100}
                step={1}
                className="cursor-pointer"
              />
            </div>
            
            {/* Meeting Conflict */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-base md:text-lg font-light text-foreground/90 tracking-wide">
                  📅 Meeting Conflict
                </label>
                <span className="text-2xl md:text-3xl font-light text-foreground">
                  {metrics.meetingConflict}%
                </span>
              </div>
              <Slider
                value={[metrics.meetingConflict]}
                onValueChange={(value) => setMetrics({ ...metrics, meetingConflict: value[0] })}
                max={100}
                step={1}
                className="cursor-pointer"
              />
            </div>
            
            {/* Deadline Missed */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-base md:text-lg font-light text-foreground/90 tracking-wide">
                  ⏰ Deadline Missed
                </label>
                <span className="text-2xl md:text-3xl font-light text-foreground">
                  {metrics.deadlineMissed}%
                </span>
              </div>
              <Slider
                value={[metrics.deadlineMissed]}
                onValueChange={(value) => setMetrics({ ...metrics, deadlineMissed: value[0] })}
                max={100}
                step={1}
                className="cursor-pointer"
              />
            </div>
            
            {/* Procrastination */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-base md:text-lg font-light text-foreground/90 tracking-wide">
                  🛋️ Procrastination
                </label>
                <span className="text-2xl md:text-3xl font-light text-foreground">
                  {metrics.procrastination}%
                </span>
              </div>
              <Slider
                value={[metrics.procrastination]}
                onValueChange={(value) => setMetrics({ ...metrics, procrastination: value[0] })}
                max={100}
                step={1}
                className="cursor-pointer"
              />
            </div>
            
            {/* Coffee Consumption */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-base md:text-lg font-light text-foreground/90 tracking-wide">
                  ☕ Coffee Consumption
                </label>
                <span className="text-2xl md:text-3xl font-light text-foreground">
                  {metrics.coffeeConsumption}%
                </span>
              </div>
              <Slider
                value={[metrics.coffeeConsumption]}
                onValueChange={(value) => setMetrics({ ...metrics, coffeeConsumption: value[0] })}
                max={100}
                step={1}
                className="cursor-pointer"
              />
            </div>
            
            {/* Action Buttons */}
            <div className="flex gap-4 pt-6">
              <Button 
                onClick={handleSave} 
                size="lg"
                variant="elegant"
                className="flex-1 text-base md:text-lg font-light tracking-wide"
              >
                Save My Mess 💾
              </Button>
              <Button 
                onClick={handleReset} 
                variant="elegant"
                size="lg"
                className="flex-1 text-base md:text-lg font-light tracking-wide"
              >
                Reset 🔄
              </Button>
            </div>
            
            {/* Motivational Message */}
            {showMessage && (
              <div className="p-6 bg-card/50 border border-border/50 rounded-lg backdrop-blur-sm">
                <p className="text-lg md:text-xl font-light text-center text-foreground text-balance">
                  {currentMessage}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* History */}
        {history.length > 0 && (
          <Card className="border border-border/50 bg-card/30 backdrop-blur-sm shadow-none">
            <CardHeader className="pb-4">
              <CardTitle className="text-3xl md:text-4xl font-light text-foreground tracking-wide">
                Your Chaos History
              </CardTitle>
              <CardDescription className="text-base md:text-lg text-foreground/70 font-light mt-2">
                A timeline of beautiful disasters
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-3">
                {history.map((entry, index) => (
                  <HistoryCard key={index} entry={entry} />
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
