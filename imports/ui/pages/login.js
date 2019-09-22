import { Template } from 'meteor/templating';
import { Accounts } from 'meteor/accounts-base'
import { FlowRouter } from 'meteor/kadira:flow-router';

import './login.html'


Template.loginPage.events({
  'click [name=goToRegistr]'() {
    FlowRouter.go('/registr');
  },

  'submit .enter'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;

    if (target) {
      const {email, password} = target;

      Meteor.loginWithPassword(email.value, password.value, (error, success) => {
        if (!error) {
          FlowRouter.go('/')
        }
      });
    }
  },
});
