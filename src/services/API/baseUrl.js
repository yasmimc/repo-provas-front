const API_URL =
    process.env.NODE_ENV === "production"
        ? "https://repo-provas-project.herokuapp.com/"
        : "http://localhost:4000/";

console.log(process.env.NODE_ENV);

export default API_URL;
