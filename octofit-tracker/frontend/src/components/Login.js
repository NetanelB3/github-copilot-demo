import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card shadow-sm border-0">
          <div className="card-body">
            <h2 className="h4 mb-3 text-center">Login</h2>
            <form className="row g-3">
              <div className="col-12">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" placeholder="coach@mergington.edu" />
              </div>
              <div className="col-12">
                <label className="form-label">Password</label>
                <input type="password" className="form-control" placeholder="Enter password" />
              </div>
              <div className="col-12 d-grid">
                <button type="button" className="btn btn-primary">Sign in</button>
              </div>
            </form>
            <div className="table-responsive mt-4">
              <table className="table table-borderless table-sm mb-0">
                <tbody>
                  <tr>
                    <th scope="row">New coach?</th>
                    <td><Link to="/register" className="link-primary">Create an account</Link></td>
                  </tr>
                  <tr>
                    <th scope="row">Forgot password?</th>
                    <td><button className="btn btn-link p-0">Reset access</button></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
