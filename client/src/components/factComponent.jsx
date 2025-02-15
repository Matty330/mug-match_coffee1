import { useState, useEffect } from "react";
import axios from "axios";

const CatFacts = () => {
  const [fact, setFact] = useState("");

  useEffect(() => {
    fetchCatFact();
  }, []);

  const fetchCatFact = async () => {
    try {
      const response = await axios.get("https://catfact.ninja/fact");
      setFact(response.data.fact);
    } catch (error) {
      console.error("Error fetching cat fact:", error);
    }
  };

  return (
    <div>
      <h2>Random Cat Fact</h2>
      <p>{fact || "Loading..."}</p>
      <button onClick={fetchCatFact}>Get New Fact</button>
    </div>
  );
};

export default CatFacts;
