import { useEffect } from "react";

import CourseCard from "../components/Course/CourseCard";

import { useCourse } from "../state-mangement/CourseContextAPI";

const Courses = () => {
  const {
    courses,
    loading,
    error,
    getCourses,
  } = useCourse();

  useEffect(() => {
    getCourses();
  }, []);

  // Loading
  if (loading) {
    return (
      <div>
        <h2>Loading courses...</h2>
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div>
        <h2>{error}</h2>
      </div>
    );
  }

  return (
    <section className="courses-page">

      <div className="courses-header">
        <h1>All Courses</h1>

        <p>
          Explore our courses and start learning today.
        </p>
      </div>

      {courses.length === 0 ? (
        <p>No courses available.</p>
      ) : (
        <div className="courses-grid">

          {courses.map((course) => (
            <CourseCard
              key={course._id}
              course={course}
            />
          ))}

        </div>
      )}

    </section>
  );
};

export default Courses;