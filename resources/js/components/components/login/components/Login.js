import React from "react";
import GoogleLogin from 'react-google-login';
import {connect} from 'react-redux'

import {signedInSucessfully, loginFailure} from '../../../redux/actions';

const Login = ({successHandler, FailureHandler}) => (
    <div className="GoogleLogin">
        <GoogleLogin

            clientId="1067933205015-hpcbku965s2dvcdr58jkqp91kvagcd6l.apps.googleusercontent.com"
            buttonText="LOGIN WITH GOOGLE"

            onSuccess={successHandler}
            onFailure={FailureHandler}/>

    </div>
);

const mapDispatchToProps = dispatch => ({
    successHandler: response => dispatch(signedInSucessfully(response)),
    FailureHandler: response => dispatch(loginFailure(response))
});

export default connect(
    null,
    mapDispatchToProps
)(Login);
