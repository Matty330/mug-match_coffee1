import React from 'react';
import GradientBackground from '../components/GradientBackground';

const Login = () => {
  return (
    <GradientBackground>
      <div className="text-center text-white text-3xl font-bold mt-6">Login</div>
      <div className="flex flex-col items-center mt-6">
        <input type="email" placeholder="Email" className="p-2 mb-4 w-80 rounded" />
        <input type="password" placeholder="Password" className="p-2 mb-4 w-80 rounded" />
        <button className="bg-gradientStart text-white p-2 rounded">Login</button>
      </div>
    </GradientBackground>
  );
};

export default Login;