import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../config';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);

  const fetchWorkouts = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/workouts/`);
      if (!response.ok) {
        throw new Error('Unable to load workouts');
      }
      const data = await response.json();
      setWorkouts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
      setWorkouts([]);
    }
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <div className="d-flex justify-content-between flex-column flex-md-row gap-3">
          <div>
            <h2 className="h4 mb-1">Workouts</h2>
            <p className="text-muted mb-0">Coach-approved workout templates for SepioFit.</p>
          </div>
          <button className="btn btn-outline-primary" onClick={fetchWorkouts}>
            Refresh workouts
          </button>
        </div>

        <div className="table-responsive mt-3">
          <table className="table table-striped table-hover align-middle">
            <thead className="table-danger">
              <tr>
                <th scope="col">Workout</th>
                <th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
              {workouts.map((workout) => (
                <tr key={workout._id || workout.id}>
                  <td className="fw-semibold">{workout.name}</td>
                  <td>{workout.description}</td>
                </tr>
              ))}

              {workouts.length === 0 && (
                <tr>
                  <td colSpan="2" className="text-center text-muted py-4">
                    No workouts available yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Workouts;
