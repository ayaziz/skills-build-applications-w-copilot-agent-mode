import { useEffect, useState } from 'react';

const activityApiUrl = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities`
  : 'http://localhost:8000/api/activities';

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadActivities() {
      try {
        const response = await fetch(activityApiUrl);
        const data = await response.json();

        if (Array.isArray(data) && data.length > 0) {
          setActivities(data);
        } else if (Array.isArray(data.activities)) {
          setActivities(data.activities);
        } else {
          setActivities([]);
        }
      } catch (fetchError) {
        setError(fetchError);
      }
    }

    loadActivities();
  }, []);

  return (
    <section>
      <h2>Activities</h2>
      {error && <p className="error">Unable to load activities.</p>}
      {activities.length === 0 ? (
        <p>No activities available.</p>
      ) : (
        <ul>
          {activities.map((activity) => (
            <li key={activity._id ?? activity.id ?? `${activity.type}-${activity.date}`}>
              <strong>{activity.type}</strong> by {activity.user?.name ?? 'Unknown'} - {activity.duration} mins
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
