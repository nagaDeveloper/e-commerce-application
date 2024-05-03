import React from 'react';
import Login from '../Users/Forms/Login';

function AuthRoute({ children }) {
  //get user data from loc storage
  const user = JSON.parse(localStorage.getItem('userInfo'));
  const isLoggedIn = user?.token ? true : false;
  console.log(isLoggedIn, 'log');
  if (!isLoggedIn) return <Login />;
  return <>{children}</>;
}

export default AuthRoute;
