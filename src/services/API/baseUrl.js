const API_URL =
    process.env.NODE_ENV === "production"
        ? "https://repo-provas-project.herokuapp.com/"
        : "http://localhost:5000/";

export default API_URL;
