// models/course.js

import { Schema, model, models } from 'mongoose';

const moduleSchema = new Schema({
    moduleId: {
        type: Schema.Types.ObjectId,
        default: mongoose.Types.ObjectId,
        index: true,
        unique: true,
      },
    header: {
      type: String,
      required: true,
    },
    objectives: {
      type: String,
    },
    image: {
      type: String,
    },
    video: {
      type: String,
    },
    content: [{
      type: String,
    }],
  }, { timestamps: true });
  


const courseSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  instructors: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  duration: {
    type: Number,
  
  },
  level: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner',
  },
  category: {
    type: String,
    
  },
  price: {
    type: Number,
   
  },
  thumbnailUrl: {
    type: String,
    
  },
  videoUrl: {
    type: String,
    
  },
  modules: [moduleSchema],
  enrolledLearners: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  courseReviews: [{
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    rating: {
      type: Number,
     
    },
    review: String,
  }],
 
  likes: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],

}, { timestamps: true });

// Create a text index on the title, description, category, and instructors.name fields
courseSchema.index({ title: 'text', description: 'text', category: 'text', 'instructors.name': 'text' });

const Course = models.Course || model("User", courseSchema);

export default Course;
