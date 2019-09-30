import React from "react";

import Styles from "./JumbotronModal.module.css";

const jumbotronModal = (props) => {

    let clientsInfo =
        props.clients.map(client => (
            <div key={client.name} className={Styles.ClientInfo}>
                <span>{client.name}</span>
                <i className={`fas fa-arrow-right ${Styles.Arrow}`}></i>
                <span>{Math.ceil(client.timeLeft,1)} min</span>
            </div>))

    if(props.clients[0].timeLeft < 0) {
        const firstClient =  props.clients[0]
        clientsInfo[0] =
            <div key={firstClient.name} className={Styles.ClientInfo}>
                <span className={Styles.Blinking}>{firstClient.name}</span>
                <i className={`fas fa-arrow-right ${Styles.Arrow} ${Styles.Blinking}`}></i>
                <span className={Styles.Blinking}>{Math.ceil(firstClient.timeLeft,1)} min</span>
            </div> 
    }

    props.highlightArr.map(index =>{
        if(index === props.clickedIndex) {
            const firstClient =  props.clients[0]
            clientsInfo[0] =
                <div key={firstClient.id} className={Styles.ClientInfo}>
                    <span style={{"color":"green","margin":"auto"}}>{firstClient.name}</span>
                </div>
        }
        return clientsInfo
    })

    return (
    <div className={Styles.JumbotronModal}>
        <i className={`fas fa-times ${Styles.CloseIcon}`} onClick={props.closeModal}></i>
        {clientsInfo}
    </div>
)}

export default jumbotronModal;