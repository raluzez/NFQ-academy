import React from "react";
import Jumbotron from 'react-bootstrap/Jumbotron';
import Card from 'react-bootstrap/Card';

import Styles from "./Jumbotron.module.css";

const jumbotronContainer = (props) => (
    <div>
        <Card className={Styles.Jumbotron}>
            <Card.Header>{props.name}</Card.Header>
                <Card.Body>
                    <Jumbotron>Labas</Jumbotron>
                </Card.Body>
        </Card>
    </div>
)
export default jumbotronContainer;