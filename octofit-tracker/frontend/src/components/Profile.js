import React, { useState } from 'react';

const Profile = () => {
  const [showModal, setShowModal] = useState(false);

  const mockProfile = {
    name: 'Paul Octo',
    email: 'octo.paul@mergington.edu',
    role: 'Physical Education Lead',
    badges: ['Coach', 'Admin', 'Notifier'],
  };

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start">
          <div>
            <h2 className="h4 mb-1">Profile</h2>
            <p className="text-muted mb-0">Snapshot of your OctoFit administrator account.</p>
          </div>
          <button className="btn btn-outline-primary" onClick={() => setShowModal(true)}>
            Update profile
          </button>
        </div>

        <div className="row g-4 mt-2">
          <div className="col-md-6">
            <div className="card border-0 bg-light h-100">
              <div className="card-body">
                <h5 className="card-title">Contact</h5>
                <table className="table table-borderless">
                  <tbody>
                    <tr>
                      <th scope="row">Name</th>
                      <td>{mockProfile.name}</td>
                    </tr>
                    <tr>
                      <th scope="row">Email</th>
                      <td><a href={`mailto:${mockProfile.email}`} className="link-primary">{mockProfile.email}</a></td>
                    </tr>
                    <tr>
                      <th scope="row">Role</th>
                      <td>{mockProfile.role}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card border-0 bg-light h-100">
              <div className="card-body">
                <h5 className="card-title">Badges</h5>
                <table className="table table-borderless">
                  <tbody>
                    {mockProfile.badges.map((badge) => (
                      <tr key={badge}>
                        <td>
                          <span className="badge bg-primary-subtle text-primary-emphasis">{badge}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit profile</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <form className="row g-3">
                  <div className="col-12">
                    <label className="form-label">Name</label>
                    <input type="text" className="form-control" defaultValue={mockProfile.name} />
                  </div>
                  <div className="col-12">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" defaultValue={mockProfile.email} />
                  </div>
                  <div className="col-12">
                    <label className="form-label">Role</label>
                    <select className="form-select" defaultValue={mockProfile.role}>
                      <option>Physical Education Lead</option>
                      <option>Assistant Coach</option>
                      <option>Principal</option>
                    </select>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="button" className="btn btn-primary">
                  Save changes
                </button>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </div>
      )}
    </div>
  );
};

export default Profile;
