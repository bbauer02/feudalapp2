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
  return (
    <Page title="Profil utilisateur | Guerre Féodale">
      <FolderContextProvider>
        <Container maxWidth={themeStretch ? false : 'xl'}>
          <HeaderBreadcrumbs
            heading="Galerie photos"
            links={[{ name: 'Dashboard', href: PATH_DASHBOARD.root }, { name: 'Galerie photos' }]}
          />
          <Stack spacing={5}>
            <FoldersList />
          </Stack>
        </Container>
      </FolderContextProvider>
    </Page>
  );
}
