import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../config';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [filterText, setFilterText] = useState('');

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/`);
      if (!response.ok) {
        throw new Error('Unable to load users');
      }
      const data = await response.json();
      setUsers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
      setUsers([]);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) =>
    user.username?.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <div className="d-flex flex-column flex-md-row justify-content-between gap-3">
          <div>
            <h2 className="h4 mb-1">Users</h2>
            <p className="text-muted mb-0">Student profiles synced from SepioFit authentication.</p>
          </div>
          <form className="d-flex gap-2" role="search">
            <input
              className="form-control"
              type="search"
              placeholder="Search username"
              value={filterText}
              onChange={(event) => setFilterText(event.target.value)}
            />
            <button className="btn btn-outline-primary" type="button" onClick={fetchUsers}>
              Refresh
            </button>
          </form>
        </div>

        <div className="table-responsive mt-3">
          <table className="table table-striped table-hover align-middle">
            <thead className="table-info">
              <tr>
                <th scope="col">Username</th>
                <th scope="col">Email</th>
                <th scope="col">User ID</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user._id || user.id}>
                  <td className="fw-semibold">{user.username}</td>
                  <td>
                    <a href={`mailto:${user.email}`} className="link-primary">
                      {user.email}
                    </a>
                  </td>
                  <td>
                    <code>{user._id || 'N/A'}</code>
                  </td>
                </tr>
              ))}

              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan="3" className="text-center text-muted py-4">
                    No users to display.
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

export default Users;
