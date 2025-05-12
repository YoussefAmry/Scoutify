import { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Link,
  Alert,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
  Stepper,
  Step,
  StepLabel,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useAuth } from '../../context/AuthContext';

const steps = ['Account Type', 'Basic Information', 'Additional Details'];

const Register = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signup } = useAuth();

  const [formData, setFormData] = useState({
    userType: 'player',
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    location: '',
    // Player specific fields
    position: '',
    experience: '',
    // Club specific fields
    clubName: '',
    clubType: '',
    // Recruiter specific fields
    organization: '',
    role: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const validateStep = () => {
    switch (activeStep) {
      case 0:
        return !!formData.userType;
      case 1:
        return (
          formData.email &&
          formData.password &&
          formData.confirmPassword &&
          formData.password === formData.confirmPassword
        );
      case 2:
        return formData.firstName && formData.lastName;
      default:
        return true;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }

    try {
      setError('');
      setLoading(true);
      await signup(formData.email, formData.password, {
        userType: formData.userType,
        firstName: formData.firstName,
        lastName: formData.lastName,
        location: formData.location,
        ...(formData.userType === 'player' && {
          position: formData.position,
          experience: formData.experience,
        }),
        ...(formData.userType === 'club' && {
          clubName: formData.clubName,
          clubType: formData.clubType,
        }),
        ...(formData.userType === 'recruiter' && {
          organization: formData.organization,
          role: formData.role,
        }),
      });
      navigate('/feed');
    } catch (error) {
      setError('Failed to create an account.');
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <FormControl component="fieldset">
            <FormLabel component="legend">I am a:</FormLabel>
            <RadioGroup
              name="userType"
              value={formData.userType}
              onChange={handleChange}
            >
              <FormControlLabel value="player" control={<Radio />} label="Player" />
              <FormControlLabel value="club" control={<Radio />} label="Club Manager" />
              <FormControlLabel value="recruiter" control={<Radio />} label="Recruiter" />
            </RadioGroup>
          </FormControl>
        );
      case 1:
        return (
          <>
            <TextField
              label="Email"
              type="email"
              name="email"
              fullWidth
              margin="normal"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <TextField
              label="Password"
              type="password"
              name="password"
              fullWidth
              margin="normal"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <TextField
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              fullWidth
              margin="normal"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </>
        );
      case 2:
        return (
          <>
            <TextField
              label="First Name"
              name="firstName"
              fullWidth
              margin="normal"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <TextField
              label="Last Name"
              name="lastName"
              fullWidth
              margin="normal"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
            <TextField
              label="Location"
              name="location"
              fullWidth
              margin="normal"
              value={formData.location}
              onChange={handleChange}
            />
            {formData.userType === 'player' && (
              <>
                <TextField
                  label="Position"
                  name="position"
                  fullWidth
                  margin="normal"
                  value={formData.position}
                  onChange={handleChange}
                />
                <TextField
                  label="Years of Experience"
                  name="experience"
                  fullWidth
                  margin="normal"
                  value={formData.experience}
                  onChange={handleChange}
                />
              </>
            )}
            {formData.userType === 'club' && (
              <>
                <TextField
                  label="Club Name"
                  name="clubName"
                  fullWidth
                  margin="normal"
                  value={formData.clubName}
                  onChange={handleChange}
                />
                <TextField
                  label="Club Type"
                  name="clubType"
                  fullWidth
                  margin="normal"
                  value={formData.clubType}
                  onChange={handleChange}
                />
              </>
            )}
            {formData.userType === 'recruiter' && (
              <>
                <TextField
                  label="Organization"
                  name="organization"
                  fullWidth
                  margin="normal"
                  value={formData.organization}
                  onChange={handleChange}
                />
                <TextField
                  label="Role"
                  name="role"
                  fullWidth
                  margin="normal"
                  value={formData.role}
                  onChange={handleChange}
                />
              </>
            )}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom textAlign="center">
          Create Account
        </Typography>

        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          {renderStepContent(activeStep)}

          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
            <Button
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              Back
            </Button>
            {activeStep === steps.length - 1 ? (
              <LoadingButton
                type="submit"
                variant="contained"
                loading={loading}
                disabled={!validateStep()}
              >
                Create Account
              </LoadingButton>
            ) : (
              <Button
                variant="contained"
                onClick={handleNext}
                disabled={!validateStep()}
              >
                Next
              </Button>
            )}
          </Box>
        </form>

        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Typography variant="body2">
            Already have an account?{' '}
            <Link component={RouterLink} to="/login">
              Sign in
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Register; 