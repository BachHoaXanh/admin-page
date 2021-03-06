import React, { useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { HOST } from './api.common';

export const LIMIT_RECORDS = 15;

// Message
export const SUCCESS_MESSAGE = 'Successfully';
export const ERROR_MESSAGE = 'Something went wrong. Please try again later';

// return the user data from the session storage
export const getUser = () => {
  const userStr = sessionStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

// return the token from the session storage
export const getToken = () => sessionStorage.getItem('token') || null;

// remove the token and user from the session storage
export const removeUserSession = () => {
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('user');
  sessionStorage.removeItem('role');
};

// set the token and user from the session storage
export const setUserSession = (token, user, role) => {
  sessionStorage.setItem('token', token);
  sessionStorage.setItem('user', JSON.stringify(user));
  sessionStorage.setItem('role', role);
};

export const getUserSession = () => {
  return {
    user: sessionStorage.getItem('user'),
    token: sessionStorage.getItem('token'),
    role: sessionStorage.getItem('role')
  };
};

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => getToken()
    ? <Component {...props} />
    : <Redirect to={{ pathname: '/login', state: { from: props.location } }}/>}
  />
);

export const PublicRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => !getToken()
    ? <Component {...props} />
    : <Redirect to={{ pathname: '/' }}/>}
  />
);

export const totalPages = (records, limit) => Math.ceil(records / limit);

export const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);
  return { value, onChange: e => setValue(e.target.value) };
};

export function slugify(str) {
  str = str.replace(/^\s+|\s+$/g, ''); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  const from = 'ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;';
  const to = 'aaaaaeeeeeiiiiooooouuuunc------';

  for (let i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-'); // collapse dashes

  return str;    // Trim - from end of text
}

export const removePrefixUpload = path => path.replace('upload', '');

export function showThumbnailProduct(item) {
  return item?.images?.length > 0
    ? `${HOST}/${removePrefixUpload(item.images[0].path)}`
    : `${process.env.PUBLIC_URL}/avatars/gogouya-fruits.jpg`;
}

export function showAvatar(path) {
  return path?.length > 0
    ? `${HOST}/${removePrefixUpload(path)}`
    : `https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png`;
}
