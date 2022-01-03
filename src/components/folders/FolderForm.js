import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import { Stack, Alert, TextField, DialogActions, Box, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import useFolder from '../../hooks/useFolder';

export default function FolderForm() {
  const { closeModal, createFolder, curFolderId } = useFolder();
  const FolderSchema = Yup.object().shape({
    name: Yup.string().required('Nom du dossier requis!')
  });

  const formik = useFormik({
    initialValues: {
      name: ''
    },
    validationSchema: FolderSchema,
    onSubmit: async (values, { setErrors, setSubmitting, resetForm }) => {
      try {
        createFolder(values.name, curFolderId);
        closeModal();
      } catch (error) {
        console.error(error);
      }
    }
  });
  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3} sx={{ p: 3 }}>
          {errors.afterSubmit && <Alert severity="error">{errors.afterSubmit}</Alert>}
          <TextField
            fullWidth
            label="Nom du dossier"
            {...getFieldProps('name')}
            error={Boolean(touched.name && errors.name)}
            helperText={touched.name && errors.name}
          />
        </Stack>
        <DialogActions>
          <Box sx={{ flexGrow: 1 }} />
          <Button type="button" variant="outlined" color="inherit" onClick={closeModal}>
            Annuler
          </Button>
          <LoadingButton type="submit" variant="contained" loading={isSubmitting} loadingIndicator="Loading...">
            Créer le dossier
          </LoadingButton>
        </DialogActions>
      </Form>
    </FormikProvider>
  );
}
