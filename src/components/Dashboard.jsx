import * as React from 'react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  return (
    <div className="App">
      <h2>Hi Diyana</h2>
      <p>Welcome back!</p>
      <div className="card bg-dark text-white mb-3">
        <img className="card-img" src="https://post.healthline.com/wp-content/uploads/2020/09/healthy-eating-ingredients-732x549-thumbnail-732x549.jpg" alt="recipe" />
        <div className="card-img-overlay">
          <h5 className="card-title">Recipe</h5>
        </div>
      </div>
      <div>
        <Link to="/recipes">
          <button type="button" className="btn btn-dark">Recipes</button>
        </Link>
      </div>
      <div>
        <Link to="/planner">
          <button type="button" className="btn btn-dark">Planner</button>
        </Link>
      </div>
    </div>
  );
}
