import { Template } from 'meteor/templating';

import { Counters } from '../../api/collections.js';
import './counters-list.html';


Template.countersList.helpers({
  counters() {
    return Counters.find();
  },
});


Template.countersList.onCreated(function () {
  Meteor.subscribe('counters.all');
});


Template.countersList.events({
  'click [name=logout]'() {
    Meteor.logout();
  },

  'click [name=createCounter]'() {
    FlowRouter.go('/createCounter');
  },

  'click [name=delete]'() {
    Meteor.call('counters.delete', this._id, (error, success) => {
      if (error) {
        console.log(error.error || 'Error');
      } else {
        console.log('Counter deleted')
      }
    });
  },

  'click [name=inc]'() {
    Meteor.call('counters.incCounter', this._id, 1, (error, success) => {
      if (error) {
        console.log(error.error || 'Error');
      }
    });
  },
  'click [name=dec]'() {
    Meteor.call('counters.incCounter', this._id, -1, (error, success) => {
      if (error) {
        console.log(error.error || 'Error');
      }
    });
  },
});
