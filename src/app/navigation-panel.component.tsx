import { Container, Typography } from '@mui/material'
import { Link, Outlet } from 'react-router'

const ROOT = '/'

export function NavigationPanel() {
  return (
    <>
      <Container sx={{ mb: 2 }}>
        <Link to={ROOT}>
          <Typography>Home</Typography>
        </Link>
      </Container>
      <Outlet />
    </>
  )
}
