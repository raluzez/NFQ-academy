import React, { Component } from "react";
import { connect } from "react-redux";
import get from "lodash.get";
import * as actions from "../../store/actions";

import JumbotronContainer from "../../components/Jumbotron/Jumbotron";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import Styles from "./Specialist.module.css";

class Specialist extends Component {

    render () {
        const specialistIndex = get(this.props, 'specialistIndex')
        const specialistData = get(this.props, 'data')

        let specialistPage = <p>Loading</p>

        if(!this.props.loading){
            specialistPage =
                <>
                    {this.props.withPatient
                    ? 
                    <Card className={Styles.PacientContainer}>
                        <Card.Header className={Styles.PacientContainerHeader} style={{"borderRadius": "0"}}>
                                PACIENTAS
                        </Card.Header>
                        <Card.Body className={Styles.PacientContainerBody}>
                            <div style={{"marginTop": "2.5%"}}>
                                <Button variant="primary" size="lg" disabled>{specialistData[specialistIndex].clients[0].name}</Button>
                                <Button variant="success" size="lg" onClick={() => this.props.onPatientServed(specialistIndex)}>Aptarnauta</Button>
                            </div>
                            <div style={{"marginTop": "5%"}}>
                                <Button variant="primary" size="lg" disabled>{`Liko ${Math.ceil(specialistData[specialistIndex].clients[0].timeLeft)} min`}</Button>
                                <Button variant="danger" size="lg" onClick={() => this.props.onAddVisitTime(specialistIndex)}>+ 5 min</Button>
                            </div>
                        </Card.Body>
                    </Card>
                    : 
                    <Card className={Styles.PacientContainer}>
                        <Card.Header className={Styles.PacientContainerHeader} style={{"borderRadius": "0"}}>
                                PACIENTAS
                        </Card.Header>
                        <Card.Body className={Styles.PacientContainerBody}>
                            {specialistData[specialistIndex].clients.length > 0
                            ? 
                            <div style={{"marginTop": "2.5%"}}>
                                <Button variant="primary" size="lg" disabled>{specialistData[specialistIndex].clients[0].name}</Button>
                                <Button variant="success" size="lg" onClick={this.props.onCallPatient}>Kviesti</Button>
                            </div>
                            : 
                            <div style={{"marginTop": "2.5%"}}>
                                <Button variant="primary" size="lg" disabled style={{ "width":"100%"}}>Nėra laukiančių pacientų</Button>
                            </div>
                            }
                        </Card.Body>
                    </Card>
                    }
                    <div className={Styles.JumbotronContainer}>
                        <JumbotronContainer
                            specialist={true}
                            highlight={this.props.withPatient} // finish this
                            key={specialistData[specialistIndex].name}
                            name={specialistData[specialistIndex].name}
                            clients={specialistData[specialistIndex].clients}/>
                    </div>
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
        withPatient: state.main.withPatient
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onCallPatient: () => dispatch(actions.callPatient()),
        onPatientServed: (specialistIndex) => dispatch(actions.patientServed(specialistIndex)),
        onAddVisitTime: (specialistIndex) => dispatch(actions.addVisitTime(specialistIndex))
    }
} 

export default connect(mapStateToProps, mapDispatchToProps)(Specialist);