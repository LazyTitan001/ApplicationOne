import React, { useState, useEffect } from 'react';
import { 
  Paper, 
  Typography, 
  Box, 
  Alert, 
  List, 
  ListItem, 
  ListItemText,
  ListItemSecondaryAction,
  Checkbox,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import api from '../services/api';
import RuleEditor from './RuleEditor';

const RuleList = ({ onRulesSelected }) => {
  const [rules, setRules] = useState([]);
  const [selectedRules, setSelectedRules] = useState([]);
  const [error, setError] = useState('');
  const [editingRule, setEditingRule] = useState(null);
  const [deleteConfirmRule, setDeleteConfirmRule] = useState(null);

  useEffect(() => {
    loadRules();
  }, []);

  const loadRules = async () => {
    try {
      const response = await api.getAllRules();
      setRules(response);
      setError('');
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

  const handleEditClick = (rule) => {
    setEditingRule(rule);
  };

  const handleDeleteClick = (rule) => {
    setDeleteConfirmRule(rule);
  };

  const handleDeleteConfirm = async () => {
    try {
      await api.deleteRule(deleteConfirmRule._id);
      await loadRules();
      setDeleteConfirmRule(null);
      setSelectedRules(prev => prev.filter(id => id !== deleteConfirmRule._id));
    } catch (err) {
      setError('Failed to delete rule');
    }
  };

  const handleRuleUpdate = async () => {
    await loadRules();
    setEditingRule(null);
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
    <Paper elevation={3} sx={{ p: 3, maxWidth: 800, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Select Rules to Combine
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <List>
        {rules.map((rule) => (
          <ListItem 
            key={rule._id} 
            sx={{
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)'
              }
            }}
          >
            <Checkbox 
              checked={selectedRules.includes(rule._id)}
              onChange={() => handleToggleRule(rule._id)}
            />
            <ListItemText 
              primary={rule.name} 
              secondary={rule.ruleString}
            />
            <ListItemSecondaryAction>
              <IconButton 
                edge="end" 
                onClick={() => handleEditClick(rule)}
                sx={{ mr: 1 }}
              >
                <EditIcon />
              </IconButton>
              <IconButton 
                edge="end" 
                onClick={() => handleDeleteClick(rule)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>

      <Button
        variant="contained"
        color="primary"
        onClick={handleCombineRules}
        disabled={selectedRules.length < 2}
        sx={{ mt: 2 }}
      >
        Combine Selected Rules
      </Button>

      {editingRule && (
        <RuleEditor
          rule={editingRule}
          onClose={() => setEditingRule(null)}
          onUpdate={handleRuleUpdate}
        />
      )}

      <Dialog
        open={Boolean(deleteConfirmRule)}
        onClose={() => setDeleteConfirmRule(null)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete the rule "{deleteConfirmRule?.name}"?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmRule(null)}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default RuleList;