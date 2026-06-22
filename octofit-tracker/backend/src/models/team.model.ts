import mongoose from 'mongoose';

export interface TeamDocument extends mongoose.Document {
  name: string;
  description: string;
  members: mongoose.Types.ObjectId[];
}

const teamSchema = new mongoose.Schema<TeamDocument>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

const Team = mongoose.model<TeamDocument>('Team', teamSchema);
export default Team;
