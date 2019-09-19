import React from "react";

import Styles from "./JumbotronModal.module.css";

const jumbotronModal = (props) => (
    <div className={Styles.JumbotronModal} 
            style={{
                transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: props.show ? '1' : '0'
                }}>
        {props.clients.map(client => (
                    <div key={client.id} className={Styles.ClientInfo}>
                        <span>{client.name}</span>
                        <i className={`fas fa-arrow-right ${Styles.Arrow}`} onClick={props.closeModal}></i>
                        <span>{Math.ceil(client.timeLeft,1)} min</span>
                    </div>))}
    </div>
)

export default jumbotronModal;