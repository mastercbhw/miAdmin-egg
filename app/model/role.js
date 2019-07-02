'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const date = new Date();

  const RoleSchema = new Schema({
    title: { type: String },
    description: { type: String },
    status: { type: String },
    add_time: { type: Number, default: date.getTime() },
  });

  return mongoose.model('Role', RoleSchema);
};
