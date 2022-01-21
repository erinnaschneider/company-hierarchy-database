require('dotenv').config();
const db = require('./db');
const inquirer = require('inquirer');
const { printTable } = require('console-table-printer');
const { addToEmployees } = require('./db');



// start the application
function start() {
  viewAllChoices();
}
start();

// inquirer start questions: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role

function viewAllChoices() {
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
    .then((res) => {
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
          console.log('See you next time!');
          process.exit();
          break;

        case 'Add a department':
          // function
          addDepartment();
          break;

        case 'Add a role':
          //function
          addRole();

          break;

        case 'Add an employee':
          //function
          addEmployee();
          break;

        case 'Update an employee role':
          //function
          updateEmployee();
          break;
      }
    });
}

// choice to exit program or go back to the main menu after viewing a table of data
const goBack = () => {
  inquirer
    .prompt({
      type: 'list',
      name: 'goBackOrNot',
      message: 'Would you like to return to the main menu?',
      choices: ['Yes', 'No']
    })
    .then((res) => {
      if (res.goBackOrNot === 'Yes') {
        viewAllChoices();
      } else {
        console.log('See you next time!');
        process.exit();
      }
    });
};

// view the department table
const viewAllDepartments = () => {
  db.getAllDepartments()
    .then(([row]) => {
      printTable(row);
    })
    .then(() => goBack());
};

const viewAllRoles = () => {
  db.getAllRoles()
    .then(([row]) => {
      printTable(row);
    })
    .then(() => goBack());
};

const viewAllEmployees = () => {
  db.getAllEmployees()
    .then(([row]) => {
      printTable(row);
    })
    .then(() => goBack());
};

const addDepartment = () => {
  inquirer
    .prompt({
      type: 'text',
      name: 'newDepartment',
      message: 'What is the name of the department you would like to add?'
    })
    .then((res) => {
      db.addToDepartment(res.newDepartment).then(([row]) => {
        viewAllDepartments();
      });
    });
};


const addRole = () => {
  db.getDepartmentOptions().then((departments) => {
    const arrayDpts = departments.map(department => department.name);
    inquirer
      .prompt([
        {
          type: 'text',
          name: 'newRole',
          message: 'What is the name of the role you would like to add?'
        },
        {
          type: 'number',
          name: 'roleSalary',
          message: 'What is the salary of this new role?'
        },
        {
          type: 'list',
          name: 'newRoleDepartment',
          message: 'What department does this new role belong to?',
          choices: arrayDpts
        }
      ])
      .then((res) => {
        db.addToRoles(res.newRole, res.roleSalary, departments[arrayDpts.indexOf(res.newRoleDepartment)].id).then(
          ([row]) => {
            viewAllRoles();
          }
        );
      });
  });
};


const addEmployee = () => {
  db.getRolesOptions().then((roles) => {
    const rolesArray = roles.map(role => role.title);
    let managersArray = [];


    db.getManagersOptions().then(managers => {

      managersArray = (managers.map(manager => `${manager.first_name} ${manager.last_name}`))
      managersArray.push('None of the above')

      inquirer
        .prompt([
          {
            type: 'text',
            name: 'firstName',
            message: 'What is the first name of the employee you would like to add?'
          },
          {
            type: 'text',
            name: 'lastName',
            message: 'What is the last name of the employee you would like to add?'
          },
          {
            type: 'list',
            name: 'role_title',
            message: 'What is the role of this new employee?',
            choices: rolesArray
          },
          {
            type: 'list',
            name: 'manager_id',
            message: 'If applicable, who is the manager of this new employee?',
            choices: managersArray
          }
        ])
        .then((res) => {
          let manager_id = ''
          if (managers[managersArray.indexOf((res.manager_id))] === undefined) {
            manager_id = null;
          } else {
            manager_id = managers[managersArray.indexOf((res.manager_id))].id
          }
          db.addToEmployees(res.firstName, res.lastName, roles[rolesArray.indexOf(res.role_title)].id, manager_id).then(() => {
            viewAllEmployees();
            }
          );
        });
    })
  }
  )
};


const updateEmployee = () => {
  db.getRolesOptions().then((roles) => {
    const rolesArray = roles.map(role => role.title);
    
    let managersArray = [];

    db.getEmployeeOptions().then((employees) => {
      const employeeArray = employees.map(employee => `${employee.first_name} ${employee.last_name}`)
    

    db.getManagersOptions().then(managers => {

      managersArray = (managers.map(manager => `${manager.first_name} ${manager.last_name}`))
      managersArray.push('None of the above')

      inquirer
        .prompt([
          {
            type: 'list',
            name: 'editEmployee',
            message: 'Which employee would you like to edit?',
            choices: employeeArray
          },
          {
            type: 'list',
            name: 'role_title',
            message: 'What is the new role of this employee?',
            choices: rolesArray
          },
          {
            type: 'list',
            name: 'manager_id',
            message: 'If applicable, who is the new manager of this employee?',
            choices: managersArray
          }
        ])
        .then((res) => {
          let manager_id = ''
          if (managers[managersArray.indexOf((res.manager_id))] === undefined) {
            manager_id = null;
          } else {
            manager_id = managers[managersArray.indexOf((res.manager_id))].id
          }
          db.updateTheEmployee(res.editEmployee, roles[rolesArray.indexOf(res.role_title)].id, manager_id).then(() => {
            viewAllEmployees();
            }
          );
        });
    })
  })
  }
  )
}