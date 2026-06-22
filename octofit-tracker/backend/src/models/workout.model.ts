import mongoose from 'mongoose';

export interface WorkoutDocument extends mongoose.Document {
  name: string;
  category: string;
  durationMinutes: number;
  intensity: string;
  description: string;
}

const workoutSchema = new mongoose.Schema<WorkoutDocument>({
  name: { type: String, required: true },
  category: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  intensity: { type: String, required: true },
  description: { type: String, required: true }
});

const Workout = mongoose.model<WorkoutDocument>('Workout', workoutSchema);
export default Workout;
