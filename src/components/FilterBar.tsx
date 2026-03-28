import { FilterType, SortType } from '../types'

interface FilterBarProps {
  filter: FilterType
  sort: SortType
  completedCount: number
  onFilterChange: (filter: FilterType) => void
  onSortChange: (sort: SortType) => void
  onClearCompleted: () => void
}

const FILTER_OPTIONS: { value: FilterType; label: string }[] = [
  { value: 'all', label: 'すべて' },
  { value: 'active', label: '未完了' },
  { value: 'completed', label: '完了済み' },
]

const SORT_OPTIONS: { value: SortType; label: string }[] = [
  { value: 'createdAt', label: '作成日時' },
  { value: 'priority', label: '優先度' },
  { value: 'dueDate', label: '期限' },
]

export function FilterBar({
  filter,
  sort,
  completedCount,
  onFilterChange,
  onSortChange,
  onClearCompleted,
}: FilterBarProps) {
  return (
    <div className="filter-bar">
      <div className="filter-bar__filters">
        {FILTER_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            className={`filter-btn${filter === opt.value ? ' filter-btn--active' : ''}`}
            onClick={() => onFilterChange(opt.value)}
          >
            {opt.label}
          </button>
        ))}
      </div>

      <div className="filter-bar__controls">
        <div className="filter-bar__sort">
          <label className="filter-bar__sort-label">並び替え:</label>
          <select
            className="todo-form__select todo-form__select--sm"
            value={sort}
            onChange={(e) => onSortChange(e.target.value as SortType)}
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {completedCount > 0 && (
          <button className="btn btn--danger btn--sm" onClick={onClearCompleted}>
            完了済みを削除 ({completedCount})
          </button>
        )}
      </div>
    </div>
  )
}
