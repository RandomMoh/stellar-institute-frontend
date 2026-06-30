import React, { createContext, useContext, useState, useEffect } from 'react';

const CoursesContext = createContext();

export function CoursesProvider({ children }) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCourses = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || '/api';
      const response = await fetch(`${apiUrl}/courses`);
      if (response.ok) {
        const data = await response.json();
        setCourses(data);
      } else {
        console.error('Failed to fetch courses');
      }
    } catch (err) {
      console.error('Error fetching courses:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const itCourses = courses.filter(c => c.category === 'it');
  const beautyCourses = courses.filter(c => c.category === 'beauty');

  const refreshCourses = () => {
    setLoading(true);
    fetchCourses();
  };

  return (
    <CoursesContext.Provider value={{ courses, itCourses, beautyCourses, loading, refreshCourses }}>
      {children}
    </CoursesContext.Provider>
  );
}

export function useCourses() {
  return useContext(CoursesContext);
}
