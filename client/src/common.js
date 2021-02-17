import axios from 'axios';
import { Route, Redirect } from 'react-router-dom';

export default axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

export const limit = 15;

// return the user data from the session storage
export const getUser = () => {
  const userStr = sessionStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
}

// return the token from the session storage
export const getToken = () => {
  return sessionStorage.getItem('token') || null;
}

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

export const errorMessage = 'Something went wrong. Please try again later';

export const successMessage = 'Successfully';

