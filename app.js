const express = require('express');
const mysql = require ('mysql');

const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.json());


//MYSQL
const connection = mysql.createConnection({
    host: 'ec2-54-234-184-170.compute-1.amazonaws.com',
    user: 'ana',
    password: '183389',
    database: 'AlumnosUP'
});

//Route
app.get('/',(req,res)=> { 
    res.send('Funciona');
});


//Get
app.get('/alumnos',(req,res)=> { 
    const sql = 'SELECT * FROM alumnos'
    connection.query(sql, (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err)
        }
    });
});
    


app.get('/alumnos/:id',(req,res)=> {
    const {id } = req.params
    const sql = `SELECT * FROM alumnos WHERE id =  ${id}`;
    connection.query(sql, (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err)
        }
    });

});

app.post('/add',(req,res)=>{
    const sql = 'INSERT INTO alumnos SET ?';
    const alumnoObj = {
        //id:req.body.name,
        nombre: req.body.nombre,
        matricula: req.body.matricula
    }
    connection.query(sql,alumnoObj, err => {
        if (err) throw err;
        res.send('Agregado');
    })
});

app.put('/update/:id', (req,res) =>{
    const {id } =  req.params;
    const {nombre, matricula } = req.body;
    const sql =`UPDATE alumnos SET nombre = '${nombre}', matricula = ${matricula}
    WHERE id = ${id}`;
    connection.query(sql, err => {
        if (err) throw err;
        res.send('UPDATE');
    })
});

app.delete('/delete/:id', (req, res) => {
    const {id} = req.params;
    const sql = `DELETE FROM alumnos WHERE id = ${id}`;
    connection.query(sql, err => {
        if (err) throw err;
        res.send('DELETE');
    })
});


//Check connect
connection.connect(error=>{
    if (error) throw error;
    console.log('Conecta');
});

app.listen(PORT, () => console.log('Server Running'));