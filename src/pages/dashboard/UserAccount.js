import { Icon } from '@iconify/react';
import { capitalCase } from 'change-case';
import { useState, useEffect } from 'react';
import roundAccountBox from '@iconify/icons-ic/round-account-box';
import baselineMedicalServices from '@iconify/icons-ic/baseline-medical-services';
import roundVpnKey from '@iconify/icons-ic/round-vpn-key';
// material
import { Container, Tab, Box, Tabs, Stack } from '@mui/material';
// hooks

import useSettings from '../../hooks/useSettings';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { AccountGeneral, AccountHealthy, AccountChangePassword } from '../../components/_dashboard/user/account';
// ----------------------------------------------------------------------

export default function UserAccount() {
  const { themeStretch } = useSettings();
  const [currentTab, setCurrentTab] = useState('general');

  const ACCOUNT_TABS = [
    {
      value: 'general',
      icon: <Icon icon={roundAccountBox} width={20} height={20} />,
      component: <AccountGeneral />
    },
    {
      value: 'dossier_medical',
      icon: <Icon icon={baselineMedicalServices} width={20} height={20} />,
      component: <AccountHealthy />
    },
    {
      value: 'change_password',
      icon: <Icon icon={roundVpnKey} width={20} height={20} />,
      component: <AccountChangePassword />
    }
  ];
  const handleChangeTab = (event, newValue) => {
    setCurrentTab(newValue);
  };
  return (
    <Page title="Profil utilisateur | Guerre Féodale">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs
          heading="Profil de l'utilisateur"
          links={[{ name: 'Dashboard', href: PATH_DASHBOARD.root }, { name: 'Profil' }]}
        />

        <Stack spacing={5}>
          <Tabs
            value={currentTab}
            scrollButtons="auto"
            variant="scrollable"
            allowScrollButtonsMobile
            onChange={handleChangeTab}
          >
            {ACCOUNT_TABS.map((tab) => (
              <Tab disableRipple key={tab.value} label={capitalCase(tab.value)} icon={tab.icon} value={tab.value} />
            ))}
          </Tabs>
          {ACCOUNT_TABS.map((tab) => {
            const isMatched = tab.value === currentTab;
            return isMatched && <Box key={tab.value}>{tab.component}</Box>;
          })}
        </Stack>
      </Container>
    </Page>
  );
}
