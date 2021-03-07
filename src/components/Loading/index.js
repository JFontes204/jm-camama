import ReactLoading from 'react-loading';
import React, { useState, useEffect } from 'react';

export default function Loading({ myRender, myMessege }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1700);
  }, []);
  return loading ? (
    <div className="d-flex justify-content-center align-items-center flex-column">
      <h3 style={{ color: '#f0d700' }}>
        {myMessege === undefined ? 'Carregando...' : myMessege}
      </h3>
      <ReactLoading type={'spinningBubbles'} width={70} color={'#f0d700'} />
    </div>
  ) : (
    myRender()
  );
}
