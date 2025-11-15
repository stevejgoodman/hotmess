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
  return (
    <div className="p-5 bg-card/20 backdrop-blur-sm rounded-lg border border-border/30 hover:border-border/50 transition-colors">
      <div className="flex items-center justify-between gap-6">
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-4">
            <span className="text-3xl md:text-4xl font-light text-foreground tracking-wide" style={{ fontFamily: 'var(--font-serif)' }}>
              {entry.score}
            </span>
            <div className="flex-1">
              <p className="text-sm font-light text-foreground/70 tracking-wide">
                {entry.date}
              </p>
              <p className="text-sm md:text-base text-foreground/90 font-light italic mt-1">
                "{entry.message}"
              </p>
            </div>
          </div>
        </div>
        
        {/* Mini metrics */}
        <div className="px-4 py-2 bg-card/30 rounded-lg border border-border/20">
          <div className="flex gap-3 text-xs font-light text-foreground/80">
            <span>🚗{entry.metrics.lateForWork}</span>
            <span>📅{entry.metrics.meetingConflict}</span>
            <span>⏰{entry.metrics.deadlineMissed}</span>
            <span>🛋️{entry.metrics.procrastination}</span>
            <span>☕{entry.metrics.coffeeConsumption}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
