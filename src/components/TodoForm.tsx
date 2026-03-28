import { useState, FormEvent } from 'react'
import { Priority } from '../types'

interface TodoFormProps {
  onAdd: (
    title: string,
    description: string,
    priority: Priority,
    dueDate: string | null,
  ) => void
}

export function TodoForm({ onAdd }: TodoFormProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState<Priority>('medium')
  const [dueDate, setDueDate] = useState('')
  const [expanded, setExpanded] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return
    onAdd(title, description, priority, dueDate || null)
    setTitle('')
    setDescription('')
    setPriority('medium')
    setDueDate('')
    setExpanded(false)
  }

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <div className="todo-form__main">
        <input
          type="text"
          className="todo-form__input"
          placeholder="新しいタスクを追加..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onFocus={() => setExpanded(true)}
          autoComplete="off"
        />
        <button
          type="submit"
          className="btn btn--primary"
          disabled={!title.trim()}
        >
          追加
        </button>
      </div>

      {expanded && (
        <div className="todo-form__extra">
          <textarea
            className="todo-form__textarea"
            placeholder="説明 (任意)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
          />
          <div className="todo-form__row">
            <div className="todo-form__field">
              <label className="todo-form__label">優先度</label>
              <select
                className="todo-form__select"
                value={priority}
                onChange={(e) => setPriority(e.target.value as Priority)}
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
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
            <button
              type="button"
              className="btn btn--ghost"
              onClick={() => setExpanded(false)}
            >
              閉じる
            </button>
          </div>
        </div>
      )}
    </form>
  )
}
