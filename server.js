require('dotenv').config();
const db = require('./db/connection');
const inquirer = require('inquirer');
const { printTable } = require('console-table-printer');
const { init } = require('express/lib/application');


// Start app after DB connection
db.connect(err => {
    if (err) throw err;
    console.log('Database connected :)');
      // function to start inquirer questions, aka the app
      viewAllChoices();
    });

// inquirer start questions: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role

viewAllChoices = () =>  {
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
        'Update an employee role'
      ]
    })
    .then(res => {
      if (res.viewChoices === 'View all departments') {
        viewAllDepartments();
      }
    });
}

// choice to exit program or go back to the main menu after viewing a table of data
goBack = () => {
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
    return console.log('See you next time!')};
  });
};

// view the department table
viewAllDepartments = () => {
  const sql = `SELECT * FROM department`
    db.query(sql, (err, departmentTable) => {
        if (err) {
            throw err;
        }
        printTable(departmentTable);
        goBack();
    });
};



