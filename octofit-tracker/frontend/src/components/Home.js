import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="card border-0 shadow-sm home-hero">
      <div className="card-body text-center py-5">
        <p className="text-uppercase text-primary fw-semibold mb-2">OctoFit Tracker</p>
        <h1 className="display-5 fw-bold mb-3">Move together. Stay inspired.</h1>
        <p className="lead text-muted mb-4">
          Mergington High School's digital companion for tracking workouts, unlocking challenges, and
          celebrating healthy habits.
        </p>
        <div className="d-flex flex-column flex-md-row justify-content-center gap-3">
          <Link to="/activities" className="btn btn-primary btn-lg px-4">
            View activities
          </Link>
          <Link to="/leaderboard" className="btn btn-outline-primary btn-lg px-4">
            See leaderboard
          </Link>
        </div>

        <div className="table-responsive mt-5">
          <table className="table table-borderless align-middle mb-0">
            <thead>
              <tr>
                <th>Challenge</th>
                <th>Status</th>
                <th>Next milestone</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>January Jumpstart</td>
                <td><span className="badge bg-success">Live</span></td>
                <td>Log 200 collective miles</td>
              </tr>
              <tr>
                <td>Strength Sprint</td>
                <td><span className="badge bg-info text-dark">Upcoming</span></td>
                <td>Begins Feb 10</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
