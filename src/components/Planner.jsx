/* eslint-disable jsx-a11y/label-has-associated-control */
import * as React from 'react';
import { Link } from 'react-router-dom';

export default function Planner() {
  return (
    <div className="App">
      <div className="page-title">
        <h2>
          <Link to="/" className="recipe-title">
            <i className="fa fa-chevron-left" style={{ 'margin-right': '10px' }} aria-hidden="true" />
          </Link>
          Your Meal Plan
        </h2>
        <p>View and update your meal plan</p>
      </div>

      <div className="week-layout">
        <div className="day-btn">M</div>
        <div className="day-btn">T</div>
        <div className="day-btn">W</div>
        <div className="day-btn">T</div>
        <div className="day-btn">F</div>
        <div className="day-btn">S</div>
        <div className="day-btn">S</div>
      </div>

    </div>
  );
}
