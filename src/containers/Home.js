import React, { Component } from "react";
import JumbotronContainer from "../components/Jumbotron/Jumbotron";
import Data from "../dummyData.json";

import Styles from "./Home.module.css";


class Home extends Component {
    render () {
        let home = 
            <div className={Styles.Container}>
                {(Data || []).map(item => (
                <JumbotronContainer
                    key={item.name}
                    name={item.name}
                    clients={item.clients}/>
                ))}
            </div>  
        return (         
            <>
                {home}
            </>
        )
    }
}

export default Home;