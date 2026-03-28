import { useState } from 'react'
import { useTodos } from './hooks/useTodos'
import { FilterType, SortType } from './types'
import { TodoForm } from './components/TodoForm'
import { TodoList } from './components/TodoList'
import { FilterBar } from './components/FilterBar'
import { Stats } from './components/Stats'

export default function App() {
  const [filter, setFilter] = useState<FilterType>('all')
  const [sort, setSort] = useState<SortType>('createdAt')

  const {
    addTodo,
    updateTodo,
    toggleTodo,
    deleteTodo,
    clearCompleted,
    getFilteredAndSorted,
    stats,
  } = useTodos()

  const filteredTodos = getFilteredAndSorted(filter, sort)

  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">
          <span className="app__title-icon">✅</span>
          TODO App
        </h1>
        <p className="app__subtitle">タスクを管理して生産性を上げよう</p>
      </header>

      <main className="app__main">
        <Stats
          total={stats.total}
          active={stats.active}
          completed={stats.completed}
        />

        <TodoForm onAdd={addTodo} />

        <FilterBar
          filter={filter}
          sort={sort}
          completedCount={stats.completed}
          onFilterChange={setFilter}
          onSortChange={setSort}
          onClearCompleted={clearCompleted}
        />

        <TodoList
          todos={filteredTodos}
          onToggle={toggleTodo}
          onUpdate={updateTodo}
          onDelete={deleteTodo}
        />
      </main>
    </div>
  )
}
