import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Select from 'react-select';
import Planner from './Planner.jsx';

export default function PlannerForm() {
  const params = useParams();

  const location = useLocation();

  // OPTION LIST
  const [breakfastRecipes, setBreakfastRecipes] = useState([]);
  const [lunchRecipes, setLunchRecipes] = useState([]);
  const [dinnerRecipes, setDinnerRecipes] = useState([]);

  // SELECT DEFAULT VALUE
  const [breakfastMeal, setBreakfastMeal] = useState(null);
  const [lunchMeal, setLunchMeal] = useState(null);
  const [dinnerMeal, setDinnerMeal] = useState(null);

  const getRecipes = async () => {
    console.log('1 running recipes');
    await axios.get('/api/recipes')
      .then((response) => {
        const recipeList = response.data;
        // eslint-disable-next-line no-return-assign
        const breakfast = recipeList.filter((obj) => obj.categories[0].id === 1);
        // eslint-disable-next-line max-len
        const breakfastOptions = breakfast.map((recipe) => ({ label: recipe.title, value: recipe.id }));
        setBreakfastRecipes(breakfastOptions);
        // // eslint-disable-next-line no-return-assign
        const lunch = recipeList.filter((obj) => obj.categories[0].id === 2);
        const lunchOptions = lunch.map((recipe) => ({ label: recipe.title, value: recipe.id }));
        setLunchRecipes(lunchOptions);
        // // eslint-disable-next-line no-return-assign
        const dinner = recipeList.filter((obj) => obj.categories[0].id === 3);
        // eslint-disable-next-line max-len
        const dinnerOptions = dinner.map((recipe) => ({ label: recipe.title, value: recipe.id }));
        setDinnerRecipes(dinnerOptions);
        console.log('2 finished handling recipe response ');
      });
  };

  const getSavedMeals = async () => {
    console.log('3 running planner');
    await axios.get(`/api/plan/${params.plannerId}`)
      .then((planResponse) => {
        const breakfastId = planResponse.data.breakfastRecipe;
        const lunchId = planResponse.data.lunchRecipe;
        const dinnerId = planResponse.data.dinnerRecipe;
        // eslint-disable-next-line max-len
        const breakfastOptionIndex = breakfastRecipes.findIndex((option) => option.value === breakfastId);
        // eslint-disable-next-line max-len
        const lunchOptionIndex = lunchRecipes.findIndex((option) => option.value === lunchId);
        // eslint-disable-next-line max-len
        const dinnerOptionIndex = dinnerRecipes.findIndex((option) => option.value === dinnerId);

        setBreakfastMeal(breakfastOptionIndex);
        setLunchMeal(lunchOptionIndex);
        setDinnerMeal(dinnerOptionIndex);
      });
  };

  useEffect(() => {
    getRecipes();
  }, [location]);

  useEffect(() => { getSavedMeals(); }, [breakfastRecipes, lunchRecipes, dinnerRecipes]);

  const handleBreakfastOnChange = async (e) => {
    try {
      setBreakfastMeal(e.value);
      const breakfastMealInput = e.value;
      const { data } = await axios.put(`/api/plan/${params.plannerId}`, { breakfastMealInput });
      if (data.success) {
        console.log('Breakfast meal plan saved successfully');
      }
    } catch (err) {
      console.log(err.response.data);
    }
  };

  const handleLunchOnChange = async (e) => {
    try {
      setLunchMeal(e.value);
      const lunchMealInput = e.value;
      const { data } = await axios.put(`/api/plan/${params.plannerId}`, { lunchMealInput });
      if (data.success) {
        console.log('Lunch meal plan saved successfully');
      }
    } catch (err) {
      console.log(err.response.data);
    }
  };

  const handleDinnerOnChange = async (e) => {
    try {
      setDinnerMeal(e.value);
      const dinnerMealInput = e.value;
      const { data } = await axios.put(`/api/plan/${params.plannerId}`, { dinnerMealInput });
      if (data.success) {
        console.log('Dinner meal plan saved successfully');
      }
    } catch (err) {
      console.log(err.response.data);
    }
  };

  return (
    <div className="App">
      <div>
        <Planner />
      </div>
      <div>
        <h4>Breakfast</h4>
        <Select
          options={breakfastRecipes}
          onChange={handleBreakfastOnChange}
          value={breakfastRecipes[breakfastMeal]}
        />
        <br />
        <h4>Lunch</h4>
        <Select
          options={lunchRecipes}
          onChange={handleLunchOnChange}
          value={lunchRecipes[lunchMeal]}
        />
        <br />
        <h4>Dinner</h4>
        <Select
          options={dinnerRecipes}
          onChange={handleDinnerOnChange}
          value={dinnerRecipes[dinnerMeal]}
        />
        <br />
      </div>
    </div>
  );
}
