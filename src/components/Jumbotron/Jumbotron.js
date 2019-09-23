import React from "react";
import Card from 'react-bootstrap/Card';

import Styles from "./Jumbotron.module.css";

const jumbotronContainer = (props) => {
    
    let specialistStyle = null;

    if(props.specialist){
        specialistStyle = {"width":"50%", "fontSize":"150%"}
    }

    let clientsInfo  = 
        props.clients.slice(0,5).map(client => (
            <div key={client.name} className={Styles.ClientInfo}>
                <span>{client.name}</span>
                <i className={`fas fa-arrow-right ${Styles.Arrow}`}></i>
                <span>{Math.ceil(client.timeLeft,1)} min</span>
            </div>             
        ))  

    if(props.clients[0]){
        if(props.clients[0].timeLeft < 0) {
        const firstClient =  props.clients[0]
        clientsInfo[0] =
            <div key={firstClient.name} className={Styles.ClientInfo}>
                <span className={Styles.Blinking}>{firstClient.name}</span>
                <i className={`fas fa-arrow-right ${Styles.Arrow} ${Styles.Blinking}`}></i>
                <span className={Styles.Blinking}>{Math.ceil(firstClient.timeLeft,1)} min</span>
            </div> 
    }}

    if (props.highlight || props.highlight === 0) {
        const firstClient =  props.clients[0]
             clientsInfo[0] = 
                <div key={firstClient.name} className={Styles.ClientInfo} style={{"display":"block", "marginBottom":"2.5%"}}>
                     <span style={{"color":"green","fontSize":"120%"}}>{firstClient.name}</span>
                </div> 
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
                {clientsInfo}
            </Card.Body>
        </Card> 
    </>
)}
export default jumbotronContainer;