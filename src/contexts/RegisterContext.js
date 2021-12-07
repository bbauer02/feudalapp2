import { useState, createContext, useContext } from 'react';
import PropTypes from 'prop-types';

const initialValues = {
  user: {},
  healthy: {}
};
export const RegisterContext = createContext({
  ...initialValues,
  setUser: () => {},
  setHealthy: () => {}
});

RegisterContextProvider.propTypes = {
  children: PropTypes.node
};
function RegisterContextProvider({ children }) {
  const [registerData, setRegisterData] = useState(initialValues);
  const setUser = (user) => {
    const userDatas = { ...registerData, user };
    setRegisterData(userDatas);
  };
  const setHealthy = (healthy) => {
    const userDatas = { ...registerData, healthy };
    setRegisterData(userDatas);
  };
  const value = { registerData, setUser, setHealthy };
  return <RegisterContext.Provider value={value}>{children}</RegisterContext.Provider>;
}
export default RegisterContextProvider;
