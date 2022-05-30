/* eslint-disable no-alert */
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
    try {
      const { data } = await axios.delete(`/api/recipe/${recipeId}`);
      if (data.success) {
        getRecipes();
      }
    } catch (err) {
      console.log(err.response.data);
    }
  };

  const recipesList = recipes.length === 0 ? <p>No Recipes Available</p> : recipes.map((recipe) => (
    <li key={recipe.id} className="recipe-list">
      <Link to={{ pathname: `/recipe/${recipe.id}` }} className="recipe-title">
        <span className="list-title">
          {recipe.title}
        </span>
        <br />
        <span className="list-subtitle">
          serves
          {' '}
          {recipe.servings}
        </span>
      </Link>

      <div>
        <i className="fa fa-minus delete-btn" aria-hidden="true" onClick={(e) => { if (window.confirm('Delete the item?')) { e.preventDefault(); handleDelete(recipe.id); } }} />
      </div>
    </li>
  ));

  return (
    <div className="App">
      <div className="recipe-header">
        <div>
          <h2>
            <Link to="/" className="recipe-title">
              <i className="fa fa-chevron-left" style={{ marginRight: '10px' }} aria-hidden="true" />
            </Link>
            Your Recipes
          </h2>
          <p>View, Add and Edit your recipes</p>
        </div>
        <div>
          <Link to="/new-recipe">
            <button type="button" className="btn btn-dark main-btn">+</button>
          </Link>
        </div>
      </div>
      <ul className="list-style">
        {recipesList}
      </ul>
      <div />
    </div>
  );
}
