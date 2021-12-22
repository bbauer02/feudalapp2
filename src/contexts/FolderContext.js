/* eslint-disable camelcase */
import { createContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import axios from '../utils/axios';

const initialState = {
  curFolderName: null,
  curFolderId: null,
  curChildren: [],
  prevChildren: [],
  folders: [],
  breadScrumb: []
};

const reducer = (state, action) => {
  const { curFolderName, curFolderId, curChildren, prevChildren, folders, breadScrumb } = action.payload;
  switch (action.type) {
    case 'INITIALIZE':
      return {
        ...state,
        curChildren,
        prevChildren,
        folders
      };
    case 'ENTERFOLDER':
      return {
        ...state,
        curFolderName,
        curFolderId,
        curChildren,
        prevChildren,
        breadScrumb
      };
    default:
      return state;
  }
};

export const FolderContext = createContext({
  ...initialState,
  enterFolder: () => Promise.resolve()
});

FolderContextProvider.propTypes = {
  children: PropTypes.node
};

function FolderContextProvider({ children }) {
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
            prevChildren: [],
            folders: response.data
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
      return breadScrumb;
    }
    const folder = state.folders.find(({ id }) => id === parseInt(folderId, 10));
    if (folder.parent === null) {
      breadScrumb.push(folder);
      return breadScrumb;
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
          prevChildren: state.curChildren,
          breadScrumb
        }
      });
    } catch (err) {
      console.error(err);
    }
  };

  const value = { ...state, enterFolder };
  return <FolderContext.Provider value={value}>{children}</FolderContext.Provider>;
}
export default FolderContextProvider;
