import { useContext, useEffect, useState } from "react";
import GlobalContext from "../../contexts/globalContext";
import API from "../../services/API/requests";

export default function NewExam() {
    const [examCategories, setExamCategories] = useState([]);
    const { subjectsByPeriod, setSubjectsByPeriod } = useContext(GlobalContext);
    const [subjects, setSubjects] = useState([]);
    const [teachersBySubject, setTeachersBySubject] = useState([]);
    const [examInputs, setExamInputs] = useState({
        name: "",
        category: "",
        subject: "",
        teacher: "",
        link: "",
    });

    useEffect(() => {
        API.getExamCategories()
            .then((resp) => setExamCategories(resp.data))
            .catch((err) => console.error(err));

        if (subjectsByPeriod.length === 0) {
            API.getSubjects()
                .then((resp) => {
                    setSubjectsByPeriod(resp.data);
                })
                .catch((err) => {
                    console.error(err.response);
                });
        }
    }, []);

    useEffect(() => {
        let arr = [];
        arr = subjectsByPeriod.map((group) => group.subjects);
        let newArr = [];
        arr.forEach((array) => (newArr = newArr.concat(array)));
        setSubjects(
            newArr.sort((a, b) => {
                if (a.name < b.name) return -1;
                if (a.name >= b.name) return 1;
                return 0;
            })
        );
    }, [subjectsByPeriod]);

    function fetchTeachersBySubject(e) {
        const options = e.target.options;
        const subject = options[options.selectedIndex].label;
        setExamInputs({ ...examInputs, subject: Number(e.target.value) });
        API.getTeachers(subject)
            .then((resp) => setTeachersBySubject(resp.data))
            .catch((err) => console.error(err.response));
    }

    function saveExam(e) {
        e.preventDefault();

        const emptyFields = Object.values(examInputs).filter(
            (value) => value === null
        );
        if (emptyFields.length) {
            alert("Por favor, preencha todos os campos");
            return;
        }

        API.postExam(examInputs)
            .then(() => {
                setExamInputs({
                    name: "",
                    category: "",
                    subject: "",
                    teacher: "",
                    link: "",
                });
                alert("Prova cadastrada com sucesso. Agradecemos sua ajuda!");
            })
            .catch((err) => {
                if (err.response.status === 400)
                    alert("Por favor, insira um link válido");
            });
    }

    return (
        <form onSubmit={saveExam}>
            <input
                type="text"
                placeholder="Nome da prova"
                value={examInputs.name}
                onChange={(e) =>
                    setExamInputs({ ...examInputs, name: e.target.value })
                }
            />
            <select
                name="examCategories"
                value={examInputs.category}
                onChange={(e) => {
                    setExamInputs({
                        ...examInputs,
                        category: Number(e.target.value),
                    });
                    setTeachersBySubject([]);
                }}
            >
                <option selected disabed value="">
                    Selecione a categoria
                </option>
                {examCategories.length > 0 &&
                    examCategories.map((category, index) => (
                        <option key={index} value={category.id}>
                            {category.name}
                        </option>
                    ))}
            </select>
            <select
                name="subjects"
                value={examInputs.subject}
                onChange={fetchTeachersBySubject}
            >
                <option selected disabed value="">
                    Selecione a disciplina
                </option>
                {subjects.length > 0 &&
                    subjects.map((subject, index) => (
                        <option
                            key={index}
                            label={subject.name}
                            value={subject.id}
                        >
                            {subject.name}
                        </option>
                    ))}
            </select>
            <select
                name="teachers"
                value={examInputs.teacher}
                onChange={(e) =>
                    setExamInputs({
                        ...examInputs,
                        teacher: Number(e.target.value),
                    })
                }
                disabled={!teachersBySubject.length || !examInputs.subject}
            >
                <option selected disabed value="">
                    Selecione o professor
                </option>
                {teachersBySubject.length > 0 &&
                    teachersBySubject.map((teacher, index) => (
                        <option
                            key={index}
                            label={teacher.name}
                            value={teacher.id}
                        >
                            {teacher.name}
                        </option>
                    ))}
            </select>
            <input
                type="text"
                placeholder="Link do pdf"
                value={examInputs.link}
                onChange={(e) =>
                    setExamInputs({ ...examInputs, link: e.target.value })
                }
            />
            <button type="submit" children="Enviar prova" />
        </form>
    );
}
