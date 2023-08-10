// models/Learner.js
import { Schema, model, models } from 'mongoose';
import User from './user';

const learnerSchema = new Schema(
  {
    // Additional fields for learners
    coursesEnrolled: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
    // ... Add other learner-specific fields
  },
  { timestamps: true }
);

const Learner = models.Learner ||  User.discriminator('Learner', learnerSchema);

export default Learner;
