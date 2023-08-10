import { Schema, model, models } from 'mongoose';

const userSchema = new Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  profileImg: {
    type: String
  },
  role: {
    type: String,
    enum: ['learner', 'tutor', 'superadmin'],
    default: 'learner',
  },
  enrolledCourses: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
  tutoringCourses: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
}, { timestamps: true });

const User = models.User || model("User", userSchema);

export default User;