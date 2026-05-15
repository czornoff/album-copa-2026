import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  image: {
    type: String,
  },
  providerId: {
    type: String,
    unique: true,
    sparse: true,
  },
  stickers: [
    {
      code: { type: String, required: true },
      quantity: { type: Number, default: 1 },
    }
  ],
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', UserSchema);
