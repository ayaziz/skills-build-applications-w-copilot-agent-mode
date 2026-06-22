import { useEffect, useState } from 'react';
import { apiBaseUrl } from '../App';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadWorkouts() {
      try {
        const response = await fetch(`${apiBaseUrl}/workouts`);
        const data = await response.json();

        if (Array.isArray(data) && data.length > 0) {
          setWorkouts(data);
        } else if (Array.isArray(data.workouts)) {
          setWorkouts(data.workouts);
        } else {
          setWorkouts([]);
        }
      } catch (fetchError) {
        setError(fetchError);
      }
    }

    loadWorkouts();
  }, []);

  return (
    <section>
      <h2>Workouts</h2>
      {error && <p className="error">Unable to load workouts.</p>}
      {workouts.length === 0 ? (
        <p>No workouts available.</p>
      ) : (
        <ul>
          {workouts.map((workout) => (
            <li key={workout._id ?? workout.id ?? workout.name}>
              <strong>{workout.name}</strong> — {workout.category}, {workout.durationMinutes} minutes
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
