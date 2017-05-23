import { h,  Component } from 'preact';
import StudentsTable from './StudentsTable';

class ReportForm extends Component {
    render(props) {
        return (
            <form method="post" onSubmit={props.handleFormSubmit}>
                <div className="field">
                    <label className="label" htmlFor="major">Carrera</label>
                    <p className="control">
                        <input
                            id="major"
                            className="input"
                            type="text"
                            name="major"
                            placeholder="Carrera"
                            value={props.major}
                            onChange={props.handleMajorChange}
                        />
                    </p>
                </div>
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

                <div class="message">
                    <div class="message-header">
                        <p>Situaciones</p>
                    </div>
                    <div class="message-body content">
                        <p>Para prevenir los posibles problemas de rezago, reprodbación o abandono, de los alumnos, es conveniente atender en tiempo y forma los puntos de alerta, por lo que <strong>se recomienda reportar solo a los alumnos que estén o pueden estar en una de las situaciones siguientes.</strong></p>
                        <ul>
                            <li><strong>Asistencia</strong>: No asiste regularmente a clases, no ha asistido, o llega tarde a clases.</li>
                            <li><strong>Académica</strong>: Tiene rezago académico, no hace tareas o requiere asesoría.</li>
                            <li><strong>Diciplina</strong>: Es indiciplinado o distraido.</li>
                            <li><strong>Otra</strong>: Otra situación de incumplimiento. Detalle la situación.</li>
                        </ul>
                    </div>
                </div>

                <h4 className="title is-4">Alumnos</h4>
                <StudentsTable
                    students={props.students}
                    handleStudentChange={props.handleStudentChange}
                    handleAddStudentClick={props.handleAddStudentClick}
                />

                <hr/>

                <h4 className="label">Prioridad</h4>
                <span className="tag is-success is-medium">
                    <div className="field">
                        <p className="control">
                            <label className="radio">
                                <input
                                    type="radio"
                                    name="priority"
                                    value="low"
                                    defaultChecked={true}
                                    onChange={props.handlePriorityChange}
                                />
                                Baja
                            </label>
                        </p>
                    </div>
                </span>

                <span className="tag is-warning is-medium">
                    <div className="field">
                        <p className="control">
                            <label className="radio">
                                <input
                                    type="radio"
                                    name="priority"
                                    value="medium"
                                    onChange={props.handlePriorityChange}
                                />
                                Moderada
                            </label>
                        </p>
                    </div>
                </span>

                <span className="tag is-danger is-medium">
                    <div className="field">
                        <p className="control">
                            <label className="radio">
                                <input
                                    type="radio"
                                    name="priority"
                                    value="high"
                                    onChange={props.handlePriorityChange}
                                />
                                Alta
                            </label>
                        </p>
                    </div>
                </span>

                <div>
                    <div className="field is-grouped is-pulled-right">
                        <p className="control">
                            <button
                                type="button"
                                className="button is-link"
                            >Cancelar</button>
                        </p>
                        <p className="control">
                            <button
                                type="submit"
                                className={`button is-primary ${props.isLoading && 'is-loading'}`}
                            >Enviar</button>
                        </p>

                    </div>
                </div>

            </form>
        );
    }
}

export default ReportForm;
