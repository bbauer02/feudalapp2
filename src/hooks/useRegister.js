import { useContext } from 'react';
import { RegisterContext } from '../contexts/RegisterContext';

const useRegister = () => useContext(RegisterContext);

export default useRegister;
