import React, { useEffect } from 'react';
import Loading from '../Loading';

export default function Logout(props) {
  useEffect(() => {
    setTimeout(() => (window.location.href = '/'), 1800);
  }, []);
  function goOut() {
    // Set object into localStorage
    localStorage.setItem('token', JSON.stringify({ access_token: null }));
    localStorage.clear();
    return <Loading myRender={() => ''} myMessege="Até breve!!!" />;
  }

  return typeof window !== undefined ? goOut() : '';
}
