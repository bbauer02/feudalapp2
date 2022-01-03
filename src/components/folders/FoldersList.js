import { useState, useEffect } from 'react';
import { Stack, Link } from '@mui/material';
import folderFill from '@iconify/icons-eva/folder-fill';
import arrowForward from '@iconify/icons-eva/arrow-ios-forward-fill';
import { Icon } from '@iconify/react';
import { MIconButton } from '../@material-extend';
import axios from '../../utils/axios';
import Folder from './Folder';
import useFolder from '../../hooks/useFolder';

// routes
import { PATH_DASHBOARD } from '../../routes/paths';

export default function FoldersList() {
  const { curChildren, curFolderName, curFolderId, breadScrumb, enterFolder } = useFolder();
  const handleClickFolder = (e) => {
    enterFolder(e.currentTarget.getAttribute('data-id'));
  };
  return (
    <div>
      <Stack spacing={{ xs: 2, md: 3 }}>
        <Stack direction={{ xs: 'column', md: 'row' }}>
          <MIconButton onClick={handleClickFolder} data-id={null}>
            <Icon icon={folderFill} width={20} height={20} />
            Dossier racine
          </MIconButton>
          {breadScrumb.length > 0
            ? [...breadScrumb].reverse().map((folder) => (
                <MIconButton key={folder.id} onClick={handleClickFolder} data-id={folder.id}>
                  <Icon icon={arrowForward} width={20} height={20} />
                  {folder.name}
                </MIconButton>
              ))
            : ''}
        </Stack>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
          {curChildren
            ? curChildren.map((folder) => (
                <Folder key={folder.id} handleClick={handleClickFolder} id={folder.id} name={folder.name} />
              ))
            : ''}
        </Stack>
      </Stack>
    </div>
  );
}
