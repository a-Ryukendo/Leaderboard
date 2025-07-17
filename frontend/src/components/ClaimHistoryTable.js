import React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'

// ClaimHistoryTable shows paginated claim logs
function ClaimHistoryTable({ history, page, totalPages, onPageChange }) {
  return (
    <TableContainer component={Paper} sx={{ maxWidth: 650, margin: 'auto', mb: 3, borderRadius: 3, boxShadow: 3, background: '#fff' }}>
      <Table>
        <TableHead>
          <TableRow sx={{ background: 'linear-gradient(90deg, #FFF8DC 0%, #fff 100%)' }}>
            <TableCell sx={{ fontWeight: 900, fontSize: 17, color: '#B8860B' }}>User</TableCell>
            <TableCell sx={{ fontWeight: 900, fontSize: 17, color: '#B8860B' }}>Points</TableCell>
            <TableCell sx={{ fontWeight: 900, fontSize: 17, color: '#B8860B' }}>Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {history.map((h, i) => (
            <TableRow key={h._id || i} sx={{ '&:hover': { background: '#FFF8DC' } }}>
              <TableCell>{h.userId?.name || 'Unknown'}</TableCell>
              <TableCell sx={{ color: '#B8860B', fontWeight: 700 }}>{h.points}</TableCell>
              <TableCell sx={{ color: '#7c5c20' }}>{new Date(h.claimedAt).toLocaleString()}</TableCell>
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
  )
}

export default ClaimHistoryTable
