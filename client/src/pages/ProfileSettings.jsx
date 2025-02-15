import React, { useEffect, useState } from 'react';
import '../index.css';
import { jwtDecode } from 'jwt-decode';

const profile = () => {
  const[ username, setUsername] = useState(' ');
  const[recipes, setRecipes] =useState([]);
  const [shops, setShops] = useState([]);

  useEffect(() => {
    const token= localStorage.getItem('token');

    if (token) {
      try {
        const decoded =jwtDecode(token);
        setUsername(decoded.username);
      } catch (error) {
        console.error('Error decoding token', error);
      }
    }

    const savedRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
    const savedShops =JSON.parse(localStorage.getItem('shops')) || [];
    setRecipes(savedRecipes);
    setShops(savedShops);
  }, []);

return(
  <div>
    <h1>Welcome, {username}</h1>

    <p>⊹₊⟡⋆ Loved Drinks ⊹₊⟡⋆</p>
    <ul>
      {recipes.length > 0 ? (
        recipes.map((drink, index) => (
          <li key={index}>
            <strong>{drink.name}</strong> - {drink.shots} shots, {drink.ingredients}, {drink.temperature} 
          </li>
        ))
) :(
  <p>No drinks saved yet.</p>
)}
    </ul>

<p>⊹₊⟡⋆ Best Cafes ⊹₊⟡⋆</p>
<ul>
  {shops.length >0? (
    shops.map((shop, index) => <li key={index}>{shop}</li>)
  ) : ( 
    <p>No cafes saved yet.</p>
      )}   
</ul>
  </div>
    );
}

export default profile;