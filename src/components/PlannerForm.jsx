import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Select from 'react-select';

export default function PlannerForm() {
  const params = useParams();

  const [breakfastRecipes, setBreakfastRecipes] = useState([]);
  const [lunchRecipes, setLunchRecipes] = useState([]);
  const [dinnerRecipes, setDinnerRecipes] = useState([]);

  // const [hasPlan, setHasPlan] = useState(false);

  const [breakfastMeal, setBreakfastMeal] = useState('');
  const [lunchMeal, setLunchMeal] = useState('');
  const [dinnerMeal, setDinnerMeal] = useState('');

  console.log(params.plannerId);

  // const getPlan = () => {
  //   axios.get(`/api/plan/${params.plannerId}`)
  //     .then((response) => {
  //       console.log(response.data.length);
  //       if (response.data.length !== undefined) {
  //         setHasPlan(true);
  //       }
  //     });
  // };

  // useEffect(() => { getPlan(); }, []);
  // console.log(hasPlan);

  const getRecipes = () => {
    axios.get('/api/recipes')
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
      });
  };
  useEffect(() => { getRecipes(); }, []);
  console.log(breakfastRecipes);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

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
    <div>
      <h4>Breakfast</h4>
      <Select
        options={breakfastRecipes}
        onChange={handleBreakfastOnChange}
      />
      <br />
      <h4>Lunch</h4>
      <Select
        options={lunchRecipes}
        onChange={handleLunchOnChange}
      />
      <br />
      <h4>Dinner</h4>
      <Select
        options={dinnerRecipes}
        onChange={handleDinnerOnChange}
      />
      <br />
      <div>
        <button type="submit" className="btn btn-dark main-btn" onClick={handleSubmit}>Save</button>
      </div>
    </div>
  );
}
