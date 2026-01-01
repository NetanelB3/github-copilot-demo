import React from 'react';

const Register = () => {
  return (
    <div className="row justify-content-center">
      <div className="col-lg-7">
        <div className="card shadow-sm border-0">
          <div className="card-body">
            <h2 className="h4 mb-3 text-center">Register coach account</h2>
            <form className="row g-3">
              <div className="col-md-6">
                <label className="form-label">First name</label>
                <input type="text" className="form-control" />
              </div>
              <div className="col-md-6">
                <label className="form-label">Last name</label>
                <input type="text" className="form-control" />
              </div>
              <div className="col-12">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" />
              </div>
              <div className="col-md-6">
                <label className="form-label">Password</label>
                <input type="password" className="form-control" />
              </div>
              <div className="col-md-6">
                <label className="form-label">Confirm password</label>
                <input type="password" className="form-control" />
              </div>
              <div className="col-12">
                <label className="form-label">Favorite activity</label>
                <select className="form-select">
                  <option>Running</option>
                  <option>Cycling</option>
                  <option>Strength</option>
                  <option>Cross-training</option>
                </select>
              </div>
              <div className="col-12 d-grid">
                <button type="button" className="btn btn-success">Create account</button>
              </div>
            </form>

            <div className="table-responsive mt-4">
              <table className="table table-sm table-bordered mb-0">
                <thead>
                  <tr>
                    <th>Requirement</th>
                    <th>Details</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Password strength</td>
                    <td>Use 12+ characters, include a number.</td>
                  </tr>
                  <tr>
                    <td>School email</td>
                    <td>Only @mergington.edu addresses are allowed.</td>
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

export default Register;
