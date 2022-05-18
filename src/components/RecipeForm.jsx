import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function RecipeForm() {
  const [title, setTitle] = useState('');
  const [servings, setServings] = useState();
  const [instructions, setInstructions] = useState('');
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
          <label htmlFor="instructions">
            Instructions:
            <textarea id="instructions" value={instructions} type="text" className="form-control" onChange={handleInstructionsChange} />
          </label>
        </div>

        <br />

        <button type="submit" className="btn btn-primary">Save</button>
        <Link to="/recipes">
          <button type="button" className="btn btn-outline-secondary">Cancel</button>
        </Link>
      </form>
    </div>
  );
}
