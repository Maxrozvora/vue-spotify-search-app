export const getTokenParams = (hashString) => {
  return hashString
    .slice(1)
    .split("&")
    .reduce((prev, curr) => {
      const [title, value] = curr.split("=");
      prev[title] = value;
      return prev;
    }, {});
};

export const setAuthHeader = (axiosInstance, token) => {
  try {
    if (token) {
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;
    }
  } catch (error) {
    console.log("Error setting auth", error);
  }
};

export const removeAuthHeader = (axiosInstance) => {
  try {
    delete axiosInstance.defaults.headers.common["Authorization"];
  } catch (error) {
    console.log("Error resetting auth", error);
  }
};

export const getExpirationTime = (expires_in) => {
  return new Date().getTime() + parseInt(expires_in) * 1000;
};

export const isTokenExpired = (tokenExpirationTime) => {
  return new Date().getTime() > tokenExpirationTime;
};
