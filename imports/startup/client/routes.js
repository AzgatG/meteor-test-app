import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { Accounts } from 'meteor/accounts-base'

import '../../ui/layouts/body.js';
import '../../ui/pages/counters-list.js';
import '../../ui/pages/create-counter.js';
import '../../ui/pages/login.js';
import '../../ui/pages/registr.js';


Accounts.onLogout(() => {
  FlowRouter.go('/login');
})

FlowRouter.route('/', {
  name: 'home',
  action() {
    BlazeLayout.render('appLayout', { main: 'countersList' });
  },
});

FlowRouter.route('/createCounter', {
  name: 'createCounter',
  action() {
    BlazeLayout.render('appLayout', { main: 'createCounter' });
  },
});

FlowRouter.route('/login', {
  name: 'login',
  action() {
    console.log('here');
    BlazeLayout.render('appLayout', { main: 'loginPage' });
  },
});

FlowRouter.route('/registr', {
  name: 'registr',
  action() {
    console.log('here');
    BlazeLayout.render('appLayout', { main: 'registrPage' });
  },
});


FlowRouter.triggers.enter([isNotLoggedIn], {
  except: ['login', 'registr']
});

FlowRouter.triggers.enter([isLoggedIn], {
  only: ['login', 'registr']
});


function isNotLoggedIn(context, redirect) {
  if (!Meteor.user() && !Meteor.loggingIn()) {
    FlowRouter.go('/login');
  }
}

function isLoggedIn(context, redirect) {
  if (Meteor.user() || Meteor.loggingIn()) {
    FlowRouter.go('/');
  }
}