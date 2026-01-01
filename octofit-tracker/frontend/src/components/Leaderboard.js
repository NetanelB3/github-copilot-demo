import React, { useEffect, useMemo, useState } from 'react';
import { API_BASE_URL } from '../config';

const Leaderboard = () => {
  const [entries, setEntries] = useState([]);
  const [sortAsc, setSortAsc] = useState(false);
  const [error, setError] = useState('');

  const fetchLeaderboard = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/leaderboard/`);
      if (!response.ok) {
        throw new Error('Unable to load leaderboard');
      }
      const data = await response.json();
      setEntries(Array.isArray(data) ? data : []);
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const sortedEntries = useMemo(() => {
    return [...entries].sort((a, b) => (sortAsc ? a.score - b.score : b.score - a.score));
  }, [entries, sortAsc]);

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
          <div>
            <h2 className="h4 mb-1">Leaderboard</h2>
            <p className="text-muted mb-0">Competitive standings for the current OctoFit challenge.</p>
          </div>
          <div className="btn-group" role="group">
            <button type="button" className="btn btn-outline-secondary" onClick={() => setSortAsc(false)}>
              Top scorers
            </button>
            <button type="button" className="btn btn-outline-secondary" onClick={() => setSortAsc(true)}>
              Emerging scorers
            </button>
          </div>
        </div>

        {error && (
          <div className="alert alert-warning mt-3" role="alert">
            {error}
          </div>
        )}

        <div className="table-responsive mt-3">
          <table className="table table-striped table-hover align-middle">
            <thead className="table-warning">
              <tr>
                <th scope="col">Rank</th>
                <th scope="col">User</th>
                <th scope="col">Score</th>
                <th scope="col">Progress</th>
              </tr>
            </thead>
            <tbody>
              {sortedEntries.map((entry, index) => (
                <tr key={entry._id || entry.id}>
                  <td className="fw-bold">#{index + 1}</td>
                  <td>{entry.user?.username || 'Unknown hero'}</td>
                  <td>{entry.score}</td>
                  <td>
                    <div className="progress" style={{ height: '10px' }}>
                      <div
                        className={`progress-bar ${index < 3 ? 'bg-success' : 'bg-info'}`}
                        role="progressbar"
                        style={{ width: `${Math.min(entry.score, 100)}%` }}
                        aria-valuenow={entry.score}
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                  </td>
                </tr>
              ))}

              {sortedEntries.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center text-muted py-4">
                    Leaderboard data will appear once workouts are logged.
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

export default Leaderboard;
