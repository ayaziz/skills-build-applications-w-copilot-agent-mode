import { useEffect, useState } from 'react';
import { apiBaseUrl } from '../App';

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadTeams() {
      try {
        const response = await fetch(`${apiBaseUrl}/teams`);
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
