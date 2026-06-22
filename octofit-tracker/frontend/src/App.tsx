import { Link, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities.jsx';
import Leaderboard from './components/Leaderboard.jsx';
import Teams from './components/Teams.jsx';
import Users from './components/Users.jsx';
import Workouts from './components/Workouts.jsx';

function getApiBaseUrl() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;

  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev/api`;
  }

  return 'http://localhost:8000/api';
}

export const apiBaseUrl = getApiBaseUrl();

export default function App() {
  return (
    <div className="app-root">
      <header className="app-header">
        <h1>OctoFit Tracker</h1>
        <p>
          The presentation tier connects to the backend using Codespaces-aware API
          URLs. Define <code>VITE_CODESPACE_NAME</code> in <code>.env.local</code> so
          Codespaces can resolve <code>https://$&#123;VITE_CODESPACE_NAME&#125;-8000.app.github.dev</code>.
          Otherwise the app uses <code>http://localhost:8000/api</code>.
        </p>
        <nav>
          <Link to="/users">Users</Link>
          <Link to="/teams">Teams</Link>
          <Link to="/activities">Activities</Link>
          <Link to="/leaderboard">Leaderboard</Link>
          <Link to="/workouts">Workouts</Link>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Users />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  );
}
