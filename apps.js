const inquirer = require("inquirer");
var fs = require('fs');

function init() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "name",
                message: "What is the employee's name?",

            },
            {
                type: "input",
                name: "id",
                message: "What is the employee's id number?",

            },
            {
                type: "input",
                name: "email",
                message: "What is the employee's email?",

            },
            {
                type: "list",
                name: "title",
                message: "What is the employee's title?",
                choices: ["Manager", "Engineer", "Intern"]
            }
        ])