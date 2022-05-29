import * as React from 'react';
import { Link } from 'react-router-dom';

export default function Planner() {
  return (
    <div className="App">
      <h2>
        <Link to="/" className="recipe-title">
          <i className="fa fa-chevron-left" style={{ 'margin-right': '10px' }} aria-hidden="true" />
        </Link>
        Your Meal Plan
      </h2>
      <p>View and update your meal plan</p>
    </div>
  );
}
