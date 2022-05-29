/* eslint-disable jsx-a11y/label-has-associated-control */
// import * as React from 'react';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Select from 'react-select';

export default function Planner() {
  const [breakfastRecipes, setBreakfastRecipes] = useState([]);
  const [lunchRecipes, setLunchRecipes] = useState([]);
  const [dinnerRecipes, setDinnerRecipes] = useState([]);

  const getRecipes = () => {
    axios.get('/api/recipes')
      .then((response) => {
        const recipeList = response.data;
        // eslint-disable-next-line no-return-assign
        const breakfast = recipeList.filter((obj) => obj.categories[0].id === 1);
        // eslint-disable-next-line max-len
        const breakfastOptions = breakfast.map((recipe) => ({ label: recipe.title, value: recipe.title }));
        setBreakfastRecipes(breakfastOptions);
        // // eslint-disable-next-line no-return-assign
        const lunch = recipeList.filter((obj) => obj.categories[0].id === 2);
        const lunchOptions = lunch.map((recipe) => ({ label: recipe.title, value: recipe.title }));
        setLunchRecipes(lunchOptions);
        // // eslint-disable-next-line no-return-assign
        const dinner = recipeList.filter((obj) => obj.categories[0].id === 3);
        // eslint-disable-next-line max-len
        const dinnerOptions = dinner.map((recipe) => ({ label: recipe.title, value: recipe.title }));
        setDinnerRecipes(dinnerOptions);
      });
  };

  useEffect(() => { getRecipes(); }, []);

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

      <h3>Breakfast</h3>
      <Select options={breakfastRecipes} />
      <br />
      <h3>Lunch</h3>
      <Select options={lunchRecipes} />
      <br />
      <h3>Dinner</h3>
      <Select options={dinnerRecipes} />

    </div>
  );
}
