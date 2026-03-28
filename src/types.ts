export type Priority = 'low' | 'medium' | 'high'

export type FilterType = 'all' | 'active' | 'completed'

export type SortType = 'createdAt' | 'dueDate' | 'priority'

export interface Todo {
  id: string
  title: string
  description: string
  completed: boolean
  priority: Priority
  dueDate: string | null
  createdAt: string
  updatedAt: string
}

export const PRIORITY_ORDER: Record<Priority, number> = {
  high: 0,
  medium: 1,
  low: 2,
}
