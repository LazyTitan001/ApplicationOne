import React, { useState } from 'react';
import { TextField, Button, Paper, Typography, Box, Alert } from '@mui/material';
import RuleList from './RuleList';
import api from '../services/api';

const RuleEvaluator = () => {
  const [userData, setUserData] = useState('');
  const [combinedRule, setCombinedRule] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleRulesCombined = (newCombinedRule) => {
    setCombinedRule(newCombinedRule);
  };

  const handleEvaluate = async () => {
    if (!combinedRule) {
      setError('Please combine rules first');
      return;
    }

    try {
      const data = JSON.parse(userData);
      const response = await api.evaluateRule(combinedRule, data);
      setResult(response.result);
      setError('');
    } catch (err) {
      setError(err.message || 'Invalid JSON data');
      setResult(null);
    }
  };

  return (
    <Box>
      <RuleList onRulesSelected={handleRulesCombined} />
      
      <Paper 
        elevation={2} 
        sx={{ 
          p: 4, 
          maxWidth: 800, 
          mx: 'auto', 
          mt: 4, 
          borderRadius: 2,
          backgroundColor: '#f5f5f5',
          border: '1px solid #e0e0e0',
        }}
      >
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#1565c0' }}>
          Evaluate Combined Rule
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2, borderRadius: 1 }}>{error}</Alert>}
        
        {combinedRule && (
          <Alert severity="info" sx={{ mb: 2, borderRadius: 1 }}>
            Rules combined successfully! Ready for evaluation.
          </Alert>
        )}
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="User Data"
            multiline
            rows={4}
            value={userData}
            onChange={(e) => setUserData(e.target.value)}
            helperText="Enter the data to evaluate (e.g., {'age': 35, 'department': 'Sales', ...})"
            sx={{ backgroundColor: '#ffffff' }}
          />
          <Button 
            variant="contained" 
            onClick={handleEvaluate}
            disabled={!combinedRule}
            sx={{ 
              mt: 2, 
              backgroundColor: '#1565c0',
              '&:hover': {
                backgroundColor: '#0d47a1',
              },
              '&:disabled': {
                backgroundColor: '#bdbdbd',
              }
            }}
          >
            Evaluate
          </Button>

          {result !== null && (
            <Alert severity={result ? "success" : "info"} sx={{ borderRadius: 1 }}>
              Result: {result.toString()}
            </Alert>
          )}

          <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
            Example Data Format:
            <pre style={{ background: '#e3f2fd', padding: '10px', borderRadius: '4px' }}>
              {JSON.stringify({
                "age": 35,
                "department": "Sales",
                "salary": 60000,
                "experience": 3
              }, null, 2)}
            </pre>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default RuleEvaluator;