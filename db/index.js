const connection = require('./connection');

class DB {
  constructor(connection) {
    this.connection = connection;
  }

  getAllDepartments() {
    return this.connection
      .promise()
      .query('SELECT department.id, department.name FROM department;');
  }

  getDepartmentOptions() {
    return new Promise((resolve, reject) => {
      this.getAllDepartments()
        .then((answer) => {
          resolve(answer[0]);
        })
        .catch((error) => console.log(error));
    });
  }

  getEmployeeOptions() {
    return new Promise((resolve, reject) => {
      this.getAllEmployees()
        .then((answer) => {
          resolve(answer[0]);
        })
        .catch((error) => console.log(error));
    });
  }

  getAllRoles() {
    // job title, role id, the department that role belongs to, and the salary for that role
    return this.connection
      .promise()
      .query(
        'SELECT role.title, role.id, department.name, role.salary FROM role LEFT JOIN department ON role.department_id = department.id;'
      );
  }

  getRolesOptions() {
    return new Promise((resolve, reject) => {
      this.getAllRoles()
        .then((answer) => {
          resolve(answer[0]);
        })
        .catch((error) => console.log(error));
    });
  };

  getManagersOptions() {
    return new Promise((resolve, reject) => {
      this.getAllEmployees()
        .then((answer) => {
          resolve(answer[0]);
        })
        .catch((err) => console.log(err));
    });
  };

  getAllEmployees() {
    // table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
    return this.connection
      .promise()
      .query(
        "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name as department, role.salary, CONCAT(manager.first_name , ' ', manager.last_name) as manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id;"
      );
  }

  addToDepartment(newDepartment) {
    return this.connection
      .promise()
      .query(
        'INSERT INTO department (name) VALUES (?)',
        newDepartment,
        function (err, result) {
          if (err) throw err;
          return result;
        }
      );
  }

  addToRoles(newRole, roleSalary, newRoleDepartment) {
    return this.connection
      .promise()
      .query(
        'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)',
        [newRole, roleSalary, newRoleDepartment],
        function (err, result) {
          if (err) throw err;
          return result;
        }
      );
  }

  addToEmployees(first_name, last_name, role_id, manager_id) {
      return this.connection
        .promise()
        .query(
          'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)',
          [first_name, last_name, role_id, manager_id],
          function (err, result) {
            if (err) throw err;
            return result;
          }
        )
  }

  updateTheEmployee(role, manager, employee_id) {
    //console.log(role, manager, employee_id);
    //console.log(typeof(employee_id));
    return this.connection
        .promise()
        .query('UPDATE employee SET role_id = ?, manager_id = ? WHERE id = ?', 
        [role, manager, employee_id],
          function (err, result) {
            if (err) throw err;
            return result;
          }
        )
  };
};

module.exports = new DB(connection);
