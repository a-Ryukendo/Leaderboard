import React, { useEffect, useState } from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Snackbar from '@mui/material/Snackbar'
import Paper from '@mui/material/Paper'
import LeaderboardTable from './components/LeaderboardTable'
import ClaimHistoryTable from './components/ClaimHistoryTable'
import UserSelector from './components/UserSelector'
import AddUserForm from './components/AddUserForm'
import { ThemeProvider } from '@mui/material/styles'
import theme from './theme'

// Custom modern background
const bgStyle = {
  minHeight: '100vh',
  width: '100vw',
  background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)', // soft off-white to light gray
  backgroundAttachment: 'fixed',
  fontFamily: 'Inter, Poppins, Montserrat, Roboto, Arial, sans-serif',
  padding: 0,
  margin: 0,
  overflowX: 'hidden',
}


// API base URL
const url = process.env.REACT_APP_API_URL || 'http://localhost:4000'

// App is the main component for the leaderboard system
function App() {
  // State for leaderboard
  const [users, setUsers] = useState([])
  const [userPage, setUserPage] = useState(1)
  const [userTotalPages, setUserTotalPages] = useState(1)
  // State for claim history
  const [history, setHistory] = useState([])
  const [histPage, setHistPage] = useState(1)
  const [histTotalPages, setHistTotalPages] = useState(1)
  // State for selection and loading
  const [selected, setSelected] = useState('')
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState('')
  // Snackbar state for awarded points
  const [snackbar, setSnackbar] = useState({ open: false, message: '' })


  // Fetch leaderboard users with pagination
  async function loadUsers(page = 1) {
    const r = await fetch(`${url}/users?page=${page}&limit=10`)
    const d = await r.json()
    setUsers(d.users)
    setUserPage(d.page)
    setUserTotalPages(d.totalPages)
    // Do not auto-select a user. Only setSelected('') if user list changes drastically (e.g. after add/delete)
  }

  // Fetch claim history with pagination
  async function loadHistory(page = 1) {
    const r = await fetch(`${url}/claim-history?page=${page}&limit=10`)
    const d = await r.json()
    setHistory(d.history)
    setHistPage(d.page)
    setHistTotalPages(d.totalPages)
  }

  // Initial and polling fetch
  useEffect(() => {
    loadUsers(userPage)
    loadHistory(histPage)
    const timer = setInterval(() => {
      loadUsers(userPage)
      loadHistory(histPage)
    }, 3000)
    return () => clearInterval(timer)
    // eslint-disable-next-line
  }, [userPage, histPage])



  // Add a new user
  async function handleAddUser(name) {
    setBusy(true)
    setMsg('')
    try {
      const r = await fetch(url + '/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
      })
      if (!r.ok) throw new Error('fail')
      loadUsers(1)
      setUserPage(1)
      setSelected('') // Clear selection after user add
      setMsg('User added!')
    } catch {
      setMsg('Error adding user')
    }
    setBusy(false)
  }

  // Claim points for selected user
  async function handleClaim() {
    if (!selected) return
    setBusy(true)
    setMsg('')
    try {
      const r = await fetch(url + '/claim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: selected })
      })
      if (!r.ok) throw new Error('fail')
      const d = await r.json()
      setMsg('Awarded ' + d.pointsAwarded + ' points to ' + d.user.name)
      setSnackbar({ open: true, message: `+${d.pointsAwarded} points to ${d.user.name}` })
      loadUsers(userPage)
      loadHistory(histPage)
    } catch {
      setMsg('Error claiming points')
    }
    setBusy(false)
  }

  return (
    <ThemeProvider theme={theme}>
      <div style={bgStyle}>
        <Container maxWidth="md" sx={{ py: 9 }}>
          <Typography variant="h3" align="center" gutterBottom sx={{ fontWeight: 900, letterSpacing: 1, color: 'primary.main', textShadow: '0 2px 8px #e0f2f1', mb: 5 }}>
            Leaderboard
          </Typography>
          {/* Top user actions section in a Paper card */}
          <Box component={Paper} elevation={10} sx={{ p: 5, mb: 7, borderRadius: 6, background: '#fff', boxShadow: '0 8px 32px 0 rgba(20,184,166,0.08)' }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 4, width: '100%' }}>
              <AddUserForm onAdd={handleAddUser} loading={busy} />
              <UserSelector users={users} selected={selected} onChange={setSelected} disabled={busy || !users.length} />
              <Box sx={{ flex: 1 }} />
              <Button variant="contained" color="primary" size="large" onClick={handleClaim} disabled={busy || !selected} sx={{ minWidth: 180 }}>
                {busy ? <CircularProgress size={24} /> : 'Claim Points'}
              </Button>
            </Box>
            {/* Move the message below the row, centered */}
            {!selected && (
              <Box sx={{ mt: 2, textAlign: 'center', width: '100%' }}>
                <span style={{ color: '#B8860B', fontWeight: 600 }}>Please select a user</span>
              </Box>
            )}
          </Box>


          {msg && <Typography align="center" color="success.main" sx={{ mb: 2 }}>{msg}</Typography>}
          {/* Leaderboard section */}
          <Paper elevation={4} sx={{ mb: 6, p: 5, borderRadius: 6, background: '#fff', boxShadow: '0 4px 24px 0 rgba(20,184,166,0.08)' }}>
            <Typography variant="h5" align="center" sx={{ fontWeight: 800, mb: 4, color: 'secondary.main', borderBottom: '2px solid #14b8a6', pb: 1 }}>Current Rankings</Typography>
            <LeaderboardTable users={users} page={userPage} totalPages={userTotalPages} onPageChange={setUserPage} />
          </Paper>
          {/* Claim History section */}
          <Paper elevation={4} sx={{ mb: 4, p: 5, borderRadius: 6, background: '#fff', boxShadow: '0 4px 24px 0 rgba(20,184,166,0.08)' }}>
            <Typography variant="h5" align="center" sx={{ fontWeight: 800, mb: 4, color: 'primary.main', borderBottom: '2px solid #B8860B', pb: 1 }}>Claim History</Typography>
            <ClaimHistoryTable history={history} page={histPage} totalPages={histTotalPages} onPageChange={setHistPage} />
          </Paper>
          <Snackbar
            open={snackbar.open}
            autoHideDuration={2500}
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            message={snackbar.message}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          />
        </Container>
      </div>
    </ThemeProvider>
  )
}

export default App
