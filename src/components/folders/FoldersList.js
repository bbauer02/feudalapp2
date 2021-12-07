import { useState, useEffect } from 'react';
import { Stack } from '@mui/material';
import axios from '../../utils/axios';
import Folder from './Folder';
import useFolder from '../../hooks/useFolder';
import useAuth from '../../hooks/useAuth';

export default function FoldersList() {
  const [parentId, setParentId] = useState(null);
  const { contextData, setFolders } = useFolder();
  const { user } = useAuth();

  useEffect(() => {
    (async () => {
      const ownerId = user.id;
      const response = await axios.get('/api/user/folders', {
        params: { ownerId }
      });
      setFolders(response.data);
    })();
  }, []);

  const enterFolder = (e) => {
    console.log('enterFolder');
  };

  return (
    <div>
      <Stack spacing={{ xs: 2, md: 3 }}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
          {contextData.folders.map((folder) => (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events
            <Folder handleClick={enterFolder} key={folder.id} id={folder.id} name={folder.name} />
          ))}
        </Stack>
      </Stack>
    </div>
  );
}
