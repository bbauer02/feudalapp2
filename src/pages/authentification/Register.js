import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { experimentalStyled as styled } from '@mui/material/styles';
import {
  Box,
  Card,
  Stack,
  Link,
  Container,
  Typography,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Paper,
  Alert
} from '@mui/material';
import Step1 from '../../components/authentification/register/Step1';
import Step2 from '../../components/authentification/register/Step2';

const steps = [{ label: 'Etape 1: Etat civil' }, { label: 'Etape 2: Informations médicales' }];
const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 580,
  margin: 'auto',
  display: 'flex',
  minHeight: '50vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(5, 0)
}));

export default function Register() {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Container maxWidth="sm">
      <ContentStyle>
        <Card p={10} sx={{ p: 2 }}>
          <Stack direction="row" alignItems="center" sx={{ mb: 3 }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h4" gutterBottom>
                S'inscrire sur le portail
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>Remplir le formulaire d'inscription.</Typography>
            </Box>
          </Stack>
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((step, index) => (
              <Step key={step.label}>
                <StepLabel optional={index === 2 ? <Typography variant="caption">Last step</Typography> : null}>
                  <h2>{step.label}</h2>
                </StepLabel>
                <StepContent>
                  {activeStep + 1 === 1 && <Step1 handleNext={handleNext} />}
                  {activeStep + 1 === 2 && <Step2 handleNext={handleNext} handleBack={handleBack} />}
                </StepContent>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length && (
            <Paper square elevation={0} sx={{ p: 3 }}>
              <Alert severity="success">
                <strong>Inscription réussite !</strong>
                <br />
                Vous pouvez vous connecter à votre compte dès maintenant.
              </Alert>
            </Paper>
          )}
          <Typography variant="body2" align="center" sx={{ mt: 3 }}>
            Vous avez déjà un compte ?&nbsp;
            <Link variant="subtitle2" component={RouterLink} to="/auth/login">
              Connectez vous
            </Link>
          </Typography>
        </Card>
      </ContentStyle>
    </Container>
  );
}
