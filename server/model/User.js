const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    roles: {
        User: {
            type: Number,
            default: 2001
        },
        Editor: Number,
        Admin: Number
    },
    EmployeeId: {
        type: String,
        required: true
    },
    EmployerId: {
        type: String,
        default: "null"
    },
    EmployeePassword: {
        type: String,
        required: true
    },
    EmployeeName: {
        type: String,
        required: true
    },
    EmployeeEmail: {
        type: String,
        required: true
    },
    EmployeePhone: {
        type: String,
        required: true
    },
    EmployeePosition: {
        type: String,
        required: true
    },
    EmployeeMonthlyAllowance: {
        type: String,
        required: true
    },
    refreshToken: String
});

module.exports = mongoose.model('User', userSchema);
