import { verify, sign } from '../utils/jw';
//
import mock from './mock';

const JWT_SECRET = 'minimal-secret-key';

const Folders = [
  {
    id: 1,
    parent: null,
    name: 'Folder1',
    owner_id: 1
  },
  {
    id: 2,
    parent: null,
    name: 'Folder2',
    owner_id: 1
  },
  {
    id: 3,
    parent: null,
    name: 'Folder3',
    owner_id: 1
  },
  {
    id: 4,
    parent: null,
    name: 'Folder4',
    owner_id: 1
  },
  {
    id: 5,
    parent: null,
    name: 'Folder5',
    owner_id: 1
  },
  {
    id: 6,
    parent: null,
    name: 'Folder6',
    owner_id: 1
  },
  {
    id: 7,
    parent: {
      id: 1,
      name: 'Folder1',
      owner_id: 1
    },
    name: 'subFolder1',
    owner_id: 1
  },
  {
    id: 8,
    parent: {
      id: 1,
      name: 'Folder1',
      owner_id: 1
    },
    name: 'subFolder2',
    owner_id: 1
  },
  {
    id: 9,
    parent: {
      id: 1,
      name: 'Folder1',
      owner_id: 1
    },
    name: 'subFolder3',
    owner_id: 1
  },
  {
    id: 10,
    parent: {
      id: 2,
      name: 'Folder2',
      owner_id: 1
    },
    name: 'subFolder4',
    owner_id: 1
  },
  {
    id: 11,
    parent: {
      id: 7,
      name: 'subFolder1',
      owner_id: 1
    },
    name: 'subSubFolder1',
    owner_id: 1
  },
  {
    id: 12,
    parent: {
      id: 7,
      name: 'subFolder1',
      owner_id: 1
    },
    name: 'subSubFolder2',
    owner_id: 1
  }
];

mock.onGet('/api/user/folders').reply(async (config) => {
  try {
    const { Authorization } = config.headers;
    if (!Authorization) {
      return [401, { message: 'Authorization token missing' }];
    }
    const accessToken = Authorization.split(' ')[1];
    const data = verify(accessToken, JWT_SECRET);
    const userId = typeof data === 'object' ? data?.userId : '';
    let folderId = -1;
    if (config.params) {
      folderId = parseInt(config.params.folderId, 10) || null;
    }
    const folders = Folders.filter((_folders) => {
      if (_folders.parent && _folders.parent.id === folderId && _folders.owner_id === userId) {
        return true;
      }
      if (!_folders.parent && _folders.parent === folderId && _folders.owner_id === userId) {
        return true;
      }
      if (folderId === -1 && _folders.owner_id === userId) {
        return true;
      }
      return false;
    });
    if (!folders) {
      return [401, { message: 'Invalid authorization token' }];
    }
    return [200, folders];
  } catch (error) {
    console.error(error);
    return [500, { message: 'Internal server error' }];
  }
});

mock.onPost('/api/user/folders').reply(async (config) => {
  try {
    const { Authorization } = config.headers;
    if (!Authorization) {
      return [401, { message: 'Authorization token missing' }];
    }
    const accessToken = Authorization.split(' ')[1];
    const data = verify(accessToken, JWT_SECRET);
    const userId = typeof data === 'object' ? data?.userId : '';
    const param = JSON.parse(config.data);
    let parentFolder = null;
    if (param.parent) {
      parentFolder = Folders.filter((folder) => folder.id === parseInt(param.parent, 10));
      delete parentFolder.parent;
    }
    const { name } = param;
    const folderId = Folders.length + 1;
    const folder = { id: folderId, parent: parentFolder, name, owner_id: userId };
    return [200, folder];
  } catch (error) {
    console.error(error);
    return [500, { message: 'Internal server error' }];
  }
});
