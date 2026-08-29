import express from 'express';
import { connectDatabase, getApiBaseUrl } from './config/database.js';
import { Activity } from './models/Activity.js';
import { Leaderboard } from './models/Leaderboard.js';
import { Team } from './models/Team.js';
import { User } from './models/User.js';
import { Workout } from './models/Workout.js';

const app = express();
const PORT = Number(process.env.PORT) || 8000;
const API_BASE_URL = getApiBaseUrl();

app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'OctoFit Tracker API is running' });
});

app.get('/api/users', async (_req, res) => {
  const users = await User.find();
  res.json(users);
});

app.get('/api/teams', async (_req, res) => {
  const teams = await Team.find();
  res.json(teams);
});

app.get('/api/activities', async (_req, res) => {
  const activities = await Activity.find();
  res.json(activities);
});

app.get('/api/leaderboard', async (_req, res) => {
  const leaderboard = await Leaderboard.find().sort({ rank: 1 });
  res.json(leaderboard);
});

app.get('/api/workouts', async (_req, res) => {
  const workouts = await Workout.find();
  res.json(workouts);
});

const startServer = async () => {
  try {
    await connectDatabase();

    app.listen(PORT, () => {
      console.log(`API server listening on ${API_BASE_URL}`);
    });
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  }
};

startServer();
