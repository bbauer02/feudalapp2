import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import folderFill from '@iconify/icons-eva/folder-fill';
import { Icon } from '@iconify/react';
import { MIconButton } from '../@material-extend';

Folder.propTypes = {
  name: PropTypes.string,
  handleClick: PropTypes.func,
  id: PropTypes.number
};
export default function Folder({ name, handleClick, id }) {
  return (
    <div>
      <MIconButton onClick={handleClick} data-id={id}>
        <Icon icon={folderFill} width={40} height={40} />
      </MIconButton>
      <p>{name}</p>
    </div>
  );
}
