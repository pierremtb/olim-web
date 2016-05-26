import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { AppLayout } from '../../ui/layouts/app-layout';
import { PublicLayout } from '../../ui/layouts/public-layout.jsx';
import { PageTasks } from '../../ui/pages/tasks';
import { PageTags } from '../../ui/pages/tags';
import { PageSettings } from '../../ui/pages/settings';
import { PageLogin } from '../../ui/pages/login';
import { NotFound } from '../../ui/pages/not-found';
import { RecoverPassword } from '../../ui/pages/recover-password';
import { ResetPassword } from '../../ui/pages/reset-password';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { globalTheme } from '../../ui/utils/themes';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

injectTapEventPlugin();

const requireAuth = (nextState, replace) => {
  if (!Meteor.loggingIn() && !Meteor.user()) {
    replace({
      pathname: '/action/login',
      state: { nextPathname: nextState.location.pathname },
    });
  }
};

const redirectIfUser = (nextState, replace) => {
  if (Meteor.loggingIn() || Meteor.user()) {
    replace({
      pathname: '/',
      state: { nextPathname: nextState.location.pathname },
    });
  }
};

Meteor.startup(() => {
  render(
    <MuiThemeProvider muiTheme={globalTheme}>
      <Router history={browserHistory}>
        <Route path="/action" component={PublicLayout}>
          <Route path="login" component={PageLogin} onEnter={redirectIfUser} />
          <Route path="recover-password" component={RecoverPassword} />
          <Route path="reset-password/:token" component={ResetPassword} />
        </Route>
        <Route path="/" component={AppLayout}>
          <IndexRoute name="index" component={PageTasks} onEnter={requireAuth} />
          <Route name="Tasks" path="/tasks" component={PageTasks} onEnter={requireAuth} />
          <Route name="Tasks" path="/tasks/tag/:tagName" component={PageTasks} onEnter={requireAuth} />
          <Route name="Tags" path="/tags" component={PageTags} onEnter={requireAuth} />
          <Route name="Settings" path="/settings" component={PageSettings} onEnter={requireAuth} />
          <Route path="*" component={NotFound} />
        </Route>
      </Router>
    </MuiThemeProvider>,
    document.getElementById('react-root')
  );
});
