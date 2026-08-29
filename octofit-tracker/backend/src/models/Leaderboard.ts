import mongoose, { Schema, type Document } from 'mongoose';

export interface ILeaderboard extends Document {
  rank: number;
  name: string;
  team: string;
  points: number;
}

const leaderboardSchema = new Schema<ILeaderboard>(
  {
    rank: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    team: { type: String, required: true },
    points: { type: Number, required: true },
  },
  {
    timestamps: true,
  },
);

export const Leaderboard = mongoose.model<ILeaderboard>('Leaderboard', leaderboardSchema);
