import React from 'react';

const Card = ({ title, text }) => {
  return (
    <div className="bg-cardBackground p-6 rounded-lg shadow-lg text-center w-1/3">
      <h2 className="text-xl font-bold italic">{title}</h2>
      <p className="mt-2">{text}</p>
    </div>
  );
};