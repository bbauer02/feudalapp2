import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import folderFill from '@iconify/icons-eva/folder-fill';
import { Icon } from '@iconify/react';
import delete48Filled from '@iconify/icons-fluent/delete-48-filled';
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
      <div>
        <Icon icon={delete48Filled} width={20} height={20} /> Supprimer
      </div>
      <p>{name}</p>
    </div>
  );
}
