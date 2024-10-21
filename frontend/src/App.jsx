import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Container, 
  Button, 
  Box, 
  ThemeProvider, 
  CssBaseline 
} from '@mui/material';
import { createTheme } from '@mui/material/styles';
import RuleForm from './components/RuleForm';
import RuleViewer from './components/RuleViewer';
import RuleEvaluator from './components/RuleEvaluator';

// Custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1565c0',
      light: '#1976d2',
      dark: '#0d47a1',
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 16px',
        },
      },
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ 
          minHeight: '100vh',
          backgroundColor: 'background.default',
        }}>
          <AppBar 
            position="static" 
            elevation={0} 
            sx={{ 
              background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
              borderBottom: '1px solid #e2e8f0',
            }}
          >
            <Toolbar sx={{ maxWidth: 1200, width: '100%', margin: '0 auto' }}>
              <Typography 
                variant="h5" 
                component="div" 
                sx={{ 
                  flexGrow: 1, 
                  fontWeight: 600,
                  background: 'linear-gradient(45deg, #1565c0 30%, #0d47a1 90%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                Rule Engine
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button 
                  component={Link} 
                  to="/" 
                  sx={{ 
                    color: 'primary.main',
                    '&:hover': {
                      backgroundColor: 'rgba(21, 101, 192, 0.04)',
                      transform: 'translateY(-1px)',
                      transition: 'all 0.2s'
                    }
                  }}
                >
                  Create Rule
                </Button>
                <Button 
                  component={Link} 
                  to="/evaluate" 
                  variant="contained"
                  sx={{ 
                    backgroundColor: 'primary.main',
                    boxShadow: '0 2px 4px rgba(21, 101, 192, 0.1)',
                    '&:hover': {
                      backgroundColor: 'primary.dark',
                      transform: 'translateY(-1px)',
                      boxShadow: '0 4px 6px rgba(21, 101, 192, 0.2)',
                      transition: 'all 0.2s'
                    }
                  }}
                >
                  Evaluate
                </Button>
              </Box>
            </Toolbar>
          </AppBar>

          <Container 
            maxWidth="lg" 
            sx={{ 
              mt: 4, 
              mb: 8,
              px: { xs: 2, sm: 3 }
            }}
          >
            <Routes>
              <Route path="/" element={<RuleForm />} />
              <Route path="/rule/:id" element={<RuleViewer />} />
              <Route path="/evaluate" element={<RuleEvaluator />} />
            </Routes>
          </Container>
        </Box>
      </Router>
    </ThemeProvider>
  );
};

export default App;