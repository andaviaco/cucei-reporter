import { h,  Component } from 'preact';
import linkstate from 'linkstate';


const PROBLEMS = [
    {
        label: 'Asistencia',
        value: 'nonattendance',
    },
    {
        label: 'Practicas',
        value: 'assignments',
    },
    {
        label: 'Otro',
        value: 'other',
    },
];

class StudentsTable extends Component {

    constructor() {
        super();

        this.renderRow = this.renderRow.bind(this);
    }

    renderRow(student, i) {
        const handleStudentChange = (e) => {
            student[e.target.name] = e.target.value;

            this.props.handleStudentChange(i, student);
        }

        const handleStudentProblemChange = (e) => {
            student['problem'] = e.target.value;

            this.props.handleStudentChange(i, student);
        }

        return (
            <tr key={i}>
                <td>
                    <div className="field">
                        <p className="control">
                            <input
                                className="input"
                                type="text"
                                name="code"
                                placeholder="Código"
                                value={student.code}
                                onChange={handleStudentChange}
                            />
                        </p>
                    </div>
                </td>
                <td>
                    <div className="field">
                        <p className="control">
                            <input
                                className="input"
                                type="text"
                                name="name"
                                placeholder="Nombre"
                                value={student.name}
                                onChange={handleStudentChange}
                            />
                        </p>
                    </div>
                </td>
                <td>
                    <div className="field">
                        <p className="control">
                            <radiogroup>
                                {PROBLEMS.map((problem, i) => {
                                    return (
                                        <label key={i} className="radio">
                                            <input
                                                type="radio"
                                                name={`problem-${i}`}
                                                value={problem.value}
                                                checked={student.problem === problem.value}
                                                onChange={handleStudentProblemChange}
                                            />
                                            {problem.label}
                                        </label>
                                    );
                                })}
                            </radiogroup>
                        </p>
                    </div>
                </td>
                <td>
                    <div className="field">
                        <p className="control">
                            <textarea
                                className="textarea"
                                placeholder="Comentarios"
                                rows="1"
                                name="comments"
                                onChange={handleStudentChange}
                            >{student.comments}</textarea>
                        </p>
                    </div>
                </td>
            </tr>
        );
    }

    render({students, handleAddStudentClick}) {
        return (
            <table className="table is-striped">
                <thead>
                    <th>Código</th>
                    <th>Nombre</th>
                    <th>Problemas</th>
                    <th>Comentarios</th>
                </thead>
                <tbody>
                    {students.map(this.renderRow)}

                    <tr>
                        <td>
                            <button
                                type="button"
                                className="button is-success is-outlined"
                                onClick={handleAddStudentClick}
                            >
                                <span className="icon is-small">
                                    <i className="fa fa-plus"></i>
                                </span>
                                <span>Agregar Alumno</span>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }
}

export default StudentsTable;
