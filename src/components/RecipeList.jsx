import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function RecipeList() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => { axios.get('/api/recipes')
    .then((response) => {
      setRecipes(response.data); }); }, []);

  const recipesList = recipes.length === 0 ? <p>No Recipes Available</p> : recipes.map((recipe) => (
    <li key={recipe.id}>
      {recipe.title}
      {recipe.servings}
    </li>
  ));

  return (
    <div>
      <h2>Your Recipes</h2>
      <p>View, Add and Edit your recipes</p>
      <Link to="/new-recipe">
        <button type="button" className="btn btn-dark">Add +</button>
      </Link>
      <ul>
        {recipesList}
      </ul>
      <div />
    </div>
  );
}
