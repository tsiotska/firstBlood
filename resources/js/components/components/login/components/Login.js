import React from "react";
//import GoogleLogin from 'react-google-login';
import {connect} from 'react-redux';
import './Login.css';
import MdCheckmark from 'react-ionicons/lib/MdCheckmark'
import IosAlert from 'react-ionicons/lib/IosAlert'
import blue from '@material-ui/core/colors/blue';

import Button from '@material-ui/core/Button';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';


import {signedInSucessfully, loginFailure} from '../../../redux/actions';
import {Link, Redirect} from "react-router-dom";

const styles = theme => ({
    input: {
        width: 200,
        '&:after': {
            borderBottomColor: blue[900],

        },
    },
        cssLabel: {
            color: blue[900],
        },

        button: {
            margin: theme.spacing.unit,
            '&:focus': {
                outline: 'none',
                backgroundColor: '#d9d9d9'
            }
        },
});


class Login extends React.Component {
    state = {
        Login: '1',
        Password: '1',
        link: "/",
        checkedLogin: false,
        checkedPassword: false,
        errorLogin: "",
        errorPassword: "",

        redirect: false
    };

    validate = (type) => {
        var check = document.getElementById(type).value;
        if (check === this.state[type]) {
            this.setState({
                ["checked" + type]: true,
                ["error" + type]: ""
            })
        } else {
            this.setState({
                ["checked" + type]: false,
                ["error" + type]: [type] + " is wrong!",
                ["warning" + type]: <IosAlert fontSize="40px" color="#A81D1D"/>
            })
        }
    };

    setRedirect = () => {
        var checkLog = document.getElementById("Login").value;
        var checkPas = document.getElementById("Password").value;

        if (checkLog !== this.state.Login || checkPas !== this.state.Password) {
            this.validate("Login");
            this.validate("Password");
        } else {
            this.setState({
                redirect: true
            })

        }
    };
    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to="/mainpage/registration"/>
        }
    }

    render() {
        const {classes} = this.props;
        return (
            <div className="Auth">
                {this.renderRedirect()}
                <form className="authForm">

                    <div className="Field">
                        <label className="authInputBlock">

                            <TextField
                                error={this.state.errorLogin.length !== 0}   /*helperText={this.state.errorLogin}*/
                                InputLabelProps={{
                                    classes: {
                                        label: classes.cssLabel
                                    },
                                }}
                                InputProps={{
                                    className: classes.input
                                }}
                                id="Login"
                                label="Login"
                                type="text"
                                margin="normal"/>
                        </label>

                        <div className="CheckBox">
                            {this.state.checkedLogin ? <MdCheckmark fontSize="40px" color="#43853d"/>
                                : this.state.warningLogin}
                        </div>

                    </div>


                    <div className="Field">

                        <label className="authInputBlock">
                            <TextField
                                error={this.state.errorPassword.length !== 0}
                                InputLabelProps={{
                                    classes: {
                                        label: classes.cssLabel
                                    },
                                }}
                                InputProps={{
                                    className: classes.input
                                }}
                                id="Password"
                                label="Password"
                                type="password"
                                margin="normal"/>
                        </label>

                        <div className="CheckBox">
                            {this.state.checkedPassword ? <MdCheckmark fontSize="40px" color="#43853d"/>
                                : this.state.warningPassword}
                        </div>
                    </div>

                    <div className="submit">
                        <Button variant="contained" onClick={this.setRedirect} className={classNames(classes.button)}>
                            Enter
                        </Button>
                    </div>

                </form>
            </div>
        )
    }

}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    signedIn: state.mainReducer.isSignedIn
});
const mapDispatchToProps = dispatch => ({
    successHandler: response => dispatch(signedInSucessfully(response)),
    FailureHandler: response => dispatch(loginFailure(response))
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Login));
