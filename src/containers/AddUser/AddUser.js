import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";

import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

import Styles from "./AddUser.module.css";

class AddUser extends Component {

    state = {
        timeLeft:10,
        interval:null
    }

    startTimer = () => {
        let interval = setInterval(this.timer, 1000);
        this.setState({ interval: interval });
    }

    timer = () => {
        if(this.state.timeLeft >0){
            let timeLeft = this.state.timeLeft-1
            this.setState({ timeLeft: timeLeft})
        } else {
            this.props.onCloseSuccessScreen();
            clearInterval(this.state.interval);
            this.setState({ timeLeft: 10});
        }
    }

    render () {
        return (
            <>
            {this.props.buttonClicked 
            ? <div className={Styles.Container}>
                <Button variant="success" disabled>Registracija Sekminga</Button>
                <Button variant="primary" disabled>
                    <p>{this.props.successData.specialistName}</p>
                    <p>{`Jūsų numeris ${this.props.successData.name}`}</p>
                    <p>{`Liko laukti apie ${this.props.successData.timeLeft} min`}</p>
                    <div><Spinner animation="grow" /></div>
                    <p>{this.state.timeLeft}</p>
                </Button>
              </div> 
            : <div className={Styles.Container}>
                <Button variant="primary" disabled>Pasirinkite specialistą</Button>
                {this.props.data.map(item => (
                    <Button variant="outline-success" onClick={() => {this.props.onRegisterClient(item); this.startTimer()}} key={item.name}>{item.name}</Button>
                ))}
              </div>}
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        data: state.main.data,
        buttonClicked: state.main.registrationSuccessful,
        successData: state.main.registrationSuccessData
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onRegisterClient: specialistData => dispatch(actions.registerClient(specialistData)),
        onCloseSuccessScreen: () => dispatch(actions.closeSuccessScreen())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddUser);