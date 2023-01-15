import { MouseEvent, KeyboardEvent } from 'react'
import { TodoProps } from '@/type'
import { MutableRefObject } from 'react'

export interface TodoListProps {
  todos: TodoProps[]
  updateRef: MutableRefObject<HTMLInputElement>
  doneToggle: (e: MouseEvent, id: string) => void
  updateMode: (e: MouseEvent | null, id: string) => void
  downUpdateKey: (e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>, id: string) => void
  cencelUpdate: (e: MouseEvent | null, id: string) => void
  removeTodo: (e: MouseEvent, id: string) => void
}
