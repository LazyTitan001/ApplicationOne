import { Paper, TextField, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

export const FormCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  maxWidth: 800,
  margin: '0 auto',
  borderRadius: theme.shape.borderRadius * 2,
  backgroundColor: theme.palette.background.paper,
  border: '1px solid #e2e8f0',
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  transition: 'transform 0.2s, box-shadow 0.2s',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  }
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#f8fafc',
    transition: 'all 0.2s',
    '&:hover': {
      backgroundColor: '#f1f5f9',
    },
    '&.Mui-focused': {
      backgroundColor: '#ffffff',
      '& fieldset': {
        borderColor: theme.palette.primary.main,
        borderWidth: '2px',
      }
    }
  }
}));

export const ActionButton = styled(Button)(({ theme }) => ({
  padding: '12px 24px',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.primary.main,
  fontWeight: 600,
  boxShadow: '0 2px 4px rgba(21, 101, 192, 0.1)',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
    transform: 'translateY(-1px)',
    boxShadow: '0 4px 6px rgba(21, 101, 192, 0.2)',
  },
  '&:active': {
    transform: 'translateY(0)',
  }
}));