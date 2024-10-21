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
    try {
      const result = await api.createRule(formData);
      setSuccess('Rule created successfully!');
      setError('');
      setFormData({ name: '', ruleString: '' });
    } catch (err) {
      setError(err.message || 'Failed to create rule');
      setSuccess('');
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Create New Rule
      </Typography>
      
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Rule Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <TextField
          label="Rule String"
          name="ruleString"
          value={formData.ruleString}
          onChange={handleChange}
          multiline
          rows={4}
          required
          helperText="Example: (age > 30 AND department = 'Sales') OR (salary > 50000)"
        />
        <Button variant="contained" type="submit" sx={{ mt: 2 }}>
          Create Rule
        </Button>
      </Box>
    </Paper>
  );
};

export default RuleForm;