import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
//import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

class StudentList extends Component {

    constructor(props) {
        super(props);
        this.state = {students: []};
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        fetch('/students')
            .then(response => response.json())
            .then(data => this.setState({students: data}));
    }

    async remove(id) {
        await fetch(`/students/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedStudents = [...this.state.students].filter(i => i.id !== id);
            this.setState({students: updatedStudents});
        });
    }

    render() {
        const {students, isLoading} = this.state;

        if (isLoading) {
            return <p>Loading...</p>;
        }

        const studentList = students.map(student => {
            return <tr key={student.id}>
                <td style={{whiteSpace: 'nowrap'}}>{student.firstName}</td>
                <td style={{whiteSpace: 'nowrap'}}>{student.secondName}</td>
                <td style={{whiteSpace: 'nowrap'}}>{student.studentAge} y.o.</td>

                <td>
                    <ButtonGroup>
                        <Button size="sm" color="info" tag={Link} to={"/students/" + student.id + "/info"}>INFO</Button>
                        <Button size="sm" color="primary" tag={Link} to={"/students/" + student.id+ "/edit"}>Edit</Button>
                        <Button size="sm" color="danger" onClick={() => this.remove(student.id)}>Delete</Button>
                    </ButtonGroup>
                </td>
            </tr>
        });

        return (
            <div>

                <Container fluid>
                    <div className="float-left">
                        <Button color="success" tag={Link} to="/students/student/new">Add student</Button>
                    </div>
                    <div className="float-right">
                    <h3>Students</h3>
                    </div>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th width="25%">Name</th>
                            <th width="25%">Surname</th>
                            <th width="25%">Age</th>
                            <th width="20%">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {studentList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}
export default StudentList;

