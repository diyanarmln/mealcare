import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function RecipeList() {
  const [title, setTitle] = useState('');
  const [servings, setServings] = useState();
  const [instructions, setInstructions] = useState('');

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
      <h2>Your Recipes</h2>
      <p>View, Add and Edit your recipes</p>
      <Link to="/new-recipe">
        <button type="button" className="btn btn-dark">Add +</button>
      </Link>
    </div>
  );
}
