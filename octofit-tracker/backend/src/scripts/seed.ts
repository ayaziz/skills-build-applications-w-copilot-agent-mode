import { connectDatabase, mongoUri } from '../config/database.js';
import User from '../models/user.model.js';
import Team from '../models/team.model.js';
import Activity from '../models/activity.model.js';
import LeaderboardEntry from '../models/leaderboard.model.js';
import Workout from '../models/workout.model.js';

async function seedDatabase() {
  console.log('Seed the octofit_db database with test data');

  await connectDatabase();
  console.log('Connected to MongoDB at', mongoUri);

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    LeaderboardEntry.deleteMany({}),
    Workout.deleteMany({})
  ]);

  const users = await User.create([
    { name: 'Ari Nakamura', email: 'ari@example.com', role: 'coach' },
    { name: 'Mila Chen', email: 'mila@example.com', role: 'member' },
    { name: 'Jordan Smith', email: 'jordan@example.com', role: 'member' }
  ]);

  const workouts = await Workout.create([
    {
      name: 'Sunrise HIIT',
      category: 'Cardio',
      durationMinutes: 30,
      intensity: 'High',
      description: 'A fast-paced high-intensity interval session for heart-rate training.'
    },
    {
      name: 'Core Strength Builder',
      category: 'Strength',
      durationMinutes: 45,
      intensity: 'Medium',
      description: 'A strength workout focused on core stability and endurance.'
    },
    {
      name: 'Recovery Yoga Flow',
      category: 'Flexibility',
      durationMinutes: 35,
      intensity: 'Low',
      description: 'A gentle yoga flow for recovery and mobility after hard workouts.'
    }
  ]);

  const teams = await Team.create([
    {
      name: 'Ocean Movers',
      description: 'A team focused on consistent training and community support.',
      members: [users[0]._id, users[1]._id]
    },
    {
      name: 'Peak Performers',
      description: 'Competitive athletes pushing for new personal records.',
      members: [users[2]._id]
    }
  ]);

  const activities = await Activity.create([
    {
      user: users[1]._id,
      type: 'Running',
      duration: 42,
      caloriesBurned: 480,
      date: new Date('2026-06-15T07:30:00Z')
    },
    {
      user: users[2]._id,
      type: 'Strength Training',
      duration: 55,
      caloriesBurned: 560,
      date: new Date('2026-06-14T18:00:00Z')
    },
    {
      user: users[0]._id,
      type: 'Yoga',
      duration: 30,
      caloriesBurned: 180,
      date: new Date('2026-06-15T06:00:00Z')
    }
  ]);

  const leaderboard = await LeaderboardEntry.create([
    { user: users[1]._id, score: 1280, rank: 1 },
    { user: users[2]._id, score: 1120, rank: 2 },
    { user: users[0]._id, score: 980, rank: 3 }
  ]);

  console.log('Inserted sample documents:');
  console.log(' - users:', users.length);
  console.log(' - workouts:', workouts.length);
  console.log(' - teams:', teams.length);
  console.log(' - activities:', activities.length);
  console.log(' - leaderboard entries:', leaderboard.length);

  try {
    const baseUrl = process.env.BASE_API_URL ?? 'http://localhost:8000/api';
    const fetchResults = await Promise.all([
      fetch(`${baseUrl}/users`),
      fetch(`${baseUrl}/teams`),
      fetch(`${baseUrl}/activities`),
      fetch(`${baseUrl}/leaderboard`),
      fetch(`${baseUrl}/workouts`)
    ]);

    for (const [index, response] of fetchResults.entries()) {
      const data = await response.json();
      console.log(`API response ${index + 1}:`, data.message ?? `status ${response.status}`);
    }
  } catch (error) {
    console.warn('Unable to verify API route responses. Ensure backend server is running on http://localhost:8000');
  }

  await mongoose.disconnect();
  console.log('Seed complete and disconnected from MongoDB.');
}

seedDatabase().catch((error) => {
  console.error('Seed script failed:', error);
  process.exit(1);
});
