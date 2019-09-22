import { Template } from 'meteor/templating';
import { Accounts } from 'meteor/accounts-base'
import { FlowRouter } from 'meteor/kadira:flow-router';

import './registr.html'


Template.loginPage.events(function () {
  Meteor.subscribe('counters.all');
});


Template.registrPage.events({
  'click [name=goToLogin]'() {
    FlowRouter.go('/login');
  },

  'submit .enter'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;

    if (target) {
      const {email, password, passwordRe} = target;
      emailValue = email.value;
      passwordValue = password.value;
      passwordReValue = passwordRe.value;

      if (emailValue && !emailValue.trim()) {
        console.log('Wrong email');

        return;
      }
      if (passwordValue && !passwordValue.trim()) {
        console.log('Wrong password');

        return;
      }
      if (passwordReValue && !passwordReValue.trim()) {
        console.log('Wrong password');

        return;
      }

      if (passwordReValue.trim() !== passwordValue.trim()) {
        console.log('Masswords missmatch')
        return;
      }

      Accounts.createUser({email: email.value, username: email.value, password: password.value}, (error, success) => {
        if (!error) {
          FlowRouter.go('/')
        }
      });
    }  },
});
