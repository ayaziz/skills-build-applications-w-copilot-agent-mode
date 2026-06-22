import mongoose from 'mongoose';

export interface UserDocument extends mongoose.Document {
  name: string;
  email: string;
  role: string;
  joinedAt: Date;
}

const userSchema = new mongoose.Schema<UserDocument>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true, default: 'member' },
  joinedAt: { type: Date, required: true, default: () => new Date() }
});

const User = mongoose.model<UserDocument>('User', userSchema);
export default User;
