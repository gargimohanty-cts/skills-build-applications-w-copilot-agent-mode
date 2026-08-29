import { useEffect, useState } from 'react';

const getApiBaseUrl = (path = '') => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
  const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api`
    : 'http://localhost:8000/api';

  return `${baseUrl}${path}`;
};

const normalizeCollection = (payload) => {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (Array.isArray(payload?.data)) {
    return payload.data;
  }

  if (Array.isArray(payload?.results)) {
    return payload.results;
  }

  if (Array.isArray(payload?.items)) {
    return payload.items;
  }

  if (Array.isArray(payload?.records)) {
    return payload.records;
  }

  return [];
};

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    fetch(getApiBaseUrl('/leaderboard'), { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed: ${response.status}`);
        }
        return response.json();
      })
      .then((payload) => setLeaderboard(normalizeCollection(payload)))
      .catch((err) => {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Unable to load leaderboard.');
        }
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, []);

  if (loading) {
    return <div className="alert alert-info">Loading leaderboard...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <section className="card shadow-sm border-0">
      <div className="card-header bg-dark text-white">
        <h2 className="h4 mb-0">Leaderboard</h2>
      </div>
      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table table-striped mb-0">
            <thead className="table-light">
              <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Team</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry) => (
                <tr key={entry._id || entry.rank}>
                  <td>{entry.rank}</td>
                  <td>{entry.name}</td>
                  <td>{entry.team}</td>
                  <td>{entry.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
