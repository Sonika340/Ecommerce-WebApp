import api from "./axios";

export const getLayout = async (type) => {
  const { data } = await api.get("/layout/get-layout", {
    params: { type },
  });

  return data;
};

export const createLayout = async (payload) => {
  const { data } = await api.post(
    "/layout/create-layout",
    payload
  );

  return data;
};

export const updateLayout = async (payload) => {
  const { data } = await api.put(
    "/layout/update-layout",
    payload
  );

  return data;
};