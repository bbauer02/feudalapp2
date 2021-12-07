import * as Yup from 'yup';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import { Link, Stack, Alert, Checkbox, TextField, IconButton, InputAdornment, FormControlLabel } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';

import useAuth from '../../hooks/useAuth';

export default function LoginForm() {
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const LoginSchema = Yup.object().shape({
    accountName: Yup.string().required('Identifiant requis!'),
    password: Yup.string().required('Mot de passe requis!')
  });

  const formik = useFormik({
    initialValues: {
      accountName: 'admin@email.com',
      password: 'admin',
      remember: true
    },
    validationSchema: LoginSchema,
    onSubmit: async (values, { setErrors, setSubmitting, resetForm }) => {
      try {
        await login(values.accountName, values.password);
      } catch (error) {
        console.error(error);
      }
    }
  });
  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;
  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          {errors.afterSubmit && <Alert severity="error">{errors.afterSubmit}</Alert>}
          <TextField
            fullWidth
            autoComplete="accountName"
            type="text"
            label="Compte utilisateur"
            {...getFieldProps('accountName')}
            error={Boolean(touched.accountName && errors.accountName)}
            helperText={touched.accountName && errors.accountName}
          />
          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
        </Stack>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <FormControlLabel
            control={<Checkbox {...getFieldProps('remember')} checked={values.remember} />}
            label="Se souvenir de moi"
          />
          <Link component={RouterLink} variant="subtitle2" to="auth/reset-password">
            Mot de passe oublié?
          </Link>
        </Stack>
        <LoadingButton size="large" type="submit" variant="contained" loading={isSubmitting}>
          Se connecter
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
