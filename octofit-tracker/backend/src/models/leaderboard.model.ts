import mongoose from 'mongoose';

export interface LeaderboardEntryDocument extends mongoose.Document {
  user: mongoose.Types.ObjectId;
  score: number;
  rank: number;
}

const leaderboardSchema = new mongoose.Schema<LeaderboardEntryDocument>({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  score: { type: Number, required: true },
  rank: { type: Number, required: true }
});

const LeaderboardEntry = mongoose.model<LeaderboardEntryDocument>('LeaderboardEntry', leaderboardSchema);
export default LeaderboardEntry;
