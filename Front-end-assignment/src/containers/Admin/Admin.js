import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';

import Styles from "./Admin.module.css";


class Admin extends Component {

    componentDidMount () {
        this.props.onFecthServedPatients()
    }
    render () {

        let admin = 
            <div style={{
                "display": "flex", 
                "alignItems": "center", 
                "height": "50vh", 
                "justifyContent": "center"}}>
                <Spinner animation="grow" />
            </div>

        if(!this.props.loading){
            admin =
                <div style={{'height': '100%',
                    'margin-right': '-50px',
                    'padding-right': '50px',
                    'overflowY': 'scroll'}}>
                    {(this.props.data || []).map((item, i) =>(
                    <Card className={Styles.CheckNumberContainer} key={item.name}>
                        <Card.Header className={Styles.CheckNumberHeader} style={{"borderRadius": "0"}}>
                            {item.name.toUpperCase()}
                        </Card.Header >
                        <Card.Body className={Styles.Body}>
                            {this.props.servedPatients[i].slice(-5).map(patient => (
                                <Button key={patient.key} variant="primary" size="lg" disabled>{`${patient.name} vizito trukmė ${patient.timeLeft} min`}</Button> 
                            ))}
                            <Button variant="outline-success" size="lg">Specialisto Statistika</Button>                                        
                        </Card.Body>
                    </Card>     
                    ))}
                </div>
                }


        return (<>{admin}</>)
            }
        }

const mapStateToProps = state => {
    return {
        loading: state.main.loading,
        data: state.main.data,
        servedPatients: state.main.servedPatients
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFecthServedPatients: () => dispatch(actions.fetchServedPatients())
    }
} 

export default connect(mapStateToProps, mapDispatchToProps)(Admin);