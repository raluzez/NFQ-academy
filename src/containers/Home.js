import React, { Component } from "react";
import { connect } from "react-redux";

import JumbotronContainer from "../components/Jumbotron/Jumbotron";
import JumbotronModal from "../components/Jumbotron/JumbotronModal/JumbotronModal";

import * as actions from "../store/actions";
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
                    clients={item.clients}
                    // onClick={() => this.props.onClickedJumbotron(item)}
                    onclick={() => this.props.onClickedJumbotron(item)}/>
                ))}
            </div>  
        return (         
            <>
                {this.props.showModal 
                    ? <JumbotronModal 
                        clients={this.props.clickedJumbotron.clients} 
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
        clickedJumbotron: state.main.clickedJumbotron
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onClickedJumbotron: (jumbotronData) => dispatch(actions.jumbotronClicked(jumbotronData)),
        onCloseJumbotronModal: () => dispatch(actions.closeJumbotronModal())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);