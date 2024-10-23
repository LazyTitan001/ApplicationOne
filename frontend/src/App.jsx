import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, Button, Box } from '@mui/material';
import RuleForm from './components/RuleForm';
import RuleViewer from './components/RuleViewer';
import RuleEvaluator from './components/RuleEvaluator';

const App = () => {
  return (
    <Router>
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
                color: '#1565c0',
                '&:hover': {
                  backgroundColor: 'rgba(21, 101, 192, 0.04)'
                }
              }}
            >
              Create Rule
            </Button>
            <Button 
              component={Link} 
              to="/evaluate" 
              sx={{ 
                color: '#1565c0',
                '&:hover': {
                  backgroundColor: 'rgba(21, 101, 192, 0.04)'
                }
              }}
            >
              Evaluate
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<RuleForm />} />
          <Route path="/rule/:id" element={<RuleViewer />} />
          <Route path="/evaluate" element={<RuleEvaluator />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;