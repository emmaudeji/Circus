// components/ProgressUpdateForm.js

import { useState } from 'react';

const ProgressUpdateForm = ({ userId, courseId }) => {
  const [progress, setProgress] = useState('');

  const handleChange = (e) => {
    setProgress(e.target.value);
  };

  const handleUpdateProgress = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/updateProgress', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, courseId, progress }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error);
      }

      // Progress updated successfully, handle success message or other actions
    } catch (error) {
      // Handle error
      console.error('Error updating progress:', error.message);
    }
  };

  return (
    <form onSubmit={handleUpdateProgress} className="mb-4">
      <label htmlFor="progress">Enter Progress (%)</label>
      <input
        type="number"
        id="progress"
        name="progress"
        value={progress}
        onChange={handleChange}
        className="border border-gray-400 px-2 py-1 rounded-md"
        min="0"
        max="100"
        required
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
        Update Progress
      </button>
    </form>
  );
};

export default ProgressUpdateForm;
