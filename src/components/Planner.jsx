/* eslint-disable jsx-a11y/label-has-associated-control */
// import * as React from 'react';
// import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import Select from 'react-select';
import PlannerForm from './PlannerForm.jsx';

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
        <Link to="/planner/1" className="">
          <div id="1" className="day-btn">M</div>
        </Link>

        <Link to="/planner/2" className="">
          <div id="2" className="day-btn">T</div>
        </Link>

        <Link to="/planner/3" className="">
          <div id="3" className="day-btn">W</div>
        </Link>

        <Link to="/planner/4" className="">
          <div id="4" className="day-btn">T</div>
        </Link>

        <Link to="/planner/5" className="">
          <div id="5" className="day-btn">F</div>
        </Link>

        <Link to="/planner/6" className="">
          <div id="6" className="day-btn">S</div>
        </Link>

        <Link to="/planner/7" className="">
          <div id="7" className="day-btn">S</div>
        </Link>

      </div>

      <PlannerForm />

    </div>
  );
}
