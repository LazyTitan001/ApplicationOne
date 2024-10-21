import React, { useState, useEffect } from 'react';
import { 
  Paper, 
  Typography, 
  Box, 
  Alert, 
  List, 
  ListItem, 
  ListItemText,
  Checkbox,
  Button
} from '@mui/material';
import api from '../services/api';

const RuleList = ({ onRulesSelected }) => {
  const [rules, setRules] = useState([]);
  const [selectedRules, setSelectedRules] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    loadRules();
  }, []);

  const loadRules = async () => {
    try {
      const response = await api.getAllRules();
      setRules(response);
    } catch (err) {
      setError('Failed to load rules');
    }
  };

  const handleToggleRule = (ruleId) => {
    setSelectedRules(prev => 
      prev.includes(ruleId)
        ? prev.filter(id => id !== ruleId)
        : [...prev, ruleId]
    );
  };

  const handleCombineRules = async () => {
    if (selectedRules.length < 2) {
      setError('Please select at least 2 rules to combine');
      return;
    }
    try {
      const combinedRule = await api.combineRules(selectedRules);
      onRulesSelected(combinedRule);
      setError('');
    } catch (err) {
      setError('Failed to combine rules');
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Select Rules to Combine
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <List>
        {rules.map((rule) => (
          <ListItem key={rule._id} dense button onClick={() => handleToggleRule(rule._id)}>
            <Checkbox
              edge="start"
              checked={selectedRules.includes(rule._id)}
              tabIndex={-1}
              disableRipple
            />
            <ListItemText 
              primary={rule.name}
              secondary={rule.ruleString}
            />
          </ListItem>
        ))}
      </List>

      <Button 
        variant="contained" 
        onClick={handleCombineRules}
        disabled={selectedRules.length < 2}
        sx={{ mt: 2 }}
      >
        Combine Selected Rules
      </Button>
    </Paper>
  );
};

export default RuleList;