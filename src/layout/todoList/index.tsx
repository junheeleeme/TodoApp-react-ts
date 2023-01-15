import { TodoListProps } from './type'
import { List, ListItemButton, ListItemIcon, ListItemText, IconButton, Input } from '@mui/material'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import ClearIcon from '@mui/icons-material/Clear'

const TodoList = ({ todos, updateRef, doneToggle, updateMode, downUpdateKey, cencelUpdate, removeTodo }: TodoListProps) => {
  return (
    <List sx={{ p: 0 }} className="list-wrap">
      {todos.map((todo) => (
        <ListItemButton key={todo.id} selected={todo.isDone} component="li" data-target="isDone" onClick={(e) => doneToggle(e, todo.id)}>
          <ListItemIcon sx={{ mr: -2 }}>{todo.isDone ? <CheckCircleIcon sx={{ color: '#54B435' }} /> : <CheckCircleOutlineIcon sx={{ color: '#B2B2B2' }} />}</ListItemIcon>
          <IconButton edge="end" aria-label="delete"></IconButton>
          {todo.isUpdate ? (
            <Input inputRef={updateRef} fullWidth autoFocus onKeyDown={(e) => downUpdateKey(e, todo.id)} onClick={(e) => e.stopPropagation()} />
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
  )
}
export default TodoList
