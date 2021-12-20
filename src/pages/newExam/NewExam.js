import { useContext, useEffect, useState } from "react";
import GlobalContext from "../../contexts/globalContext";
import API from "../../services/API/requests";

export default function NewExam() {
    const [examCategories, setExamCategories] = useState([]);
    const { subjectsByPeriod, setSubjectsByPeriod } = useContext(GlobalContext);
    const [subjects, setSubjects] = useState([]);
    const [teachersBySubject, setTeachersBySubject] = useState([]);
    const [examInputs, setExamInputs] = useState({
        name: null,
        category: null,
        subject: null,
        teacher: null,
        link: null,
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
        setSubjects(newArr);
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
            return;
        }

        API.postExam(examInputs);
    }

    return (
        <form onSubmit={saveExam}>
            <input
                type="text"
                placeholder="Nome da prova"
                onChange={(e) =>
                    setExamInputs({ ...examInputs, name: e.target.value })
                }
            />
            <select
                name="examCategories"
                onChange={(e) =>
                    setExamInputs({
                        ...examInputs,
                        category: Number(e.target.value),
                    })
                }
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

            <select name="subjects" onChange={fetchTeachersBySubject}>
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
                onChange={(e) =>
                    setExamInputs({
                        ...examInputs,
                        teacher: Number(e.target.value),
                    })
                }
                disabled={!teachersBySubject.length}
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
                onChange={(e) =>
                    setExamInputs({ ...examInputs, link: e.target.value })
                }
            />
            <button type="submit" children="Enviar prova" />
        </form>
    );
}
