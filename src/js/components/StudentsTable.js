import { h,  Component } from 'preact';
import linkstate from 'linkstate';


const SITUATIONS = [
    {
        label: 'Asistencia',
        value: 'nonattendance',
    },
    {
        label: 'Académica',
        value: 'academics',
    },
    {
        label: 'Diciplina',
        value: 'discipline',
    },
    {
        label: 'Otra',
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

        const handleStudentSituationChange = (e) => {
            student['situation'] = e.target.value;

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
                                {SITUATIONS.map((situation, i) => {
                                    return (
                                        <label key={i} className="radio">
                                            <input
                                                type="radio"
                                                name={`situation-${i}`}
                                                value={situation.value}
                                                checked={student.situation === situation.value}
                                                onChange={handleStudentSituationChange}
                                            />
                                            {situation.label}
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
            <table className="table">
                <thead>
                    <th>Código</th>
                    <th>Nombre</th>
                    <th>Situación</th>
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
