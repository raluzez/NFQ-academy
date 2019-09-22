import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

import Styles from "./User.module.css";

class User extends Component {
    state = {
        numberChecked: null,
        timeLeft: null,
        input: null
    }

    numberHandler = (event) => {
        this.setState({input: event.target.value})
        console.log()
    }

    checkNumber = () => {
        let isExist = false
        this.props.data.map(specialistData => {
            return specialistData.clients.map(patient => {
                if(patient.name === Number(this.state.input)) {
                    this.setState({timeLeft:patient.timeLeft, numberChecked:patient.name})
                    isExist = true
                }
                return this.state.timeLeft
            })
        })  
        if(!isExist) {this.setState({timeLeft:false, numberChecked:this.state.input})}    
    }

    render () {

        let message = null

        if(this.state.timeLeft){
            message = <Button variant="success" size="lg" style={{"width":"100%", "marginBottom" : "5%", "marginTop":"2.5%"}} disabled >{`${this.state.numberChecked} liko laukti ${Math.ceil(this.state.timeLeft)} min`}</Button>
        }

        if(this.state.timeLeft === false){
            message = <Button variant="danger" size="lg" style={{"width":"100%", "marginBottom" : "5%", "marginTop":"2.5%"}} disabled ><p>{`${this.state.numberChecked} vizito šiandien nėra`}</p><p>Prisijunkite norėdami sužinoti daugiau</p></Button>
        }

        let user = 
            <Card className={Styles.CheckNumberContainer}>
                <Card.Header className={Styles.CheckNumberHeader} style={{"borderRadius": "0"}}>
                        PATIKRINT LAIKĄ
                </Card.Header >
                <Card.Body >
                <Form className={Styles.Form}>
                    {message}
                    <Form.Control size="lg" type="text" placeholder="Numeris" onChange={this.numberHandler} required/>
                    <Button variant="outline-success" size="lg" style={{"marginTop":"0%"}} onClick={this.checkNumber}>Patikrinti</Button> 
                    <Button as={NavLink} to="/login" variant="outline-primary" size="lg" style={{"marginTop": "5%", "width": "30%"}}>Prisijungti</Button>                    
                </Form>
                </Card.Body>
            </Card>

        if (this.props.token) {
            user =
            <>
                <Card className={Styles.CheckNumberContainer}>
                    <Card.Header className={Styles.CheckNumberHeader} style={{"borderRadius": "0"}}>
                            REGISTRUOTIS
                    </Card.Header>
                    <Card.Body >
                        {this.props.data.map(specialistData => {
                            return <Button key={specialistData.name} variant="outline-success" size="lg" style={{"width": "100%","marginBottom": "2.5%", "marginTop": "2.5%"}}>{specialistData.name}</Button>
                        })}                   
                    </Card.Body>
                </Card>  
                <Card className={Styles.CheckNumberContainer}>
                    <Card.Header className={Styles.CheckNumberHeader} style={{"borderRadius": "0"}}>
                            JŪSŲ REGISTRACIJOS
                    </Card.Header>
                    <Card.Body >
                        <Button variant="success" size="lg" style={{"width":"100%", "marginBottom" : "2.5%", "marginTop": "2.5%"}} disabled >145 {<i className={`fas fa-arrow-right ${Styles.Arrow}`}></i>}{` ${new Date().getHours()}:${new Date().getMinutes()} ${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()}`}</Button> 
                        <Button variant="success" size="lg" style={{"width":"100%", "marginBottom" : "2.5%", "marginTop": "2.5%"}} disabled >205 {<i className={`fas fa-arrow-right ${Styles.Arrow}`}></i>}{` ${new Date().getHours()}:${new Date().getMinutes()} ${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()}`}</Button> 
                    </Card.Body>
                </Card>
            </>
        }

        return (
            <>{user}</>
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        data: state.main.data
    }
}

// const mapDispatchToProps = dispatch => {
//     return {
//         onCallPatient: (index) => dispatch(actions.callPatient(index)),
//         onPatientServed: (specialistIndex) => dispatch(actions.patientServed(specialistIndex)),
//         onAddVisitTime: (specialistIndex) => dispatch(actions.addVisitTime(specialistIndex))
//     }
// } 

export default connect(mapStateToProps)(User);