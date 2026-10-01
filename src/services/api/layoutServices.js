import api from "./axios";

// ===============================
// GET LAYOUT
// GET /api/v1/layout/get-layout?type=banner
// type = banner | faq | categories
// ===============================

export const getLayout = async (type) => {
  const { data } = await api.get("/layout/get-layout", {
    params: {
      type,
    },
  });

  return data;
};

// ===============================
// CREATE LAYOUT
// POST /api/v1/layout/create-layout
// Admin only
// ===============================

export const createLayout = async (payload) => {
  const { data } = await api.post(
    "/layout/create-layout",
    payload
  );

  return data;
};

// ===============================
// UPDATE LAYOUT
// PUT /api/v1/layout/update-layout
// Admin only
// ===============================

export const updateLayout = async (payload) => {
  const { data } = await api.put(
    "/layout/update-layout",
    payload
  );

  return data;
};