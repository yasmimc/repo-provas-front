import { useEffect, useState } from "react";
import API from "../../services/API/requests";

export default function Home() {
    const [searchBy, setSearchBy] = useState(null);
    const [teachers, setTeachers] = useState([]);
    const [subjects, setSubjects] = useState([]);

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
                setSubjects(resp.data);
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
                    {teachers.length
                        ? teachers.map((teacher, index) => (
                              <option key={index} value={teacher.id}>
                                  {`${teacher.name} (${teacher.exams} provas)`}
                              </option>
                          ))
                        : null}
                </select>
            ) : null}

            {searchBy === "subjects" ? (
                <select name="subjects">
                    <option selected disabed value="">
                        Escolha uma disciplina
                    </option>
                    {subjects.length
                        ? subjects.map((group) => (
                              <optgroup label={`${group.period}º período`}>
                                  {group.subjects.map((subject, index) => (
                                      <option key={index} value={subject.id}>
                                          {`${subject.name} (${subject.exams} provas)`}
                                      </option>
                                  ))}
                              </optgroup>
                          ))
                        : null}
                </select>
            ) : null}
        </div>
    );
}
