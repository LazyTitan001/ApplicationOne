// components/RuleForm.jsx
import React, { useState } from 'react';
import { TextField, Button, Paper, Typography, Box, Alert } from '@mui/material';
import api from '../services/api';

const RuleForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    ruleString: ''
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

    if (!formData.name.trim() || !formData.ruleString.trim()) {
      setError('All fields are required');
      return;
    }

    try {
      await api.createRule(formData);
      setSuccess('Rule created successfully!');
      setFormData({ name: '', ruleString: '' });
    } catch (err) {
      setError(err.message || 'Failed to create rule');
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Create New Rule
      </Typography>

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
        />
        <Button 
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Create Rule
        </Button>
      </Box>
    </Paper>
  );
};

export default RuleForm;