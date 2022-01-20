export default function authHeader() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.access_token) {
    //For Spring Boot back-end
    return { Authorization: "Bearer " + user.access_token };

    // for Node.js Express back-end
    //return { "x-access-token": user.access_token };
  } else {
    return {};
  }
}
