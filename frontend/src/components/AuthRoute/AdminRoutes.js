import React from 'react';

function AdminRoutes({ children }) {
  //get user data from loc storage
  const userData = JSON.parse(localStorage.getItem('userInfo'));
  const isAdmin = userData?.user?.isAdmin ? true : false;
  console.log(isAdmin, 'log');
  if (!isAdmin) return <h1>access denied only admin</h1>;
  return <>{children}</>;
}

export default AdminRoutes;
