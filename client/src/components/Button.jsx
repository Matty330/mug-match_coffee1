import React from 'react';

const Button = ({ text, onClick }) => {
  return (
    <button onClick={onClick} className="bg-gradientStart text-white px-4 py-2 rounded-lg text-lg">
      {text}
    </button>
  );
};

export default Button;
