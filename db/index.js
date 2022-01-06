const connection = require('./connection');

class DB {
    constructor(connection){
        this.connection = connection
    }

    getAllDepartments(){
        return this.connection.promise().query('SELECT department.id, department.name FROM department;')
    }

    getAllRoles(){
        // job title, role id, the department that role belongs to, and the salary for that role
        return this.connection.promise().query('SELECT role.title, role.id, department.name, role.salary FROM role LEFT JOIN department ON role.department_id = department.id;')
    }

    getAllEmployees() {
        // table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
        return this.connection.promise().query("SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name as department, role.salary, CONCAT(manager.first_name , ' ', manager.last_name) as manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id;")
    }

}

module.exports = new DB(connection)