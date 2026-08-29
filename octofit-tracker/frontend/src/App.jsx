import { NavLink, Navigate, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities.jsx';
import Leaderboard from './components/Leaderboard.jsx';
import Teams from './components/Teams.jsx';
import Users from './components/Users.jsx';
import Workouts from './components/Workouts.jsx';

const logo = '/octofitapp-small.png';

const navItems = [
  { to: '/', label: 'Dashboard' },
  { to: '/users', label: 'Users' },
  { to: '/teams', label: 'Teams' },
  { to: '/activities', label: 'Activities' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/workouts', label: 'Workouts' },
];

function Dashboard() {
  return (
    <div className="row g-4">
      <div className="col-md-6 col-xl-4">
        <div className="card h-100 shadow-sm border-0">
          <div className="card-body">
            <h2 className="h5">Users</h2>
            <p className="text-muted mb-0">View active members and fitness profiles.</p>
          </div>
        </div>
      </div>
      <div className="col-md-6 col-xl-4">
        <div className="card h-100 shadow-sm border-0">
          <div className="card-body">
            <h2 className="h5">Teams</h2>
            <p className="text-muted mb-0">Track team rosters, captains, and shared progress.</p>
          </div>
        </div>
      </div>
      <div className="col-md-6 col-xl-4">
        <div className="card h-100 shadow-sm border-0">
          <div className="card-body">
            <h2 className="h5">Activities</h2>
            <p className="text-muted mb-0">Review workout and movement activity summaries.</p>
          </div>
        </div>
      </div>
      <div className="col-md-6 col-xl-4">
        <div className="card h-100 shadow-sm border-0">
          <div className="card-body">
            <h2 className="h5">Leaderboard</h2>
            <p className="text-muted mb-0">Monitor standings and competition scores.</p>
          </div>
        </div>
      </div>
      <div className="col-md-6 col-xl-4">
        <div className="card h-100 shadow-sm border-0">
          <div className="card-body">
            <h2 className="h5">Workouts</h2>
            <p className="text-muted mb-0">Discover programming by level and focus area.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;

  return (
    <div className="container py-4">
      <header className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3 mb-4">
        <div className="d-flex align-items-center gap-3">
          <img src={logo} alt="Octofit Tracker Logo" style={{ width: 54, height: 54 }} className="rounded" />
          <div>
            <h1 className="h3 mb-0">Octofit Tracker</h1>
            <small className="text-muted">Multi-tier fitness dashboard</small>
          </div>
        </div>
        <div className="badge bg-dark-subtle text-dark border">
          {codespaceName ? `Codespace: ${codespaceName}` : 'Localhost mode'}
        </div>
      </header>

      <nav className="nav nav-pills flex-wrap gap-2 mb-4">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              `nav-link ${isActive ? 'active' : 'text-dark'}`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/workouts" element={<Workouts />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
