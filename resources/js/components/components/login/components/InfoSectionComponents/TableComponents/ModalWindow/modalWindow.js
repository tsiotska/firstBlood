import React, {Component} from 'react';
import {connect} from "react-redux";
import IosClose from 'react-ionicons/lib/IosClose'
import Window from './Window'
import './ModalWindow.css'
import {changeCurrentId, toggleModal, changeRemove} from "../../../../../../redux/TableState/tableActions";
import {withStyles} from "@material-ui/core";
import PropTypes from "prop-types";

const modalStyles = theme => ({
    [theme.breakpoints.between("sm", "xl")]: {},
    [theme.breakpoints.between("xs", "sm")]: {
        closeButton: {}
    },
    myModal: {
        position: 'fixed',
        transform: 'translate(-50%, -50%)',
        zIndex: '4',
        overflowY: 'auto'
    },

    removeLine: {
        display: 'flex',
        height: 35,
        width: '100%',
        backgroundColor: '#d6d6d6',
        cursor: 'move',
        alignItems: 'center'
    },

    closeButton: {
        marginTop: 15,
        marginLeft: 'auto',
        color: '#256589',
        cursor: 'pointer'
    }
})

class ModalWindow extends Component {

    moveModal = (e) => {
        if (window.innerWidth > 800) {
            var ball = document.getElementById("ball");
            /*
                    var coordX = e.pageX - this.state.left
                    var coordY = e.pageY - this.state.top
                    document.onmousemove = (e) => {
                        this.moveAt(e, coordX, coordY);
                    }*/
            var Modal = ball.getBoundingClientRect();
            var coordX = e.pageX - (Modal.right - ball.clientWidth + ball.clientWidth / 2)
            var coordY = e.pageY - (Modal.bottom - ball.clientHeight + ball.clientHeight / 2)
            document.onmousemove = (e) => {
                this.moveAt(e, coordX, coordY);
            }
            ball.onmouseup = () => {
                document.onmousemove = null;
                ball.onmouseup = null;
            }
        }
    };

    moveAt = (e, coordX, coordY) => {
        var left = e.pageX - coordX
        var top = e.pageY - coordY
        this.props.changeCoord(left, top)
        /* this.setState({
             left: e.pageX - coordX ,
             top: e.pageY - coordY
         })*/
    }

    render() {
        const {classes} = this.props;
        return (

            this.props.modalIsOpen ? <div
                id={"ball"} className={classes.myModal}
                style={{
                    left: this.props.left,
                    top: this.props.top,
                }}>


                <div className={classes.removeLine}

                     onMouseDown={(e) => {
                         this.moveModal(e)
                     }}>
                    <div className={classes.closeButton}
                         onClick={() => {
                             this.props.closeWindow()
                         }}>

                        <IosClose fontSize="25" color="black"/>
                    </div>
                </div>
                <Window/></div> : null
        )
    }

}

ModalWindow.propTypes = {
    classes: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
    modalIsOpen: state.tableReducer.isModalOpen,
    left: state.tableReducer.left,
    top: state.tableReducer.top
})

const mapDispatchToProps = (dispatch) => ({
    changeCoord: (left, top) => {
        dispatch(changeRemove(left, top))
    },
    closeWindow: (id) => {
        dispatch(toggleModal());
        dispatch(changeCurrentId(id));
    },
})


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(modalStyles)(ModalWindow))
