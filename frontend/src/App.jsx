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
  createTheme 
} from '@mui/material';
import RuleForm from './components/RuleForm';
import RuleViewer from './components/RuleViewer';
import RuleEvaluator from './components/RuleEvaluator';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1565c0',
    },
    background: {
      default: '#f5f5f5'
    }
  },
  typography: {
    button: {
      textTransform: 'none',
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static" elevation={0} sx={{ backgroundColor: '#e3f2fd', color: '#1565c0' }}>
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
                Rule Engine
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button 
                  component={Link} 
                  to="/" 
                  sx={{ 
                    color: '#fff',
                    fontWeight: 'bold',
                    borderRadius: 2,
                    padding: '8px 20px',
                    background: 'linear-gradient(45deg, #1565c0 30%, #1e88e5 90%)',
                    boxShadow: '0 3px 5px 2px rgba(21, 101, 192, .3)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #1e88e5 30%, #42a5f5 90%)',
                      boxShadow: '0 3px 5px 2px rgba(66, 165, 245, .3)',
                    }
                  }}
                >
                  Create Rule
                </Button>
                <Button 
                  component={Link} 
                  to="/evaluate" 
                  sx={{ 
                    color: '#fff',
                    fontWeight: 'bold',
                    borderRadius: 2,
                    padding: '8px 20px',
                    background: 'linear-gradient(45deg, #1565c0 30%, #1e88e5 90%)',
                    boxShadow: '0 3px 5px 2px rgba(21, 101, 192, .3)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #1e88e5 30%, #42a5f5 90%)',
                      boxShadow: '0 3px 5px 2px rgba(66, 165, 245, .3)',
                    }
                  }}
                >
                  Evaluate Rules
                </Button>
              </Box>
            </Toolbar>
          </AppBar>

          <Container sx={{ mt: 4, mb: 4 }}>
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
