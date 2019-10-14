import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from 'react-router-dom';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
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
        date: new Date(),
        events:[],
        dayEvents:[]
    }

    componentDidMount(){
        this.createCalendarEvents()
    }

    createCalendarEvents = () => {
        const daysInMonth = {
            1:31, 2:28, 3:31, 4:30, 5:31, 6:30, 7:31, 8:31, 9:30, 10:31, 11:30, 12:31
        }
        const events = []
        const date = new Date()
        Object.keys(daysInMonth).map(monthNumber => {
            if(date.getMonth()+1 < monthNumber){
                    for (let i = 1; i <= daysInMonth[monthNumber]; i++){
                        let month = monthNumber
                        let day = i
                        if( monthNumber<10 ){
                            month = `0${monthNumber}`
                        }
                        if( i<10 ){
                            day = `0${i}`
                        }
                        events.push({
                                start:`2019-${month}-${day}`,
                                rendering:"background",
                                overlap:false,
                                allDay:true,
                                backgroundColor:"green"
                                
                            })
                    }
            } else if(date.getMonth()+1 === Number(monthNumber)){
                for (let i = date.getDate(); i <= daysInMonth[monthNumber]; i++){
                    let month = monthNumber
                    let day = i
                    if( monthNumber<10 ){
                        month = `0${monthNumber}`
                    }
                    if( i<10 ){
                        day = `0${i}`
                    }
                    events.push({
                            start:`2019-${month}-${day}`,
                            rendering:"background",
                            overlap:false,
                            allDay:true,
                            backgroundColor:"green"
                            
                        })
                    }

            }
            return events
        })
        this.setState({events:events})
    }

    createDayEvents = (date) => {
        const dayEvents =[]
        if(date!==null){
            date.setHours( date.getHours()+9)
            while (Number(date.getHours())<17){
                console.log(date)
                let endDate = new Date(date)
                console.log(endDate)
                endDate.setMinutes(endDate.getMinutes()+15)
                dayEvents.push({
                    start:date,
                    end:endDate,
                    backgroundColor:"#B1D8B2",
                    borderColor:"#73C586"
                })
                date = new Date(endDate)
            }
            this.setState({dayEvents:dayEvents})
        } 
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
        this.createDayEvents(date)
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
            user =  <div style={{"width":"70%", 'margin':'auto', 'marginTop': '2.5%'}}>
                        <FullCalendar 
                            defaultView="dayGridMonth" 
                            plugins={[dayGridPlugin, interactionPlugin]} 
                            locale={lt}
                            weekends={false}
                            showNonCurrentDates={false}
                            fixedWeekCount={false}
                            aspectRatio={1.75}
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
                            events= {this.state.events}
                            dateClick ={info =>  this.dayClickedHandler(info.date)}
                            
                                />
                    </div>
        }

        if(this.state.dayClicked){
            user = null
            dayGrid = <div style={{"width":"65%", 'margin':'auto', 'marginTop': '2.5%'}}>
                    <FullCalendar 
                        plugins={[timeGridPlugin]} 
                        defaultView={'timeGridDay'}
                        defaultDate={this.state.date}
                        locale={lt}
                        customButtons={{
                            myCustomButton : {
                                text: 'Grįžti',
                                click : () => this.dayClickedHandler(null)
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
                        events= {this.state.dayEvents}
                        // eventClick ={
                        //         (info) => {date = info.event.start}
                        //     }
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