// models/Superadmin.js
import { Schema, model, models } from 'mongoose';

const superadminSchema = new Schema(
  {
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
  },
  { timestamps: true }
);

const Superadmin = models.Superadmin || model("Superadmin", superadminSchema);

export default Superadmin;