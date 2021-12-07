import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import { Stack, Alert, TextField, IconButton, InputAdornment, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import useAuth from '../../../hooks/useAuth';

Step1.propTypes = {
  handleNext: PropTypes.func
};
export default function Step1({ handleNext }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { user, step1 } = useAuth();
  const RegisterSchema = Yup.object().shape({
    firstname: Yup.string().required('Le prénom est requis.').min(2).max(30),
    lastname: Yup.string().required('Le nom est requis.').min(2).max(30),
    displayname: Yup.string().required('Le nom est requis.').min(2).max(30),
    birthday: Yup.date().required('Votre date de naissance est requise.'),
    phone: Yup.string().required('Un numéro de téléphone est requis.').min(2).max(30),
    email: Yup.string()
      .email("Ceci n'est pas une adresse électronique valide!")
      .required('Une adresse électronique valide est nécéssaire.'),
    password: Yup.string().required('Le mot de passe est obligatoire'),
    confirmPassword: Yup.string()
      .required('La confirmation du mot de passe est obligatoire')
      .oneOf([Yup.ref('password')], 'Passwords must match')
  });
  const formik = useFormik({
    initialValues: {
      lastname: 'Bauer',
      firstname: 'Baptiste',
      displayname: 'Ingelran',
      association: 'DGDA',
      email: 'bbauer02@gmail.com',
      birthday: '1982-08-04',
      phone: '0787423476',
      confirmPassword: 'bb1212',
      password: 'bb1212'
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      step1(values);
      handleNext();
    }
  });
  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3} p={3}>
          {errors.afterSubmit && <Alert severity="error">{errors.afterSubmit}</Alert>}
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <Typography sx={{ fontSize: 10 }}>
              <strong>* Champs obligatoires</strong>
            </Typography>
          </Stack>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              InputLabelProps={{ shrink: true }}
              label="Prénom *"
              {...getFieldProps('firstname')}
              error={Boolean(touched.firstname && errors.firstname)}
              helperText={touched.firstname && errors.firstname}
            />
            <TextField
              fullWidth
              InputLabelProps={{ shrink: true }}
              label="Nom *"
              {...getFieldProps('lastname')}
              error={Boolean(touched.lastname && errors.lastname)}
              helperText={touched.lastname && errors.lastname}
            />
          </Stack>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              label="Date de naissance *"
              {...getFieldProps('birthday')}
              type="date"
              fullWidth
              InputLabelProps={{
                shrink: true
              }}
              error={Boolean(touched.birthday && errors.birthday)}
              helperText={touched.birthday && errors.birthday}
            />
            <TextField
              fullWidth
              InputLabelProps={{ shrink: true }}
              label="Téléphone *"
              {...getFieldProps('phone')}
              error={Boolean(touched.phone && errors.phone)}
              helperText={touched.phone && errors.phone}
            />
          </Stack>
          <Stack spacing={2}>
            <TextField
              fullWidth
              InputLabelProps={{ shrink: true }}
              label="Pseudonyme ou nom affiché *"
              {...getFieldProps('displayname')}
              error={Boolean(touched.displayname && errors.displayname)}
              helperText={touched.displayname && errors.displayname}
            />
            <TextField
              fullWidth
              InputLabelProps={{ shrink: true }}
              label="Association"
              {...getFieldProps('association')}
              error={Boolean(touched.association && errors.association)}
              helperText={touched.association && errors.association}
            />
          </Stack>
          <Stack spacing={2}>
            <TextField
              fullWidth
              InputLabelProps={{ shrink: true }}
              label="Adresse électronique *"
              autoComplete=""
              {...getFieldProps('email')}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
            />
            <TextField
              fullWidth
              InputLabelProps={{ shrink: true }}
              autoComplete="current-password"
              type={showPassword ? 'text' : 'password'}
              label="Mot de passe *"
              {...getFieldProps('password')}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                      <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                    </IconButton>
                  </InputAdornment>
                )
              }}
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
            />
            <TextField
              fullWidth
              InputLabelProps={{ shrink: true }}
              autoComplete="current-password"
              type={showConfirmPassword ? 'text' : 'password'}
              label="Confirmer le mot de passe *"
              {...getFieldProps('confirmPassword')}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton edge="end" onClick={() => setShowConfirmPassword((prev) => !prev)}>
                      <Icon icon={showConfirmPassword ? eyeFill : eyeOffFill} />
                    </IconButton>
                  </InputAdornment>
                )
              }}
              error={Boolean(touched.confirmPassword && errors.confirmPassword)}
              helperText={touched.confirmPassword && errors.confirmPassword}
            />
          </Stack>
        </Stack>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <LoadingButton
            sx={{ maxWidth: 150 }}
            size="large"
            onClick={handleSubmit}
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Continuer
          </LoadingButton>
          <LoadingButton
            sx={{ maxWidth: 150 }}
            disabled
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Retour
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
