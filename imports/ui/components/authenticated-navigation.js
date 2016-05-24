import React from 'react';
import { browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FontIcon from 'material-ui/FontIcon';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';

const handleLogout = () => Meteor.logout(() => browserHistory.push('/login'));

const userName = () => {
  const user = Meteor.user();
  const name = user && user.profile ? user.profile.name : '';
  return user ? `${name.first} ${name.last}` : '';
};


const styles = {
  title: {
    cursor: 'pointer',
  },
};

export class AuthenticatedNavigation extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {/*<div className="appbar">
          <span className="title">olim</span>
          <ul className="right-content">
            <li>
              <FontIcon className="material-icons">
                search
              </FontIcon>
            </li>
            <li>
              <IconMenu
                iconButtonElement={
                  <FontIcon className="material-icons">
                    account_circle
                  </FontIcon>
                }
                onChange={() => {}}
                anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                targetOrigin={{horizontal: 'right', vertical: 'top'}}
                value={'1'}
              >
                <MenuItem disabled primaryText={Meteor.user().username}/>
                <MenuItem
                  value="5"
                  primaryText="Log out"
                  onTouchTap={() => Meteor.logout(() => browserHistory.push('/action/login'))}
                />
              </IconMenu>
            </li>
          </ul>
        </div>*/}
        <Toolbar style={{
          background: '#00BCD4',
          position: 'fixed',
          width: '100%',
          top: 0,
          zIndex: 99
        }}>
          <ToolbarGroup firstChild>
            <FontIcon className="material-icons">menu</FontIcon>
            <ToolbarTitle text="Tasks" style={{ marginLeft: 32 }} />
          </ToolbarGroup>
          <ToolbarGroup>
            <FontIcon className="material-icons">
              search
            </FontIcon>
            <FontIcon className="material-icons">
              person_outline
            </FontIcon>
          </ToolbarGroup>
        </Toolbar>
      </div>
    );
  }
};
