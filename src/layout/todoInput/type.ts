import { MutableRefObject } from 'react'

export interface TodoInputProps {
  todoRef: MutableRefObject<HTMLInputElement>
  addTodo: () => void
  downEnterESC: (e: React.KeyboardEvent<HTMLInputElement>) => void
}
