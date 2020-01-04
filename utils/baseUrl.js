const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://cors-anywhere.herokuapp.com/https://seunjay-reserve.now.sh"
    : "http://localhost:3000";

export default baseURL;
