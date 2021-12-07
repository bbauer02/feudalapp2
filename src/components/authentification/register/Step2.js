import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useFormik, Form, FormikProvider } from 'formik';
import { Stack, Alert, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save';
import { useSnackbar } from 'notistack';
import useAuth from '../../../hooks/useAuth';

Step2.propTypes = {
  handleNext: PropTypes.func,
  handleBack: PropTypes.func
};
export default function Step2({ handleNext, handleBack }) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { user, register } = useAuth();
  const RegisterSchema = Yup.object().shape({
    emergencyContact: Yup.string().required('Le nom du contact est obligatoire !').min(2).max(30),
    emergencyPhone: Yup.string().required('Le numéro de téléphone du contact est obligatoire !').min(2).max(30)
  });
  const formik = useFormik({
    initialValues: {
      emergencyContact: 'Bauer Alexis',
      emergencyPhone: '0323522248',
      healtyTroubles: 'Asthme / Allergie à la pénisciline'
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      const newUser = { ...user, ...values };
      register(newUser);
      enqueueSnackbar('Enregistrement effectué', {
        variant: 'success'
      });
      handleNext();
    }
  });
  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3} p={3}>
          {errors.afterSubmit && <Alert severity="error">{errors.afterSubmit}</Alert>}
          <Stack spacing={2}>
            <Alert severity="warning" sx={{ mb: 2 }}>
              Les <strong>informations médicales</strong> saisies ici ne seront consultables que par les{' '}
              <strong>organisateurs</strong>.
            </Alert>
            <Typography sx={{ fontSize: 10 }}>
              <strong>* Champs obligatoires</strong>
            </Typography>
            <TextField
              fullWidth
              InputLabelProps={{ shrink: true }}
              label="Nom et prénom de la personne à contacter en cas d'urgence *"
              {...getFieldProps('emergencyContact')}
              error={Boolean(touched.emergencyContact && errors.emergencyContact)}
              helperText={touched.emergencyContact && errors.emergencyContact}
            />
            <TextField
              fullWidth
              InputLabelProps={{ shrink: true }}
              label="Numéro de téléphone à contacter en cas d'urgence *"
              {...getFieldProps('emergencyPhone')}
              error={Boolean(touched.emergencyPhone && errors.emergencyPhone)}
              helperText={touched.emergencyPhone && errors.emergencyPhone}
            />
            <TextField
              fullWidth
              InputLabelProps={{ shrink: true }}
              label="Problèmes de santé que les organisateurs doivents connaitre "
              {...getFieldProps('healtyTroubles')}
              multiline
              rows={4}
              error={Boolean(touched.healtyTroubles && errors.healtyTroubles)}
              helperText={touched.healtyTroubles && errors.healtyTroubles}
            />
          </Stack>
        </Stack>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <LoadingButton
            startIcon={<SaveIcon />}
            sx={{ maxWidth: 150, backgroundColor: 'green' }}
            size="large"
            onClick={handleSubmit}
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Enregistrer
          </LoadingButton>
          <LoadingButton
            variant="outlined"
            sx={{ maxWidth: 150 }}
            size="large"
            onClick={handleBack}
            type="submit"
            loading={isSubmitting}
          >
            Retour
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
