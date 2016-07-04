import React from 'react';
import { handleAuthentication } from '../../modules/authentication';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { browserHistory } from 'react-router';
import sql from 'sql.js';
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

  onGoogleLoginClick() {
    // if (this.state.showSignup) {
    //   this.setState({ showSignup: false });
    // } else {
    //   handleAuthentication({ component: this }, false);
    // }
    Meteor.loginWithGoogle({
      forceApprovalPrompt: true,
      requestOfflineToken: true,
      requestPermissions: [
        'email',
        'https://www.googleapis.com/auth/drive',
        'https://www.googleapis.com/auth/drive.appfolder',
      ],
    }, (error) => {
      if (error) {
        console.log(error);
      } else {

        GoogleApi.get('drive/v3/files', {
          params: {
            q: `name = 'olim'`,
            spaces: 'appDataFolder',
            fields: 'nextPageToken, files(id, name)',
            pageSize: 1
          }
        },
          (err, data) => {
            if (err || data.files.length === 0) {
              console.log(err);
              return;
            }
            console.log(data.files[0].id);
            GoogleApi.get('drive/v3/files/' + data.files[0].id, {
              params: {
                mimeType: 'application/octet-stream',
                alt: 'media',
              }
            }, (err, content) => {
              if (err) {
                console.log(err);
                return;
              }
              const sqlite = new Uint8Array(content);
              console.log(content);
              const db = new sql.Database(content);
              console.log(db.exec("SELECT * from tasks"));
            });
        });

        const { location } = component.props;
        if (location.state && location.state.nextPathname) {
          browserHistory.push(location.state.nextPathname);
        } else {
          browserHistory.push('/');
        }
      }
    });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      <div className="center-align login-container">
        <h1 style={{ fontWeight: 100 }}>Olim</h1>
        <form className="loginForm" onSubmit={this.handleSubmit}>
          <div className="actions" id="auth_actions">
            <RaisedButton
              label="Log in"
              className="full-width space_bottom"
              backgroundColor={this.state.showSignup ? primaryDarkColor : accentColor}
              labelColor={this.state.showSignup ? '#fff' : primaryDarkColor}
              onClick={this.onGoogleLoginClick}
            />
          </div>
        </form>
      </div>
    );
    // return (
    //   <div className="center-align login-container">
    //     <h1 style={{ fontWeight: 100 }}>Olim</h1>
    //     <form className="loginForm" onSubmit={this.handleSubmit}>
    //       <div className="forms_container">
    //         <Paper zDepth={2} style={loginCardStyle}>
    //           <div className="relative form_line">
    //             <i className="material-icons">perm_identity</i>
    //             <TextField
    //               hintText="Username"
    //               style={loginTextFieldStyle}
    //               ref="formLogin"
    //             />
    //           </div>
    //           <div className="relative form_line">
    //             <i className="material-icons">fingerprint</i>
    //             <TextField
    //               hintText="Password"
    //               type="password"
    //               ref="formPassword"
    //               style={loginTextFieldStyle}
    //             />
    //           </div>
    //         </Paper>
    //         {this.state.showSignup ?
    //           <Paper
    //             zDepth={2}
    //             style={loginCardStyle}
    //             className="space_top"
    //           >
    //             <div className="relative form_line">
    //               <i className="material-icons">email</i>
    //               <TextField
    //                 hintText="Email address"
    //                 type="email"
    //                 ref="formEmail"
    //                 style={loginTextFieldStyle}
    //               />
    //             </div>
    //             <div className="relative form_line">
    //               <i className="material-icons">face</i>
    //               <TextField
    //                 hintText="Full name"
    //                 ref="formFullName"
    //                 style={loginTextFieldStyle}
    //               />
    //             </div>
    //           </Paper> : null}
    //       </div>
    //       <div className="actions" id="auth_actions">
    //         <RaisedButton
    //           label="Log in"
    //           className="full-width space_bottom"
    //           backgroundColor={this.state.showSignup ? primaryDarkColor : accentColor}
    //           labelColor={this.state.showSignup ? '#fff' : primaryDarkColor}
    //           onClick={this.onLoginClick}
    //         />
    //         <RaisedButton
    //           label="Sign up"
    //           className="full-width"
    //           backgroundColor={!this.state.showSignup ? primaryDarkColor : accentColor}
    //           labelColor={this.state.showSignup ? primaryDarkColor : '#fff'}
    //           onClick={this.onSignupClick}
    //         />
    //       </div>
    //     </form>
    //   </div>
    // );
  }
}
