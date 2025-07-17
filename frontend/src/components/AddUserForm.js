import React, { useState } from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'

// AddUserForm lets the user add a new user to the leaderboard
function AddUserForm({ onAdd, loading }) {
  const [value, setValue] = useState('')
  const handleSubmit = e => {
    e.preventDefault()
    if (!value.trim()) return
    onAdd(value)
    setValue('')
  }
  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', alignItems: 'center', gap: 2, bgcolor: '#fff', borderRadius: 2, px: 2, py: 1, boxShadow: 1 }}>
      <TextField
        size="medium"
        variant="outlined"
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="Add new user"
        disabled={loading}
        sx={{ fontSize: 16, fontWeight: 600, bgcolor: '#f5faff', borderRadius: 2 }}
      />
      <Button type="submit" variant="contained" color="secondary" size="large" disabled={loading} sx={{ px: 3, py: 1, borderRadius: 3, fontWeight: 700, fontSize: 16 }}>
        Add
      </Button>
    </Box>
  )
}

export default AddUserForm
