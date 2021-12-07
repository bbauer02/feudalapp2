import { useState, useEffect } from 'react';
import axios from '../../utils/axios';

export default function FoldersList() {
  const [folders, setFolders] = useState([]);
  const [parentId, setParentId] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await axios.get('/api/user/folders', {
        params: { parentId }
      });
      setFolders(response.data);
    })();
  }, [parentId]);

  const enterFolder = (event) => {
    setParentId(event.target.getAttribute('data-index'));
  };
  return (
    <div>
      {folders.map((folder) => (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events
        <div role="button" tabIndex={0} data-index={folder.id} key={folder.id} onClick={enterFolder}>
          {folder.name}
        </div>
      ))}
    </div>
  );
}
