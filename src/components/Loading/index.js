import ReactLoading from 'react-loading';
import React, { useState, useEffect } from 'react';

export default function Loading({ myRender }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2500);
  }, []);
  return loading ? (
    <div className="d-flex justify-content-center align-items-center flex-column">
      <h3>Carregando...</h3>
      <ReactLoading type={'spinningBubbles'} width={70} color={'#f0d700'} />
    </div>
  ) : (
    myRender()
  );
}
