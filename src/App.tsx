import { useState, useRef, useEffect, useCallback } from 'react'
import { MutableRefObject } from 'react'

import { TodoProps } from './type'
import moment from 'moment'
import { Card, CardContent } from '@mui/material'

import { toast } from 'react-toastify'

import Header from './layout/header'
import TodoInput from './layout/todoInput'
import TodoList from './layout/todoList'

const App = () => {
  const [todos, setTodos] = useState<TodoProps[]>([])
  const todoRef = useRef() as MutableRefObject<HTMLInputElement>
  const updateRef = useRef() as MutableRefObject<HTMLInputElement>

  const noInputNotify = () => toast('할 일을 입력해주세요!', { position: 'top-right', autoClose: 1500, theme: 'dark' })

  useEffect(() => {
    initialSetting()
  }, [])

  useEffect(() => {
    saveLocalStorage()
  }, [todos])

  // 로컬스토리지에 저장
  const saveLocalStorage = useCallback(() => {
    window.localStorage.setItem('todo', JSON.stringify(todos))
  }, [todos])

  // 기존 데이터 체크해서 default setting
  const initialSetting = useCallback(() => {
    const todoList: null | string = window.localStorage.getItem('todo')
    if (todoList !== null) {
      const list = JSON.parse(todoList)
      // 수정모드 전체 해제
      setTodos(
        list.map((li: TodoProps) => {
          li.isUpdate = false
          return li
        })
      )
    }
  }, [])

  // UX 이벤트 함수: Todo 추가 Input 박스
  const downEnterESC = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (todoRef.current) {
      if (e.keyCode === 13) addTodo()
      if (e.keyCode === 27) todoRef.current.value = ''
    }
  }
  // UX 이벤트 함수: Todo 업데이트 Input 박스
  const downUpdateKey = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>, id: string) => {
    if (updateRef.current) {
      if (e.keyCode === 27) updateRef.current.value = ''
      if (e.keyCode === 13) updateTodo(id)
    }
  }

  // Todo 추가
  const addTodo = () => {
    if (todoRef.current) {
      const todoTxt = todoRef.current.value.trim()
      if (todoTxt !== '') {
        setTodos((prev) => {
          return prev.concat({ id: Math.random().toString(), todo: todoTxt, date: getDateNow(), isDone: false, isUpdate: false })
        })
        // Todo 추가 후 Input Box 비우기
        todoRef.current.value = ''
      } else {
        todoRef.current.value = ''
        noInputNotify()
      }
    }
  }

  // Todo 삭제
  const removeTodo = (e: React.MouseEvent, id: string) => {
    e.stopPropagation()
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  // Todo 업데이트
  const updateTodo = (id: string) => {
    if (updateRef.current) {
      const updateTxt = updateRef.current.value.trim()
      if (updateTxt !== '') {
        setTodos((prev) =>
          prev.map((p) => {
            if (p.id === id) {
              p.todo = updateTxt
              p.isUpdate = !p.isUpdate
            }
            return p
          })
        )
      } else {
        updateRef.current.value = ''
        noInputNotify()
      }
    }
  }

  // Todo 업데이트 토글
  const updateMode = (e: React.MouseEvent | null, id: string) => {
    e !== null && e.stopPropagation()
    const { isUpdate } = todos.find((todo) => todo.id === id) || {}
    // 수정 버튼을 처음 눌렀는지 아닌지 구분
    if (!isUpdate) {
      setTodos((prev) =>
        prev.map((p) => {
          if (p.id === id) {
            p.isUpdate = !p.isUpdate
            // todoUpdate: 수정 할 때 default 설정
            setTimeout(() => {
              if (updateRef.current) updateRef.current.value = p.todo
            }, 0)
          } else {
            p.isUpdate = false
          }
          return p
        })
      )
    } else {
      updateTodo(id)
    }
  }

  // Todo 업데이트 취소
  const cencelUpdate = (e: React.MouseEvent | null, id: string) => {
    e !== null && e.stopPropagation()
    if (updateRef.current) updateRef.current.value = ''
    setTodos((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          p.isUpdate = false
        }
        return p
      })
    )
  }

  // Todo 완료/미완료 토글
  const doneToggle = (e: React.MouseEvent, id: string) => {
    e.stopPropagation()

    setTodos((prev) => {
      const target: TodoProps | undefined = prev.find((p) => p.id === id)
      if (target !== undefined) target.isDone = !target.isDone
      return [...prev]
    })
  }

  // 현재 시간 구하기
  const getDateNow = (): string => {
    return moment().format('YYYY-MM-DD hh:mm:ss a zzz')
  }

  return (
    <>
      <Card className="card-wrap">
        <CardContent sx={{ padding: '1rem', height: '100%', paddingTop: '4.75rem' }}>
          <Header />
          {/* 추가 인풋창 */}
          <TodoInput todoRef={todoRef} addTodo={addTodo} downEnterESC={downEnterESC} />
          <TodoList todos={todos} updateRef={updateRef} doneToggle={doneToggle} updateMode={updateMode} downUpdateKey={downUpdateKey} cencelUpdate={cencelUpdate} removeTodo={removeTodo} />
          {/* 투두목록 */}
        </CardContent>
      </Card>
    </>
  )
}

export default App
