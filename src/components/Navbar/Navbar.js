import React from 'react';
import { NavLink } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import { connect } from "react-redux";

import Styles from "./Navbar.module.css";

const navbar = (props) => (
    <Nav variant="pills" className={Styles.Navbar}>
        <Nav.Item>
            <Nav.Link eventKey="home" as={NavLink} to="/" exact>Švieslentė</Nav.Link>
        </Nav.Item>
        <Nav.Item>
            <Nav.Link eventKey="addUser" as={NavLink} to="/addUser">Greita registracija</Nav.Link>
        </Nav.Item>
        {!props.token
        ?   <Nav.Item>
                <Nav.Link eventKey="login" as={NavLink} to="/login">Prisijungti</Nav.Link>
            </Nav.Item>
        :<> <Nav.Item>
                <Nav.Link eventKey="logout" as={NavLink} to="/logout">Atsijungti</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="specialis" as={NavLink} to="/specialis">Specialistui</Nav.Link>
            </Nav.Item></>}  
    </Nav>
)

const mapStateToProps = state => {
    return {
        token: state.auth.token
    }
}

export default connect(mapStateToProps)(navbar);