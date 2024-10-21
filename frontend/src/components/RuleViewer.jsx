import React, { useState, useEffect } from 'react';
import { 
  Paper, 
  Typography, 
  Box, 
  Alert,
  Card,
  CardContent,
  Button
} from '@mui/material';
import api from '../services/api';

const RuleViewer = ({ ruleId }) => {
  const [rule, setRule] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (ruleId) {
      loadRule();
    }
  }, [ruleId]);

  const loadRule = async () => {
    try {
      const data = await api.getRuleById(ruleId);
      setRule(data);
      setError('');
    } catch (err) {
      setError(err.message || 'Failed to load rule');
    }
  };

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  if (!rule) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Rule Details
      </Typography>
      
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h6">{rule.name}</Typography>
          <Typography color="textSecondary" gutterBottom>
            {rule.description}
          </Typography>
          <Typography variant="body2" component="pre" sx={{ mt: 2 }}>
            {JSON.stringify(rule.ast, null, 2)}
          </Typography>
        </CardContent>
      </Card>
    </Paper>
  );
};

export default RuleViewer;