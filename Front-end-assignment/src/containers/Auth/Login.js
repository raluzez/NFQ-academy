import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

import Styles from "./Login.module.css";

class Login extends Component {

    state = {
        login:true,
        email: "",
        password: "",
        repeatedPassword: "",
        passwordMatch: true,
        error: null
    }

    componentDidMount () {
        this.props.onResetError();
    }

    swichForm = () => {
        this.setState({login: !this.state.login})
    }

    emailHandler = (event) => {
        this.setState({email: event.target.value})
    }

    passwordHandler = (event) => {
        this.setState({password: event.target.value})
    }

    repeatedPasswordsHandler = (event) => {
        if( event.target.placeholder === "Slaptažodis"){
            this.setState({password: event.target.value});
            this.checkPasswordHandler(event.target.value, event.target.placeholder)
        } else if (event.target.placeholder === "Pakartokite Slaptažodį") {
            this.setState({repeatedPassword: event.target.value})
            this.checkPasswordHandler(event.target.value, event.target.placeholder)
        }
    }

    checkPasswordHandler = (value,type) => {
        if(type === "Slaptažodis"){
            if(value !== this.state.repeatedPassword){
                this.setState({passwordMatch: false})
            } else { this.setState({passwordMatch: true}) }
        } else {
            if(value !== this.state.password){
                this.setState({passwordMatch: false})
            } else { this.setState({passwordMatch: true}) }
        }
    }

    resetPasswordError = () => {
        this.setState({passwordMatch: true})
    }

    resetInputsValues = () => {
        this.setState({password:"", email:"", repeatedPassword: ""})
    }


    render () {

        let form

        let errorMessage = null

        if (!this.state.passwordMatch) {
            errorMessage = <Button variant="danger" size="lg" style={{"width":"100%", "marginBottom" : "5%"}} disabled >Slaptažodžiai nesutampa</Button>
        }

        if (this.props.error) {
            errorMessage = <Button variant="danger" size="lg" style={{"width":"100%", "marginBottom" : "5%"}} disabled >{this.props.error.message}</Button>
        } 
        
        if (!this.state.passwordMatch && this.props.error){
            errorMessage = <>
                <Button variant="danger" size="lg" style={{"width":"100%", "marginBottom" : "5%"}} disabled >{this.props.error.message}</Button>
                <Button variant="danger" size="lg" style={{"width":"100%", "marginBottom" : "5%"}} disabled >Slaptažodžiai nesutampa</Button> </>
        }
            
        if(!this.state.login) {
            form = 
                <Card className={Styles.LoginContainer} style={{"border": "2px solid #59A9FF"}}>
                    <Card.Header className={Styles.LoginHeader} style={{"backgroundColor":"#59A9FF"}}>
                            REGISTRUOTIS
                    </Card.Header>
                    <Card.Body >
                    {errorMessage}
                    <Form className={Styles.Form}>
                        <Form.Control size="lg" type="email" placeholder="El.Paštas" onChange={this.emailHandler} value={this.state.email} required/>
                        <Form.Control size="lg" type="password" placeholder="Slaptažodis" onChange={this.repeatedPasswordsHandler} value={this.state.password} required/>
                        <Form.Control size="lg" type="password" placeholder="Pakartokite Slaptažodį" onChange={this.repeatedPasswordsHandler} value={this.state.repeatedPassword} required/>
                        <Button variant="outline-success" size="lg" onClick={() => this.props.onAuth(this.state.email, this.state.password, this.state.login)} style={{"marginTop":"0%"}}>Registruotis</Button> 
                        <Button 
                            variant="outline-primary" 
                            size="lg" 
                            onClick={() => {
                                this.swichForm(); 
                                this.resetPasswordError(); 
                                this.resetInputsValues(); 
                                this.props.onResetError()}}>
                                    Prisijungti
                        </Button>                    
                    </Form>
                    </Card.Body>
                </Card>
        } else {
            form = 
                <Card className={Styles.LoginContainer}>
                    <Card.Header className={Styles.LoginHeader}>
                            PRISIJUNGTI
                    </Card.Header>
                    <Card.Body >
                    {errorMessage}
                    <Form className={Styles.Form}>
                        <Form.Control size="lg" type="email" placeholder="El.Paštas" onChange={this.emailHandler} value={this.state.email} required/>
                        <Form.Control size="lg" type="password" placeholder="Slaptažodis" onChange={this.passwordHandler} value={this.state.password} required/>
                        <Button variant="outline-success" size="lg" onClick={() => this.props.onAuth(this.state.email, this.state.password, this.state.login)} style={{"marginTop":"0%"}}>Prisijungti</Button> 
                        <Button 
                            variant="outline-primary" 
                            size="lg" 
                            onClick={() => {
                                this.swichForm(); 
                                this.resetInputsValues(); 
                                this.props.onResetError()}}>Registruotis</Button>                    
                    </Form>
                    </Card.Body>
                </Card> 
        }
        return (
            <>
                {form}
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        error: state.auth.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, login) => dispatch(actions.auth(email, password, login)),
        onResetError: () => dispatch(actions.resetError())
    }
} 

export default connect(mapStateToProps, mapDispatchToProps)(Login);