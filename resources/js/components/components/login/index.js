import React from 'react';
import LoginBtn from "./components/Login";
import MainPage from "./components/MainPage";
import {connect} from "react-redux"
import "./index.css"
import axios from "axios"

class Login extends React.Component {

    componentDidMount() {
        axios.get('/students')
            .then(response => {
                log(response);
                log(response.data);
                setStore(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    render() {
        const {signedIn} = this.props;
        return (signedIn ?
            <MainPage
                handleClick={this.handleClick}
            />
            : <LoginBtn/>);
    }
}




const mapStateToProps = state => ({
    signedIn: state.mainReducer.isSignedIn
});

export default connect(mapStateToProps)(Login)
