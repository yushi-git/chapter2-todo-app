import { useState, FormEvent } from 'react'
import { Todo, Priority } from '../types'

interface TodoItemProps {
  todo: Todo
  onToggle: (id: string) => void
  onUpdate: (id: string, updates: Partial<Omit<Todo, 'id' | 'createdAt'>>) => void
  onDelete: (id: string) => void
}

const PRIORITY_LABEL: Record<Priority, string> = {
  high: '高',
  medium: '中',
  low: '低',
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('ja-JP', { month: 'short', day: 'numeric' })
}

function isOverdue(dueDate: string): boolean {
  return new Date(dueDate) < new Date(new Date().toDateString())
}

export function TodoItem({ todo, onToggle, onUpdate, onDelete }: TodoItemProps) {
  const [editing, setEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(todo.title)
  const [editDescription, setEditDescription] = useState(todo.description)
  const [editPriority, setEditPriority] = useState<Priority>(todo.priority)
  const [editDueDate, setEditDueDate] = useState(todo.dueDate ?? '')

  const handleSave = (e: FormEvent) => {
    e.preventDefault()
    if (!editTitle.trim()) return
    onUpdate(todo.id, {
      title: editTitle.trim(),
      description: editDescription.trim(),
      priority: editPriority,
      dueDate: editDueDate || null,
    })
    setEditing(false)
  }

  const handleCancelEdit = () => {
    setEditTitle(todo.title)
    setEditDescription(todo.description)
    setEditPriority(todo.priority)
    setEditDueDate(todo.dueDate ?? '')
    setEditing(false)
  }

  const overdue = !todo.completed && todo.dueDate && isOverdue(todo.dueDate)

  if (editing) {
    return (
      <li className="todo-item todo-item--editing">
        <form onSubmit={handleSave} className="todo-item__edit-form">
          <input
            type="text"
            className="todo-form__input"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            autoFocus
          />
          <textarea
            className="todo-form__textarea"
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            rows={2}
            placeholder="説明 (任意)"
          />
          <div className="todo-form__row">
            <div className="todo-form__field">
              <label className="todo-form__label">優先度</label>
              <select
                className="todo-form__select"
                value={editPriority}
                onChange={(e) => setEditPriority(e.target.value as Priority)}
              >
                <option value="high">高</option>
                <option value="medium">中</option>
                <option value="low">低</option>
              </select>
            </div>
            <div className="todo-form__field">
              <label className="todo-form__label">期限</label>
              <input
                type="date"
                className="todo-form__date"
                value={editDueDate}
                onChange={(e) => setEditDueDate(e.target.value)}
              />
            </div>
          </div>
          <div className="todo-item__edit-actions">
            <button type="submit" className="btn btn--primary btn--sm" disabled={!editTitle.trim()}>
              保存
            </button>
            <button type="button" className="btn btn--ghost btn--sm" onClick={handleCancelEdit}>
              キャンセル
            </button>
          </div>
        </form>
      </li>
    )
  }

  return (
    <li className={`todo-item${todo.completed ? ' todo-item--completed' : ''}${overdue ? ' todo-item--overdue' : ''}`}>
      <button
        className="todo-item__checkbox"
        onClick={() => onToggle(todo.id)}
        aria-label={todo.completed ? '未完了に戻す' : '完了にする'}
      >
        <span className="todo-item__check-icon">
          {todo.completed ? '✓' : ''}
        </span>
      </button>

      <div className="todo-item__content">
        <span className="todo-item__title">{todo.title}</span>
        {todo.description && (
          <span className="todo-item__description">{todo.description}</span>
        )}
        <div className="todo-item__meta">
          <span className={`badge badge--${todo.priority}`}>
            {PRIORITY_LABEL[todo.priority]}
          </span>
          {todo.dueDate && (
            <span className={`todo-item__due${overdue ? ' todo-item__due--overdue' : ''}`}>
              {overdue ? '期限切れ: ' : '期限: '}
              {formatDate(todo.dueDate)}
            </span>
          )}
        </div>
      </div>

      <div className="todo-item__actions">
        <button
          className="icon-btn"
          onClick={() => setEditing(true)}
          aria-label="編集"
          title="編集"
        >
          ✏️
        </button>
        <button
          className="icon-btn icon-btn--danger"
          onClick={() => onDelete(todo.id)}
          aria-label="削除"
          title="削除"
        >
          🗑️
        </button>
      </div>
    </li>
  )
}
