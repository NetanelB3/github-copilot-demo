import React, { useEffect, useMemo, useState } from 'react';
import { API_BASE_URL } from '../config';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [activeActivity, setActiveActivity] = useState(null);

  const fetchActivities = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await fetch(`${API_BASE_URL}/activities/`);
      if (!response.ok) {
        throw new Error('Unable to load activities');
      }
      const data = await response.json();
      setActivities(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  const filteredActivities = useMemo(() => {
    return activities.filter((activity) =>
      activity.activity_type?.toLowerCase().includes(search.toLowerCase())
    );
  }, [activities, search]);

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <div className="d-flex flex-column flex-md-row justify-content-between gap-3">
          <div>
            <h2 className="h4 mb-1">Activities</h2>
            <p className="text-muted mb-0">Live feed of workouts logged by SepioFit students.</p>
          </div>
          <div className="d-flex gap-2">
            <button className="btn btn-outline-primary" onClick={fetchActivities}>
              <i className="bi bi-arrow-clockwise me-1"></i>
              Refresh
            </button>
            <button className="btn btn-primary" onClick={() => setActiveActivity({})}>
              <i className="bi bi-plus-lg me-1"></i>
              Log Activity
            </button>
          </div>
        </div>

        <form className="row g-3 align-items-end mt-3">
          <div className="col-md-8">
            <label className="form-label fw-semibold" htmlFor="activitySearch">
              Search activities
            </label>
            <input
              id="activitySearch"
              type="text"
              className="form-control"
              placeholder="Search by activity type"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>
          <div className="col-md-4">
            <label className="form-label fw-semibold" htmlFor="activityFilter">
              Filter preset
            </label>
            <select
              id="activityFilter"
              className="form-select"
              onChange={(event) => setSearch(event.target.value)}
            >
              <option value="">All types</option>
              <option value="running">Running</option>
              <option value="cycling">Cycling</option>
              <option value="strength">Strength</option>
              <option value="swimming">Swimming</option>
            </select>
          </div>
        </form>

        {error && (
          <div className="alert alert-danger mt-3" role="alert">
            {error}
          </div>
        )}

        <div className="table-responsive mt-3">
          <table className="table table-striped table-hover align-middle">
            <thead className="table-primary">
              <tr>
                <th scope="col">Activity</th>
                <th scope="col">Duration</th>
                <th scope="col">User ID</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {!loading && filteredActivities.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center text-muted py-4">
                    No activities match your search.
                  </td>
                </tr>
              )}

              {loading ? (
                <tr>
                  <td colSpan="4" className="text-center py-4">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredActivities.map((activity) => (
                  <tr key={activity._id || activity.id}>
                    <td className="fw-semibold text-capitalize">{activity.activity_type || 'N/A'}</td>
                    <td>{activity.duration || 'N/A'}</td>
                    <td>{activity.user || 'N/A'}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => setActiveActivity(activity)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {activeActivity && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {activeActivity.activity_type ? `${activeActivity.activity_type} details` : 'Log new activity'}
                </h5>
                <button type="button" className="btn-close" onClick={() => setActiveActivity(null)}></button>
              </div>
              <div className="modal-body">
                {activeActivity.activity_type ? (
                  <table className="table table-bordered mb-0">
                    <tbody>
                      <tr>
                        <th scope="row">User ID</th>
                        <td>{activeActivity.user || 'N/A'}</td>
                      </tr>
                      <tr>
                        <th scope="row">Duration</th>
                        <td>{activeActivity.duration || 'N/A'}</td>
                      </tr>
                    </tbody>
                  </table>
                ) : (
                  <form className="row g-3">
                    <div className="col-12">
                      <label className="form-label">Activity type</label>
                      <input type="text" className="form-control" placeholder="e.g., Cycling" />
                    </div>
                    <div className="col-12">
                      <label className="form-label">Duration</label>
                      <input type="text" className="form-control" placeholder="e.g., 45 minutes" />
                    </div>
                    <div className="col-12">
                      <label className="form-label">User ID</label>
                      <input type="text" className="form-control" placeholder="Paste SepioFit user ID" />
                    </div>
                  </form>
                )}
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setActiveActivity(null)}>
                  Close
                </button>
                {!activeActivity.activity_type && (
                  <button className="btn btn-primary">
                    Save activity
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </div>
      )}
    </div>
  );
};

export default Activities;
