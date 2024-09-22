import React from 'react';

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <div className="logo-wrapper">
        <div className="logo-letter">Æ</div>
        <div className="logo-letter">G</div>
        <div className="logo-letter">I</div>
        <div className="logo-letter">R</div>
        <div className="logo-letter">I</div>
        <div className="logo-letter">N</div>
        <div className="logo-letter">E</div>
      </div>
      <img className="logo-image" src="/createlogo.png" alt="Logo" />
    </div>
  );
};

export default LoadingScreen;
