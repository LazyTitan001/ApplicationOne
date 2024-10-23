import React, { useState } from 'react';
import { 
  TextField, 
  Button, 
  Paper, 
  Typography, 
  Box, 
  Alert,
  Card,
  CardContent 
} from '@mui/material';
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
    <Box sx={{ maxWidth: 800, mx: 'auto' }}>
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
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
            helperText="Example: age > 25 AND department = 'Sales'"
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

      <Card sx={{ p: 2 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Rule Writing Guide
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Rules can be written using the following operators:
          </Typography>
          <ul style={{ marginTop: '16px' }}>
            <li>Comparison: &gt;, &lt;, =, &gt;=, &lt;=</li>
            <li>Logical: AND, OR</li>
            <li>Use parentheses () for grouping</li>
            <li>String values should be in single quotes</li>
          </ul>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            Examples:
          </Typography>
          <Box component="pre" sx={{ 
            bgcolor: 'grey.100', 
            p: 2, 
            borderRadius: 1,
            overflow: 'auto' 
          }}>
            {`age > 25 AND department = 'Sales'
salary >= 50000 OR experience >= 5
(role = 'manager' OR role = 'admin') AND access_level >= 3`}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default RuleForm;
