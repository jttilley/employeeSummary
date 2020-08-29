const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const team = [];


const initPrompt = (memberType) => {
    return [
        {
            type: "input",
            name: "name",
            message: `What is the ${memberType}'s name?`
            },{
                type: "input",
                name: "id",
                message: `What is the ${memberType}'s id?`
            },{
                type: "input",
                name: "email",
                message: `What is the ${memberType}'s email?`
                validate: ans => {
                    const emailCheck = ans.match(/\S+@\S+.\S{3}/)
                    if (emailCheck) {
                        return true;
                    }
                    return "Please enter a correct email.";
                }
            }
        ]
}

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

const createManager = () => {
    const answers = await inquirer.prompt ([
        initPrompt("manager"),
        {
            type: "input",
            name: "officeNumber",
            message: "What is the managers office number?",
            validate: ans => {
                const numCheck = ans.match(/(1\-)?[\(]?\d{3}[\)\-]{,2}\d{3}[\-]?\d{4}/)
                if (numCheck) {
                    return true;
                }
                return "Please enter the full and correct phone number with no spaces.";
            }
        }
    ])
    
    const { name, id, email, officeNumber } = answers;
    team.push(new Manager(name, id, email, officeNumber));
    
    createTeam();
    
}

const createEmployee() => {
    inquirer.prompt ([

    ]).then(function(answers) {
        return answers;
    })
}

const createTeam = () => {
    inquirer.prompt ([
        {
            type: "list",
            message: "Would you like to add another teammate",
            name: "another",
            choices: ["Engineer","Intern","All done"]
        }
    ]).then(function(answers) {
        switch(answers) {
            case 'Engineer':
                createEngineer();
                break;
            case 'Intern':
                createIntern();
                break;
            default:
                buildTeam();
                break;
        }
    })
}

const createEngineer = () => {
    const answers = await inquirer.prompt ([
        initPrompt("engineer"),
        {
            type: "input",
            name: "github",
            message: "What is the engineer's github username?"
        }
    ])

    const { name, id, email, github } = answers;
    team.push(new Manager(name, id, email, github));

    createTeam();
}

const createIntern = () => {
    const answers = await inquirer.prompt ([
        initPrompt("intern"),
        {
            type: "input",
            name: "school",
            message: "What school is the intern attending?"
        }
    ])

    const { name, id, email, school } = answers;
    team.push(new Manager(name, id, email, school));

    createTeam();}

const buildTeam = () => {

}

// start with manager
createManager();

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
