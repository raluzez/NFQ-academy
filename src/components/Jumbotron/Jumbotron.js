import React from "react";
import Card from 'react-bootstrap/Card';

import Styles from "./Jumbotron.module.css";

const jumbotronContainer = (props) => {
    
    let specialistStyle = null;

    if(props.specialist){
        specialistStyle = {"width":"50%", "fontSize":"150%"}
    }

    return(
    <>
        <Card className={Styles.JumbotronCard} onClick={props.onclick} style={specialistStyle} >
            <Card.Header 
                style={{
                "backgroundColor": "#59A9FF",
                "color":"white", 
                "fontWeight":"bold"}}
                >
                    {props.name.toUpperCase()}
            </Card.Header>
            <Card.Body className={Styles.Jumbotron}>
                {props.clients.map(client => (
                    <div key={client.name} className={Styles.ClientInfo}>
                        <span>{client.name}</span>
                        <i className={`fas fa-arrow-right ${Styles.Arrow}`}></i>
                        <span>{Math.ceil(client.timeLeft,1)} min</span>
                    </div>))}
            </Card.Body>
        </Card> 
    </>
)}
export default jumbotronContainer;