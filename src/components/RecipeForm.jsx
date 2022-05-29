/* eslint-disable jsx-a11y/label-has-associated-control */
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

export default function RecipeForm() {
  const params = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [servings, setServings] = useState();
  const [instructions, setInstructions] = useState('');
  const [category, setCategory] = useState(1);
  const [successMessage, setSuccessMessage] = useState('');

  const getRecipe = () => {
    try {
      axios.get(`/api/recipe/${params.recipeId}`)
        .then((response) => {
          setTitle(response.data.title);
          setServings(response.data.servings);
          setInstructions(response.data.recipeInstructions);
          setCategory(response.data.categories[0].id);
          console.log(response.data); });
    } catch (err) {
      console.log(err.response.data);
    }
  };

  if (params.recipeId !== undefined) {
    useEffect(() => { getRecipe(); }, []);
  }
  // photo hallo

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleServingsChange = (e) => {
    setServings(e.target.value);
  };

  const handleInstructionsChange = (e) => {
    setInstructions(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (params.recipeId !== undefined) {
      try {
        const { data } = await axios.put(`/api/recipe/${params.recipeId}/edit`, {
          title, servings, instructions, category,
        });
        if (data.success) {
          setSuccessMessage('Recipe updated successfully!');
          navigate(`/recipe/${params.recipeId}`);
        }
      } catch (err) {
        console.log(err.response.data);
      }
    } else {
      try {
        const { data } = await axios.post('/api/recipes', {
          title, servings, instructions, category,
        });
        if (data.success) {
          console.log('data', data);
          navigate(`/recipe/${data.id}`);
        }
      } catch (err) {
        console.log(err.response.data);
      }
    }
  };

  return (
    <div className="App">
      <h2 className="page-title">Add new recipe</h2>
      <form>

        <div className="form-floating mb-3">
          <input type="title" className="form-control" id="title" placeholder="Name your recipe" />
          <label htmlFor="title">Recipe Title</label>
        </div>

        <div className="form-floating mb-3">
          <input type="servings" className="form-control" id="servings" placeholder="Number of servings" />
          <label htmlFor="title">Servings</label>
        </div>

        <div className="form-floating">
          <select className="form-select" id="category" onChange={handleCategoryChange} value={category} aria-label="Floating label select category">
            <option selected>Select recipe category</option>
            <option value="1">Breakfast</option>
            <option value="2">Lunch</option>
            <option value="3">Dinner</option>
          </select>
          <label htmlFor="category">Recipe Category</label>
        </div>
        <br />

        <div className="form-floating">
          <textarea className="form-control" placeholder="Enter the recipe instructions" id="instructions" value={instructions} onChange={handleInstructionsChange} style={{ height: '300px' }} />
          <label htmlFor="instructions">Instructions</label>
        </div>
        <br />
        <div>
          <button type="submit" className="btn btn-dark label-margin" onClick={handleSubmit}>Save</button>
          <Link to="/recipes">
            <button type="button" className="btn btn-outline-secondary">Back</button>
          </Link>
        </div>

      </form>
      {successMessage}
    </div>
  );
}
