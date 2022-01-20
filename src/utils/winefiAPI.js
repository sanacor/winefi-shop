import axios from "axios";

const API_URL = "/v1/";//CORS 해결을 위해 proxy 사용

class winefiAPI {
  signin = async (userId, userPassword, fcmToken) => {
    return await axios
      .post(API_URL + "signin/web", { userId, userPassword, fcmToken})
      .then((response) => {
        /*
        console.log(response);
        console.log("ATATATAT : ", response.data.data.access_token);
        if (response.data.data.access_token) {
          localStorage.setItem("user", JSON.stringify(response.data.data));
        }
        */
        return response.data.data;
      });
  }

  signout = () => {
    //localStorage.removeItem("user");
  }

  signup = async (username, email, password)  => {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password,
    });
  }
}

export default new winefiAPI();
