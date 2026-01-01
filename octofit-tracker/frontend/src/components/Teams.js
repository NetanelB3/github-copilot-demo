import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../config';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [teamName, setTeamName] = useState('');
  const [teamColor, setTeamColor] = useState('#0d6efd');

  const fetchTeams = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/teams/`);
      if (!response.ok) {
        throw new Error('Unable to load teams');
      }
      const data = await response.json();
      setTeams(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
      setTeams([]);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  return (
    <div className="row g-4">
      <div className="col-lg-7">
        <div className="card shadow-sm border-0 h-100">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h2 className="h4 mb-1">Teams</h2>
                <p className="text-muted mb-0">Friendly squads powering SepioFit challenges.</p>
              </div>
              <button className="btn btn-outline-primary" onClick={fetchTeams}>
                Refresh list
              </button>
            </div>

            <div className="table-responsive mt-3">
              <table className="table table-striped table-hover align-middle">
                <thead className="table-success">
                  <tr>
                    <th scope="col">Team</th>
                    <th scope="col">Members</th>
                    <th scope="col">ID</th>
                  </tr>
                </thead>
                <tbody>
                  {teams.map((team) => (
                    <tr key={team._id || team.id}>
                      <td className="fw-semibold">{team.name}</td>
                      <td>{team.members ? team.members.length : 0}</td>
                      <td><span className="badge bg-light text-dark">{team._id || 'N/A'}</span></td>
                    </tr>
                  ))}

                  {teams.length === 0 && (
                    <tr>
                      <td colSpan="3" className="text-center text-muted py-4">
                        Teams will show here once created.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="col-lg-5">
        <div className="card shadow-sm border-0 h-100">
          <div className="card-body">
            <h3 className="h5">Create a team</h3>
            <p className="text-muted">Use this form to mock how new teams would be registered.</p>
            <form className="row g-3">
              <div className="col-12">
                <label className="form-label" htmlFor="teamName">Team name</label>
                <input
                  id="teamName"
                  type="text"
                  className="form-control"
                  placeholder="e.g., Mergington Sprinters"
                  value={teamName}
                  onChange={(event) => setTeamName(event.target.value)}
                />
              </div>
              <div className="col-12">
                <label className="form-label" htmlFor="teamColor">Team color</label>
                <input
                  id="teamColor"
                  type="color"
                  className="form-control form-control-color"
                  title="Choose team color"
                  value={teamColor}
                  onChange={(event) => setTeamColor(event.target.value)}
                />
              </div>
              <div className="col-12">
                <label className="form-label" htmlFor="teamGoal">Team goal</label>
                <textarea id="teamGoal" className="form-control" rows="3" placeholder="Describe the challenge focus"></textarea>
              </div>
              <div className="col-12 d-grid">
                <button type="button" className="btn btn-primary">
                  Save draft team
                </button>
              </div>
            </form>

            <table className="table table-borderless table-sm mt-4">
              <tbody>
                <tr>
                  <th scope="row">Preview</th>
                  <td>
                    <span className="badge" style={{ backgroundColor: teamColor }}>
                      {teamName || 'Team name'}
                    </span>
                  </td>
                </tr>
                <tr>
                  <th scope="row">Members added</th>
                  <td>0 (mock state)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teams;
