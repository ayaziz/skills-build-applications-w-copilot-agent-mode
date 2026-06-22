import { useEffect, useState } from 'react';
import { apiBaseUrl } from '../App';

export default function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadLeaderboard() {
      try {
        const response = await fetch(`${apiBaseUrl}/leaderboard`);
        const data = await response.json();

        if (Array.isArray(data) && data.length > 0) {
          setEntries(data);
        } else if (Array.isArray(data.leaderboard)) {
          setEntries(data.leaderboard);
        } else {
          setEntries([]);
        }
      } catch (fetchError) {
        setError(fetchError);
      }
    }

    loadLeaderboard();
  }, []);

  return (
    <section>
      <h2>Leaderboard</h2>
      {error && <p className="error">Unable to load leaderboard.</p>}
      {entries.length === 0 ? (
        <p>No leaderboard entries available.</p>
      ) : (
        <ol>
          {entries.map((entry) => (
            <li key={entry._id ?? entry.id ?? `${entry.user?._id}-${entry.rank}`}>
              {entry.user?.name ?? 'Unknown'} - {entry.score} points
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
