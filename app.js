const express = require('express');
const mysql =  require ('mysql');

const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3050;

const app = express();

app.use(bodyParser.json());

//MySql - Conexion con la base de datos
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'Lourdes Ibañez',
    password: 'S7i[1zZ189(z_Aka',
    database: 'aplicacion',
});

//Rutas
app.get('/', (req, res) => {
    res.send('Bienvenido a mi API');
});

//Listar todos los clientes
app.get('/datos', (req, res)=> {
    const sql = 'SELECT * FROM datos';

    connection.query(sql, (error, results)=>{
        if (error) throw error;
        if (results.length > 0){
            res.json(results);
        }else {
            res.send ('No hay resultados');
        }
    });
});

//Recuperar clientes por id
app.get('/datos/:id', (req, res)=> {
    const {id} = req.params;
    const sql = `SELECT * FROM datos WHERE id = ${id}`;

    connection.query(sql, (error, result)=>{
        if (error) throw error;
        if (result.length > 0){
            res.json(result);
        } else {
            res.send ('No hay resultado');
        }
    });
});

//Agregar clientes
app.post('/agregar', (req, res)=> {
    const sql = 'INSERT INTO datos SET ?';
    const datosObj = {
        nombre: req.body.nombre,
        apellido: req.body.apellido
    };
    connection.query (sql, datosObj, error => {
        if (error) throw error;
        res.send('Cliente creado');
    });
});

//Actualizar los clientes
app.put('/actualizar/:id', (req, res)=> {
    const {id} = req.params;
    const {nombre, apellido} = req.body;
    const sql = `UPDATE datos SET nombre = '${nombre}', apellido = '${apellido}' WHERE id = ${id}`
    connection.query (sql, error => {
        if (error) throw error;
        res.send('Cliente actualizado');
    });
});

//Eliminar clientes
app.delete('/eliminar/:id', (req, res)=>{
   const {id} = req.params;
   const sql = `DELETE FROM datos WHERE id= ${id}`;
   connection.query (sql, error => {
    if (error) throw error;
    res.send('Cliente eliminado');
});
});  

//Confirmamos la conexion
connection.connect(error => {
    if (error) throw error;
    console.log('La conexion con la base de datos esta corriendo bien');
});

app.listen(PORT, () => console.log (`corriendo base de datos ${PORT}`));