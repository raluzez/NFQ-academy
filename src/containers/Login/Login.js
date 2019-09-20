import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form'

import Styles from "./Login.module.css";

class Login extends Component {

    state = {
        login:true
    }

    swichForm = () => {
        this.setState({login: !this.state.login})
    }

    render () {

        let form
            
        if(!this.state.login) {
            form = 
                <Card className={Styles.LoginContainer} style={{"border": "2px solid #59A9FF"}}>
                    <Card.Header className={Styles.LoginHeader} style={{"backgroundColor":"#59A9FF"}}>
                            REGISTRUOTIS
                    </Card.Header>
                    <Card.Body >
                    <Form className={Styles.Form}>
                        <Form.Control size="lg" type="email" placeholder="El.Paštas" required/>
                        <Form.Control size="lg" type="password" placeholder="Slaptažodis" required/>
                        <Form.Control size="lg" type="password" placeholder="Pakartokite Slaptažodį" required/>
                        <Button variant="outline-success" size="lg" style={{"marginTop":"0%"}}>Registruotis</Button> 
                        <Button variant="outline-primary" size="lg" onClick={this.swichForm}>Prisijungti</Button>                    
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
                    <Form className={Styles.Form}>
                        <Form.Control size="lg" type="email" placeholder="El.Paštas" required/>
                        <Form.Control size="lg" type="password" placeholder="Slaptažodis" required/>
                        <Button variant="outline-success" size="lg" style={{"marginTop":"0%"}}>Prisijungti</Button> 
                        <Button variant="outline-primary" size="lg" onClick={this.swichForm}>Registruotis</Button>                    
                    </Form>
                    </Card.Body>
                </Card> 
        }
        return (
            <>{form}</>
        )
    }
}

// const mapStateToProps = state => {
//     return {
//         error: state.auth.error
//     }
// }

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp))
    }
} 

export default connect(null, mapDispatchToProps)(Login);