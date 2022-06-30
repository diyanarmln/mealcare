import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function RecipeView() {
  const [recipe, setRecipe] = useState('');
  const [category, setCategory] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([]);

  const params = useParams();
  // hah! here you actually destructured, nice!
  const { recipeId } = params;

  const getRecipe = () => {
    try {
      axios.get(`/api/recipe/${recipeId}`)
        .then((response) => {
          setRecipe(response.data);
          const ingredientsArr = response.data.recipeIngredients;
          setIngredients(ingredientsArr.split('\n'));
          const instructionsArr = response.data.recipeInstructions;
          setInstructions(instructionsArr.split('\n'));
          // eslint-disable-next-line no-unused-expressions
          response.data.categories.length === 0 ? setCategory('null') : setCategory(response.data.categories[0].name);
        });
    } catch (err) {
      console.log(err.response.data);
    }
  };

  useEffect(() => { getRecipe(); }, []);
  console.log(ingredients);

  const ingredientsList = ingredients.map((ingredient, index) => (
    // eslint-disable-next-line react/no-array-index-key
    <li key={`ingredient-${index}`}>
      {ingredient}
    </li>
  ));

  const instructionsList = instructions.map((instruction, index) => (
    // eslint-disable-next-line react/no-array-index-key
    <li key={`instruction-${index}`}>
      {instruction}
    </li>
  ));

  return (
    <div className="App">
      <div className="view-page-title">
        <h2>
          <Link to="/recipes" className="recipe-title">
            <i className="fa fa-chevron-left" style={{ marginRight: '10px' }} aria-hidden="true" />
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
      {/* why inline styles if we have bootstrap? :) */}
      <p style={{ fontWeight: 'bold' }}>Ingredients</p>

      <ul>
        {' '}
        {ingredientsList}
      </ul>

      <p style={{ fontWeight: 'bold' }}>Instructions</p>
      <ol type="1">
        {' '}
        {instructionsList}
      </ol>

      <br />

      {/* nice use of state, that is useful within React Router. Not sure if we need it though, if we have the recipeId in the path already? hmmm */}
      <Link to={{ pathname: `/recipe/edit/${recipeId}`, state: { recipeId } }} className="label-margin">
        <button type="button" className="btn btn-dark main-btn">Edit</button>
      </Link>

    </div>
  );
}
