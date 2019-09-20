import React, { Component, Suspense } from "react";
import { Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";

import Home from "./containers/Home/Home";
const AddUser = React.lazy(() => import('./containers/AddUser/AddUser'));
const Specialist = React.lazy(() => import('./containers/Specialist/Specialist'));

class App extends Component {
    render () {
        return (
            <div>
                <Navbar/>
                <main>
                    <Route path="/" exact component={Home}/>
                    <Suspense fallback="...">
                        <Route path="/addUser" component={AddUser}/>
                        <Route path="/specialist" component={Specialist}/>
                    </Suspense> 
                </main>         
            </div>
        )
    }
}

export default App;