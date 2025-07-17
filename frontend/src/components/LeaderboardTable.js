import React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import CrownIcon from '@mui/icons-material/EmojiEvents'

const medalColors = [
  '#FFD700', // Gold
  '#C0C0C0', // Silver
  '#CD7F32', // Bronze
]

function Podium({ users }) {
  // users: array of top 3 users, sorted by rank
  const podiumColors = [
    'linear-gradient(180deg, #fffbe6 0%, #ffe082 100%)', // 1st - gold
    'linear-gradient(180deg, #f0f0f0 0%, #c0c0c0 100%)', // 2nd - silver
    'linear-gradient(180deg, #fff8e1 0%, #cd7f32 100%)', // 3rd - bronze
  ]
  const crownColors = ['#FFD700', '#C0C0C0', '#CD7F32']
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'end', gap: 3, mb: 4 }}>
      {users.map((u, i) => (
        <Box key={u?._id || i} sx={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          width: 110, minHeight: i === 0 ? 180 : 150, // center is tallest
          background: podiumColors[i],
          borderRadius: 4,
          boxShadow: i === 0 ? '0 4px 24px 0 #FFD70055' : '0 2px 12px 0 #0001',
          p: 2,
          position: 'relative',
        }}>
          <CrownIcon sx={{ color: crownColors[i], fontSize: 32, position: 'absolute', top: 8, left: '50%', transform: 'translateX(-50%)', zIndex: 2 }} />
          <Avatar src={u?.avatar} sx={{ width: 64, height: 64, mb: 1.5, border: '3px solid #fff', boxShadow: '0 2px 8px #FFD70033' }}>
            {u?.name?.[0] || '?'}
          </Avatar>
          <Box sx={{ fontWeight: 900, fontSize: 18, color: '#7c5c20', mb: 0.5, textAlign: 'center', maxWidth: 90, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{u?.name || '—'}</Box>
          <Box sx={{ fontWeight: 700, fontSize: 16, color: '#B8860B', textAlign: 'center' }}>{u?.points ?? ''}</Box>
        </Box>
      ))}
    </Box>
  )
}

// LeaderboardTable displays a paginated, ranked list of users with explicit rank
function LeaderboardTable({ users, page, totalPages, onPageChange }) {
  // Always show podium on first page and if at least 3 users
  const showPodium = page === 1 && users.length >= 3
  const podiumUsers = showPodium ? users.slice(0, 3) : []
  // Table always shows all users
  return (
    <>
      {showPodium && <Podium users={podiumUsers} />}
      <TableContainer component={Paper} sx={{ maxWidth: 500, margin: 'auto', mb: 3 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ background: 'linear-gradient(90deg, #FFF8DC 0%, #fff 100%)' }}>
              <TableCell sx={{ fontWeight: 900, fontSize: 18, color: '#1976d2' }}>Rank</TableCell>
              <TableCell sx={{ fontWeight: 900, fontSize: 18, color: '#1976d2' }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 900, fontSize: 18, color: '#1976d2' }}>Points</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((u, i) => (
              <TableRow
                key={u._id}
                sx={{
                  background: i < 3 && page === 1 ? 'rgba(255, 248, 220, 0.5)' : 'inherit',
                  fontWeight: i < 3 && page === 1 ? 'bold' : 'normal',
                  '&:hover': { background: '#FFF8DC' }
                }}
              >
                <TableCell sx={{ fontWeight: i < 3 && page === 1 ? 900 : 500, color: i < 3 && page === 1 ? '#B8860B' : '#3b2f13' }}>
                  {i < 3 && page === 1 ? (
                    <EmojiEventsIcon sx={{ color: medalColors[i], verticalAlign: 'middle', fontSize: 28, mr: 1 }} />
                  ) : null}
                  {(page - 1) * 10 + i + 1}
                </TableCell>
                <TableCell sx={{ fontWeight: i < 3 && page === 1 ? 900 : 500, color: i < 3 && page === 1 ? '#B8860B' : '#3b2f13' }}>{u.name}</TableCell>
                <TableCell sx={{ fontWeight: i < 3 && page === 1 ? 900 : 500, color: i < 3 && page === 1 ? '#B8860B' : '#3b2f13' }}>{u.points}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 12 }}>
          <Button onClick={() => onPageChange(page - 1)} disabled={page <= 1} variant="contained" color="secondary" sx={{ mx: 1, minWidth: 90 }}>
            Prev
          </Button>
          <span style={{ margin: '0 12px', color: '#B8860B', fontWeight: 700 }}>Page {page} of {totalPages}</span>
          <Button onClick={() => onPageChange(page + 1)} disabled={page >= totalPages} variant="contained" color="secondary" sx={{ mx: 1, minWidth: 90 }}>
            Next
          </Button>
        </div>
      </TableContainer>
    </>
  )
}

export default LeaderboardTable
