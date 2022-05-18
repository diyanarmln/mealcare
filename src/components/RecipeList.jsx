import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function RecipeList() {
  const [recipes, setRecipes] = useState([]);

  const getRecipes = () => {
    axios.get('/api/recipes')
      .then((response) => {
        setRecipes(response.data); });
  };

  useEffect(() => { getRecipes(); }, []);

  const handleDelete = async (recipeId) => {
    // e.preventDefault();
    try {
      const { data } = await axios.delete(`/api/recipe/${recipeId}`);
      console.log(data);
      if (data.success) {
        // useEffect(() => { getRecipes(); }, []);
        getRecipes();
      }
    } catch (err) {
      console.log(err.response.data);
    }
  };

  const recipesList = recipes.length === 0 ? <p>No Recipes Available</p> : recipes.map((recipe) => (
    <li key={recipe.id}>
      {recipe.title}
      <br />
      Servings:
      {' '}
      {recipe.servings}
      <button type="button" className="btn btn-dark" onClick={(e) => { if (window.confirm('Delete the item?')) { e.preventDefault(); handleDelete(recipe.id); } }}>x</button>
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
