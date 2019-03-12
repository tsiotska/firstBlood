import React, {Component} from 'react';
import {connect} from "react-redux";
import Window from './Window'

class ModalWindow extends Component {
    render() {
        return(
            this.props.modalIsOpen ? <Window /> : null
        )
    }

}


const mapStateToProps = (state) => ({
    modalIsOpen: state.tableReducer.isModalOpen
})



export default connect(mapStateToProps)(ModalWindow);
