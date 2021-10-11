import React, {Component} from "react";
import AppNavbar from "../AppNavbar";
import {Button, Container, Form, FormGroup, Input, Label} from "reactstrap";
import {Link, withRouter} from "react-router-dom";

class StudentEdit extends Component{

    emptyItem = {
        firstName: '',
        secondName: '',
        studentAge: ''
    };

    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyItem
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        if (this.props.match.params.type !== 'new') {
            const customer = await (await fetch(`/students/${this.props.match.params.id}`)).json();
            this.setState({item: customer});
        }
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = {...this.state.item};
        item[name] = value;
        this.setState({item});
    }

    async handleSubmit(event) {
        event.preventDefault();
        const {item} = this.state;

        await fetch('/students' + (item.id >=0 ? '/' + item.id: '' ), {
            method: (item.id >=0 ) ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstName: item.firstName,
                secondName: item.secondName,
                studentAge: item.studentAge
            }),
        });

        this.props.history.push('/students');
    }

    render() {
        const {item} = this.state;
        if(this.props.match.params.type !== 'info') {
            const title = <h2>{item.id ? 'Edit Student' : 'Add Student'}</h2>;
            return <div>
                <AppNavbar/>
                <Container>
                    {title}
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <Label for="firstName">Name</Label>
                            <Input type="text" name="firstName" id="firstName" value={item.firstName || ''}
                                   onChange={this.handleChange} autoComplete="firstName"/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="secondName">SurName</Label>
                            <Input type="text" name="secondName" id="secondName" value={item.secondName || ''}
                                   onChange={this.handleChange} autoComplete="secondName"/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="studentAge">Age</Label>
                            <Input type="text" name="studentAge" id="studentAge" value={item.studentAge || ''}
                                   onChange={this.handleChange} autoComplete="studentAge"/>
                        </FormGroup>

                        <FormGroup>
                            <Button color="primary" type="submit">Save</Button>{' '}
                            <Button color="secondary" tag={Link} to="/">Cancel</Button>
                        </FormGroup>
                    </Form>
                </Container>
            </div>
        } if(this.props.match.params.type === 'info')  {
            const title = <h2>{'Info Student'}</h2>;
            return <div>
                <AppNavbar/>
                <Container>
                    {title}
                    <FormGroup>
                        <Label for="firstName">Name</Label>
                        <Input type="text" name="firstName" id="firstName" value={item.firstName || ''}
                               onChange={this.handleChange} autoComplete="firstName"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="secondName">SurName</Label>
                        <Input type="text" name="secondName" id="secondName" value={item.secondName || ''}
                               onChange={this.handleChange} autoComplete="secondName"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="studentAge">Age</Label>
                        <Input type="text" name="studentAge" id="studentAge" value={item.studentAge || ''}
                               onChange={this.handleChange} autoComplete="studentAge"/>
                    </FormGroup>
                </Container>
            </div>
        }
    }

}
export default withRouter(StudentEdit)
