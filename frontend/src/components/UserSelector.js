import React from 'react'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'

// UserSelector lets the user pick from a list of users
function UserSelector({ users, selected, onChange, disabled }) {
  return (
    <FormControl variant="outlined" sx={{ minWidth: 220, bgcolor: '#fff', borderRadius: 2, boxShadow: 1, justifyContent: 'center' }} size="medium">
      <InputLabel id="user-select-label" sx={{ color: '#7c5c20', fontWeight: 700 }}>User</InputLabel>
      <Select
        labelId="user-select-label"
        value={selected}
        label="User"
        onChange={e => onChange(e.target.value)}
        disabled={disabled}
        sx={{ borderRadius: 2, fontWeight: 600, fontSize: 16, py: 1, textAlign: 'center', minHeight: 56, display: 'flex', alignItems: 'center' }}
        displayEmpty
      >
        {users.map(u => (
          <MenuItem key={u._id} value={u._id}>{u.name}</MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default UserSelector
