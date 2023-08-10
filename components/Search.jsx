import { useState , useEffect} from 'react';
// import axios from 'axios';
import CourseCard from './Cards/CourseCard';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    instructorName: '',
  });
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchQuery((prevQuery) => ({
      ...prevQuery,
      [name]: value,
    }));
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');

      // Create the query string from the search criteria
      const queryString = new URLSearchParams(searchQuery).toString();
      const url = `/api/courses/search?${queryString}&page=${currentPage}&limit=${8}`;
    //   const response = await axios.get(`/api/courses/search?${queryString}`);

    const response = await fetch(url);
    console.log(await response.json())
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      setCourses(response.data.results);
      setTotalPages(response.data.totalPages);
      setLoading(false);
    } catch (error) {
      setError('An error occurred while fetching courses.');
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Fetch data for the new page here
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">Course Search</h1>
      <form onSubmit={handleSearch} className="mb-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <input
            type="text"
            name="title"
            value={searchQuery.title}
            onChange={handleChange}
            placeholder="Title"
            className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="description"
            value={searchQuery.description}
            onChange={handleChange}
            placeholder="Description"
            className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="category"
            value={searchQuery.category}
            onChange={handleChange}
            placeholder="Category"
            className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            name="price"
            value={searchQuery.price}
            onChange={handleChange}
            placeholder="Price"
            className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="instructorName"
            value={searchQuery.instructorName}
            onChange={handleChange}
            placeholder="Instructor Name"
            className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
        >
          Search
        </button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {courses.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      )}
      {/* Pagination */}
      {!loading && !error && totalPages > 1 && (
        <div className="flex justify-center mt-4">
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (page) => (
              <button
                key={page}
                className={`mx-1 px-3 py-1 ${
                  currentPage === page
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-300 text-gray-600'
                } rounded-md`}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
