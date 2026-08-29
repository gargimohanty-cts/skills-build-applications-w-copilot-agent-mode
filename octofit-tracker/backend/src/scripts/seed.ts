import mongoose from 'mongoose';
import { connectDatabase } from '../config/database.js';
import { Activity } from '../models/Activity.js';
import { Team } from '../models/Team.js';
import { User } from '../models/User.js';
import { Leaderboard } from '../models/Leaderboard.js';
import { Workout } from '../models/Workout.js';
import { mockActivities, mockLeaderboard, mockTeams, mockUsers, mockWorkouts } from '../data/mockData.js';

console.log('Seed the octofit_db database with test data');

const seedDatabase = async (): Promise<void> => {
  await connectDatabase();

  await mongoose.connection.db.dropDatabase();

  const [users, teams, activities, leaderboard, workouts] = await Promise.all([
    User.insertMany(mockUsers),
    Team.insertMany(mockTeams),
    Activity.insertMany(mockActivities),
    Leaderboard.insertMany(mockLeaderboard),
    Workout.insertMany(mockWorkouts),
  ]);

  console.log(
    `Seed complete: ${users.length} users, ${teams.length} teams, ${activities.length} activities, ${leaderboard.length} leaderboard entries, ${workouts.length} workouts inserted into octofit_db.`,
  );
};

seedDatabase()
  .catch((error: unknown) => {
    console.error('Failed to seed database:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });
