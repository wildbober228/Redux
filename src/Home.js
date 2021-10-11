import React, { Component } from 'react';
import './App.css';
import AppNavbar from './AppNavbar';
import StudentList from './student/StudentList';
import { Link } from 'react-router-dom';
import { Button, Container } from 'reactstrap';

class Home extends Component {
    render() {
        return (
            <div>
                <AppNavbar/>

                <StudentList/>
                <Container fluid>
                </Container>
            </div>
        );
    }
}
export default Home;
