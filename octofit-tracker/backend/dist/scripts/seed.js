"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const database_js_1 = require("../config/database.js");
const Activity_js_1 = require("../models/Activity.js");
const Team_js_1 = require("../models/Team.js");
const User_js_1 = require("../models/User.js");
const Leaderboard_js_1 = require("../models/Leaderboard.js");
const Workout_js_1 = require("../models/Workout.js");
const mockData_js_1 = require("../data/mockData.js");
console.log('Seed the octofit_db database with test data');
const seedDatabase = async () => {
    await (0, database_js_1.connectDatabase)();
    const db = mongoose_1.default.connection.db;
    if (!db) {
        throw new Error('MongoDB database connection is not available');
    }
    await db.dropDatabase();
    const [users, teams, activities, leaderboard, workouts] = await Promise.all([
        User_js_1.User.insertMany(mockData_js_1.mockUsers),
        Team_js_1.Team.insertMany(mockData_js_1.mockTeams),
        Activity_js_1.Activity.insertMany(mockData_js_1.mockActivities),
        Leaderboard_js_1.Leaderboard.insertMany(mockData_js_1.mockLeaderboard),
        Workout_js_1.Workout.insertMany(mockData_js_1.mockWorkouts),
    ]);
    console.log(`Seed complete: ${users.length} users, ${teams.length} teams, ${activities.length} activities, ${leaderboard.length} leaderboard entries, ${workouts.length} workouts inserted into octofit_db.`);
};
seedDatabase()
    .catch((error) => {
    console.error('Failed to seed database:', error);
    process.exitCode = 1;
})
    .finally(async () => {
    await mongoose_1.default.disconnect();
});
