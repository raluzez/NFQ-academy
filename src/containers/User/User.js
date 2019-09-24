import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from 'react-router-dom';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import lt from '@fullcalendar/core/locales/lt';
import "../../components/Calendar/calendar.scss";

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

import Styles from "./User.module.css";

class User extends Component {
    state = {
        numberChecked: null,
        timeLeft: null,
        input: null,
        isRegistration: false,
        dayClicked: false
    }

    numberHandler = (event) => {
        this.setState({input: event.target.value})
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

    dateClick = (info) => {
        this.setState({dateClicked: info.dateStr})
    }

    registrationHandler = (specialistIndex) => {
        this.setState({isRegistration: specialistIndex})
    }

    backHandler = () => {
        this.setState({isRegistration: false})
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
                    <Button as={NavLink} to="/login" variant="outline-primary" size="lg" style={{"marginTop": "5%", "width": "50%"}}>Prisijungti</Button>                    
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
                        {this.props.data.map((specialistData, i) => {
                            return <Button 
                                        key={specialistData.name} 
                                        variant="outline-success" 
                                        size="lg" 
                                        style={{"width": "100%","marginBottom": "2.5%", "marginTop": "2.5%"}}
                                        onClick={()=>this.registrationHandler(i)}>
                                            {specialistData.name}
                                    </Button>
                        })}                   
                    </Card.Body>
                </Card>  
                <Card className={Styles.CheckNumberContainer}>
                    <Card.Header className={Styles.CheckNumberHeader} style={{"borderRadius": "0"}}>
                            JŪSŲ REGISTRACIJOS
                    </Card.Header>
                    <Card.Body >
                        {!this.props.userRegistrations
                            ? <Button 
                                variant="danger" 
                                size="lg" 
                                style={{"width":"100%", "marginBottom" : "2.5%", "marginTop": "2.5%"}} 
                                disabled >
                                    Registracijų nerasta
                                </Button>
                            : this.props.userRegistrations.map( item =>
                                (<Button 
                                    variant="success" 
                                    size="lg" style={{"width":"100%", "marginBottom" : "2.5%", "marginTop": "2.5%"}} 
                                    disabled >
                                        {item.name} 
                                        {<i className={`fas fa-arrow-right ${Styles.Arrow}`}></i>}
                                        {item.date}
                                </Button> ))
                        }
                    </Card.Body>
                </Card>
            </>
        }
        

     if(this.state.isRegistration || this.state.isRegistration === 0){
            user =  <div style={{"width":"65%", 'margin':'auto', 'marginTop': '2.5%'}}>
                        <FullCalendar 
                            defaultView="dayGridMonth" 
                            plugins={[ dayGridPlugin ]} 
                            locale={lt}
                            weekends={false}
                            customButtons={{
                                myCustomButton : {
                                    text: 'Grįžti',
                                    click : () => this.backHandler()
                                }}
                            }
                            header={{   
                                left: 'myCustomButton,timeGridDay',
                                center:'title',
                                right: 'prev,next'
                            }}
                            dateClick={(info) => console.log(info.dateStr)}
                            events= {[
                                    {
                                    start: '2019-09-24',
                                    end:'2019-09-25',
                                    rendering: 'background',
                                    backgroundColor:"green"
                                    }
                                    ]}
                                />
                </div>
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

export default connect(mapStateToProps)(User);