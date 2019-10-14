import React, { Component } from "react";
import { connect } from "react-redux";
import get from "lodash.get";
import * as actions from "../../store/actions";

import JumbotronContainer from "../../components/Jumbotron/Jumbotron";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';

import Styles from "./Specialist.module.css";

class Specialist extends Component {

    state = {
        callPatientDate: null
    }

    callPatientDateHandler = () => {
        this.setState({callPatientDate: new Date()})
    }

    patientVisitTimeHandler = () => {
        return (Math.ceil((new Date()-this.state.callPatientDate)/60000))
    }

    specialistIndex = get(this.props, 'specialistIndex')
    
    render () {

        let specialistPage = <p>Loading</p>

        if(!this.props.loading){
            specialistPage =
                <>
                    {this.props.withPatient[this.specialistIndex]
                    ? 
                    <Card className={Styles.PacientContainer}>
                        <Card.Header className={Styles.PacientContainerHeader} style={{"borderRadius": "0"}}>
                                PACIENTAS
                        </Card.Header>
                        <Card.Body className={Styles.PacientContainerBody}>
                            <div style={{"marginTop": "2.5%"}}>
                                <Button variant="primary" size="lg" disabled>{this.props.data[this.specialistIndex].clients[0].name}</Button>
                                <Button variant="success" size="lg" onClick={() => 
                                    {console.log("labas")
                                        this.props.onPatientServed(
                                            this.specialistIndex, 
                                            this.patientVisitTimeHandler(), 
                                            this.props.data[this.specialistIndex].clients[0],
                                            this.props.dataKey,
                                            this.props.data,
                                            this.props.withPatient)}}>
                                        Aptarnauta</Button>
                            </div>
                            <div style={{"marginTop": "5%"}}>
                                <Button variant="primary" size="lg" disabled>{`Liko ${Math.ceil(this.props.data[this.specialistIndex].clients[0].timeLeft+this.props.data[this.specialistIndex].visitTime)} min`}</Button>
                                <Button variant="danger" size="lg" onClick={() => this.props.onAddVisitTime(this.specialistIndex)}>+ 5 min</Button>
                            </div>
                        </Card.Body>
                    </Card>
                    : 
                    <Card className={Styles.PacientContainer}>
                        <Card.Header className={Styles.PacientContainerHeader} style={{"borderRadius": "0"}}>
                                PACIENTAS
                        </Card.Header>
                        <Card.Body className={Styles.PacientContainerBody}>
                            {this.props.data[this.specialistIndex].clients.length > 0
                            ? 
                            <div style={{"marginTop": "2.5%"}}>
                                <Button variant="primary" size="lg" disabled>{this.props.data[this.specialistIndex].clients[0].name}</Button>
                                <Button variant="success" size="lg" onClick={() => this.props.onCallPatient(this.props.specialistIndex, this.callPatientDateHandler())}>Kviesti</Button>
                            </div>
                            : 
                            <div style={{"marginTop": "2.5%"}}>
                                <Button variant="primary" size="lg" disabled style={{ "width":"100%"}}>Nėra laukiančių pacientų</Button>
                            </div>
                            }
                        </Card.Body>
                    </Card>
                    }
                    {this.props.mainLoading
                    
                    ? <div style={{"display": "flex", "alignItems": "center", "height": "50vh", "justifyContent": "center"}}>
                        <Spinner animation="grow" />
                    </div>
                    : <div className={Styles.JumbotronContainer}>
                        <JumbotronContainer
                            specialist={true}
                            highlight={this.props.withPatient[this.specialistIndex]}
                            key={this.props.data[this.specialistIndex].name}
                            name={this.props.data[this.specialistIndex].name}
                            clients={this.props.data[this.specialistIndex].clients}/>
                    </div>}
                </>
        }

        return (
            <>{specialistPage}</>
        )
    }
}

const mapStateToProps = state => {
    return {
        data: state.main.data,
        specialistIndex: state.auth.specialistIndex,
        loading: state.auth.loading,
        withPatient: state.main.withPatient,
        mainLoading: state.main.loading,
        dataKey: state.main.dataKey
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onCallPatient: (index) => dispatch(actions.callPatient(index)),
        onPatientServed: (specialistIndex, visitTime, client, dataKey, data, withPatient) => dispatch(actions.patientSaved(specialistIndex, visitTime, client, dataKey, data, withPatient)),
        onAddVisitTime: (specialistIndex) => dispatch(actions.addVisitTime(specialistIndex))
    }
} 

export default connect(mapStateToProps, mapDispatchToProps)(Specialist);