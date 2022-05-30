import * as React from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  const handleLogOut = async (e) => {
    e.preventDefault();
    await axios.delete('/api/logout');
    navigate('/login');
  };

  return (
    <div className="App">
      <div className="log-out-btn">
        <h2>Hi Sam</h2>
        <i className="fa fa-sign-out fa-2x" aria-hidden="true" onClick={handleLogOut} />
      </div>
      <p>Welcome back!</p>
      <div className="arrange-card-nav">
        <div className="center">
          <Link to="/recipes">
            <div className="card bg-dark text-white nav-card">
              <img className="card-img" src="https://post.healthline.com/wp-content/uploads/2020/09/healthy-eating-ingredients-732x549-thumbnail-732x549.jpg" alt="recipe" />
              <div className="card-img-overlay center-nav-text">
                <h5 className="card-title header-nav">Recipes</h5>
              </div>
            </div>
          </Link>
        </div>
        <div className="center">
          <Link to="/planner/1">
            <div className="card bg-dark text-white nav-card">
              <img className="card-img" src="https://media.istockphoto.com/photos/table-top-view-of-spicy-food-picture-id1316145932?b=1&k=20&m=1316145932&s=170667a&w=0&h=feyrNSTglzksHoEDSsnrG47UoY_XX4PtayUPpSMunQI=" alt="planner" />
              <div className="card-img-overlay center-nav-text">
                <h5 className="card-title header-nav">Planner</h5>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
