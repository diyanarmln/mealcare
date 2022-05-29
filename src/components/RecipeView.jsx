import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function RecipeView() {
  const [recipe, setRecipe] = useState('');
  const [category, setCategory] = useState('');
  const params = useParams();
  const { recipeId } = params;
  const getRecipe = () => {
    try {
      axios.get(`/api/recipe/${recipeId}`)
        .then((response) => {
          setRecipe(response.data);
          // eslint-disable-next-line no-unused-expressions
          response.data.categories.length === 0 ? setCategory('null') : setCategory(response.data.categories[0].name);
        });
    } catch (err) {
      console.log(err.response.data);
    }
  };

  useEffect(() => { getRecipe(); }, []);
  console.log(recipe);

  return (
    <div className="App">
      <div className="page-title">
        <h2>
          <Link to="/recipes" className="recipe-title">
            <i className="fa fa-chevron-left" style={{ 'margin-right': '10px' }} aria-hidden="true" />
          </Link>
          {recipe.title}
        </h2>
        <h5>
          {' '}
          <span className="badge label-margin">{category}</span>
          <span className="badge label-margin">
            Serves
            {' '}
            {recipe.servings}
          </span>
        </h5>
      </div>

      <p>
        Instructions:
        {' '}
        {recipe.recipeInstructions}
      </p>

      <br />

      <Link to={{ pathname: `/recipe/edit/${recipeId}`, state: { recipeId } }} className="label-margin">
        <button type="button" className="btn btn-dark main-btn">Edit</button>
      </Link>

    </div>
  );
}
