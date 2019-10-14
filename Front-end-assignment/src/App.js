import React, { Component, Suspense } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { connect } from "react-redux";
import Navbar from "./components/Navbar/Navbar";
import * as actions from "./store/actions";

import Home from "./containers/Home/Home";
const AddUser = React.lazy(() => import('./containers/AddUser/AddUser'));
const Login = React.lazy(() => import('./containers/Auth/Login'));
const Logout = React.lazy(() => import("./containers/Auth/Logout/Logout"));
const Specialist = React.lazy(() => import('./containers/Specialist/Specialist'));
const User = React.lazy(() => import('./containers/User/User'));
const Admin = React.lazy(() => import('./containers/Admin/Admin'));

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
                <main style={{"overflow": "hidden"}}>
                    <Suspense fallback="...">
                        <Switch>
                            <Route path="/addUser" component={AddUser}/>
                            {!this.props.token
                            ?<Route path="/login" component={Login}/>
                            :<Route path="/logout" component={Logout}/>}
                            {this.props.specialistIndex !== null
                            ? this.props.specialistIndex !== true 
                                ?<Route path="/specialis" component={Specialist}/>
                                :<Route path="/admin" component={Admin}/>
                            :<Route path="/user" component={User}/>}
                            <Route path="/" exact component={Home}/>
                            <Redirect to="/"/>
                        </Switch>
                    </Suspense> 
                </main>         
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        showNavbar: state.main.registrationSuccessful,
        timerOn: state.main.timerOn,
        specialistIndex: state.auth.specialistIndex,
        token: state.auth.token

    }
}

const mapDispatchToProps = dispatch => {
    return {
      onAutoSignin: () => dispatch(actions.authCheckLogin()),
      onTimer: () => dispatch(actions.timer())
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(App);