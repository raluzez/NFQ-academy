import React, { Component, Suspense } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import Navbar from "./components/Navbar/Navbar";

import Home from "./containers/Home/Home";
const AddUser = React.lazy(() => import('./containers/AddUser/AddUser'));
const Login = React.lazy(() => import('./containers/Login/Login'));
const Specialist = React.lazy(() => import('./containers/Specialist/Specialist'));

class App extends Component {
    render () {
        return (
            <div>
                {!this.props.showNavbar
                    ? <Navbar/>
                    : null}
                <main>
                    <Route path="/" exact component={Home}/>
                    <Suspense fallback="...">
                        <Route path="/addUser" component={AddUser}/>
                        <Route path="/login" component={Login}/>
                    </Suspense> 
                </main>         
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        showNavbar: state.main.registrationSuccessful
    }
}

export default connect(mapStateToProps)(App);