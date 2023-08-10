// Frontend code example
export const fetchLearnerById = async (learnerId) => {
    const res = await fetch(`/api/learners?learnerId=${learnerId}`);
    const data = await res.json();
    return data;
  };
  