import { h,  Component } from 'preact';
import linkstate from 'linkstate';
import axios from 'axios';
import swal from 'sweetalert2';

import ReportForm from '../components/ReportForm';

class ReportFormContainer extends Component {
    constructor() {
        super();

        this.state = {
            nrc: '',
            subjectkey: '',
            section: '',
            subject: '',
            students: [{}],
            priority: 'low',
        };

        this.handleStudentChange = this.handleStudentChange.bind(this);
        this.handleAddStudentClick = this.handleAddStudentClick.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    handleFormSubmit(e) {
        e.preventDefault();

        axios.post('/report', this.state)
            .then(function (response) {
                swal({
                    title: '¡Correo enviado!',
                    text: 'Da click en continuar para llenar un nuevo formulario.',
                    confirmButtonText: 'Continuar',
                }).then(() =>{
                    window.location.reload();
                });
            })
            .catch(function (error) {

            });
    }

    handleStudentChange(i, student) {
        this.setState((state) => {
            let students = state.students;

            students[i] = student;

            return {students};
        });
    }

    handleAddStudentClick() {
        this.setState((state) => {
            let students = [...state.students, {}];

            return {students};
        });
    }

    render({}, state) {
        return (
            <ReportForm
                {...state}
                handleNrcChange={linkstate(this, 'nrc')}
                handleSubjectkeyChange={linkstate(this, 'subjectkey')}
                handleSectionChange={linkstate(this, 'section')}
                handleSubjectChange={linkstate(this, 'subject')}
                handlePriorityChange={linkstate(this, 'priority')}
                handleStudentChange={this.handleStudentChange}
                handleAddStudentClick={this.handleAddStudentClick}
                handleFormSubmit={this.handleFormSubmit}
            />
        );
    }
}

export default ReportFormContainer;
