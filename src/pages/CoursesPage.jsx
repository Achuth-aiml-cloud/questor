import React, { useState, useEffect } from 'react';
import { FaSearch, FaStar, FaFilter, FaClock, FaUserGraduate, FaChevronDown, FaChevronUp, FaBookmark } from 'react-icons/fa';
import Navbar from "../components/Navbar"

const CoursesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedDuration, setSelectedDuration] = useState('all');
  const [selectedRating, setSelectedRating] = useState(0);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [showFilters, setShowFilters] = useState(true);
  const [categoryOpen, setCategoryOpen] = useState(true);
  const [levelOpen, setLevelOpen] = useState(true);
  const [durationOpen, setDurationOpen] = useState(true);
  const [ratingOpen, setRatingOpen] = useState(true);
  
  // Mock courses data - all tech-related
  const courses = [
    {
      id: 1,
      title: "Complete Web Development Bootcamp",
      instructor: "Jessica Martinez",
      rating: 4.9,
      reviews: 2845,
      students: 42650,
      duration: "12 weeks",
      level: "Beginner",
      category: "Web Development",
      image: "/images/web-dev.jpg",
      price: 89.99,
      description: "Learn HTML, CSS, JavaScript, React, Node.js and more to become a full-stack web developer."
    },
    {
      id: 2,
      title: "Advanced Python Programming",
      instructor: "Michael Chen",
      rating: 4.8,
      reviews: 1923,
      students: 35210,
      duration: "8 weeks",
      level: "Advanced",
      category: "Programming",
      image: "/images/python.jpg",
      price: 79.99,
      description: "Master advanced Python concepts including decorators, generators, multithreading, and more."
    },
    {
      id: 3,
      title: "Data Science Fundamentals",
      instructor: "Dr. Sarah Williams",
      rating: 4.7,
      reviews: 1562,
      students: 28460,
      duration: "10 weeks",
      level: "Intermediate",
      category: "Data Science",
      image: "/images/data-science.jpg",
      price: 94.99,
      description: "Learn data analysis, visualization, machine learning basics with Python and R."
    },
    {
      id: 4,
      title: "Machine Learning A-Z",
      instructor: "Dr. Alan Wong",
      rating: 4.9,
      reviews: 2103,
      students: 31580,
      duration: "14 weeks",
      level: "Advanced",
      category: "Machine Learning",
      image: "/images/ml.jpg",
      price: 99.99,
      description: "Comprehensive machine learning course covering supervised and unsupervised learning algorithms."
    },
    {
      id: 5,
      title: "iOS App Development with Swift",
      instructor: "James Wilson",
      rating: 4.6,
      reviews: 1235,
      students: 18750,
      duration: "10 weeks",
      level: "Intermediate",
      category: "Mobile Development",
      image: "/images/ios-dev.jpg",
      price: 84.99,
      description: "Create stunning iOS applications using Swift and the latest Apple frameworks."
    },
    {
      id: 6,
      title: "Ethical Hacking Bootcamp",
      instructor: "Robert Garcia",
      rating: 4.8,
      reviews: 1876,
      students: 22340,
      duration: "8 weeks",
      level: "Intermediate",
      category: "Cybersecurity",
      image: "/images/ethical-hacking.jpg",
      price: 89.99,
      description: "Learn penetration testing, vulnerability assessment, and security best practices."
    },
    {
      id: 7,
      title: "DevOps Engineering Masterclass",
      instructor: "Emma Johnson",
      rating: 4.7,
      reviews: 1402,
      students: 16820,
      duration: "12 weeks",
      level: "Advanced",
      category: "DevOps",
      image: "/images/devops.jpg",
      price: 94.99,
      description: "Master CI/CD, Docker, Kubernetes, and cloud deployment strategies."
    },
    {
      id: 8,
      title: "React.js for Beginners",
      instructor: "David Miller",
      rating: 4.9,
      reviews: 2134,
      students: 38670,
      duration: "6 weeks",
      level: "Beginner",
      category: "Web Development",
      image: "/images/react.jpg",
      price: 69.99,
      description: "Start building interactive web applications with React.js from scratch."
    },
    {
      id: 9,
      title: "Blockchain Development",
      instructor: "Sophia Lee",
      rating: 4.6,
      reviews: 1087,
      students: 12480,
      duration: "10 weeks",
      level: "Advanced",
      category: "Blockchain",
      image: "/images/blockchain.jpg",
      price: 99.99,
      description: "Learn to build decentralized applications using Ethereum and Solidity."
    },
    {
      id: 10,
      title: "UI/UX Design Principles",
      instructor: "Thomas Anderson",
      rating: 4.8,
      reviews: 1659,
      students: 24370,
      duration: "8 weeks",
      level: "Intermediate",
      category: "Design",
      image: "/images/ux-design.jpg",
      price: 79.99,
      description: "Master the principles of user interface and user experience design."
    },
    {
      id: 11,
      title: "Cloud Computing with AWS",
      instructor: "Jennifer Lewis",
      rating: 4.7,
      reviews: 1326,
      students: 19850,
      duration: "10 weeks",
      level: "Intermediate",
      category: "Cloud Computing",
      image: "/images/aws.jpg",
      price: 89.99,
      description: "Comprehensive guide to AWS services and cloud architecture patterns."
    },
    {
      id: 12,
      title: "Game Development with Unity",
      instructor: "Christopher Davis",
      rating: 4.9,
      reviews: 1873,
      students: 27680,
      duration: "12 weeks",
      level: "Beginner",
      category: "Game Development",
      image: "/images/unity.jpg",
      price: 84.99,
      description: "Create 2D and 3D games using the Unity game engine and C#."
    },
    {
      id: 13,
      title: "Advanced JavaScript Patterns",
      instructor: "Oliver Smith",
      rating: 4.8,
      reviews: 1432,
      students: 22150,
      duration: "6 weeks",
      level: "Advanced",
      category: "Programming",
      image: "/images/javascript.jpg",
      price: 74.99,
      description: "Deep dive into advanced JavaScript design patterns and best practices."
    },
    {
      id: 14,
      title: "Big Data Analytics",
      instructor: "Dr. Emily Parker",
      rating: 4.6,
      reviews: 1126,
      students: 15780,
      duration: "10 weeks",
      level: "Advanced",
      category: "Data Science",
      image: "/images/big-data.jpg",
      price: 94.99,
      description: "Learn to process and analyze large datasets using Hadoop and Spark."
    },
    {
      id: 15,
      title: "Android App Development",
      instructor: "Daniel Kim",
      rating: 4.7,
      reviews: 1527,
      students: 23460,
      duration: "10 weeks",
      level: "Intermediate",
      category: "Mobile Development",
      image: "/images/android-dev.jpg",
      price: 79.99,
      description: "Build native Android applications using Kotlin and Android Studio."
    },
    {
      id: 16,
      title: "Network Security Fundamentals",
      instructor: "Laura Martinez",
      rating: 4.8,
      reviews: 1356,
      students: 18920,
      duration: "8 weeks",
      level: "Intermediate",
      category: "Cybersecurity",
      image: "/images/network-security.jpg",
      price: 84.99,
      description: "Learn to secure networks, implement firewalls, and prevent cyber attacks."
    }
  ];

  // Filter categories for the sidebar
  const categories = [...new Set(courses.map(course => course.category))];
  const levels = ['Beginner', 'Intermediate', 'Advanced'];
  const durations = ['6 weeks', '8 weeks', '10 weeks', '12 weeks', '14 weeks'];

  // Filter courses based on selected filters
  useEffect(() => {
    let filtered = courses;
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(course => 
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(course => course.category === selectedCategory);
    }
    
    // Filter by level
    if (selectedLevel !== 'all') {
      filtered = filtered.filter(course => course.level === selectedLevel);
    }
    
    // Filter by duration
    if (selectedDuration !== 'all') {
      filtered = filtered.filter(course => course.duration === selectedDuration);
    }
    
    // Filter by rating
    if (selectedRating > 0) {
      filtered = filtered.filter(course => course.rating >= selectedRating);
    }
    
    setFilteredCourses(filtered);
  }, [searchTerm, selectedCategory, selectedLevel, selectedDuration, selectedRating]);

  // Function to render star ratings
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <span key={i}>
            {i < fullStars ? (
              <FaStar className="text-yellow-400" />
            ) : i === fullStars && hasHalfStar ? (
              <FaStar className="text-yellow-400 opacity-50" />
            ) : (
              <FaStar className="text-gray-400" />
            )}
          </span>
        ))}
        <span className="ml-1 text-white">{rating.toFixed(1)}</span>
      </div>
    );
  };

  // Toggle mobile filters
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#050A30] to-[#0A1045]">
      <Navbar />
      
      {/* Header */}
      <div className="pt-28 pb-10">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Explore Our <span className="text-blue-400">Tech Courses</span>
            </h1>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto mb-10">
              Discover a wide range of technology courses taught by industry experts. Enhance your skills and advance your career.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <input
                type="text"
                placeholder="Search for courses, topics, or instructors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-blue-900 bg-opacity-50 border border-blue-700 rounded-lg pl-12 pr-4 py-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-blue-300"
              />
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden container mx-auto px-4 mb-6">
        <button
          onClick={toggleFilters}
          className="w-full flex justify-between items-center bg-blue-800 text-white py-3 px-4 rounded-lg"
        >
          <span className="flex items-center"><FaFilter className="mr-2" /> Filters</span>
          {showFilters ? <FaChevronUp /> : <FaChevronDown />}
        </button>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 pb-20">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Filters Sidebar */}
          <div className={`lg:w-1/4 ${showFilters ? 'block' : 'hidden'} lg:block`}>
            <div className="bg-[#0A1045] bg-opacity-80 rounded-lg p-5 shadow-xl border border-blue-900 sticky top-24">
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                <FaFilter className="mr-2" /> Filters
              </h3>
              
              {/* Category Filter */}
              <div className="mb-6">
                <div 
                  className="flex justify-between items-center cursor-pointer" 
                  onClick={() => setCategoryOpen(!categoryOpen)}
                >
                  <h4 className="text-lg font-medium text-white mb-3">Category</h4>
                  {categoryOpen ? <FaChevronUp className="text-blue-400" /> : <FaChevronDown className="text-blue-400" />}
                </div>
                
                {categoryOpen && (
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="category-all"
                        name="category"
                        checked={selectedCategory === 'all'}
                        onChange={() => setSelectedCategory('all')}
                        className="h-4 w-4 text-blue-600 border-blue-700 focus:ring-blue-500"
                      />
                      <label htmlFor="category-all" className="ml-2 text-blue-200">
                        All Categories
                      </label>
                    </div>
                    
                    {categories.map((category, index) => (
                      <div key={index} className="flex items-center">
                        <input
                          type="radio"
                          id={`category-${index}`}
                          name="category"
                          checked={selectedCategory === category}
                          onChange={() => setSelectedCategory(category)}
                          className="h-4 w-4 text-blue-600 border-blue-700 focus:ring-blue-500"
                        />
                        <label htmlFor={`category-${index}`} className="ml-2 text-blue-200">
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Level Filter */}
              <div className="mb-6 border-t border-blue-800 pt-6">
                <div 
                  className="flex justify-between items-center cursor-pointer" 
                  onClick={() => setLevelOpen(!levelOpen)}
                >
                  <h4 className="text-lg font-medium text-white mb-3">Level</h4>
                  {levelOpen ? <FaChevronUp className="text-blue-400" /> : <FaChevronDown className="text-blue-400" />}
                </div>
                
                {levelOpen && (
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="level-all"
                        name="level"
                        checked={selectedLevel === 'all'}
                        onChange={() => setSelectedLevel('all')}
                        className="h-4 w-4 text-blue-600 border-blue-700 focus:ring-blue-500"
                      />
                      <label htmlFor="level-all" className="ml-2 text-blue-200">
                        All Levels
                      </label>
                    </div>
                    
                    {levels.map((level, index) => (
                      <div key={index} className="flex items-center">
                        <input
                          type="radio"
                          id={`level-${index}`}
                          name="level"
                          checked={selectedLevel === level}
                          onChange={() => setSelectedLevel(level)}
                          className="h-4 w-4 text-blue-600 border-blue-700 focus:ring-blue-500"
                        />
                        <label htmlFor={`level-${index}`} className="ml-2 text-blue-200">
                          {level}
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Duration Filter */}
              <div className="mb-6 border-t border-blue-800 pt-6">
                <div 
                  className="flex justify-between items-center cursor-pointer" 
                  onClick={() => setDurationOpen(!durationOpen)}
                >
                  <h4 className="text-lg font-medium text-white mb-3">Duration</h4>
                  {durationOpen ? <FaChevronUp className="text-blue-400" /> : <FaChevronDown className="text-blue-400" />}
                </div>
                
                {durationOpen && (
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="duration-all"
                        name="duration"
                        checked={selectedDuration === 'all'}
                        onChange={() => setSelectedDuration('all')}
                        className="h-4 w-4 text-blue-600 border-blue-700 focus:ring-blue-500"
                      />
                      <label htmlFor="duration-all" className="ml-2 text-blue-200">
                        All Durations
                      </label>
                    </div>
                    
                    {durations.map((duration, index) => (
                      <div key={index} className="flex items-center">
                        <input
                          type="radio"
                          id={`duration-${index}`}
                          name="duration"
                          checked={selectedDuration === duration}
                          onChange={() => setSelectedDuration(duration)}
                          className="h-4 w-4 text-blue-600 border-blue-700 focus:ring-blue-500"
                        />
                        <label htmlFor={`duration-${index}`} className="ml-2 text-blue-200">
                          {duration}
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Rating Filter */}
              <div className="border-t border-blue-800 pt-6">
                <div 
                  className="flex justify-between items-center cursor-pointer" 
                  onClick={() => setRatingOpen(!ratingOpen)}
                >
                  <h4 className="text-lg font-medium text-white mb-3">Rating</h4>
                  {ratingOpen ? <FaChevronUp className="text-blue-400" /> : <FaChevronDown className="text-blue-400" />}
                </div>
                
                {ratingOpen && (
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="rating-all"
                        name="rating"
                        checked={selectedRating === 0}
                        onChange={() => setSelectedRating(0)}
                        className="h-4 w-4 text-blue-600 border-blue-700 focus:ring-blue-500"
                      />
                      <label htmlFor="rating-all" className="ml-2 text-blue-200">
                        All Ratings
                      </label>
                    </div>
                    
                    {[4.5, 4.0, 3.5].map((rating, index) => (
                      <div key={index} className="flex items-center">
                        <input
                          type="radio"
                          id={`rating-${index}`}
                          name="rating"
                          checked={selectedRating === rating}
                          onChange={() => setSelectedRating(rating)}
                          className="h-4 w-4 text-blue-600 border-blue-700 focus:ring-blue-500"
                        />
                        <label htmlFor={`rating-${index}`} className="ml-2 text-blue-200 flex items-center">
                          {rating}+ <FaStar className="text-yellow-400 ml-1" />
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Reset Filters Button */}
              <div className="mt-8 pt-6 border-t border-blue-800">
                <button 
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                    setSelectedLevel('all');
                    setSelectedDuration('all');
                    setSelectedRating(0);
                  }}
                  className="w-full py-3 bg-blue-700 hover:bg-blue-600 text-white rounded-lg transition duration-300"
                >
                  Reset Filters
                </button>
              </div>
            </div>
          </div>
          
          {/* Courses Grid */}
          <div className="lg:w-3/4">
            {filteredCourses.length > 0 ? (
              <>
                <div className="flex justify-between items-center mb-6">
                  <p className="text-blue-200">
                    Showing <span className="text-white font-medium">{filteredCourses.length}</span> courses
                  </p>
                  
                  <select 
                    className="bg-blue-900 bg-opacity-50 border border-blue-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="popular">Sort by: Most Popular</option>
                    <option value="rating">Sort by: Highest Rated</option>
                    <option value="newest">Sort by: Newest</option>
                    <option value="price-low">Sort by: Price (Low to High)</option>
                    <option value="price-high">Sort by: Price (High to Low)</option>
                  </select>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredCourses.map((course) => (
                    <div 
                      key={course.id} 
                      className="bg-[#0A1045] bg-opacity-80 rounded-lg overflow-hidden border border-blue-900 shadow-xl hover:shadow-2xl transition duration-300 hover:border-blue-600 h-full flex flex-col"
                    >
                      <div className="relative">
                        <div className="bg-gray-800 aspect-video flex items-center justify-center">
                          {/* Placeholder for course image */}
                          <div className="text-blue-800 font-bold text-lg">{course.category}</div>
                        </div>
                        <button className="absolute top-3 right-3 bg-blue-900 bg-opacity-70 p-2 rounded-full text-blue-300 hover:text-blue-200 transition duration-300">
                          <FaBookmark />
                        </button>
                      </div>
                      
                      <div className="p-5 flex flex-col flex-grow">
                        <div className="mb-2">
                          <span className="inline-block px-2 py-1 bg-blue-800 bg-opacity-50 text-blue-300 text-xs rounded-full">
                            {course.category}
                          </span>
                          <span className="inline-block ml-2 px-2 py-1 bg-blue-800 bg-opacity-50 text-blue-300 text-xs rounded-full">
                            {course.level}
                          </span>
                        </div>
                        
                        <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">{course.title}</h3>
                        
                        <p className="text-blue-200 text-sm mb-3 flex items-center">
                          <FaUserGraduate className="mr-1 text-blue-400" /> {course.instructor}
                        </p>
                        
                        <div className="mb-3 flex items-center">
                          {renderStars(course.rating)}
                          <span className="ml-2 text-blue-300 text-sm">({course.reviews.toLocaleString()})</span>
                        </div>
                        
                        <p className="text-blue-200 text-sm mb-4 line-clamp-2 flex-grow">
                          {course.description}
                        </p>
                        
                        <div className="flex justify-between items-center text-sm text-blue-300 mb-4">
                          <span className="flex items-center">
                            <FaClock className="mr-1" /> {course.duration}
                          </span>
                          <span>
                            {course.students.toLocaleString()} students
                          </span>
                        </div>
                        
                        <div className="flex justify-between items-center mt-auto">
                          <span className="text-white font-bold">${course.price}</span>
                          <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition duration-300">
                            Enroll Now
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="bg-[#0A1045] bg-opacity-80 rounded-lg p-10 text-center border border-blue-900">
                <h3 className="text-xl font-semibold text-white mb-4">No courses found</h3>
                <p className="text-blue-200 mb-6">Try adjusting your filters or search term to find what you're looking for.</p>
                <button 
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                    setSelectedLevel('all');
                    setSelectedDuration('all');
                    setSelectedRating(0);
                  }}
                  className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-medium transition duration-300"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;