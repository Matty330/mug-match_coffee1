import React from 'react';

const GradientBackground = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gradientStart to-gradientEnd flex flex-col items-center">
      {children}
    </div>
  );
};

export default GradientBackground;