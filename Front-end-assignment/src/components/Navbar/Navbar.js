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
            <Nav.Link eventKey="addUser" as={NavLink} to="/addUser" exact>Greita registracija</Nav.Link>
        </Nav.Item>
        {props.specialistIndex !== null
        ? props.specialistIndex !== true 
            ? <Nav.Item>
                <Nav.Link eventKey="specialis" as={NavLink} to="/specialis" exact>Specialistui</Nav.Link>
            </Nav.Item>
            : <Nav.Item>
                <Nav.Link eventKey="admin" as={NavLink} to="/admin" exact>Administratorius</Nav.Link>
            </Nav.Item>
        : <Nav.Item>
            <Nav.Link eventKey="user" as={NavLink} to="/user" exact>Vartotojui</Nav.Link>
        </Nav.Item>}
        {!props.token
        ?   <Nav.Item>
                <Nav.Link eventKey="login" as={NavLink} to="/login" exact>Prisijungti</Nav.Link>
            </Nav.Item>
        : <Nav.Item>
                <Nav.Link eventKey="logout" as={NavLink} to="/logout" exact>Atsijungti</Nav.Link>
            </Nav.Item>
        } 
    </Nav>
)

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        specialistIndex: state.auth.specialistIndex
    }
}

export default connect(mapStateToProps)(navbar);