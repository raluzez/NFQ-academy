import React, { Component } from "react";
import { connect } from "react-redux";

import JumbotronContainer from "../../components/Jumbotron/Jumbotron";
import JumbotronModal from "../../components/Jumbotron/JumbotronModal/JumbotronModal";

import Spinner from 'react-bootstrap/Spinner';

import * as actions from "../../store/actions";

import Styles from "./Home.module.css";


class Home extends Component {

    componentDidMount () {
        this.props.onFetchData(this.props.key)
    }

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

    checkWithPatient = () => {
        let indexArray = []
        this.props.withPatient.map((specialist, i) => { 
            if(specialist){
               indexArray.push(i)
            }
            return indexArray
        })
        return indexArray
    }
    
    render () {
        const indexArray = this.checkWithPatient()
        let home = <div style={{"display": "flex", "alignItems": "center", "height": "50vh", "justifyContent": "center"}}><Spinner animation="grow" /></div>
        
        if(!this.props.loading){
            home =
            <div className={Styles.Container}>
                {(this.props.data || []).map((item, i) =>{
                    let highlight = null
                    indexArray.map(index => {
                        if(index === i){
                            highlight = index
                        } return highlight
                    })
                    return (
                    <JumbotronContainer 
                        key={item.name}
                        highlight={highlight}
                        name={item.name}
                        clients={item.clients}
                        onclick={() => this.props.onClickedJumbotron(item, i)}/>
                    )})}
            </div> 
        }
     
        return (         
            <>
                {this.props.showModal 
                    ? <JumbotronModal 
                        clients={this.clickedJumbotronClients(this.props.clickedJumbotron.name, this.props.data)} 
                        show={this.props.showModal} 
                        closeModal={() => this.props.onCloseJumbotronModal()}
                        highlightArr={indexArray}
                        clickedIndex={this.props.clickedJumbotron.index}/>
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
        data: state.main.data,
        withPatient: state.main.withPatient,
        loading: state.main.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onClickedJumbotron: (jumbotronData, jumbotronIndex) => dispatch(actions.jumbotronClicked(jumbotronData, jumbotronIndex)),
        onCloseJumbotronModal: () => dispatch(actions.closeJumbotronModal()),
        onFetchData: () => dispatch(actions.fetchData())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);