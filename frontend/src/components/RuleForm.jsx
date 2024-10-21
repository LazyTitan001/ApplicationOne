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
        Create New Rule
      </Typography>
      
      {error && <Alert severity="error" sx={{ mb: 2, borderRadius: 1 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2, borderRadius: 1 }}>{success}</Alert>}

      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextField
          label="Rule Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          variant="outlined"
          sx={{ backgroundColor: '#ffffff' }}
        />
        <TextField
          label="Rule String"
          name="ruleString"
          value={formData.ruleString}
          onChange={handleChange}
          multiline
          rows={4}
          required
          variant="outlined"
          helperText="Example: (age > 30 AND department = 'Sales') OR (salary > 50000)"
          sx={{ backgroundColor: '#ffffff' }}
        />
        <Button 
          variant="contained" 
          type="submit" 
          sx={{ 
            mt: 2, 
            backgroundColor: '#1565c0',
            '&:hover': {
              backgroundColor: '#0d47a1',
            }
          }}
        >
          Create Rule
        </Button>
      </Box>
    </Paper>
  );
};

export default RuleForm;