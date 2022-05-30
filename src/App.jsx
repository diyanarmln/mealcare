import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard.jsx';
import RecipeList from './components/RecipeList.jsx';
import RecipeForm from './components/RecipeForm.jsx';
import RecipeView from './components/RecipeView.jsx';
import PlannerForm from './components/PlannerForm.jsx';
import Login from './components/Login.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Dashboard />} />
        <Route path="/recipes" element={<RecipeList />} />
        <Route path="/new-recipe" element={<RecipeForm />} />
        <Route path="/recipe/:recipeId" element={<RecipeView />} />
        <Route path="/recipe/edit/:recipeId" element={<RecipeForm />} />
        <Route path="/planner/:plannerId" element={<PlannerForm key={window.location.pathname} />} />

      </Routes>
    </BrowserRouter>
  );
}
