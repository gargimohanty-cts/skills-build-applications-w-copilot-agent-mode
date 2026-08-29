"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_js_1 = require("./config/database.js");
const Activity_js_1 = require("./models/Activity.js");
const Leaderboard_js_1 = require("./models/Leaderboard.js");
const Team_js_1 = require("./models/Team.js");
const User_js_1 = require("./models/User.js");
const Workout_js_1 = require("./models/Workout.js");
const app = (0, express_1.default)();
const PORT = Number(process.env.PORT) || 8000;
const codespaceName = process.env.CODESPACE_NAME;
const codespaceUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
if (codespaceName) {
    console.log(`CODESPACE_NAME detected: ${codespaceName}`);
    console.log(`Codespace URL: ${codespaceUrl}`);
}
else {
    console.log('No CODESPACE_NAME detected; using localhost URL.');
}
app.use(express_1.default.json());
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', message: 'OctoFit Tracker API is running' });
});
app.get('/api/users', async (_req, res) => {
    const users = await User_js_1.User.find();
    res.json(users);
});
app.get('/api/teams', async (_req, res) => {
    const teams = await Team_js_1.Team.find();
    res.json(teams);
});
app.get('/api/activities', async (_req, res) => {
    const activities = await Activity_js_1.Activity.find();
    res.json(activities);
});
app.get('/api/leaderboard', async (_req, res) => {
    const leaderboard = await Leaderboard_js_1.Leaderboard.find().sort({ rank: 1 });
    res.json(leaderboard);
});
app.get('/api/workouts', async (_req, res) => {
    const workouts = await Workout_js_1.Workout.find();
    res.json(workouts);
});
const startServer = async () => {
    try {
        await (0, database_js_1.connectDatabase)();
        app.listen(PORT, '0.0.0.0', () => {
            console.log(`API server listening on ${codespaceUrl}`);
        });
    }
    catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        process.exit(1);
    }
};
startServer();
