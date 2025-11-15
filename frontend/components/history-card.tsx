import { AnimatedEmoji } from './animated-emoji'

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

interface HistoryCardProps {
  entry: ChaosEntry
}

export function HistoryCard({ entry }: HistoryCardProps) {
  const getScoreColor = (score: number) => {
    if (score < 20) return 'text-accent'
    if (score < 40) return 'text-primary'
    if (score < 60) return 'text-secondary'
    return 'text-destructive'
  }
  
  const getScoreBg = (score: number) => {
    if (score < 20) return 'bg-accent/10'
    if (score < 40) return 'bg-primary/10'
    if (score < 60) return 'bg-secondary/10'
    return 'bg-destructive/10'
  }
  
  return (
    <div className="p-4 bg-muted/50 rounded-xl border hover:border-primary transition-colors">
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 space-y-1">
          <div className="flex items-center gap-3">
            <span className={`text-3xl font-black ${getScoreColor(entry.score)}`}>
              {entry.score}
            </span>
            <div className="flex-1">
              <p className="text-sm font-bold text-muted-foreground">
                {entry.date}
              </p>
              <p className="text-sm text-foreground font-medium italic">
                "{entry.message}"
              </p>
            </div>
          </div>
        </div>
        
        {/* Mini metrics */}
        <div className={`px-3 py-2 ${getScoreBg(entry.score)} rounded-lg`}>
          <div className="flex gap-2 text-xs font-mono font-bold items-center">
            <span className="flex items-center gap-1"><AnimatedEmoji emoji="🚗" size={16} />{entry.metrics.lateForWork}</span>
            <span className="flex items-center gap-1"><AnimatedEmoji emoji="📅" size={16} />{entry.metrics.meetingConflict}</span>
            <span className="flex items-center gap-1"><AnimatedEmoji emoji="⏰" size={16} />{entry.metrics.deadlineMissed}</span>
            <span className="flex items-center gap-1"><AnimatedEmoji emoji="🛋️" size={16} />{entry.metrics.procrastination}</span>
            <span className="flex items-center gap-1"><AnimatedEmoji emoji="☕" size={16} />{entry.metrics.coffeeConsumption}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
