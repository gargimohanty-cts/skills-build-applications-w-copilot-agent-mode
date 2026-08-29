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

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    fetch(getApiBaseUrl('/workouts'), { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed: ${response.status}`);
        }
        return response.json();
      })
      .then((payload) => setWorkouts(normalizeCollection(payload)))
      .catch((err) => {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Unable to load workouts.');
        }
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, []);

  if (loading) {
    return <div className="alert alert-info">Loading workouts...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <section className="card shadow-sm border-0">
      <div className="card-header bg-dark text-white">
        <h2 className="h4 mb-0">Workouts</h2>
      </div>
      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table table-striped mb-0">
            <thead className="table-light">
              <tr>
                <th>Workout</th>
                <th>Level</th>
                <th>Duration</th>
                <th>Focus</th>
              </tr>
            </thead>
            <tbody>
              {workouts.map((workout) => (
                <tr key={workout._id || workout.title}>
                  <td>{workout.title}</td>
                  <td>{workout.level}</td>
                  <td>{workout.durationMinutes} mins</td>
                  <td>{workout.focus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
