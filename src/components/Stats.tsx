interface StatsProps {
  total: number
  active: number
  completed: number
}

export function Stats({ total, active, completed }: StatsProps) {
  if (total === 0) return null

  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0

  return (
    <div className="stats">
      <div className="stats__item">
        <span className="stats__value">{total}</span>
        <span className="stats__label">合計</span>
      </div>
      <div className="stats__item">
        <span className="stats__value stats__value--active">{active}</span>
        <span className="stats__label">未完了</span>
      </div>
      <div className="stats__item">
        <span className="stats__value stats__value--completed">{completed}</span>
        <span className="stats__label">完了済み</span>
      </div>
      <div className="stats__progress">
        <div className="stats__progress-bar">
          <div
            className="stats__progress-fill"
            style={{ width: `${completionRate}%` }}
          />
        </div>
        <span className="stats__progress-label">{completionRate}% 完了</span>
      </div>
    </div>
  )
}
