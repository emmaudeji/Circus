// models/Tutor.js
import { Schema, model, models } from 'mongoose';
import User from './user';

const tutorSchema = new Schema(
  {
    // Additional fields for tutors
    coursesTeaching: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
    // ... Add other tutor-specific fields
  },
  { timestamps: true }
);

const Tutor = models.Tutor || User.discriminator('Tutor', tutorSchema);

export default Tutor;