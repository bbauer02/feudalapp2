import { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import axios from '../utils/axios';
import { isValidToken } from '../utils/jw';

const initialValues = {
  currentFolderId: null,
  currentFolderName: null,
  folders: null,
  pictures: null
};

export const FolderContext = createContext({
  ...initialValues,
  setFolders: () => {}
});
FolderContextProvider.propTypes = {
  children: PropTypes.node
};
function FolderContextProvider({ children }) {
  const [contextData, setContextData] = useState(initialValues);

  const setFolders = (folders) => {
    const foldersData = { ...contextData, folders };
    setContextData(foldersData);
  };

  const value = { contextData, setFolders };
  return <FolderContext.Provider value={value}>{children}</FolderContext.Provider>;
}
export default FolderContextProvider;
