import React from 'react';
import { handleAuthentication } from '../../modules/authentication';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {
  accentColor,
  primaryDarkColor,
  loginCardStyle,
  loginTextFieldStyle,
} from '../utils/themes.js';

export class PageLogin extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.onSignupClick = this.onSignupClick.bind(this);
    this.onLoginClick = this.onLoginClick.bind(this);

    this.state = {
      showSignup: false,
    };
  }

  onSignupClick() {
    if (this.state.showSignup) {
      handleAuthentication({ component: this }, true);
    } else {
      this.setState({ showSignup: true });
    }
  }

  onLoginClick() {
    if (this.state.showSignup) {
      this.setState({ showSignup: false });
    } else {
      handleAuthentication({ component: this }, false);
    }
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      <div className="center-align login-container">
        <h1 style={{ fontWeight: 100 }}>Olim</h1>
        <form className="loginForm" onSubmit={this.handleSubmit}>
          <div className="forms_container">
            <Paper zDepth={2} style={loginCardStyle}>
              <div className="relative form_line">
                <i className="material-icons">perm_identity</i>
                <TextField
                  hintText="Nom d'utilisateur"
                  style={loginTextFieldStyle}
                  ref="formLogin"
                />
              </div>
              <div className="relative form_line">
                <i className="material-icons">fingerprint</i>
                <TextField
                  hintText="Mot de passe"
                  type="password"
                  ref="formPassword"
                  style={loginTextFieldStyle}
                />
              </div>
            </Paper>
            {this.state.showSignup ?
              <Paper
                zDepth={2}
                style={loginCardStyle}
                className="space_top"
              >
                <div className="relative form_line">
                  <i className="material-icons">email</i>
                  <TextField
                    hintText="Adresse email"
                    type="email"
                    ref="formEmail"
                    style={loginTextFieldStyle}
                  />
                </div>
                <div className="relative form_line">
                  <i className="material-icons">face</i>
                  <TextField
                    hintText="Nom complet"
                    ref="formFullName"
                    style={loginTextFieldStyle}
                  />
                </div>
              </Paper> : null}
          </div>
          <div className="actions" id="auth_actions">
            <RaisedButton
              label="Connexion"
              className="full-width space_bottom"
              backgroundColor={this.state.showSignup ? primaryDarkColor : accentColor}
              labelColor={this.state.showSignup ? '#fff' : primaryDarkColor}
              onClick={this.onLoginClick}
            />
            <RaisedButton
              label="Créer un compte"
              className="full-width"
              backgroundColor={!this.state.showSignup ? primaryDarkColor : accentColor}
              labelColor={this.state.showSignup ? primaryDarkColor : '#fff'}
              onClick={this.onSignupClick}
            />
          </div>
        </form>
      </div>
    );
  }
}
