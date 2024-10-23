import React, { useState } from 'react';
import { 
  TextField, 
  Button, 
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box, 
  Alert
} from '@mui/material';
import api from '../services/api';

const RuleEditor = ({ rule, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: rule.name,
    ruleString: rule.ruleString
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const updatedRule = await api.updateRule(rule._id, formData);
      setSuccess('Rule updated successfully!');
      if (onUpdate) onUpdate(updatedRule);
      setTimeout(() => {
        if (onClose) onClose();
      }, 1500);
    } catch (err) {
      setError(err.message || 'Failed to update rule');
    }
  };

  return (
    <Dialog open={true} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Edit Rule</DialogTitle>
      <DialogContent>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Rule Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Rule String"
            name="ruleString"
            value={formData.ruleString}
            onChange={handleChange}
            margin="normal"
            required
            multiline
            rows={4}
            helperText="Example: age > 25 AND department = 'Sales'"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Update Rule
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RuleEditor;