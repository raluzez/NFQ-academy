import React, { Component } from "react";
import { connect } from "react-redux";

import JumbotronContainer from "../../components/Jumbotron/Jumbotron";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import Styles from "./Specialist.module.css";

class Specialist extends Component {
    render () {
        return (
            <>
                <Card className={Styles.PacientContainer}>
                    <Card.Header className={Styles.PacientContainerHeader} style={{"backgroundColor":"#59A9FF"}}>
                            PACIENTAS
                    </Card.Header>
                    <Card.Body className={Styles.PacientContainerBody}>
                        <div style={{"marginTop": "2.5%"}}>
                            <Button variant="primary" size="lg" disabled>{this.props.data[0].clients[0].name}</Button>
                            <Button variant="success" size="lg">Aptarnautas</Button>
                        </div>
                        <div style={{"marginTop": "5%"}}>
                            <Button variant="primary" size="lg" disabled>{`Liko ${Math.ceil(this.props.data[0].clients[0].timeLeft)} min`}</Button>
                            <Button variant="danger" size="lg">+ 5 min</Button>
                        </div>
                    </Card.Body>
                </Card>
                <Card className={Styles.PacientContainer}>
                    <Card.Header className={Styles.PacientContainerHeader} style={{"backgroundColor":"#59A9FF"}}>
                            PACIENTAS
                    </Card.Header>
                    <Card.Body className={Styles.PacientContainerBody}>
                        <div style={{"marginTop": "2.5%"}}>
                            <Button variant="primary" size="lg" disabled>{this.props.data[0].clients[0].name}</Button>
                            <Button variant="success" size="lg">Kviesti</Button>
                        </div>
                    </Card.Body>
                </Card>
                <div className={Styles.JumbotronContainer}>
                    <JumbotronContainer
                        specialist={true}
                        key={this.props.data[0].name}
                        name={this.props.data[0].name}
                        clients={this.props.data[0].clients}/>
                </div>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        data: state.main.data
    }
}

export default connect(mapStateToProps)(Specialist);