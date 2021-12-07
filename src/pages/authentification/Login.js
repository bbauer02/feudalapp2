import { Link as RouterLink } from 'react-router-dom';
import { experimentalStyled as styled } from '@mui/material/styles';
import { Box, Card, Stack, Link, Alert, Container, Typography } from '@mui/material';
import LoginForm from '../../components/authentification/LoginForm';

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '50vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(5, 0)
}));

export default function Login() {
  return (
    <Container maxWidth="sm">
      <ContentStyle>
        <Card p={10} sx={{ p: 1 }}>
          <Stack direction="row" alignItems="center" sx={{ mb: 3 }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h4" gutterBottom>
                Se connecter sur le portail
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>Saisissez vos identifiants.</Typography>
            </Box>
          </Stack>
          <Alert severity="info" sx={{ mb: 1 }}>
            identidiant pour admin : <strong>admin</strong> / password :<strong>&nbsp;admin</strong>
          </Alert>
          <Alert severity="info" sx={{ mb: 2 }}>
            identidiant pour un utilisateur : <strong>user</strong> / password :<strong>&nbsp;user</strong>
          </Alert>
          <LoginForm />
          <Typography variant="body2" align="center" sx={{ mt: 3 }}>
            Vous n'avez pas de compte?&nbsp;
            <Link variant="subtitle2" component={RouterLink} to="/auth/register">
              Incrivez vous dès maintenant!
            </Link>
          </Typography>
        </Card>
      </ContentStyle>
    </Container>
  );
}
