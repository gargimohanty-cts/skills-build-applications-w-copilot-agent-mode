import mongoose, { Schema, type Document } from 'mongoose';

export interface ITeam extends Document {
  name: string;
  captain: string;
  members: string[];
}

const teamSchema = new Schema<ITeam>(
  {
    name: { type: String, required: true },
    captain: { type: String, required: true },
    members: [{ type: String }],
  },
  {
    timestamps: true,
  },
);

export const Team = mongoose.model<ITeam>('Team', teamSchema);
