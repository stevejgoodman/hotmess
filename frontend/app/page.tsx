'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { Button } from '@/components/ui/button'
import { ChaosMeter } from '@/components/chaos-meter'
import { HistoryCard } from '@/components/history-card'
import { AnimatedEmoji } from '@/components/animated-emoji'

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
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-4 md:p-8">
      <div className="mx-auto max-w-4xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-5xl md:text-7xl font-black text-primary text-balance leading-tight">
            HOT MESS TRACKER
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground font-medium flex items-center justify-center gap-2">
            Self-report your chaos level. We won't judge. (Much.) <AnimatedEmoji emoji="😏" size={24} />
          </p>
        </div>
        
        {/* Chaos Meter */}
        <ChaosMeter score={chaosScore} />
        
        {/* Sliders Card */}
        <Card className="border-2 shadow-lg">
          <CardHeader className="bg-primary/5">
            <CardTitle className="text-2xl font-black text-primary">
              Today's Chaos Levels
            </CardTitle>
            <CardDescription className="text-base">
              Slide to confess your daily disasters
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8 pt-6">
            {/* Transport Problems */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-lg font-bold text-foreground flex items-center gap-2">
                  <AnimatedEmoji emoji="🚗" size={24} /> Transport Problems
                </label>
                <span className="text-2xl font-black text-primary">
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
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-lg font-bold text-foreground flex items-center gap-2">
                  <AnimatedEmoji emoji="📅" size={24} /> Meeting Conflict
                </label>
                <span className="text-2xl font-black text-secondary">
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
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-lg font-bold text-foreground flex items-center gap-2">
                  <AnimatedEmoji emoji="⏰" size={24} /> Deadline Missed
                </label>
                <span className="text-2xl font-black text-destructive">
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
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-lg font-bold text-foreground flex items-center gap-2">
                  <AnimatedEmoji emoji="🛋️" size={24} /> Procrastination
                </label>
                <span className="text-2xl font-black text-accent">
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
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-lg font-bold text-foreground flex items-center gap-2">
                  <AnimatedEmoji emoji="☕" size={24} /> Coffee Consumption
                </label>
                <span className="text-2xl font-black text-primary">
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
            <div className="flex gap-3 pt-4">
              <Button 
                onClick={handleSave} 
                size="lg"
                className="flex-1 text-lg font-black flex items-center justify-center gap-2"
              >
                Save My Mess <AnimatedEmoji emoji="💾" size={20} />
              </Button>
              <Button 
                onClick={handleReset} 
                variant="outline"
                size="lg"
                className="flex-1 text-lg font-black flex items-center justify-center gap-2"
              >
                Reset <AnimatedEmoji emoji="🔄" size={20} />
              </Button>
            </div>
            
            {/* Motivational Message */}
            {showMessage && (
              <div className="p-6 bg-primary/10 border-2 border-primary rounded-xl animate-in slide-in-from-top-4">
                <p className="text-lg md:text-xl font-bold text-center text-primary text-balance">
                  {currentMessage}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* History */}
        {history.length > 0 && (
          <Card className="border-2 shadow-lg">
            <CardHeader className="bg-secondary/5">
              <CardTitle className="text-2xl font-black text-secondary">
                Your Chaos History
              </CardTitle>
              <CardDescription className="text-base">
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
