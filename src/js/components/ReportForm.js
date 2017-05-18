import { h,  Component } from 'preact';
import StudentsTable from './StudentsTable';

class ReportForm extends Component {
    render(props) {
        return (
            <form method="post" onSubmit={props.handleFormSubmit}>
                <div className="columns">
                    <div className="column">
                        <div className="field">
                            <label className="label" htmlFor="section">NRC</label>
                            <p className="control">
                                <input
                                    id="nrc"
                                    className="input"
                                    type="text"
                                    name="nrc"
                                    placeholder="NRC"
                                    value={props.nrc}
                                    onChange={props.handleNrcChange}
                                />
                            </p>
                        </div>
                    </div>
                    <div className="column">
                        <div className="field">
                            <label className="label" htmlFor="key">Clave</label>
                            <p className="control">
                                <input
                                    id="key"
                                    className="input"
                                    type="text"
                                    name="key"
                                    placeholder="Clave"
                                    value={props.subjectkey}
                                    onChange={props.handleSubjectkeyChange}
                                />
                            </p>
                        </div>
                    </div>
                    <div className="column">
                        <div className="field">
                            <label className="label" htmlFor="section">Sección</label>
                            <p className="control">
                                <input
                                    id="section"
                                    className="input"
                                    type="text"
                                    name="section"
                                    placeholder="Sección"
                                    value={props.section}
                                    onChange={props.handleSectionChange}
                                />
                            </p>
                        </div>
                    </div>
                    <div className="column is-6">
                        <div className="field">
                            <label className="label" htmlFor="subject">Materia</label>
                            <p className="control">
                                <input
                                    id="subject"
                                    className="input"
                                    type="text"
                                    name="subject"
                                    placeholder="Materia a que asisten los alumnos"
                                    value={props.subject}
                                    onChange={props.handleSubjectChange}
                                />
                            </p>
                        </div>
                    </div>
                </div>

                <hr/>

                <h4 className="title is-4">Alumnos</h4>
                <StudentsTable
                    students={props.students}
                    handleStudentChange={props.handleStudentChange}
                    handleAddStudentClick={props.handleAddStudentClick}
                />

                <hr/>

                <h4>Prioridad</h4>
                <span className="tag is-success is-medium">
                    <div className="field">
                        <p className="control">
                            <label className="radio">
                                <input type="radio" name="priority" value="low" checked="checked"/>
                                Baja
                            </label>
                        </p>
                    </div>
                </span>

                <span className="tag is-warning is-medium">
                    <div className="field">
                        <p className="control">
                            <label className="radio">
                                <input type="radio" name="priority" value="medium"/>
                                Moderada
                            </label>
                        </p>
                    </div>
                </span>

                <span className="tag is-danger is-medium">
                    <div className="field">
                        <p className="control">
                            <label className="radio">
                                <input type="radio" name="priority" value="high"/>
                                Alta
                            </label>
                        </p>
                    </div>
                </span>

                <div className="field is-grouped is-pulled-right">
                    <p className="control">
                        <button className="button is-link">Cancelar</button>
                    </p>
                    <p className="control">
                        <button className="button is-primary">Enviar</button>
                    </p>
                </div>

            </form>
        );
    }
}

export default ReportForm;
