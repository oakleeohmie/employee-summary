const Employee = require("./employee");

class Manager extends Employee {
    //Get Employee Object name, ID, and email from extended class Employee
    constructor(name, id, email, officeNumber) {
        super(name, id, email);
        this.officeNumber = officeNumber;
    };
    getOfficeNumber() {
        return this.officeNumber;
    };
    getRole() {
        return "Manager";
    };
};
//Export to other files
module.exports = Manager;