import React from 'react';
import { browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import SubHeader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import MenuItem from 'material-ui/MenuItem';
import Drawer from 'material-ui/Drawer';
import FontIcon from 'material-ui/FontIcon';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';

export class AuthenticatedNavigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accountMenuOpened: false,
      drawerOpened: false,
      currentPageTitle: 'Tags',
    };
    this.handleAccountMenuOpen = this.handleAccountMenuOpen.bind(this);
    this.handleAccountMenuClose = this.handleAccountMenuClose.bind(this);
    this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
    this.handleDrawerClose = this.handleDrawerClose.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.openTagsPage = this.openTagsPage.bind(this);
    this.openTasksPage = this.openTasksPage.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleAccountMenuOpen(event) {
    event.preventDefault();
    this.setState({
      accountMenuOpened: true,
      anchorEl: event.currentTarget,
    });
  }

  handleAccountMenuClose() {
    this.setState({ accountMenuOpened: false });
  }

  handleDrawerOpen() {
    this.setState({ drawerOpened: true });
  }

  handleDrawerClose() {
    this.setState({ drawerOpened: false });
  }

  handleScroll(event) {
    this.setState({
      scrollTop: event.srcElement.body.scrollTop,
    });
  }

  handleLogout() {
    Meteor.logout(() => browserHistory.push('/action/login'));
    this.handleDrawerClose();
  }

  openTagsPage() {
    this.handleDrawerClose();
    this.setState({ currentPageTitle: 'Tags' });
    browserHistory.push('/tags');
  }

  openTasksPage() {
    this.handleDrawerClose();
    this.setState({ currentPageTitle: 'Tasks' });
    browserHistory.push('/tasks');
  }

  render() {
    return (
      <div>
        <Toolbar
          style={{
            background: '#00BCD4',
            position: 'fixed',
            width: '100%',
            transition: 'box-shadow 400ms',
            top: 0,
            zIndex: 99,
            boxShadow: this.state.scrollTop > 0 ?
                getMuiTheme().paper.zDepthShadows[1]
              : 'none',
          }}
        >
          <ToolbarGroup firstChild>
            <FontIcon
              className="material-icons"
              onTouchTap={this.handleDrawerOpen}
            >
              menu
            </FontIcon>
            <ToolbarTitle text={this.state.currentPageTitle} style={{ marginLeft: 32 }} />
          </ToolbarGroup>
          <ToolbarGroup>
            <FontIcon className="material-icons">
              search
            </FontIcon>
            <FontIcon
              className="material-icons"
              onTouchTap={this.handleAccountMenuOpen}
            >
              person_outline
            </FontIcon>
          </ToolbarGroup>
        </Toolbar>
        <Popover
          open={this.state.accountMenuOpened}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'right', vertical: 'top' }}
          onRequestClose={this.handleAccountMenuClose}
        >
          <Menu>
            <MenuItem
              primaryText={Meteor.user().profile.fullName}
              onTouchTap={this.handleAccountMenuClose}
              disabled
            />
            <Divider />
            <MenuItem primaryText="Sign out" onTouchTap={this.handleLogout} />
          </Menu>
        </Popover>
        <Drawer
          docked={false}
          width={280}
          open={this.state.drawerOpened}
          onRequestChange={this.handleDrawerClose}
        >
          <div
            style={{
              fontSize: 40,
              fontWeight: 300,
              paddingTop: 20,
              paddingBottom: 20,
              marginLeft: 16,
            }}
          >
            <span>
              Olim
            </span>
          </div>
          <Divider />
          <SubHeader>Navigation</SubHeader>
          <MenuItem
            onTouchTap={this.openTasksPage}
            leftIcon={<FontIcon className="material-icons">list</FontIcon>}
          >
            Tasks
          </MenuItem>
          <MenuItem
            onTouchTap={this.openTagsPage}
            leftIcon={<FontIcon className="material-icons">label</FontIcon>}
          >
            Tags
          </MenuItem>
          <Divider />
          <SubHeader>Account</SubHeader>
          <MenuItem
            onTouchTap={this.handleDrawerClose}
            leftIcon={<FontIcon className="material-icons">settings</FontIcon>}
          >
            Settings
          </MenuItem>
          <MenuItem
            onTouchTap={this.handleLogout}
            leftIcon={<FontIcon className="material-icons">exit_to_app</FontIcon>}
          >
            Sign out
          </MenuItem>
        </Drawer>
      </div>
    );
  }
};
