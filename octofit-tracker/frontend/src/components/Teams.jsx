import { useEffect, useState } from 'react';

const teamsApiUrl = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams`
  : 'http://localhost:8000/api/teams';

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadTeams() {
      try {
        const response = await fetch(teamsApiUrl);
        const data = await response.json();

        if (Array.isArray(data) && data.length > 0) {
          setTeams(data);
        } else if (Array.isArray(data.teams)) {
          setTeams(data.teams);
        } else {
          setTeams([]);
        }
      } catch (fetchError) {
        setError(fetchError);
      }
    }

    loadTeams();
  }, []);

  return (
    <section>
      <h2>Teams</h2>
      {error && <p className="error">Unable to load teams.</p>}
      {teams.length === 0 ? (
        <p>No teams available.</p>
      ) : (
        <ul>
          {teams.map((team) => (
            <li key={team._id ?? team.id ?? team.name}>
              <strong>{team.name}</strong>: {team.description}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
