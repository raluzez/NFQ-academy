import React, { Component, Suspense } from "react";
import { Link, Route } from "react-router-dom";

import Home from "./containers/Home";
const AddUser = React.lazy(() => import('./containers/AddUser'));
const Specialist = React.lazy(() => import('./containers/Specialist'));

class App extends Component {
    render () {
        return (
            <div>
                <div>
                    <Link to="/">Švieslentė</Link>
                    <Link to="/addUser">Pridėti naują klientą</Link>
                    <Link to="/specialist">Specialistui</Link>
                </div>
                <div>
                    <Route path="/" exact component={Home}/>
                    <Suspense fallback="...">
                        <Route path="/addUser" component={AddUser}/>
                        <Route path="/specialist" component={Specialist}/>
                    </Suspense>
                    
                </div>
            </div>
        )
    }
}

export default App;