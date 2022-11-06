import React from 'react'
import moment from 'moment'
import { Box, TextField, Input, AppBar, Card, CardContent, Typography, ListItemButton, List, ListItemIcon, ListItemText, IconButton } from '@mui/material'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import ClearIcon from '@mui/icons-material/Clear'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { useState, useRef, useEffect, useCallback } from 'react'
import { toast } from 'react-toastify'

interface todoProp {
  id: string
  todo: string
  date: string
  isDone: boolean
  isUpdate: boolean
}

interface MutableRefObject<T> {
  current: T
}

const App = () => {
  const todoRef = useRef<HTMLDivElement>(null)
  const updateRef = useRef<HTMLDivElement>(null)
  const [todos, setTodos] = useState<Array<todoProp>>([])
  const [todoInput, setTodoInput] = useState<string>('')
  const [todoUpdate, setTodoUpdate] = useState<string>('')
  const notify = () => toast('할 일을 입력해주세요!', { position: 'bottom-center', autoClose: 1500, theme: 'dark' })

  useEffect(() => {
    defaultSet()
    console.log(typeof todoRef.current)
  }, [])

  useEffect(() => {
    saveLocal()
  }, [todos])

  // 로컬스토리지에 저장
  const saveLocal = useCallback(() => {
    window.localStorage.setItem('todo', JSON.stringify(todos))
  }, [todos])
  // 기존 데이터 체크해서 default setting
  const defaultSet = useCallback(() => {
    const todoList: null | string = window.localStorage.getItem('todo')
    if (todoList !== null) setTodos(JSON.parse(todoList))
  }, [])

  const todoChange = (e: React.ChangeEvent<HTMLInputElement>) => setTodoInput(e.target.value)
  const updateChange = (e: React.ChangeEvent<HTMLInputElement>) => setTodoUpdate(e.target.value)

  // UX 이벤트 함수: Todo 추가 Input 박스
  const downEnterESC = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.keyCode === 13 && addTodo()
    e.keyCode === 27 && setTodoInput('')
  }
  // UX 이벤트 함수: Todo 업데이트 Input 박스
  const downUpdateKey = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>, id: string) => {
    e.keyCode === 27 && setTodoUpdate('')
    e.keyCode === 13 && updateTodo(id)
  }

  // Todo 추가
  const addTodo = useCallback(() => {
    if (todoInput.trim() !== '') {
      setTodos((prev) => {
        return prev.concat({ id: Math.random().toString(), todo: todoInput, date: getDateNow(), isDone: false, isUpdate: false })
      })
      // Todo 추가 후 Input Box 비우기
      setTodoInput('')
    } else {
      setTodoInput('')
      notify()
    }
  }, [todoInput])

  // Todo 삭제
  const removeTodo = (e: React.MouseEvent, id: string) => {
    e.stopPropagation()
    const updateTodos = todos.filter((todo) => todo.id !== id)
    setTodos([...updateTodos])
  }

  // Todo 업데이트
  const updateTodo = (id: string) => {
    if (todoUpdate.trim() !== '') {
      setTodos((prev) =>
        prev.map((p) => {
          if (p.id === id) {
            p.todo = todoUpdate
            p.isUpdate = !p.isUpdate
          }
          return p
        })
      )
    } else {
      setTodoUpdate('')
      notify()
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
            setTodoUpdate(p.todo)
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
    setTodoUpdate('')
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

    // 최적화(?)
    // const _todos = todos
    // const idx = _todos.findIndex((todo) => todo.id === id)
    // const target = todos[idx]
    // target.isDone = !target.isDone
    // _todos.splice(idx, 1, target)
    // setTodos([..._todos])

    setTodos((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          p.isDone = !p.isDone
        }
        return p
      })
    )
  }

  // 현재 시간 구하기
  const getDateNow = (): string => {
    return moment().format('YYYY-MM-DD hh:mm:ss a zzz')
  }

  return (
    <>
      <Card sx={{ height: '100%' }}>
        <CardContent sx={{ padding: '1rem', height: '100%', paddingTop: '4.75rem' }}>
          <AppBar position="fixed" sx={{ padding: '0.75rem 1rem', background: '#3C4048' }}>
            <Typography variant="h1" component="h1" fontSize={22} fontWeight={500} sx={{ margin: 0, padding: 0.5 }}>
              🔥 꾸생의 Todo App
            </Typography>
          </AppBar>
          {/* 추가 인풋창 */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <TextField
              ref={todoRef}
              fullWidth
              size="small"
              label="Todo"
              placeholder="할 일을 입력해주세요."
              variant="outlined"
              color="secondary"
              value={todoInput}
              onChange={todoChange}
              onKeyDown={downEnterESC}
            />
            <IconButton aria-label="delete" size="medium" onClick={addTodo} sx={{ marginLeft: '0.5rem' }}>
              <AddCircleOutlineIcon fontSize="inherit" />
            </IconButton>
          </Box>
          {/* 투두목록 */}
          <List sx={{ p: 0 }}>
            {todos.map((todo) => (
              <ListItemButton key={todo.id} selected={todo.isDone} component="li" data-target="isDone" onClick={(e) => doneToggle(e, todo.id)}>
                <ListItemIcon sx={{ mr: -2 }}>{todo.isDone ? <CheckCircleIcon sx={{ color: '#54B435' }} /> : <CheckCircleOutlineIcon sx={{ color: '#B2B2B2' }} />}</ListItemIcon>
                <IconButton edge="end" aria-label="delete"></IconButton>
                {todo.isUpdate ? (
                  <Input ref={updateRef} fullWidth value={todoUpdate} onChange={updateChange} onKeyDown={(e) => downUpdateKey(e, todo.id)} onClick={(e) => e.stopPropagation()} />
                ) : (
                  <ListItemText primary={todo.todo} secondary={todo.date} sx={{ margin: 0 }} />
                )}

                <IconButton edge="end" aria-label="update" sx={{ marginRight: '0.15rem' }} onClick={(e) => updateMode(e, todo.id)}>
                  <EditIcon />
                </IconButton>
                {todo.isUpdate ? (
                  <IconButton edge="end" aria-label="clear" sx={{ marginRight: '0.15rem' }} onClick={(e) => cencelUpdate(e, todo.id)}>
                    <ClearIcon />
                  </IconButton>
                ) : (
                  <IconButton edge="end" aria-label="delete" sx={{ marginRight: '0.15rem' }} onClick={(e) => removeTodo(e, todo.id)}>
                    <DeleteIcon />
                  </IconButton>
                )}
              </ListItemButton>
            ))}
          </List>
        </CardContent>
      </Card>
    </>
  )
}

export default App
