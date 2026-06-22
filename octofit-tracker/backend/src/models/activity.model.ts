import mongoose from 'mongoose';

export interface ActivityDocument extends mongoose.Document {
  user: mongoose.Types.ObjectId;
  type: string;
  duration: number;
  caloriesBurned: number;
  date: Date;
}

const activitySchema = new mongoose.Schema<ActivityDocument>({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  duration: { type: Number, required: true },
  caloriesBurned: { type: Number, required: true },
  date: { type: Date, required: true }
});

const Activity = mongoose.model<ActivityDocument>('Activity', activitySchema);
export default Activity;
