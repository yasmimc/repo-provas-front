import axiosBase from "./axiosBase";

async function getTeachers() {
    return axiosBase.get("/teachers");
}

async function getSubjects() {
    return axiosBase.get("/subjects");
}

async function getExams({ searchBy, value }) {
    return axiosBase.get(`/exams?${searchBy}=${value}`);
}

const API = {
    getTeachers,
    getSubjects,
    getExams,
};

export default API;
