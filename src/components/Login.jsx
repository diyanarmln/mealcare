/* eslint-disable jsx-a11y/control-has-associated-label */
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/login', { emailInput, passwordInput })
        .then((response) => {
          console.log(response.data);
          axios
            .get('/api/user')
            .then((dashboardResponse) => {
              console.log(dashboardResponse);
              navigate('/home');
            });
        });
    } catch (err) {
      console.log(err.response.data);
    }
  };

  const handleEmailChange = (e) => {
    setEmailInput(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPasswordInput(e.target.value);
  };

  return (
    <div className="App">
      <section className="vh-100">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="card text-white card-bg" style={{ borderRadius: '1rem' }}>
                <div className="card-body p-5 text-center">

                  <div className="mb-md-5 mt-md-4 pb-5">

                    <h2 className="fw-bold mb-2 login-text">MealCare</h2>

                    <div className="form-outline form-white mb-4">

                      <label className="form-label" htmlFor="typeEmailX">
                        Email
                        <input type="email" id="typeEmailX" className="form-control form-control-lg login-labels" value={emailInput} onChange={handleEmailChange} />
                      </label>
                    </div>

                    <div className="form-outline form-white mb-4">
                      <label className="form-label" htmlFor="typePasswordX">
                        Password
                        <input type="password" id="typePasswordX" className="form-control form-control-lg login-labels" value={passwordInput} onChange={handlePasswordChange} />

                      </label>
                    </div>

                    <p className="small mb-5 pb-lg-2"><a className="text-white-50" href="#!">Forgot password?</a></p>

                    <button className="btn btn-outline-light btn-lg px-5 login-btn" type="submit" onClick={handleSubmit}>Login</button>

                    <div className="d-flex justify-content-center text-center mt-4 pt-1">
                      <a href="#!" className="text-white"><i className="fa fa-facebook-f fa-lg" /></a>
                      <a href="#!" className="text-white"><i className="fa fa-twitter fa-lg mx-4 px-2" /></a>
                      <a href="#!" className="text-white"><i className="fa fa-google fa-lg" /></a>
                    </div>

                  </div>

                  <div>
                    <p className="mb-0 login-color-light">
                      Don't have an account?
                      {' '}
                      <a href="#!" className="text-white-50 fw-bold login-color-light" style={{ textDecoration: 'none' }}>Sign Up</a>
                    </p>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
