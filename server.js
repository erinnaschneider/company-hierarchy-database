require('dotenv').config();
const db = require('./db')
const inquirer = require('inquirer');
const { printTable } = require('console-table-printer');



// start the application
function start() {
  viewAllChoices();
}
start();


// inquirer start questions: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role

function viewAllChoices () {
  inquirer
    .prompt({
      type: 'list',
      name: 'viewChoices',
      message: 'What would you like to do?',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Exit menu'
      ]
    })
    .then(res => {
      switch (res.viewChoices) {
        // works like an if-else statement but more concise
        case 'View all departments':
          viewAllDepartments();
          break;

        case 'View all roles':
          viewAllRoles();
          break;

        case 'View all employees':
          viewAllEmployees();
          break;

        case 'Exit menu':
          process.exit();
          break;

        case 'Add a department':
          // function
          addDepartment();
        break;

        case 'Add a role':

        //function
        break;

        case 'Add an employee':

        //function
        break;

        case 'Update an employee role':

        //function
        break;
      }
    });
}

// choice to exit program or go back to the main menu after viewing a table of data
const goBack = () => {
  inquirer.prompt({
    type: 'list',
    name: 'goBackOrNot',
    message: 'Would you like to return to the main menu?',
    choices: ['Yes', 'No']
  })
    .then(res => {
      if (res.goBackOrNot === 'Yes') {
        viewAllChoices();
      } else {
        console.log('See you next time!')
        process.exit();
      };
     
    });
};

// view the department table
const viewAllDepartments = () => {
  db.getAllDepartments().then(([row]) => {
    printTable(row)
  }).then(() => goBack())
};

const viewAllRoles = () => {
  db.getAllRoles().then(([row]) => {
    printTable(row)
  }).then(() => goBack())
};

const viewAllEmployees = () => {
  db.getAllEmployees().then(([row]) => {
    printTable(row)
  }).then(() => goBack())
};

const addDepartment = () => {
  inquirer  
    .prompt({
      type: 'text',
      name: 'newDepartment',
      message: 'What is the name of the department you would like to add?'
    }).then((res) => {
      
      db.addToDepartment(res.newDepartment).then(([row]) => {
        viewAllDepartments();
      }).then(() => goBack())
    });
  };



