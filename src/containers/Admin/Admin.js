import React, { Component } from "react";
import { connect } from "react-redux";

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import Styles from "./Admin.module.css";


class Admin extends Component {
    render () {
        return (
            <div className={Styles.Container}>
                {(this.props.data || []).map((item) =>(
                <Card className={Styles.CheckNumberContainer} key={item.name}>
                    <Card.Header className={Styles.CheckNumberHeader} style={{"borderRadius": "0"}}>
                        {item.name.toUpperCase()}
                    </Card.Header >
                    <Card.Body className={Styles.Body}>
                        {item.servedPatients.slice(-5).map(patient => (
                            <Button key={patient.name} variant="primary" size="lg" disabled>{`${patient.name} vizito trukmė 5 min`}</Button> 
                        ))}
                        <Button variant="outline-success" size="lg">Specialisto Statistika</Button>                                        
                    </Card.Body>
                </Card>     
                ))}
            </div>)
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

export default connect(mapStateToProps)(Admin);