import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from 'react-router-dom';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
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
        dayClicked: false,
        date: new Date()
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

    registrationHandler = (specialistIndex) => {
        this.setState({isRegistration: specialistIndex})
    }

    backHandler = () => {
        this.setState({isRegistration: false})
    }

    dayClickedHandler = (date) => {
        this.setState({dayClicked: !this.state.dayClicked, date: date})
    }

    render () {

        let message = null

        if(this.state.timeLeft){
            message = <Button variant="success" size="lg" style={{"width":"100%", "marginBottom" : "5%", "marginTop":"2.5%"}} disabled >{`${this.state.numberChecked} liko laukti ${Math.ceil(this.state.timeLeft)} min`}</Button>
        }

        if(this.state.timeLeft === false){
            message = <Button variant="danger" size="lg" style={{"width":"100%", "marginBottom" : "5%", "marginTop":"2.5%"}} disabled ><p>{`${this.state.numberChecked} vizito šiandien nėra`}</p><p>Prisijunkite norėdami sužinoti daugiau</p></Button>
        }

        let dayGrid = null

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
                            plugins={[dayGridPlugin]
                                // ,[interactionPlugin]
                            } 
                            locale={lt}
                            weekends={false}
                            customButtons={{
                                myCustomButton : {
                                    text: 'Grįžti',
                                    click : () => this.backHandler()
                                }}
                            }
                            header={{   
                                left: 'myCustomButton',
                                center:'title',
                                right: 'prev,next'
                            }}
                            eventClick ={
                                (info) => this.dayClickedHandler(info.event.start)
                            }
                            events= {[
                                    {
                                    start: "2019-09-24",
                                    rendering: 'background',
                                    backgroundColor:"green"
                                    }
                                    ]}
                                />
                </div>
        }

        if(this.state.dayClicked){
            user = null
            let date = "2019-09-30T09:00:00"
            dayGrid = <div style={{"width":"65%", 'margin':'auto', 'marginTop': '2.5%'}}>
                    <FullCalendar 
                        plugins={[timeGridPlugin]} 
                        defaultView={'timeGridDay'}
                        defaultDate={this.state.date}
                        locale={lt}
                        customButtons={{
                            myCustomButton : {
                                text: 'Grįžti',
                                click : () => this.dayClickedHandler()
                            }}
                        }
                        header={{   
                            left: 'myCustomButton',
                            center:'title',
                            right: ''
                        }}
                        allDaySlot={false}
                        minTime="09:00:00"
                        maxTime="17:00:00"
                        slotDuration="00:15:00"
                        slotLabelFormat={
                            {hour: 'numeric',
                            minute: '2-digit'}
                        }
                        events= {[
                            {
                                start: date,
                                end: "2019-09-30T09:15:00",
                                rendering: 'background',
                                backgroundColor:"green"
                            },
                            {
                                start: "2019-09-30T12:00:00",
                                end: "2019-09-30T12:15:00",
                                rendering: 'background',
                                backgroundColor:"green"
                            }]
                        }
                        eventClick ={
                                (info) => {date = info.event.start; console.log(date)}
                            }
                            />
                    </div>
        }

        return (
            <>
                {user}
                {dayGrid}
            </>
            
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