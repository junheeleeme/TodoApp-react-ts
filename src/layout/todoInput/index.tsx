import { TodoInputProps } from './type'
import { Box, TextField, IconButton } from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'

const TodoInput = ({ todoRef, addTodo, downEnterESC }: TodoInputProps) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
      <TextField inputRef={todoRef} autoFocus fullWidth size="small" label="Todo" placeholder="할 일을 입력해주세요." variant="outlined" color="secondary" onKeyDown={downEnterESC} />
      <IconButton aria-label="delete" size="medium" onClick={addTodo} sx={{ marginLeft: '0.5rem' }}>
        <AddCircleOutlineIcon fontSize="inherit" />
      </IconButton>
    </Box>
  )
}
export default TodoInput
