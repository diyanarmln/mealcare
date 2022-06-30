import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Select from 'react-select';
import Planner from './Planner.jsx';

export default function PlannerForm() {
  // could destructure here, to not references params all the time
  // const { plannerId } = useParams();
  const params = useParams();
  const location = useLocation();
  const [dayOfTheWeek, setDayOfTheWeek] = useState('');

  // const [path, setPath] = useState(location);
  // setPath(useLocation());

  // OPTION LIST
  const [breakfastRecipes, setBreakfastRecipes] = useState([]);
  const [lunchRecipes, setLunchRecipes] = useState([]);
  const [dinnerRecipes, setDinnerRecipes] = useState([]);

  // SELECT DEFAULT VALUE
  const [breakfastMeal, setBreakfastMeal] = useState(null);
  const [lunchMeal, setLunchMeal] = useState(null);
  const [dinnerMeal, setDinnerMeal] = useState(null);

  const getDayOfTheWeek = () => {
    console.log('watch here', params.plannerId);
    const condition = params.plannerId;

    // my eyes hurt, let me give you a nicer pattern
    // define a day object outside of this component
    /* 
      const daysByNumber = {
        1: 'Monday',
        2: 'Tuesday',
        ...
      }

      Then you reference it like so in this function:
      const { plannerId } = params;
      if (!plannerId) return;
      setDayOfTheWeek(daysByNumber[plannerId]);
    */
    
    if (condition === 1) {
      setDayOfTheWeek('Monday');
    } if (condition === 2) {
      setDayOfTheWeek('Tuesday');
    } if (condition === 3) {
      setDayOfTheWeek('Wednesday');
    } if (condition === 4) {
      setDayOfTheWeek('Thursday');
    } if (condition === 5) {
      setDayOfTheWeek('Friday');
    } if (condition === 6) {
      setDayOfTheWeek('Saturday');
    } if (condition === 7) {
      setDayOfTheWeek('Sunday');
    }
  };

  const getRecipes = async () => {
    console.log('1 running recipes');
    await axios.get('/api/recipes')
      .then((response) => {
        // What if data is undefined? Then all your array methods could possible throw errors or just set everything to empty arrays at least.
        const recipeList = response.data;
        console.log(recipeList);
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
    getDayOfTheWeek();
    console.log(dayOfTheWeek);
    await axios.get(`/api/plan/${params.plannerId}`)
      .then((planResponse) => {
        // we should also account for the scenario that these variables could be undefined. Referencing keys within objects can always lead to bugs real quick if we dont account for it
        const breakfastId = planResponse.data.breakfastRecipe;
        const lunchId = planResponse.data.lunchRecipe;
        const dinnerId = planResponse.data.dinnerRecipe;
        // eslint-disable-next-line max-len
        const breakfastOptionIndex = breakfastRecipes.findIndex((option) => option.value === breakfastId);
        // eslint-disable-next-line max-len
        const lunchOptionIndex = lunchRecipes.findIndex((option) => option.value === lunchId);
        // eslint-disable-next-line max-len
        const dinnerOptionIndex = dinnerRecipes.findIndex((option) => option.value === dinnerId);

        // I think we could create one function, that accepts the recipe and the set state function as parameter, and then run that function three times.
        /* const updateMeal = (recipe, state, setState) => {
            ... find index
            ... -1 or not
            ... set state
        }
        */
        if (breakfastOptionIndex === -1) {
          setBreakfastMeal(null);
        } else {
          setBreakfastMeal(breakfastRecipes[breakfastOptionIndex]);
        }

        if (lunchOptionIndex === -1) {
          setLunchMeal(null);
        } else {
          setLunchMeal(lunchRecipes[lunchOptionIndex]);
        }

        if (dinnerOptionIndex === -1) {
          setDinnerMeal(null);
        } else {
          setDinnerMeal(dinnerRecipes[dinnerOptionIndex]);
        }
      });
  };

  useEffect(() => {
    getRecipes();
  }, []);

  useEffect(() => { getSavedMeals(); }, [location, breakfastRecipes, lunchRecipes, dinnerRecipes]);

  const handleBreakfastOnChange = async (e) => {
    try {
      setBreakfastMeal(e.value);
      const breakfastMealInput = e.value;
      const { data } = await axios.put(`/api/plan/${params.plannerId}`, { breakfastMealInput });
      // this is what I am talking about earlier
      if (data.success) {
        console.log('Breakfast meal plan saved successfully');
        await getSavedMeals();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleLunchOnChange = async (e) => {
    try {
      setLunchMeal(e.value);
      const lunchMealInput = e.value;
      const { data } = await axios.put(`/api/plan/${params.plannerId}`, { lunchMealInput });
      if (data.success) {
        console.log('Lunch meal plan saved successfully');
        await getSavedMeals();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDinnerOnChange = async (e) => {
    try {
      setDinnerMeal(e.value);
      const dinnerMealInput = e.value;
      const { data } = await axios.put(`/api/plan/${params.plannerId}`, { dinnerMealInput });
      if (data.success) {
        console.log('Dinner meal plan saved successfully');
        await getSavedMeals();
      }
    } catch (err) {
      console.log(err);
    }
  };

  console.log(dayOfTheWeek);

  return (
    <div className="App">
      <div>
        <Planner />
      </div>
      <div>
        {/* <p>
          Day of the Week:
          {' '}
          {dayOfTheWeek}
        </p>
        <br /> */}
        <h4>Breakfast</h4>
        <Select
          options={breakfastRecipes}
          onChange={handleBreakfastOnChange}
          value={breakfastMeal}
        />
        <br />
        <h4>Lunch</h4>
        <Select
          options={lunchRecipes}
          onChange={handleLunchOnChange}
          value={lunchMeal}
        />
        <br />
        <h4>Dinner</h4>
        <Select
          options={dinnerRecipes}
          onChange={handleDinnerOnChange}
          value={dinnerMeal}
        />
        <br />
      </div>
    </div>
  );
}
