import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useCallback } from 'react';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import { Box, Grid, Card, Stack, TextField, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import illustration1 from '../../../../assets/img/medical.jpg';
// hooks
import useAuth from '../../../../hooks/useAuth';
import useIsMountedRef from '../../../../hooks/useIsMountedRef';
// utils
import { fData } from '../../../../utils/formatNumber';

export default function AccountHealthy() {
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar } = useSnackbar();
  const { user, updateProfile } = useAuth();
  const UpdateUserSchema = Yup.object().shape({
    emergency_contact: Yup.string().required("Un contact en cas d'urgence est requis"),
    emergency_phone: Yup.string().required('Le numéro de téléphone de la personne à contacter est requis')
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      emergency_contact: user.emergency_contact,
      emergency_phone: user.emergency_phone,
      healthy_troubles: user.healthy_troubles
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
        <Grid container spacing={1}>
          <Grid item xs={12} md={2}>
            <img src={illustration1} alt="illustration" width="200" />
          </Grid>

          <Grid item xs={12} md={10}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={{ xs: 2, md: 3 }}>
                <Stack spacing={{ xs: 2, md: 3 }}>
                  <Alert severity="warning">
                    Seul les organisateurs ont accès à ses informations en cas d'urgence médicale.
                  </Alert>
                </Stack>
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                  <TextField
                    fullWidth
                    label="Personne à contacter en cas d'urgence"
                    {...getFieldProps('emergency_contact')}
                    error={Boolean(touched.emergency_contact && errors.emergency_contact)}
                    helperText={touched.emergency_contact && errors.emergency_contact}
                  />
                  <TextField
                    fullWidth
                    label="Numéro de téléphone"
                    {...getFieldProps('emergency_phone')}
                    error={Boolean(touched.emergency_phone && errors.emergency_phone)}
                    helperText={touched.emergency_phone && errors.emergency_phone}
                  />
                </Stack>

                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                  <TextField
                    fullWidth
                    multiline
                    rows={10}
                    label="Problèmes de santé à signaler en cas d'urgence"
                    {...getFieldProps('healthy_troubles')}
                  />
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
