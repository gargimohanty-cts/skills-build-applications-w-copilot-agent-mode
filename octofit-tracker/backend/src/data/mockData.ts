import mongoose from 'mongoose';

const user1Id = new mongoose.Types.ObjectId().toHexString();
const user2Id = new mongoose.Types.ObjectId().toHexString();
const user3Id = new mongoose.Types.ObjectId().toHexString();
const teamRedId = new mongoose.Types.ObjectId().toHexString();
const teamBlueId = new mongoose.Types.ObjectId().toHexString();
const activity1Id = new mongoose.Types.ObjectId().toHexString();
const activity2Id = new mongoose.Types.ObjectId().toHexString();
const activity3Id = new mongoose.Types.ObjectId().toHexString();
const workout1Id = new mongoose.Types.ObjectId().toHexString();
const workout2Id = new mongoose.Types.ObjectId().toHexString();
const workout3Id = new mongoose.Types.ObjectId().toHexString();

export const mockUsers = [
  {
    _id: user1Id,
    name: 'Ava Thompson',
    email: 'ava@example.com',
    fitnessLevel: 'intermediate',
    team: 'team-red',
  },
  {
    _id: user2Id,
    name: 'Marcus Lee',
    email: 'marcus@example.com',
    fitnessLevel: 'advanced',
    team: 'team-blue',
  },
  {
    _id: user3Id,
    name: 'Priya Patel',
    email: 'priya@example.com',
    fitnessLevel: 'beginner',
    team: 'team-red',
  },
];

export const mockTeams = [
  {
    _id: teamRedId,
    name: 'Red Rockets',
    captain: 'ava@example.com',
    members: ['ava@example.com', 'priya@example.com'],
  },
  {
    _id: teamBlueId,
    name: 'Blue Falcons',
    captain: 'marcus@example.com',
    members: ['marcus@example.com'],
  },
];

export const mockActivities = [
  {
    _id: activity1Id,
    userId: user1Id,
    type: 'run',
    durationMinutes: 30,
    distanceKm: 5.4,
    date: '2026-08-29',
  },
  {
    _id: activity2Id,
    userId: user2Id,
    type: 'strength',
    durationMinutes: 45,
    distanceKm: 0,
    date: '2026-08-28',
  },
  {
    _id: activity3Id,
    userId: user3Id,
    type: 'walk',
    durationMinutes: 20,
    distanceKm: 2.1,
    date: '2026-08-26',
  },
];

export const mockLeaderboard = [
  { rank: 1, name: 'Marcus Lee', team: 'Blue Falcons', points: 980 },
  { rank: 2, name: 'Ava Thompson', team: 'Red Rockets', points: 910 },
  { rank: 3, name: 'Priya Patel', team: 'Red Rockets', points: 760 },
];

export const mockWorkouts = [
  {
    _id: workout1Id,
    title: 'Cardio Blast',
    level: 'intermediate',
    durationMinutes: 25,
    focus: 'endurance',
  },
  {
    _id: workout2Id,
    title: 'Strength Foundations',
    level: 'beginner',
    durationMinutes: 30,
    focus: 'strength',
  },
  {
    _id: workout3Id,
    title: 'Interval Power',
    level: 'advanced',
    durationMinutes: 20,
    focus: 'speed',
  },
];
