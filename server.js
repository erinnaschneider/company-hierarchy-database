require('dotenv').config();
const db = require('./db/connection');
const inquirer = require('inquirer');
const { printTable } = require('console-table-printer');


// Start app after DB connection
db.connect(err => {
    if (err) throw err;
    console.log('Database connected :)');
      // function to start inquirer questions, aka the app
      viewAll();
    });

// inquirer start questions: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role

viewAll = () =>  {
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
}
