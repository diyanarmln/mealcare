import * as React from 'react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  return (
    <div className="App">
      <h2>Welcome!</h2>
      <Link to="/recipes">
        <button type="button" className="btn btn-dark">Recipes</button>
      </Link>
    </div>
  );
}
