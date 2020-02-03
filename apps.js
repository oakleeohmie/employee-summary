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

        .then(res => {

            if (res.title == "Manager") {

                if (IsThereAManager === false) {

                    IsThereAManager = true;

                    inquirer
                        .prompt([
                            {
                                type: "input",
                                name: "officeNumber",
                                message: "Please provide the Manager's office number?",
                            }
                        ])

                        .then(res_two => {
                            const newManager = new Manager(res.name, res.id, res.email, res_two.officeNumber);
                            employees.push(newManager);
                            nextStep();
                        })
                } else {
                    console.log("A manager has already been assigned.  Please try again.");
                    init();
                }

            }
            else if (res.title == "Engineer") {
                inquirer
                    .prompt([
                        {
                            type: "input",
                            name: "gitHubProfile",
                            message: "Please provide the Engineer's GitHub profile username?"
                        }
                    ])
                    .then(res_three => {
                        const newEngineer = new Engineer(res.name, res.id, res.email, res_three.gitHubProfile);
                        employees.push(newEngineer);
                        nextStep();
                    })

            } else if (res.title == "Intern") {
                inquirer
                    .prompt([
                        {
                            type: "input",
                            name: "school",
                            message: "What is the Employee's school name?"
                        }
                    ])
                    .then(res_four => {
                        const newIntern = new Intern(res.name, res.id, res.email, res_four.school);
                        employees.push(newIntern);
                        nextStep();
                    })
            };
        })
    function addPrintExit() {
        console.log(employees);
        inquirer
            .prompt([
                {
                    type: "list",
                    name: "nextStep",
                    message: "Would you like to continue?",
                    choices: ["Add another employee", "Save to HTML file", "Exit"]
                }
            ])
            .then(res_five => {
                if (res_five.nextStep == "Add another employee") {
                    init();
                }
                else if (res_five.nextStep == "Save to HTML file") {
                    fs.readFile("./templates/main.html", 'utf8', function (err, data) {
                        if (err) {
                            return console.log(err);
                        }
                        x = x + data;
                        var cardString = [];
                        for (let i = 0; i < employees.length; i++) {
                            if (employees[i].getRole() === "Manager") {
                                cardString = '<div class="col card" id="employeeCard"><div class="row" id="nameTitleRow"><div class="row" id="nameRow"><h2 id="name">' + employees[i].getName() + '</h2></div><br><div class="row" id="titleRow"><h3 id="title">' + employees[i].getRole() + '</h3></div></div><div class="row" id="idRow"><div id="idBox"><div class="row" id="idDetail">ID:  ' + employees[i].getId() + '</div><div class="row" id="idDetail">Email:  ' + employees[i].getEmail() + '</div><div class="row" id="location">Office Number:  ' + employees[i].getOfficeNumber() + '</div></div></div></div>';
                            } else if (employees[i].getRole() === "Engineer") {
                                cardString = '<div class="col card" id="employeeCard"><div class="row" id="nameTitleRow"><div class="row" id="nameRow"><h2 id="name">' + employees[i].getName() + '</h2></div><br><div class="row" id="titleRow"><h3 id="title">' + employees[i].getRole() + '</h3></div></div><div class="row" id="idRow"><div id="idBox"><div class="row" id="idDetail">ID:  ' + employees[i].getId() + '</div><div class="row" id="idDetail">Email:  ' + employees[i].getEmail() + '</div><div class="row" id="location">GitHub Username:  ' + employees[i].getGitHub() + '</div></div></div></div>';
                            } else if (employees[i].getRole() === "Intern") {
                                cardString = '<div class="col card" id="employeeCard"><div class="row" id="nameTitleRow"><div class="row" id="nameRow"><h2 id="name">' + employees[i].getName() + '</h2></div><br><div class="row" id="titleRow"><h3 id="title">' + employees[i].getRole() + '</h3></div></div><div class="row" id="idRow"><div id="idBox"><div class="row" id="idDetail">ID:  ' + employees[i].getId() + '</div><div class="row" id="idDetail">Email:  ' + employees[i].getEmail() + '</div><div class="row" id="location">School:  ' + employees[i].getSchool() + '</div></div></div></div>';
                            };
                            x = x.concat(cardString);
                        }
                        x = x.concat("</div></div></body></html>");

                        fs.writeFile('./output/team.html', x, function (err) {
                            if (err) throw err;
                            console.log('Saved!');
                        });

                    });
                }
                else if (res_five.nextStep == "Exit") {
                    process.exit();
                }
            });
    };
};