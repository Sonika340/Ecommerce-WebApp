import { useEffect } from "react";

import AdminCourseCard from "../components/Course/AdminCourseCard";

import { useCourse } from "../state-mangement/CourseContextAPI";

const DeleteCourse = () => {
  const {
    courses,
    loading,
    error,
    getCourses,
  } = useCourse();

  useEffect(() => {
    getCourses();
  }, []);

  if (loading) {
    return <h2>Loading courses...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <section className="courses-page">

      <div className="courses-header">
        <h1>Delete Course</h1>

        <p>
          Manage and delete courses from the platform.
        </p>
      </div>

      {courses.length === 0 ? (
        <p>No courses available.</p>
      ) : (
        <div className="courses-grid">

          {courses.map((course) => (
            <AdminCourseCard
              key={course._id}
              course={course}
            />
          ))}

        </div>
      )}

    </section>
  );
};

export default DeleteCourse;