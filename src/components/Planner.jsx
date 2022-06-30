import React from 'react';
import { Link } from 'react-router-dom';

export default function Planner() {
  return (
    <div>
      <div className="page-title">
        <h2>
          <Link to="/home" className="recipe-title">
            <i className="fa fa-chevron-left" style={{ marginRight: '10px' }} aria-hidden="true" />
          </Link>
          Your Meal Plan
        </h2>
        <p>View and update your meal plan</p>
      </div>

      <div className="week-layout">
        {/* I never like hardcoded ids like that. Maybe we could rethink this a bit and make it a string instead of a number then, representing the days */}
        <Link to={{ pathname: '/planner/1' }} className="">
          <button type="button" id="1" className="day-btn">M</button>
        </Link>

        <Link to={{ pathname: '/planner/2' }} className="">
          <button type="button" id="2" className="day-btn">T</button>
        </Link>

        <Link to={{ pathname: '/planner/3' }} className="">
          <button type="button" id="3" className="day-btn">W</button>
        </Link>

        <Link to={{ pathname: '/planner/4' }} className="">
          <button type="button" id="4" className="day-btn">T</button>
        </Link>

        <Link to={{ pathname: '/planner/5' }} className="">
          <button type="button" id="5" className="day-btn">F</button>
        </Link>

        <Link to={{ pathname: '/planner/6' }} className="">
          <button type="button" id="6" className="day-btn">S</button>
        </Link>

        <Link to={{ pathname: '/planner/7' }} className="">
          <button type="button" id="7" className="day-btn">S</button>
        </Link>

      </div>

    </div>
  );
}
