import React, { Component, Suspense } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import Navbar from "./components/Navbar/Navbar";
import * as actions from "./store/actions";

import Home from "./containers/Home/Home";
const AddUser = React.lazy(() => import('./containers/AddUser/AddUser'));
const Login = React.lazy(() => import('./containers/Auth/Login'));
const Logout = React.lazy(() => import("./containers/Auth/Logout/Logout"));
const Specialist = React.lazy(() => import('./containers/Specialist/Specialist'));

class App extends Component {

    componentDidMount() {
        this.props.onAutoSignin();
        if (!this.props.timerOn) {
            setInterval(() => this.props.onTimer(),5000)
        };
      };

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
                        <Route path="/logout" component={Logout}/>
                        <Route path="/specialis" component={Specialist}/>
                    </Suspense> 
                </main>         
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        showNavbar: state.main.registrationSuccessful,
        timerOn: state.main.timerOn
    }
}

const mapDispatchToProps = dispatch => {
    return {
      onAutoSignin: () => dispatch(actions.authCheckLogin()),
      onTimer: () => dispatch(actions.timer())
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(App);