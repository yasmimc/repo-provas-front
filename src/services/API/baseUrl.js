const API_URL =
    process.env.NODE_ENV === "production"
        ? "https://repo-provas-project.herokuapp.com/"
        : "http://localhost:5000/"; //set here the api url and port if you're running the backend locally

export default API_URL;
