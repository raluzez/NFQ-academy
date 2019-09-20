import React from "react";

import Styles from "./JumbotronModal.module.css";

const jumbotronModal = (props) => (
    <div className={Styles.JumbotronModal}>
        <i className={`fas fa-times ${Styles.CloseIcon}`} onClick={props.closeModal}></i>
        {props.clients.map(client => (
                    <div key={client.id} className={Styles.ClientInfo}>
                        <span>{client.name}</span>
                        <i className={`fas fa-arrow-right ${Styles.Arrow}`}></i>
                        <span>{Math.ceil(client.timeLeft,1)} min</span>
                    </div>))}
    </div>
)

export default jumbotronModal;