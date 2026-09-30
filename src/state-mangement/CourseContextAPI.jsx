import { createContext, useContext, useState } from "react";

import {
  getAllCourses,
  getCourseById,
  createCourse,
  editCourse,
  deleteCourse,
} from "../services/api/courseService";

const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);
  const [currentCourse, setCurrentCourse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getCourses = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getAllCourses();

      console.log("COURSE CONTEXT - ALL COURSES:", response);

      const courseList =
        response?.courses ||
        response?.data?.courses ||
        response?.data ||
        [];

      setCourses(courseList);

      return response;
    } catch (error) {
      console.error("GET COURSES ERROR:", error);

      setError(
        error?.response?.data?.message ||
          "Failed to load courses"
      );

      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getCourse = async (id) => {
    try {
      setLoading(true);
      setError("");

      const response = await getCourseById(id);

      console.log("COURSE CONTEXT - COURSE:", response);

      const course =
        response?.course ||
        response?.data?.course ||
        response?.data ||
        response;

      setCurrentCourse(course);

      return course;
    } catch (error) {
      console.error("GET COURSE ERROR:", error);

      setError(
        error?.response?.data?.message ||
          "Failed to load course"
      );

      throw error;
    } finally {
      setLoading(false);
    }
  };

  const createNewCourse = async (payload) => {
    try {
      setLoading(true);
      setError("");

      const response = await createCourse(payload);

      console.log("CREATE COURSE:", response);

      return response;
    } catch (error) {
      console.error("CREATE COURSE ERROR:", error);

      setError(
        error?.response?.data?.message ||
          "Failed to create course"
      );

      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateCourse = async (id, payload) => {
    try {
      setLoading(true);
      setError("");

      const response = await editCourse(id, payload);

      console.log("UPDATE COURSE:", response);

      return response;
    } catch (error) {
      console.error("UPDATE COURSE ERROR:", error);

      setError(
        error?.response?.data?.message ||
          "Failed to update course"
      );

      throw error;
    } finally {
      setLoading(false);
    }
  };

  const removeCourse = async (id) => {
    try {
      setLoading(true);
      setError("");

      const response = await deleteCourse(id);

      setCourses((prevCourses) =>
        prevCourses.filter(
          (course) => course._id !== id
        )
      );

      if (currentCourse?._id === id) {
        setCurrentCourse(null);
      }

      return response;
    } catch (error) {
      console.error("DELETE COURSE ERROR:", error);

      setError(
        error?.response?.data?.message ||
          "Failed to delete course"
      );

      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <CourseContext.Provider
      value={{
        courses,
        currentCourse,
        loading,
        error,
        getCourses,
        getCourse,
        createNewCourse,
        updateCourse,
        removeCourse,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};

export const useCourse = () => {
  const context = useContext(CourseContext);

  if (!context) {
    throw new Error(
      "useCourse must be used inside CourseProvider"
    );
  }

  return context;
};