const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  roles: {
    User: {
      type: Number,
      default: 2001,
    },
    Editor: Number,
    Admin: Number,
  },
  EmployeeId: {
    type: String,
    default: "null",
  },
  EmployerId: {
    type: String,
    required: true,
  },
  Password: {
    type: String,
    required: true,
  },
  Name: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
  Phone: {
    type: String,
    required: true,
  },
  EmployeePosition: {
    type: String,
    default: null,
  },
  EmployeeMonthlyAllowance: {
    type: Number,
    default: null,
  },
  refreshToken: String,
});

module.exports = mongoose.model('User', userSchema);
