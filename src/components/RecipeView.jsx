import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function RecipeForm() {
  const [recipe, setRecipe] = useState('');

  const location = useLocation();
  const id = location.state;
  console.log(id);

  const getRecipe = () => {
    try {
      axios.get(`/api/recipe/${id}`)
        .then((response) => {
          setRecipe(response.data); });
    } catch (err) {
      console.log(err.response.data);
    }
  };

  useEffect(() => { getRecipe(); }, []);

  console.log(recipe);

  return (
    <div>
      <h2>{recipe.title}</h2>
      <p>
        Servings:
        {' '}
        {recipe.servings}
      </p>
      <p>
        Instructions:
        {' '}
        {recipe.recipeInstructions}
      </p>

      <br />

      <Link to={{ pathname: '/recipe/edit', state: { recipeId: recipe.id } }}>
        <button type="button" className="btn btn-dark">Edit</button>
      </Link>
      <Link to="/recipes">
        <button type="button" className="btn btn-outline-secondary">Back</button>
      </Link>
    </div>
  );
}
