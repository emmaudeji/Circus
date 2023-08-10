// controllers/learnerController.js
// just for reference; this is not yet in use

import Learner from "@/model/learner";

// Function to create a new learner
const createLearner = async (req, res) => {
  const { firstName, lastName, email, password, profileImg } = req.body;

  try {
    const newLearner = new Learner({ firstName, lastName, email, password, profileImg });
    await newLearner.save();

    res.status(201).json(newLearner);
  } catch (err) {
    res.status(500).json({ error: 'Error creating learner' });
  }
};

// Function to get all learners
const getAllLearners = async (req, res) => {
  try {
    const learners = await Learner.find();
    res.status(200).json(learners);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching learners' });
  }
};

// Function to get a specific learner by ID
const getLearnerById = async (req, res) => {
  const learnerId = req.params.learnerId;

  try {
    const learner = await Learner.findById(learnerId);
    if (!learner) {
      return res.status(404).json({ error: 'Learner not found' });
    }
    res.status(200).json(learner);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching learner' });
  }
};

// Function to update a learner by ID
const updateLearner = async (req, res) => {
  const learnerId = req.params.learnerId;
  const updates = req.body;

  try {
    const learner = await Learner.findByIdAndUpdate(learnerId, updates, { new: true });
    if (!learner) {
      return res.status(404).json({ error: 'Learner not found' });
    }
    res.status(200).json(learner);
  } catch (err) {
    res.status(500).json({ error: 'Error updating learner' });
  }
};

// Function to delete a learner by ID
const deleteLearner = async (req, res) => {
  const learnerId = req.params.learnerId;

  try {
    const learner = await Learner.findByIdAndDelete(learnerId);
    if (!learner) {
      return res.status(404).json({ error: 'Learner not found' });
    }
    res.status(200).json({ message: 'Learner deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting learner' });
  }
};

module.exports = {
  createLearner,
  getAllLearners,
  getLearnerById,
  updateLearner,
  deleteLearner,
};
