import { Router, Request, Response } from 'express';
import User from './models/user.model.js';
import Team from './models/team.model.js';
import Activity from './models/activity.model.js';
import LeaderboardEntry from './models/leaderboard.model.js';
import Workout from './models/workout.model.js';

const router = Router();

const handleError = (res: Response, error: unknown) => {
  console.error(error);
  res.status(500).json({ error: 'Unable to load OctoFit data' });
};

router.get('/users', async (_req: Request, res: Response) => {
  try {
    const users = await User.find().lean();
    res.json({ message: 'OctoFit users endpoint', users });
  } catch (error) {
    handleError(res, error);
  }
});

router.get('/teams', async (_req: Request, res: Response) => {
  try {
    const teams = await Team.find().populate('members', 'name email').lean();
    res.json({ message: 'OctoFit teams endpoint', teams });
  } catch (error) {
    handleError(res, error);
  }
});

router.get('/activities', async (_req: Request, res: Response) => {
  try {
    const activities = await Activity.find().populate('user', 'name email').lean();
    res.json({ message: 'OctoFit activities endpoint', activities });
  } catch (error) {
    handleError(res, error);
  }
});

router.get('/leaderboard', async (_req: Request, res: Response) => {
  try {
    const leaderboard = await LeaderboardEntry.find().populate('user', 'name').lean();
    res.json({ message: 'OctoFit leaderboard endpoint', leaderboard });
  } catch (error) {
    handleError(res, error);
  }
});

router.get('/workouts', async (_req: Request, res: Response) => {
  try {
    const workouts = await Workout.find().lean();
    res.json({ message: 'OctoFit workouts endpoint', workouts });
  } catch (error) {
    handleError(res, error);
  }
});

export default router;
