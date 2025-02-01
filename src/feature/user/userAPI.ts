import axios from "axios";

// A mock function to mimic making an async request for data
export async function fetchUserData() {
  return axios.get("https://jsonplaceholder.typicode.com/users");
}
