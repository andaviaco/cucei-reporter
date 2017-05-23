import { h,  Component } from 'preact';
import linkstate from 'linkstate';
import axios from 'axios';
import swal from 'sweetalert2';

import ReportForm from '../components/ReportForm';

class ReportFormContainer extends Component {
    constructor() {
        super();

        this.state = {
            major: '',
            nrc: '',
            subjectkey: '',
            section: '',
            subject: '',
            students: [{}],
            priority: 'low',
            isLoading: false,
        };

        this.handleStudentChange = this.handleStudentChange.bind(this);
        this.handleAddStudentClick = this.handleAddStudentClick.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    handleFormSubmit(e) {
        e.preventDefault();

        this.setState({ 'isLoading': true });

        axios.post('/report', this.state)
            .then((response) => {
                this.setState({ 'isLoading': false });

                swal({
                    title: '¡Correo enviado!',
                    text: 'Da click en continuar para llenar un nuevo formulario.',
                    confirmButtonText: 'Continuar',
                }).then(() =>{
                    window.location.reload();
                });
            })
            .catch((error) => {

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
                handleMajorChange={linkstate(this, 'major')}
                handleNrcChange={linkstate(this, 'nrc')}
                handleSubjectkeyChange={linkstate(this, 'subjectkey')}
                handleSectionChange={linkstate(this, 'section')}
                handleSubjectChange={linkstate(this, 'subject')}
                handlePriorityChange={linkstate(this, 'priority', 'target.value')}
                handleStudentChange={this.handleStudentChange}
                handleAddStudentClick={this.handleAddStudentClick}
                handleFormSubmit={this.handleFormSubmit}
            />
        );
    }
}

export default ReportFormContainer;
