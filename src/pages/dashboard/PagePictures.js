// material
import { Container, Stack } from '@mui/material';
// hooks
import FoldersList from '../../components/folders/FoldersList';
import useSettings from '../../hooks/useSettings';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';

// Provider context
// Contexts
import FolderContextProvider from '../../contexts/FolderContext';
// ----------------------------------------------------------------------

export default function PagePictures() {
  const { themeStretch } = useSettings();

  const BreadCrumbs = [{ name: 'Dashboard', href: PATH_DASHBOARD.root }, { name: 'Galerie photos' }];

  return (
    <Page title="Profil utilisateur | Guerre Féodale">
      <FolderContextProvider>
        <Container maxWidth={themeStretch ? false : 'xl'}>
          <HeaderBreadcrumbs heading="Galerie photos" links={BreadCrumbs} />
          <Stack spacing={5}>
            <FoldersList />
          </Stack>
        </Container>
      </FolderContextProvider>
    </Page>
  );
}
