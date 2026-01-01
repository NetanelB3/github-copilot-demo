import React from 'react';

const Dashboard = () => {
  const cards = [
    { title: 'Active Students', value: 128, trend: '+12% vs last week', variant: 'success' },
    { title: 'Minutes Logged', value: 942, trend: '+6% daily', variant: 'primary' },
    { title: 'Challenges Running', value: 4, trend: '2 ending soon', variant: 'warning' },
    { title: 'Support Tickets', value: 1, trend: 'All resolved', variant: 'info' },
  ];

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-body">
        <h2 className="h4">Dashboard</h2>
        <p className="text-muted">High-level status of OctoFit Tracker participation.</p>
        <div className="row g-4 mt-2">
          {cards.map((card) => (
            <div className="col-md-6 col-xl-3" key={card.title}>
              <div className={`card border-${card.variant} border-2 h-100`}>
                <div className="card-body">
                  <p className="text-uppercase text-muted fw-semibold small mb-1">{card.title}</p>
                  <h3 className={`text-${card.variant}`}>{card.value}</h3>
                  <span className="badge bg-light text-dark">{card.trend}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="table-responsive mt-4">
          <table className="table table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>Program</th>
                <th>Coach</th>
                <th>Status</th>
                <th>Last Sync</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Freshman Mile Club</td>
                <td>Coach Rivera</td>
                <td><span className="badge bg-success">On track</span></td>
                <td>2 minutes ago</td>
              </tr>
              <tr>
                <td>Winter Wellness</td>
                <td>Coach Patel</td>
                <td><span className="badge bg-warning text-dark">Needs push</span></td>
                <td>14 minutes ago</td>
              </tr>
              <tr>
                <td>Strength 101</td>
                <td>Coach Lin</td>
                <td><span className="badge bg-info text-dark">Planning</span></td>
                <td>30 minutes ago</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
