import axios from "axios";

const API_URL = "http://localhost:3333/";


let axiosConfig = {
  headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      "Access-Control-Allow-Origin": API_URL,
  }
};


class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "v1/signin/web", { username, password }, axiosConfig)
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
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