//MYSQL

const mysql = require ('mysql');
const PORT = process.env.PORT || 3000;

const connection = mysql.createConnection({
    host: 'ec2-34-238-154-40.compute-1.amazonaws.com',
    user: 'ana',
    password: '183389',
    database: 'AlumnosUP'
});

module.exports = connection;