import { useEffect, useState } from "react";
import API from "../../services/API/requests";

export default function Home() {
    const [searchBy, setSearchBy] = useState(null);
    const [teachers, setTeachers] = useState([]);
    const [subjectsByPeriod, setSubjectsByPeriod] = useState([]);

    useEffect(() => {
        API.getTeachers()
            .then((resp) => {
                setTeachers(resp.data);
            })
            .then((err) => {
                console.error(err.response);
            });

        API.getSubjects()
            .then((resp) => {
                setSubjectsByPeriod(resp.data);
            })
            .then((err) => {
                console.error(err.response);
            });
    }, []);

    return (
        <div>
            <input
                type="checkbox"
                id="teachers"
                name="teachers"
                checked={searchBy === "teachers" ? true : false}
                onClick={() => setSearchBy("teachers")}
            />
            <label for="teachers">Professores</label>

            <input
                type="checkbox"
                id="subjects"
                name="subjects"
                checked={searchBy === "subjects" ? true : false}
                onClick={() => setSearchBy("subjects")}
            />
            <label for="subjects">Disciplinas</label>

            {searchBy === "teachers" ? (
                <select name="teachers">
                    <option selected disabed value="">
                        Escolha um professor
                    </option>
                    {teachers &&
                        teachers.map((teacher, index) => (
                            <option key={index} value={teacher.id}>
                                {`${teacher.name} (${teacher.exams} provas)`}
                            </option>
                        ))}
                </select>
            ) : null}

            {searchBy === "subjects" ? (
                <select name="subjects">
                    <option selected disabed value="">
                        Escolha uma disciplina
                    </option>
                    {subjectsByPeriod.length &&
                        subjectsByPeriod.map((group) => (
                            <optgroup label={`${group.period}º período`}>
                                {group.subjects.map((subject, index) => (
                                    <option key={index} value={subject.id}>
                                        {`${subject.name} (${subject.exams} provas)`}
                                    </option>
                                ))}
                            </optgroup>
                        ))}
                </select>
            ) : null}
        </div>
    );
}
