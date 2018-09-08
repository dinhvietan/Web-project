import React, { Component } from 'react';

import { 
    Form, 
    FormGroup, 
    Col, 
    FormControl, 
    ControlLabel, 
    Checkbox, 
    Button,
    Grid,
    Row
} from 'react-bootstrap';

import './Styles/LoginForm.css';

import DataUtils from '../Utils/DataUtils';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {loginname: "", password: ""},
            logged: false
        };

        let session = this.getSession();
        if(session !== null) {
            this.state.logged = true;
        }
        this.onKeyDownHandle = this.onKeyDownHandle.bind(this);
    }
    componentWillMount(event) {
        if(this.state.logged === true) {
            window.location.href = "/admin";
        }
    }
    getSession() {
        let session = window.localStorage.getItem("session");
        if(session != null) {
            return JSON.parse(session);
        }
        return null;
    }
    onSubmit(event, keyCode) {
        if(this.state.loginname === "" || this.state.data.password === "")  {
            alert("Invalid data");
        } else {

            let userInfo = DataUtils.checkUser(this.state.data.loginname, this.state.data.password);

            if(userInfo != null) {
                window.localStorage.setItem("session", JSON.stringify(userInfo));
                window.location.href="/admin";
            }
        }
    }
    onKeyDownHandle(event) {
        if(event.keyCode === 13) {
            this.onSubmit(event, 13);
        }
    }
    onHandle(event) {
        let newState = {
            data: this.state.data
        };

        let inputName = event.target.name;
        newState.data[inputName] = event.target.value;
        
        this.setState(newState);
    }
    render() {
        if(this.state.logged === true) {
            return (<div></div>);
        }
        return (
            <Form horizontal className="app-login-form">
            <Grid>
                <Row className="show-grid">
                    <Col xs={1} md={4} sm={1} lg={4}></Col>
                    <Col xs={10} md={4} sm={10} lg={4}>
                            <FormGroup controlId="formHorizontalEmail">
                                <span componentClass={ControlLabel}>
                                    Email
                                </span>
                                <FormControl onKeyUp={this.onKeyDownHandle} name="loginname" onChange={this.onHandle.bind(this)} type="email" value={this.state.data.loginname} placeholder="Email" />

                            </FormGroup>
                    </Col>
                    <Col xs={10} md={4} sm={10} lg={4}></Col>
                </Row>
                <Row className="show-grid">
                    <Col xs={1} md={4} sm={1} lg={4}></Col>
                    <Col xs={10} md={4} sm={10} lg={4}>
                            <FormGroup controlId="formHorizontalPassword">
                                <span componentClass={ControlLabel} >
                                    Password
                                </span>
                                <FormControl onKeyUp={this.onKeyDownHandle} name="password" onChange={this.onHandle.bind(this)} type="password" value={this.state.data.password} placeholder="Password" />

                            </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col xs={1} md={4} sm={1} lg={4}></Col>
                    <Col xs={10} md={4} sm={10} lg={4}>
                        <FormGroup>
                        <Button className="btn-signin" type="button" onClick={this.onSubmit.bind(this)}>Sign in</Button>
                        </FormGroup>
                    </Col>                     
                </Row>
            </Grid>
            </Form>
        );
    }
}

export default LoginForm;
