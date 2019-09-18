import React from "react";
import Card from 'react-bootstrap/Card';

import Styles from "./Jumbotron.module.css";

const jumbotronContainer = (props) => {
    
    return(
    <>
        <Card className={Styles.JumbotronCard}>
            <Card.Header style={{"backgroundColor": "rgb(231, 230, 230)"}}>{props.name}</Card.Header>
            <Card.Body className={Styles.Jumbotron}>
                {props.clients.map(client => (<div key={client.id} className={Styles.ClientInfo}><span>{client.name}</span><i className={`fas fa-arrow-right ${Styles.Arrow}`}></i><span>{client.timeLeft} min</span></div>))}
            </Card.Body>
        </Card> 
    </>
)}
export default jumbotronContainer;