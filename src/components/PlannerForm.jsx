import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Select from 'react-select';

export default function PlannerForm() {
  const params = useParams();

  const [breakfastRecipes, setBreakfastRecipes] = useState([]);
  const [lunchRecipes, setLunchRecipes] = useState([]);
  const [dinnerRecipes, setDinnerRecipes] = useState([]);

  const [hasPlan, setHasPlan] = useState(false);

  const [breakfastMeal, setBreakfastMeal] = useState('');
  const [lunchMeal, setLunchMeal] = useState('');
  const [dinnerMeal, setDinnerMeal] = useState('');

  console.log(params.plannerId);

  const getPlan = () => {
    axios.get(`/api/plan/${params.plannerId}`)
      .then((response) => {
        console.log(response.data.length);
        if (response.data.length !== undefined) {
          setHasPlan(true);
        }
      });
  };

  useEffect(() => { getPlan(); }, []);
  console.log(hasPlan);

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
    <div>
      <h4>Breakfast</h4>
      <Select
        options={breakfastRecipes}
        onChange={(e) => {
          setBreakfastMeal(e.value);
        }}
      />
      <br />
      <h4>Lunch</h4>
      <Select
        options={lunchRecipes}
        onChange={(e) => {
          setLunchMeal(e.value);
        }}
      />
      <br />
      <h4>Dinner</h4>
      <Select
        options={dinnerRecipes}
        onChange={(e) => {
          setDinnerMeal(e.value);
        }}
      />
    </div>
  );
}
