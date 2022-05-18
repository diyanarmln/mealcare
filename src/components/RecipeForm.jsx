import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function RecipeForm() {
  const [title, setTitle] = useState('');
  const [servings, setServings] = useState();
  const [instructions, setInstructions] = useState('');
  const [category, setCategory] = useState();
  const [successMessage, setSuccessMessage] = useState('');

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
            <select id="category" className="form-select" onChange={handleCategoryChange}>
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
          <button type="button" className="btn btn-outline-secondary">Cancel</button>
        </Link>
      </form>
      {successMessage}
    </div>
  );
}
