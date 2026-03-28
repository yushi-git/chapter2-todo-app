import { useLocalStorage } from './useLocalStorage'
import { Todo, Priority, FilterType, SortType, PRIORITY_ORDER } from '../types'

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

export function useTodos() {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', [])

  const addTodo = (
    title: string,
    description: string,
    priority: Priority,
    dueDate: string | null,
  ) => {
    const now = new Date().toISOString()
    const newTodo: Todo = {
      id: generateId(),
      title: title.trim(),
      description: description.trim(),
      completed: false,
      priority,
      dueDate,
      createdAt: now,
      updatedAt: now,
    }
    setTodos((prev) => [newTodo, ...prev])
  }

  const updateTodo = (
    id: string,
    updates: Partial<Omit<Todo, 'id' | 'createdAt'>>,
  ) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? { ...todo, ...updates, updatedAt: new Date().toISOString() }
          : todo,
      ),
    )
  }

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              completed: !todo.completed,
              updatedAt: new Date().toISOString(),
            }
          : todo,
      ),
    )
  }

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  const clearCompleted = () => {
    setTodos((prev) => prev.filter((todo) => !todo.completed))
  }

  const getFilteredAndSorted = (filter: FilterType, sort: SortType): Todo[] => {
    let result = todos.filter((todo) => {
      if (filter === 'active') return !todo.completed
      if (filter === 'completed') return todo.completed
      return true
    })

    result = [...result].sort((a, b) => {
      if (sort === 'priority') {
        return PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority]
      }
      if (sort === 'dueDate') {
        if (!a.dueDate && !b.dueDate) return 0
        if (!a.dueDate) return 1
        if (!b.dueDate) return -1
        return a.dueDate.localeCompare(b.dueDate)
      }
      // createdAt (default: newest first)
      return b.createdAt.localeCompare(a.createdAt)
    })

    return result
  }

  const stats = {
    total: todos.length,
    active: todos.filter((t) => !t.completed).length,
    completed: todos.filter((t) => t.completed).length,
  }

  return {
    todos,
    addTodo,
    updateTodo,
    toggleTodo,
    deleteTodo,
    clearCompleted,
    getFilteredAndSorted,
    stats,
  }
}
