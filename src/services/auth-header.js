export default function authHeader() {
  console.log("=============authHeader1");
  const user = JSON.parse(localStorage.getItem("user"));
  console.log("=============authHeader2");
  console.log(user);
  if (user && user.access_token) {
    //For Spring Boot back-end
    console.log("=============authHeader3");
    return { Authorization: "Bearer " + user.access_token };

    // for Node.js Express back-end
    //return { "x-access-token": user.access_token };
  } else {
    return {};
  }
}
