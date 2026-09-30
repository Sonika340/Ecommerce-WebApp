import api from "./axios";

// ===============================
// GET ALL PUBLIC COURSES
// ===============================
// GET /api/v1/course/get-courses
//
// Public API
// No token required
// ===============================

export const getAllCourses = async () => {
  const { data } = await api.get("/course/get-courses");

  return data;
};


// ===============================
// GET SINGLE COURSE
// ===============================
// GET /api/v1/course/get-course/:id
//
// Public API
// No token required
// ===============================

export const getCourseById = async (id) => {
  const { data } = await api.get(
    `/course/get-course/${id}?t=${Date.now()}`
  );

  return data;
};

// ===============================
// GET COURSE CONTENT
// ===============================
// GET /api/v1/course/get-course-content/:id
//
// Private API
// User must be enrolled
// Token automatically added by axios interceptor
// ===============================

export const getCourseContent = async (id) => {
  const { data } = await api.get(`/course/get-course-content/${id}`);

  return data;
};


// ===============================
// CREATE COURSE
// ===============================
// POST /api/v1/course/create-course
//
// Admin only
// ===============================

export const createCourse = async (payload) => {
  const { data } = await api.post(
    "/course/create-course",
    payload
  );

  return data;
};


// ===============================
// EDIT COURSE
// ===============================
// PUT /api/v1/course/edit-course/:id
//
// Admin only
// ===============================

export const editCourse = async (id, payload) => {
  const { data } = await api.put(
    `/course/edit-course/${id}`,
    payload
  );

  return data;
};


// ===============================
// DELETE COURSE
// ===============================
// DELETE /api/v1/course/delete-course/:id
//
// Admin only
// ===============================

export const deleteCourse = async (id) => {
  const { data } = await api.delete(
    `/course/delete-course/${id}`
  );

  return data;
};


// ===============================
// GET ALL COURSES - ADMIN
// ===============================
// GET /api/v1/course/get-all-course-dashboard
//
// Admin only
// ===============================

export const getAllCoursesAdmin = async () => {
  const { data } = await api.get(
    "/course/get-all-course-dashboard"
  );

  return data;
};


// ===============================
// ADD COURSE REVIEW
// ===============================
// PUT /api/v1/course/add-review/:id
//
// Logged-in user
// ===============================

export const addCourseReview = async (id, payload) => {
  const { data } = await api.put(
    `/course/add-review/${id}`,
    payload
  );

  return data;
};


// ===============================
// ASK COURSE QUESTION
// ===============================
// PUT /api/v1/course/add-question
//
// Logged-in user
// ===============================

export const addCourseQuestion = async (payload) => {
  const { data } = await api.put(
    "/course/add-question",
    payload
  );

  return data;
};


// ===============================
// ANSWER COURSE QUESTION
// ===============================
// PUT /api/v1/course/add-answer
//
// Logged-in user/admin depending on backend logic
// ===============================

export const addCourseAnswer = async (payload) => {
  const { data } = await api.put(
    "/course/add-answer",
    payload
  );

  return data;
};


// ===============================
// ADMIN REPLY TO REVIEW
// ===============================
// PUT /api/v1/course/add-replay
//
// Admin only
// ===============================

export const addCourseReviewReply = async (payload) => {
  const { data } = await api.put(
    "/course/add-replay",
    payload
  );

  return data;
};