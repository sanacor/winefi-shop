import axios from "axios";
import authHeader from "../services/auth-header";

const API_URL = "/v1/";//CORS 해결을 위해 proxy 사용

const API_URL_2 = "/api/";//CORS 해결을 위해 proxy 사용

class winefiAPI {
  signin = async (userId, userPassword, fcmToken) => {
    return await axios
      .post(API_URL + "signin/web", { userId, userPassword, fcmToken})
      .then((response) => {
        
        console.log(response);
        console.log("ATATATAT : ", response.data.data.access_token);
        if (response.data.data.access_token) {
          localStorage.setItem("user", JSON.stringify(response.data.data));
        }
        
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

  retailMylist = async ()  => {
    var a = authHeader();
    console.log(a);

    const res_tt =  await axios.get(API_URL_2 + "retail/mylist", {
      headers: a
    });

    console.log(res_tt);
    return res_tt;
  }
}

export default new winefiAPI();
