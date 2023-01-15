import { AppBar, Card, CardContent, Typography } from '@mui/material'

const Header = () => {
  return (
    <AppBar position="fixed" sx={{ padding: '0.75rem 1rem', background: '#3C4048' }}>
      <Typography variant="h1" component="h1" fontSize={22} fontWeight={500} sx={{ margin: 0, padding: 0.5 }}>
        🔥 Todo App
      </Typography>
    </AppBar>
  )
}
export default Header
