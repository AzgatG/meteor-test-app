import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

import { Counters } from '../collections.js'


Meteor.methods({
  'counters.create'(name) {
    check(name, String);

    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Counters.insert({
      name,
      count: 0,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username,
    });
  },

  'counters.delete'(counterId) {
    check(counterId, String);

    const counter = Counters.findOne(counterId);

    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    if (!counter) {
      throw new Meteor.Error('Counter not found');
    }

    if (Meteor.userId() !== counter.owner) {
      throw new Meteor.Error('permission denied');
    }

    Counters.remove(counterId);
  },

  'counters.incCounter'(counterId, inc) {
    check(counterId, String);

    const counter = Counters.findOne(counterId);

    if (!counter) {
      throw new Meteor.Error('Counter not found');
    }

    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Counters.update(counterId, { $inc: { count: inc } });
  },
});