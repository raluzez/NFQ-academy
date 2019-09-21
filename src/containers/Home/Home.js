import React, { Component } from "react";
import { connect } from "react-redux";

import JumbotronContainer from "../../components/Jumbotron/Jumbotron";
import JumbotronModal from "../../components/Jumbotron/JumbotronModal/JumbotronModal";

import * as actions from "../../store/actions";

import Styles from "./Home.module.css";


class Home extends Component {

    clickedJumbotronClients = (jumbotronName, data) => {
        let clients = []
        data.map(specialist => {
            if(specialist.name === jumbotronName){
                clients = specialist.clients
            }
            return null
            // catch error and return else
        }) 
        return clients  
    }

    

    render () {
        let home = 
            <div className={Styles.Container}>
                {(this.props.data || []).map(item => (
                <JumbotronContainer 
                    key={item.name}
                    name={item.name}
                    clients={item.clients}
                    onclick={() => this.props.onClickedJumbotron(item)}/>
                ))}
            </div>  
        return (         
            <>
                {this.props.showModal 
                    ? <JumbotronModal 
                        clients={this.clickedJumbotronClients(this.props.clickedJumbotron.name, this.props.data)} 
                        show={this.props.showModal} 
                        closeModal={() => this.props.onCloseJumbotronModal()}/>
                    : null}
                {home}
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        showModal: state.main.showJumbotronModal,
        clickedJumbotron: state.main.clickedJumbotron,
        data: state.main.data
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onClickedJumbotron: (jumbotronData) => dispatch(actions.jumbotronClicked(jumbotronData)),
        onCloseJumbotronModal: () => dispatch(actions.closeJumbotronModal())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);