import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Dashboard from './components/Dashboard.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <div>This is App.jsx</div>
      <Dashboard />
    </BrowserRouter>
  );
}
