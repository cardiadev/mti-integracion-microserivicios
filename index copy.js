const express = require('express');
const { Client } = require('pg');

const app = express();

const pgconexion = new Client({
    user: "postgres", 
    password: "P.890523",
    database: "bancomex", 
    port: 5432,
    host:"localhost",
});

try{
    pgconexion.connect();
    console.log("Conexion Exitosa!")
    } catch(error){
        console.log(error);
    }
app.use(express.json());
app.use(express.urlencoded(({ extended: true})));

app.get('/', (req, res) => {
   // res.send("Aqui estoy!");
   res.sendFile('archivo.html', {root: __dirname});
});

app.post('/procesa', (req,res) => {
    var valores = req.body;
    console.log(valores);
    console.log("Valor: " +valores.clave);
    console.log("Valor: " +valores.passw);
    let a = valores.clave + " " + valores.passw; 
    res.send("Dato procesado!" + a);

});

app.get('/actores', (req, res) =>{
    const sqlQuery = "SELECT first_name, last_name FROM actor"
    pgconexion.query(sqlQuery, (err, result)=> {
        if(err){
        return res.send("Error en la busqueda: (");
        }
        console.log(result.rows);
        res.send(result.rows);
    });
});

app.post('/buscaactor', (req, res) =>{
    var nombre = req.body;
    const sqlQuery = "SELECT first_name, last_name FROM actor WHERE first_name like '%' || $1 || '%'";
    pgconexion.query(sqlQuery, [nombre.nombreactor],(err, result) =>{
        if(err){
            return res.send("Error en la busqueda: (");
        }
        if (result.rowCount > 0){
            res.send(result.rows);
        }else{
            res.send("No se encontró el dato!")
        }
    });
});



// Crear Usuario
app.post('/crearusuario', (req, res) =>{
    var nombre = req.body;
    const sqlQuery = "SELECT nombre, apellido FROM ejecutivos WHERE nombre like '%' || $1 || '%'";
    pgconexion.query(sqlQuery, [nombre.nombre],(err, result) =>{
        if(err){
            return res.send("Error en la busqueda: (");
        }
        if (result.rowCount > 0){
            res.send(result.rows);
        }else{
            res.send("No se encontró el dato!")
        }
    });
});



app.listen(9000, () => {
    console.log('El servidor está activo en el puerto: 9000');
});