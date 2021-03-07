import axios from 'axios';
import React, {useState} from 'react'
import { Route, Redirect } from 'react-router-dom';

export default axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

export const LIMIT_RECORDS = 15;

// Message
export const SUCCESS_MESSAGE = 'Successfully';
export const ERROR_MESSAGE = 'Something went wrong. Please try again later';

// return the user data from the session storage
export const getUser = () => {
  const userStr = sessionStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
}

// return the token from the session storage
export const getToken = () => sessionStorage.getItem('token') || null;

// remove the token and user from the session storage
export const removeUserSession = () => {
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('user');
}

// set the token and user from the session storage
export const setUserSession = (token, user) => {
  sessionStorage.setItem('token', token);
  sessionStorage.setItem('user', JSON.stringify(user));
}

export const getUserSession = () => {
  return {
    user: sessionStorage.getItem('user'),
    token: sessionStorage.getItem('token')
  }
}

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => getToken()
      ? <Component {...props} />
      : <Redirect to={{ pathname: '/login', state: { from: props.location } }}/>}
  />
)

export const PublicRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => !getToken()
    ? <Component {...props} />
    : <Redirect to={{ pathname: '/' }} />}
  />
);

export const totalPages = (records, limit) => Math.ceil(records / limit);

export const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);
  return { value, onChange: e => setValue(e.target.value) };
}

export const kebabCase = string => string.replace(/([a-z])([A-Z])/g, '$1-$2').replace(/\s+/g, '-').toLowerCase();

