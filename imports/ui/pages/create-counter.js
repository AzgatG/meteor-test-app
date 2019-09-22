import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import './create-counter.html';


Template.createCounter.events({
  'click [name=goBack]'() {
    FlowRouter.go('/');
  },

  'submit .enter'(event) {
    event.preventDefault();

    const target = event.target;

    if (target) {
      const {name} = target;

      if (name.value && name.value.trim()) {
        Meteor.call('counters.create', name.value, (error, success) => {
          if (!error) {
            FlowRouter.go('/')
          }
        });
      }
    }
  },
});
