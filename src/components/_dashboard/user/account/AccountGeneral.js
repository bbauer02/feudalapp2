import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useCallback } from 'react';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import { Box, Grid, Card, Stack, Switch, TextField, FormControlLabel, Typography, FormHelperText } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import useAuth from '../../../../hooks/useAuth';
import useIsMountedRef from '../../../../hooks/useIsMountedRef';

// utils
import { fData } from '../../../../utils/formatNumber';

// ----------------------------------------------------------------------

export default function AccountGeneral() {
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar } = useSnackbar();
  const { user, updateProfile } = useAuth();
  const UpdateUserSchema = Yup.object().shape({
    displayname: Yup.string().required('Un pseudonyme est requis'),
    lastname: Yup.string().required('Un nom de famille est requis'),
    firstname: Yup.string().required('Un prénom est requis')
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      lastname: user.lastname,
      firstname: user.firstname,
      displayname: user.displayname,
      association: user.association,
      email: user.email,
      birthday: user.birthday,
      phone: user.phone
    },

    validationSchema: UpdateUserSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        await updateProfile({ ...user, ...values });
        enqueueSnackbar('Mise à jour reussie !!', { variant: 'success' });
      } catch (error) {
        if (isMountedRef.current) {
          setErrors({ afterSubmit: error.code });
          setSubmitting(false);
        }
      }
    }
  });

  const { values, errors, touched, isSubmitting, handleSubmit, getFieldProps, setFieldValue } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card sx={{ py: 10, px: 3, textAlign: 'center' }}>
              <FormHelperText error sx={{ px: 2, textAlign: 'center' }}>
                {touched.photoURL && errors.photoURL}
              </FormHelperText>

              <FormControlLabel
                control={<Switch {...getFieldProps('isPublic')} color="primary" />}
                labelPlacement="start"
                label="Public Profile"
                sx={{ mt: 5 }}
              />
            </Card>
          </Grid>

          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={{ xs: 2, md: 3 }}>
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                  <TextField
                    fullWidth
                    label="Pseudonyme"
                    {...getFieldProps('displayname')}
                    error={Boolean(touched.displayname && errors.displayname)}
                    helperText={touched.displayname && errors.displayname}
                  />
                  <TextField fullWidth disabled label="Email Address" {...getFieldProps('email')} />
                </Stack>

                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                  <TextField
                    fullWidth
                    label="Nom de famille"
                    {...getFieldProps('lastname')}
                    error={Boolean(touched.lastname && errors.lastname)}
                    helperText={touched.lastname && errors.lastname}
                  />
                  <TextField
                    fullWidth
                    label="Prénom"
                    {...getFieldProps('firstname')}
                    error={Boolean(touched.firstname && errors.firstname)}
                    helperText={touched.firstname && errors.firstname}
                  />
                </Stack>

                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                  <TextField
                    fullWidth
                    label="Association"
                    {...getFieldProps('association')}
                    error={Boolean(touched.association && errors.association)}
                    helperText={touched.association && errors.association}
                  />
                </Stack>

                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
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
                  <TextField fullWidth label="Numéro de téléphone" {...getFieldProps('phone')} />
                </Stack>
              </Stack>

              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                  Enregistrer
                </LoadingButton>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}
