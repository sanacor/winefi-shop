import axios from "axios";

const API_URL = "/v1/";//CORS 해결을 위해 proxy 사용

class AuthService {
  login(userId, userPassword, fcmToken) {
    return axios
      .post(API_URL + "signin/web", { userId, userPassword, fcmToken})
      .then((response) => {
        console.log(response);
        console.log("ATATATAT : ", response.data.data.access_token);
        if (response.data.data.access_token) {
          localStorage.setItem("user", JSON.stringify(response.data.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, password) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password,
    });
  }
}

export default new AuthService();
