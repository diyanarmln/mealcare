/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';

export default function Login() {
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
                    {/* <p className="text-white-50 mb-5 login-text">Please enter your login and password!</p> */}

                    <div className="form-outline form-white mb-4">

                      <label className="form-label" htmlFor="typeEmailX">
                        Email
                        <input type="email" id="typeEmailX" className="form-control form-control-lg login-labels" />
                      </label>
                    </div>

                    <div className="form-outline form-white mb-4">
                      <label className="form-label" htmlFor="typePasswordX">
                        Password
                        <input type="password" id="typePasswordX" className="form-control form-control-lg login-labels" />

                      </label>
                    </div>

                    <p className="small mb-5 pb-lg-2"><a className="text-white-50" href="#!">Forgot password?</a></p>

                    <button className="btn btn-outline-light btn-lg px-5 login-btn" type="submit">Login</button>

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
