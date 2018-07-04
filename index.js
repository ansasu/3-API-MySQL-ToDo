var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mysql = require('./mysql')
var funciones = require('./funciones')

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Add headers
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Pass to next layer of middleware
  next();
});

app.get('/todo2', function (req, res) {
  mysql.getTodoList(function(err, usuarios) {
    res.send(usuarios)
  })
});

app.post('/todo2', function (req, res) {
  var nombreTarea = req.body.nombre
   var realizadoTarea = req.body.realizado
           console.log(nombreTarea, realizadoTarea)
            mysql.createTodo(nombreTarea, realizadoTarea, function(err, respuesta) {
              console.log(err)
    res.send(respuesta)
 })
 });

    app.put('/todo2/:id', function (req, res) {
      mysql.updateTodo(req.params.id, req.body.nombre, req.body.realizado, function(err, todo) {
              console.log(todo)
    res.send(todo)
 })
 });

    app.get('/todo2/funciones/cambiarARealizado', function (req, res) {
      console.log('hola')
      mysql.cambiarARealizado(function(err, todo) {
              console.log(todo)
    res.send(todo)
 })
 });


 app.delete('/todo2/:id', function (req, res) {
      mysql.deleteTodo(req.params.id, function(err, todo) {
      console.log(todo)
    res.send(todo)
 })
 });


app.get('/todo/:id', function (req, res) {
  console.log(req.params.id)
  mysql.getTodo(req.params.id, function(err, usuarios) {
    console.log(usuarios)
    res.send(usuarios)
  })
});

app.get('/todo/realizado', function (req, res) {
  console.log('hola')
    mysql.getTodo,(function(err, todos) {
      res.send(todos)
  })
});

app.get('/holamundo', function (req, res) {
    res.send('Hola Mundo')
});

app.get('/dameUnNumero/:numero', function (req, res) {
    console.log(req.params.numero)
    res.send(true)
});



app.get('/dameUnNombre/:nombre', function (req, res) {
    console.log(req.params.nombre)
    res.send(funciones.hola(req.params.nombre))
      
});

 app.get('/saluda/:saludo/:nombre', function (req, res) {
    console.log(req.params.saludo)
    console.log(req.params.nombre)
    res.send(req.params.saludo + ' ' + req.params.nombre)
});
 
app.get('/suma/:a/:b', function (req, res) {
    console.log(req.params.a)
    console.log(req.params.b)
    res.send(''+funciones.suma(+req.params.a, +req.params.b))
}); 

app.get('/factorial/:num/', function (req, res) {
    console.log(req.params.num)
        res.send(''+funciones.factorialize(+req.params.num))
}); 

app.get('/masLargo/:nombre1/:nombre2', function (req, res) {
    console.log(req.params.nombre1)
    console.log(req.params.nombre2)
        res.send(funciones.cualEsMasLargo(req.params.nombre1,req.params.nombre2))
}); 

app.get('/Par/:num/', function (req, res) {
    console.log(req.params.num)
        res.send(funciones.esPar(req.params.num))
}); 

app.get('/user/:id', function (req, res) {
  console.log(req.params.id)
  mysql.getuser(req.params.id, function(err, usuarios) {
    console.log(usuarios)
    res.send(usuarios)
  })
});

app.post('/user', function (req, res) {
  var idUsuario = req.body.Id
   var nombreUsuario = req.body.nombre
   var apellidoUsuario = req.body.apellido
   var contraseñaUsuario= req.body.contraseña
   var idiomaUsuario= req.body.idioma
   var edadUsuario= req.body.edad
   var activoUsuario= req.body.activo
           console.log(idUsuario, nombreUsuario, apellidoUsuario, contraseñaUsuario, idiomaUsuario, edadUsuario, activoUsuario)
            mysql.createUser(idUsuario, nombreUsuario, apellidoUsuario, contraseñaUsuario, idiomaUsuario, edadUsuario, activoUsuario, function(err, respuesta) {
                  res.send(respuesta)
 })
 });

 app.put('/user/:id', function (req, res) {
      mysql.updateUser(req.params.id, req.body.nombre, req.body.apellido, req.body.contraseña, req.body.idioma, req.body.edad, req.body.activo, function(err, todo) {
              console.log(todo)
    res.send(todo)
 })
 });

app.delete('/user/:id', function (req, res) {
      mysql.deleteUser(req.params.id, function(err, todo) {
      console.log(todo)
    res.send(todo)
 })
 });

app.get('/users', function (req, res) {
  mysql.getUsersPromedio(function(err, usuarios) {
    res.send(usuarios)

  })

});


app.post('/user', function (req, res) {
  // ESTÁ VACÍO
});

app.post('/user', function (req, res) {
  // ESTÁ VACÍO
});

app.put('/user/:id', function (req, res) {
  // ESTÁ VACÍO
});

app.patch('/user/:id', function (req, res) {
  // ESTÁ VACÍO
});

app.delete('/user/:id', function (req, res) {
  // ESTÁ VACÍO
});

app.listen(3050, function () {
  console.log('Example app listening on port 3000!');
});
