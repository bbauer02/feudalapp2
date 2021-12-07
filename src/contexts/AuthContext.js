import { createContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import axios from '../utils/axios';
import { isValidToken, setSession } from '../utils/jw';

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null
};

const reducer = (state, action) => {
  const { isAuthenticated, user } = action.payload;

  switch (action.type) {
    case 'INITIALIZE':
      return {
        ...state,
        isAuthenticated,
        isInitialized: true,
        user
      };
    case 'LOGIN':
      return {
        ...state,
        isAuthenticated: true,
        user
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null
      };
    case 'REGISTER':
      return {
        ...state,
        isAuthenticated: true,
        user
      };
    case 'STEP1':
      return {
        ...state,
        isAuthenticated: false,
        user
      };
    case 'UPDATE_PROFIL':
      return {
        ...state,
        isAuthenticated: true,
        user
      };
    default:
      return state;
  }
};

const AuthContext = createContext({
  ...initialState,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
  step1: () => Promise.resolve()
});

AuthProvider.propTypes = {
  children: PropTypes.node
};
function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = window.localStorage.getItem('accessToken');
        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken);
          const response = await axios.get('/api/account/my-account');
          const { user } = response.data;

          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: true,
              user
            }
          });
        } else {
          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: false,
              user: null
            }
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: 'INITIALIZE',
          payload: {
            isAuthenticated: false,
            user: null
          }
        });
      }
    };
    initialize();
  }, []);

  // ----------------------------------------------------------------------------------
  // Se connecter
  // ----------------------------------------------------------------------------------
  const login = async (email, password) => {
    // const login = accountName;
    const response = await axios.post('/api/account/login', {
      email,
      password
    });
    const { accessToken, user } = response.data;
    setSession(accessToken);
    dispatch({
      type: 'LOGIN',
      payload: {
        user
      }
    });
  };
  // ----------------------------------------------------------------------------------
  // Register
  // ----------------------------------------------------------------------------------
  // *****Etape 1
  const step1 = (user) => {
    dispatch({
      type: 'STEP1',
      payload: {
        user
      }
    });
  };

  const register = async (newUser) => {
    const response = await axios.post('/api/account/register', newUser);
    const { accessToken, user } = response.data;

    window.localStorage.setItem('accessToken', accessToken);
    dispatch({
      type: 'REGISTER',
      payload: {
        user
      }
    });
  };
  // ----------------------------------------------------------------------------------
  // Se Déconnecter
  // ----------------------------------------------------------------------------------
  const logout = async () => {
    setSession(null);
    dispatch({
      type: 'LOGOUT',
      payload: {
        user: ''
      }
    });
  };
  const updateProfile = async (user) => {
    await axios.put(`/users/${user.id}`, user);
    dispatch({
      type: 'UPDATE_PROFIL',
      payload: {
        user
      }
    });
  };

  return (
    <AuthContext.Provider value={{ ...state, step1, login, logout, register, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}
export { AuthContext, AuthProvider };
