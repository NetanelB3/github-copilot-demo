import React from 'react';

const Settings = () => {
  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="h4">Settings</h2>
        <p className="text-muted">Control integrations, notifications, and safety preferences.</p>
        <form className="row g-4 mt-1">
          <div className="col-md-6">
            <div className="form-check form-switch">
              <input className="form-check-input" type="checkbox" id="alertsSwitch" defaultChecked />
              <label className="form-check-label" htmlFor="alertsSwitch">
                Enable weekly progress summaries
              </label>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-check form-switch">
              <input className="form-check-input" type="checkbox" id="privacySwitch" />
              <label className="form-check-label" htmlFor="privacySwitch">
                Hide surnames on public leaderboards
              </label>
            </div>
          </div>
          <div className="col-12">
            <label className="form-label">Parent communication email</label>
            <input type="email" className="form-control" placeholder="family-updates@mergington.edu" />
          </div>
          <div className="col-12">
            <label className="form-label">Data retention policy</label>
            <select className="form-select">
              <option>Keep last 12 months</option>
              <option>Keep last 6 months</option>
              <option>Archive instantly</option>
            </select>
          </div>
          <div className="col-12 d-grid d-md-flex gap-2">
            <button type="button" className="btn btn-primary">Save preferences</button>
            <button type="button" className="btn btn-outline-danger">Reset defaults</button>
          </div>
        </form>

        <div className="table-responsive mt-4">
          <table className="table table-bordered">
            <thead className="table-secondary">
              <tr>
                <th>Integration</th>
                <th>Status</th>
                <th>Last sync</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Google Classroom</td>
                <td><span className="badge bg-success">Connected</span></td>
                <td>Today</td>
              </tr>
              <tr>
                <td>District SIS</td>
                <td><span className="badge bg-warning text-dark">Pending</span></td>
                <td>2 days ago</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Settings;
