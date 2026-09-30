import api from "./axios";

/* @Create Register 
HTTP METHOD IS POST 
RESPONSE STATUS CODE is 201 
RESPONSE STATUS TEXT is created 
this global  view
must have request payload 
response has data or not 
*/

export const createUser = async (payload) => {
  const { data } = await api.post("/auth/register", payload); //we http post request for creating new user
  return data;
};

/*------------------ACTIVATION SERVICE --------------------*/
/* VALIDATE ACTIVATION SERVICE 
HTTP METHOD IS POST 
RESPONSE STATUS CODE is 201 
RESPONSE STATUS TEXT is created 
this global  view
must have request payload 
response has data  
*/
export const ActivationServiceApi = async (payload) => {
  const { data } = await api.post("/auth/activate-user", payload);
  return data;
};

/*------------------ACTIVATION SERVICE ENDS HERE--------------------*/

export const Login = async (payload) => {
  const { data } = await api.post("/auth/login", payload);
  console.log(data.user.name);
  return data;
};

/*===================LOGOUT SERVICE API -------------------*/

// HTTP METHOD IS GET
// RESPONSE STATUS CODE is 200
// RESPONSE STATUS TEXT is ok
// this private  view
// it does not have request payload
// response has data
// URL /auth/logout

export const LogoutServiceApi = async () => {
  const { data } = await api.get("/auth/logout");
  console.log(data);
  return data;
};

/*-------------------GET ME USER or current user data  -----------------------*/
/*
HTTP METHOD IS GET 
RESPONSE STATUS CODE is 200 
RESPONSE STATUS TEXT is ok 
this private  view
it does not have request payload 
response has data  
URL /auth/me
*/
export const GetMe = async () => {
  const { data } = await api.get("/auth/me");
  return data;
};

/*-------------------UPDATE USER INFO  -----------------------*/
/*
HTTP METHOD IS PUT 
RESPONSE STATUS CODE is 200
RESPONSE STATUS TEXT is ok 
this private  view
it has have request payload 
response has data  
URL auth/update-user-info
*/
export const UpdateUserInfoApi = async (payload) => {
  const { data } = await api.put("/auth/update-user-info", payload);
  console.log(data);
  return data;
};

/*-------------------UPDATE USER PROFILE PIC  -----------------------*/
/*
HTTP METHOD IS PUT 
RESPONSE STATUS CODE is 200
RESPONSE STATUS TEXT is ok 
this private  view
it has have request payload 
response has data  
URL auth/update-user-profile-picture

*/

export const UpdateProfilePictureApi = async (payload) => {
  const { data } = await api.put("auth/update-user-profile-picture", payload);
  return data;
};
