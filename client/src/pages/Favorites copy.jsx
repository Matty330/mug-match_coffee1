import React from 'react';
import '../index.css'
import { Link } from 'react-router-dom';
import {useState, useEffect} from 'react';

const favorites = () => {
    const [coffeeMatch, setCoffeeMatch] = useState(' ');
    const [recipes, setRecipes] = useState([]);
    const [shops, setShops] = useState([]);

    useEffect(() => {
        const savedMatch = localStorage.getItem('coffeeMatch');
        if (savedMatch) {
            setCoffeeMatch(savedMatch);
        }

        const savedRecipes =JSON.parse(localStorage.getItem('recipes')) || [];
        const savedShops = JSON.parse(localStorage.getItem('shops')) || [];
        setRecipes(savedRecipes);
        setShops(savedShops);
    }, []);

const newRecipe = () => {
    const name = prompt('What is the name of the drink?')
    if(!name) return;

    const shots = prompt('How many shots of espresso go in this drink?')
    if(!shots) return;

    const ingredients = prompt('What syrups, flavors, milk, and any added ingredients are in this drink?')
    if(!ingredients) return;

    const temperature = prompt('Is this drink iced or hot?')
    if(!temperature) return;

    const newDrink = {name, shots, ingredients, temperature};

    const updatedRecipes = [...recipes, newDrink];
    setRecipes(updatedRecipes);
    localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
    }


const saveShop = () => {
    const name = prompt ('What is the name of the shop?');
    if(!name) return;

    const updatedShops = [...shops, name];
    setShops(updatedShops);
    localStorage.setItem('shops', JSON.stringify(updatedShops));
};

const deleteDrinkorShop = () => {
    const toDelete = prompt ('Enter name of the drink or shop you want to delete');
    if(!toDelete) return;

    const updatedRecipe = recipes.filter(drink => drink.name !== toDelete);
    const updatedShops = shops.filter(shop => shop !== toDelete);

    setRecipes(updatedRecipe);
    setShops(updatedShops);

    localStorage.setItem('recipes', JSON.stringify(updatedRecipe));
    localStorage.setItem('shops', JSON.stringify(updatedShops));
};


return (
        <div>
            <h1>₊✩‧˚₊✩‧ ⋆ ˚｡Add Favorites𖦹 ⋆｡°✮ ⋆ ˚｡𖦹 ⋆｡°✩</h1>
            <p>Click the + to add a new recipe</p>
            <p>Click the 💗 to save a shop</p>
            <p>Click the 🗑️ to delete drinks or shops</p>

            {setCoffeeMatch}
            {coffeeMatch && (
    <div>
        <h2>Quiz Match: {coffeeMatch}</h2>
    </div>
            )}
            <button onClick={newRecipe}>+</button>
            <button onClick={saveShop}>💗</button>
            <button onClick={deleteDrinkorShop}>🗑️</button>
    <ul>
   
            <Link to='/quiz'>Haven't taken our quiz yet? Click me!💌</Link>
   
    </ul>
</div>
    );
};

export default favorites;