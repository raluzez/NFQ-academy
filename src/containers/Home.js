import React, { Component } from "react";
import JumbotronContainer from "../components/Jumbotron/Jumbotron";
import Data from "../dummyData.json";

import Styles from "./Home.module.css";


class Home extends Component {
    render () {
        let home = 
            (Data || []).map((item) => (
            <JumbotronContainer
                key={item.name}
                name={item.name}
                clients={item.clients}/>
            ))
        console.log(home)
        

        return (         
            <div className={Styles.Container}>
                {home}
            </div> 
        )
    }
}

export default Home;