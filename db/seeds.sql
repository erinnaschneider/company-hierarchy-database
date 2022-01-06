INSERT INTO department (name)
VALUES 
    ('Legal'),
    ('Engineering'),
    ('Sales'),
    ('Marketing');

INSERT INTO role (title, salary, department_id)
VALUES
    ('Lawyer', 170000.00, 1),
    ('Paralegel', 75000.00, 1),
    ('Junior Full Stack Developer', 75000.00, 2),
    ('Full Stack Developer', 100000.00, 2),
    ('Senior Full Stack Developer', 145000.00, 2),
    ('Engineering Manager', 200000.00, 2),
    ('Sales Consultant', 65000.00, 3),
    ('Regional Sales Lead', 90000.00, 3),
    ('Sales Manager', 115000.00, 3),
    ('Marketing Associate', 60000.00, 4),
    ('Marketing Manager', 85000.00, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Cory', 'Baker', 6, null),
    ('Zack', 'Camden', 3, 1),
    ('Zara', 'Kellman', 4, 1);