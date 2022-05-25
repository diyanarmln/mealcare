import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function RecipeForm() {
  const params = useParams();
  console.log('params', params.recipeId.length);
  const [title, setTitle] = useState('');
  const [servings, setServings] = useState();
  const [instructions, setInstructions] = useState('');
  const [category, setCategory] = useState();
  const [successMessage, setSuccessMessage] = useState('');
  // let recipeData = {};

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

  if (params.recipeId.length > 0) {
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
    if (params.recipeId.length > 0) {
      try {
        const { data } = await axios.put(`/api/recipe/${params.recipeId}/edit`, {
          title, servings, instructions, category,
        });
        if (data.success) {
          setSuccessMessage('Recipe saved success!');
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
          setSuccessMessage('Recipe saved success!');
          setTitle('');
          setServings('');
          setInstructions('');
          setCategory(0);
        }
      } catch (err) {
        console.log(err.response.data);
      }
    }
  };

  return (
    <div>
      <h2>Add a recipe</h2>
      <form>

        <div className="form-group">
          <label htmlFor="title">
            Title:
            <input id="title" value={title} type="text" className="form-control" onChange={handleTitleChange} />
          </label>
        </div>

        <br />

        <div className="form-group">
          <label htmlFor="servings">
            Servings:
            <input id="servings" value={servings} type="number" className="form-control" onChange={handleServingsChange} />
          </label>
        </div>

        <br />

        <div className="form-group">
          <label htmlFor="category">
            Category:
            <select id="category" className="form-select" onChange={handleCategoryChange} value={category}>
              <option value="1">Breakfast</option>
              <option value="2">Lunch</option>
              <option value="3">Dinner</option>
            </select>
          </label>
        </div>

        <br />

        <div className="form-group">
          <label htmlFor="instructions">
            Instructions:
            <textarea id="instructions" value={instructions} type="text" className="form-control" onChange={handleInstructionsChange} />
          </label>
        </div>

        <br />

        <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Save</button>
        <Link to="/recipes">
          <button type="button" className="btn btn-outline-secondary">Back</button>
        </Link>
      </form>
      {successMessage}
    </div>
  );
}
