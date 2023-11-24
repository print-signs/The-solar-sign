export const isAutheticated = () => {
  if (typeof window == "undefined") {
    return true;
  }
  if (localStorage.getItem("jwtToken")) {
    return localStorage.getItem("jwtToken");
  } else {
    return false;
  }
};

export const signout = () => {
  localStorage.removeItem("jwtToken");

  return true;
};
