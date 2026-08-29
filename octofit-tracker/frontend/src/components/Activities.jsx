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

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    fetch(getApiBaseUrl('/activities'), { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed: ${response.status}`);
        }
        return response.json();
      })
      .then((payload) => setActivities(normalizeCollection(payload)))
      .catch((err) => {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Unable to load activities.');
        }
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, []);

  if (loading) {
    return <div className="alert alert-info">Loading activities...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <section className="card shadow-sm border-0">
      <div className="card-header bg-dark text-white">
        <h2 className="h4 mb-0">Activities</h2>
      </div>
      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table table-striped mb-0">
            <thead className="table-light">
              <tr>
                <th>Type</th>
                <th>Duration</th>
                <th>Distance</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity) => (
                <tr key={activity._id || `${activity.userId}-${activity.date}`}>
                  <td>{activity.type}</td>
                  <td>{activity.durationMinutes} mins</td>
                  <td>{activity.distanceKm} km</td>
                  <td>{activity.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
