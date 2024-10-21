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
      
      <Paper elevation={3} sx={{ p: 3, maxWidth: 800, mx: 'auto', mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Evaluate Combined Rule
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        
        {combinedRule && (
          <Alert severity="info" sx={{ mb: 2 }}>
            Rules combined successfully! Ready for evaluation.
          </Alert>
        )}
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="User Data"
            multiline
            rows={4}
            value={userData}
            onChange={(e) => setUserData(e.target.value)}
            helperText="Enter the data to evaluate (e.g., {'age': 35, 'department': 'Sales', ...})"
          />
          <Button 
            variant="contained" 
            onClick={handleEvaluate}
            disabled={!combinedRule}
          >
            Evaluate
          </Button>

          {result !== null && (
            <Alert severity={result ? "success" : "info"}>
              Result: {result.toString()}
            </Alert>
          )}

          <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
            Example Data Format:
            <pre style={{ background: '#f5f5f5', padding: '10px', borderRadius: '4px' }}>
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