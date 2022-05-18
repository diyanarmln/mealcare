import React, { useState } from 'react';

export default function RecipeForm() {
  const [title, setTitle] = useState('');

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  return (
    <div>
      <form>
        <label htmlFor="title">
          Title:
          <input id="title" value={title} type="text" onChange={handleTitleChange} />
        </label>
      </form>
      This is App.jsx
    </div>
  );
}
