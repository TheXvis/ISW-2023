import React from 'react';

function withAuth(Component) {
  return function WrappedComponent(props) {
    const token = localStorage.getItem('token');


    if (!token) {
      return <div>Error: No estás autenticado</div>;
    }else{
      return <Component {...props} />;
    }
  };
}

export default withAuth;