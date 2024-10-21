import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, Button, Box } from '@mui/material';
import RuleForm from './components/RuleForm';
import RuleViewer from './components/RuleViewer';
import RuleEvaluator from './components/RuleEvaluator';

const App = () => {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Rule Engine
          </Typography>
          <Button color="inherit" component={Link} to="/">Create Rule</Button>
          <Button color="inherit" component={Link} to="/evaluate">Evaluate</Button>
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