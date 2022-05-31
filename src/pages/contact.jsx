import React from 'react';
import { Link } from 'react-router-dom';

export const Contact = () => {
  return (
    <div className="container">
      <div className="center" style={{ marginTop: '3rem' }}>
        <p>Sorry contact page is not available right now!</p>
        <Link
          to="/"
          className="btn"
          style={{ background: '#4c98fd', marginTop: '1rem' }}
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
};
