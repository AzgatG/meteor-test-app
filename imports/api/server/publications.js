import { Meteor } from 'meteor/meteor';
import { Counters } from '../collections.js';


Meteor.publish('counters.all', function () {
  return Counters.find();
});
