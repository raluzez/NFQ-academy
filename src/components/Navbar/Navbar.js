import React from 'react';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Styles from "./Navbar.module.css";

const navbar = () => (
    <Nav variant="pills" defaultActiveKey="home" className={Styles.Navbar}>
        <Nav.Item>
            <Nav.Link eventKey="home" as={Link} to="/">Švieslentė</Nav.Link>
        </Nav.Item>
        <Nav.Item>
            <Nav.Link eventKey="addUser" as={Link} to="/addUser">Greita registracija</Nav.Link>
        </Nav.Item>
        <Nav.Item>
            <Nav.Link eventKey="specialist" as={Link} to="/specialist">Specialistui</Nav.Link>
        </Nav.Item>
    </Nav>
)

export default navbar;