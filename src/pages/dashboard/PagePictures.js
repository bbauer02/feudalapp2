// material
import { Container, Stack, Button, DialogTitle } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { DialogAnimate } from '../../components/animate';
// hooks
import FoldersList from '../../components/folders/FoldersList';
import useSettings from '../../hooks/useSettings';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import FolderForm from '../../components/folders/FolderForm';

// Provider context
// Contexts
import { FolderContextProvider, FolderContext } from '../../contexts/FolderContext';
// ----------------------------------------------------------------------

export default function PagePictures() {
  const { themeStretch } = useSettings();
  const BreadCrumbs = [{ name: 'Dashboard', href: PATH_DASHBOARD.root }, { name: 'Galerie photos' }];

  return (
    <Page title="Profil utilisateur | Guerre Féodale">
      <FolderContextProvider>
        <Container maxWidth={themeStretch ? false : 'xl'}>
          <FolderContext.Consumer>
            {({ isOpenModal, openModal, closeModal }) => (
              <>
                <HeaderBreadcrumbs
                  heading="Galerie photos"
                  links={BreadCrumbs}
                  action={
                    <Button variant="contained" startIcon={<AddIcon />} onClick={openModal}>
                      Nouveau dossier
                    </Button>
                  }
                />
                <Stack spacing={5}>
                  <FoldersList />
                </Stack>
                <DialogAnimate open={isOpenModal} onClose={closeModal}>
                  <DialogTitle>Nouveau dossier</DialogTitle>
                  <FolderForm />
                </DialogAnimate>
              </>
            )}
          </FolderContext.Consumer>
        </Container>
      </FolderContextProvider>
    </Page>
  );
}
