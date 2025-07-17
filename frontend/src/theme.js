import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#2563eb', // Modern blue accent
      contrastText: '#fff',
    },
    secondary: {
      main: '#B8860B', // Gold for highlights
      contrastText: '#fff',
    },
    background: {
      default: '#f8fafc', // Soft off-white (solid)
      paper: '#fff',
    },
    text: {
      primary: '#22292f', // Deep gray for readability
      secondary: '#2563eb', // Blue accent
    },
    success: {
      main: '#22c55e',
    },
    warning: {
      main: '#f59e42',
    },
    error: {
      main: '#ef4444',
    },
  },
  typography: {
    fontFamily: 'Inter, Poppins, Montserrat, Roboto, Arial, sans-serif',
    h3: {
      fontWeight: 900,
      fontSize: '2.6rem',
      letterSpacing: 1.5,
      color: '#2563eb',
      textShadow: '0 2px 8px #dbeafe',
    },
    h5: {
      fontWeight: 800,
      fontSize: '1.5rem',
      letterSpacing: 1,
      color: '#B8860B',
    },
    button: {
      fontWeight: 900,
      fontSize: '1.15rem',
      textTransform: 'none',
      letterSpacing: 0.5,
      color: '#fff',
    },
  },
  shape: {
    borderRadius: 18,
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          background: '#fff',
          borderRadius: 24,
          boxShadow: '0 8px 32px 0 rgba(37,99,235,0.08)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          fontWeight: 900,
          fontSize: '1.15rem',
          padding: '10px 32px',
          background: 'linear-gradient(90deg, #2563eb 0%, #60a5fa 100%)',
          color: '#fff',
          boxShadow: '0 2px 12px #2563eb22',
          transition: 'all 0.2s',
          letterSpacing: 0.5,
          '&:hover': {
            background: 'linear-gradient(90deg, #60a5fa 0%, #2563eb 100%)',
            color: '#fff',
            boxShadow: '0 4px 24px #2563eb33',
          },
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(90deg, #f8fafc 0%, #dbeafe 100%)',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          color: '#2563eb',
          fontWeight: 900,
          fontSize: 20,
        },
        body: {
          color: '#22292f',
          fontWeight: 600,
          fontSize: 17,
        },
      },
    },
  },
})

export default theme

