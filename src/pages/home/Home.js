import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import GlobalContext from "../../contexts/globalContext";
import API from "../../services/API/requests";

export default function Home() {
    const [searchBy, setSearchBy] = useState(null);
    const [selectedValue, setSelectedValue] = useState(null);
    const [teachers, setTeachers] = useState([]);
    const [subjectsByPeriod, setSubjectsByPeriod] = useState([]);
    // const { setExamsList } = useContext(GlobalContext);
    const [examsList, setExamsList] = useState([]);

    useEffect(() => {
        API.getTeachers()
            .then((resp) => {
                setTeachers(resp.data);
            })
            .catch((err) => {
                console.error(err.response);
            });

        API.getSubjects()
            .then((resp) => {
                setSubjectsByPeriod(resp.data);
            })
            .catch((err) => {
                console.error(err.response);
            });
    }, []);

    function fetchExams(e) {
        e.preventDefault();
        if (!searchBy || !selectedValue) {
            return;
        }
        API.getExams({ searchBy, value: selectedValue })
            .then((resp) => setExamsList(resp.data))
            .catch((err) => console.error(err.response));
    }

    function handleFilterValue(e) {
        const options = e.target.options;
        setSelectedValue(options[options.selectedIndex].value);
    }

    function handleFilterOption(e) {
        setSearchBy(e.target.name);
        setSelectedValue(null);
        setExamsList([]);
    }

    return (
        <Container>
            <form onSubmit={(e) => fetchExams(e)}>
                <div>
                    <h1>Filtrar provas por:</h1>
                    <input
                        type="checkbox"
                        id="teachers"
                        name="teacher"
                        checked={searchBy === "teacher" ? true : false}
                        onChange={handleFilterOption}
                    />
                    <label>Professores</label>

                    <input
                        type="checkbox"
                        id="subjects"
                        name="subject"
                        checked={searchBy === "subject" ? true : false}
                        onChange={handleFilterOption}
                    />
                    <label>Disciplinas</label>
                </div>
                <div>
                    {searchBy === "teacher" ? (
                        <select name="teachers" onChange={handleFilterValue}>
                            <option selected disabed value="">
                                Escolha um professor
                            </option>
                            {teachers.length > 0 &&
                                teachers.map((teacher, index) => (
                                    <option key={index} value={teacher.name}>
                                        {`${teacher.name} (${teacher.exams} provas)`}
                                    </option>
                                ))}
                        </select>
                    ) : null}

                    {searchBy === "subject" ? (
                        <select name="subjects" onChange={handleFilterValue}>
                            <option selected disabed value="">
                                Escolha uma disciplina
                            </option>
                            {subjectsByPeriod.length > 0 &&
                                subjectsByPeriod.map((group) => (
                                    <optgroup
                                        label={`${group.period}º período`}
                                    >
                                        {group.subjects.map(
                                            (subject, index) => (
                                                <option
                                                    key={index}
                                                    value={subject.name}
                                                >
                                                    {`${subject.name} (${subject.exams} provas)`}
                                                </option>
                                            )
                                        )}
                                    </optgroup>
                                ))}
                        </select>
                    ) : null}
                </div>
                <button type="submit" children="Buscar" />
            </form>
            {examsList.length > 0 && (
                <div>
                    <h1>
                        {`Provas ${
                            searchBy === "teacher"
                                ? "aplicadas por "
                                : "da disciplina de "
                        }${selectedValue}`}
                    </h1>
                    {examsList.map((group) => (
                        <>
                            <h2>{`Provas do tipo ${group.category}`}:</h2>
                            {group.exams.map((exam) => (
                                <>
                                    <h3>{exam.name}</h3>
                                    {searchBy === "teacher" ? (
                                        <li>
                                            Disciplina:{" "}
                                            {exam.class.subject.name}
                                        </li>
                                    ) : null}
                                    {searchBy === "teacher" ? (
                                        <li>
                                            Período: {exam.class.subject.period}
                                        </li>
                                    ) : null}
                                    {searchBy === "subject" ? (
                                        <li>
                                            Professor: {exam.class.teacher.name}
                                        </li>
                                    ) : null}
                                    <li>
                                        Link:{" "}
                                        <a
                                            href={exam.link}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            {exam.link}
                                        </a>
                                    </li>
                                </>
                            ))}
                        </>
                    ))}
                </div>
            )}
        </Container>
    );
}

const Container = styled.div`
    h1 {
        font-size: 25px;
        font-weight: bold;
    }
    h2 {
        font-size: 22px;
    }
    h3 {
        font-size: 18px;
    }
`;
