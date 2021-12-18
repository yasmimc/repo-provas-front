import axiosBase from "./axiosBase";

async function getTeachers() {
    return axiosBase.get("/teachers");
}

async function getSubjects() {
    return axiosBase.get("/subjects");
}

const API = {
    getTeachers,
    getSubjects,
};

export default API;
