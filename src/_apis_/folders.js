import { verify, sign } from '../utils/jw';
//
import mock from './mock';

const JWT_SECRET = 'minimal-secret-key';

const Folders = [
  {
    id: 1,
    parent_id: null,
    name: 'Folder1',
    owner_id: 1
  },
  {
    id: 2,
    parent_id: null,
    name: 'Folder2',
    owner_id: 1
  },
  {
    id: 3,
    parent_id: null,
    name: 'Folder3',
    owner_id: 1
  },
  {
    id: 4,
    parent_id: null,
    name: 'Folder4',
    owner_id: 1
  },
  {
    id: 5,
    parent_id: null,
    name: 'Folder5',
    owner_id: 1
  },
  {
    id: 6,
    parent_id: null,
    name: 'Folder6',
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
    const parentId = parseInt(config.params.parentId, 10) || null;
    const folders = Folders.filter((_folder) => _folder.owner_id === userId && _folder.parent_id === parentId);
    if (!folders) {
      return [401, { message: 'Invalid authorization token' }];
    }

    return [200, folders];
  } catch (error) {
    console.error(error);
    return [500, { message: 'Internal server error' }];
  }
});
