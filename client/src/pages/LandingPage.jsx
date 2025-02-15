import React, { useState, useEffect } from 'react';
import GradientBackground from '../components/GradientBackground';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import { retrieveCatFacts } from '../api/catAPI'; 

const LandingPage = () => {
  const navigate = useNavigate();
  const [catFact, setCatFact] = useState(""); 

  useEffect(() => {
    const fetchCatFact = async () => {
      try {
        const fact = await retrieveCatFacts();
        setCatFact(fact);
      } catch (error) {
        console.error("Error fetching cat fact:", error);
      }
    };

    fetchCatFact();
  }, []);

  return (
    <GradientBackground>
      <div className="flex justify-center mt-6 space-x-6">
        <p className="text-white text-center text-lg">✮ Cat Fact of the Day ✮</p>
      </div>

      <div className="flex justify-center mt-3">
        <p className="text-white text-center max-w-md italic">
          {catFact || "Fetching a fun cat fact..."}
        </p>
      </div>

      <div className="flex justify-center mt-6 space-x-6">
        <Button text="Sign Up" onClick={() => navigate('/signup')} />
        <Button text="Log In" onClick={() => navigate('/login')} />
      </div>
    </GradientBackground>
  );
};

export default LandingPage;
