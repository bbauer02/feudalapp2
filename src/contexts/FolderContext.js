/* eslint-disable camelcase */
import { createContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import axios from '../utils/axios';

const initialState = {
  curFolderName: null,
  curFolderId: null,
  curChildren: [],
  folders: [],
  breadScrumb: [],
  isOpenModal: false
};

const reducer = (state, action) => {
  const { curFolderName, curFolderId, curChildren, folders, breadScrumb, isOpenModal } = action.payload;
  switch (action.type) {
    case 'INITIALIZE':
      return {
        ...state,
        curChildren,
        folders,
        isOpenModal
      };
    case 'ENTERFOLDER':
      return {
        ...state,
        curFolderName,
        curFolderId,
        curChildren,
        breadScrumb
      };
    case 'OPENMODAL':
      return {
        ...state,
        isOpenModal
      };
    case 'CLOSEMODAL':
      return {
        ...state,
        isOpenModal
      };
    case 'CREATEFOLDER':
      return {
        ...state,
        curChildren,
        folders
      };
    default:
      return state;
  }
};
export const FolderContext = createContext({
  ...initialState,
  enterFolder: () => Promise.resolve(),
  openModal: () => Promise.resolve(),
  closeModal: () => Promise.resolve(),
  createFolder: () => Promise.resolve()
});

FolderContextProvider.propTypes = {
  children: PropTypes.node
};

export function FolderContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  // ----------------------------------------------------------------------------------
  // INITIALISATION
  // ----------------------------------------------------------------------------------
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get('/api/user/folders');
        dispatch({
          type: 'INITIALIZE',
          payload: {
            curChildren: response.data.filter((_folders) => _folders.parent === null),
            folders: response.data,
            isOpenModal: false
          }
        });
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);
  // ----------------------------------------------------------------------------------
  // GET breadScrumb
  // ----------------------------------------------------------------------------------
  const buildBreadScrumb = (folderId, breadScrumb) => {
    if (!folderId) {
      breadScrumb = [];
      return;
    }
    const folder = state.folders.find(({ id }) => id === parseInt(folderId, 10));
    if (folder.parent === null) {
      breadScrumb.push(folder);
      return;
    }
    breadScrumb.push(folder);
    buildBreadScrumb(folder.parent.id, breadScrumb);
  };
  // ----------------------------------------------------------------------------------
  // GET Children
  // ----------------------------------------------------------------------------------
  const enterFolder = async (folderId) => {
    try {
      const response = await axios.get('/api/user/folders', {
        params: { folderId }
      });
      const curFolderName = state.folders.find(({ id }) => id === parseInt(folderId, 10))?.name || null;
      const breadScrumb = [];
      buildBreadScrumb(folderId, breadScrumb);
      dispatch({
        type: 'ENTERFOLDER',
        payload: {
          curFolderName,
          curFolderId: folderId,
          curChildren: response.data,
          breadScrumb
        }
      });
    } catch (err) {
      console.error(err);
    }
  };
  // ----------------------------------------------------------------------------------
  // OPEN MODAL
  // ----------------------------------------------------------------------------------
  const openModal = () => {
    dispatch({
      type: 'OPENMODAL',
      payload: {
        isOpenModal: true
      }
    });
  };
  // ----------------------------------------------------------------------------------
  // CLOSE MODAL
  // ----------------------------------------------------------------------------------
  const closeModal = () => {
    dispatch({
      type: 'CLOSEMODAL',
      payload: {
        isOpenModal: false
      }
    });
  };
  // ----------------------------------------------------------------------------------
  // CREATE FOLDER
  // ----------------------------------------------------------------------------------
  const createFolder = async (name, parent) => {
    const response = await axios.post('/api/user/folders', {
      name,
      parent
    });
    const folders = [...state.folders, { ...response.data }];
    dispatch({
      type: 'CREATEFOLDER',
      payload: {
        curChildren: [...state.curChildren, { ...response.data }],
        folders
      }
    });
  };
  const value = { ...state, openModal, enterFolder, closeModal, createFolder };
  return <FolderContext.Provider value={value}>{children}</FolderContext.Provider>;
}
export default { FolderContextProvider, FolderContext };
