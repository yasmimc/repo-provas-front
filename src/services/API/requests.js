import axiosBase from "./axiosBase";

async function getTeachers(subject) {
    if (subject) {
        return axiosBase.get(`/teachers?subject=${subject}`);
    }
    return axiosBase.get("/teachers");
}

async function getSubjects() {
    return axiosBase.get("/subjects");
}

async function getExams({ searchBy, value }) {
    return axiosBase.get(`/exams?${searchBy}=${value}`);
}

async function getExamCategories() {
    return axiosBase.get("/exams/categories");
}

async function postExam(exam) {
    return axiosBase.post("/exams", exam);
}

const API = {
    getTeachers,
    getSubjects,
    getExams,
    getExamCategories,
    postExam,
};

export default API;
