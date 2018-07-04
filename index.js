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
  mysql.createTodo(nombreTarea, realizadoTarea, function (err, respuesta) {
    res.send(respuesta)
  })
  });


app.get('/holaMundo', function (req, res) {
  
    res.send('Hola Mundo')

});

app.get('/dameUnNombre/:nombre' , function (req, res) {
  console.log(req.params.nombre)
  
    res.send(funciones.hola(req.params.nombre))

});



app.get('/saluda/:saludo/:nombre' , function (req, res) {
  console.log(req.params.saludo)
  console.log(req.params.nombre)
    res.send(req.params.saludo+' '+req.params.nombre)

});
//funion suma

app.get('/suma/:numero1/:numero2' , function (req, res) {
  console.log(req.params.numero1)
console.log(req.params.numero2)
console.log (''+funciones.suma(+req.params.numero1, +req.params.numero2))// esto es solo para que me muestre el resultyado en la consola de node
res.send(''+funciones.suma(+req.params.numero1, +req.params.numero2))

});

app.get('/dameUnNumero/:numero' , function (req, res) {
  console.log(req.params.numero)
  
    res.send(true)

});
app.get('/factorial/:numero' , function (req, res) {
  console.log(req.params.numero)
  
res.send(''+funciones.factorialize(+req.params.numero))

});

app.get('/masLargo/:nombre1/:nombre2', function (req, res) {
    console.log(req.params.nombre1)
    console.log(req.params.nombre2)
        res.send(funciones.cualEsMasLargo(req.params.nombre1,req.params.nombre2))
}); 

app.get('/parimpar/:num' , function (req, res) {
  console.log(req.params.num)
  
res.send(funciones.esPar(req.params.num))

});

app.get('/todo/:id', function (req, res) {
  console.log(req.params.id)
  mysql.getTodosRealizados(req.params.id, function(err, usuarios) {
    console.log(usuarios)
    res.send(usuarios)
  })
  });

app.get('/todos/realizados', function (req, res) {
  mysql.getTodosRealizados(function(err, todos) {
    res.send(todos)
  })
  });

app.get('/5' , function (req, res) {
  
    res.send(true)

});

app.put('/todo2/:id', function (req, res) {
  console.log('hola1')


mysql.updateTodo(req.params.id, req.body.nombre,req.body.realizado, function (err, todo) {
    console.log(todo)
    res.send(todo)
  })
  });

app.delete('/todo2/:id', function (req, res) {
  console.log('hola1')
mysql.deleteTodo(req.params.id,  function (err, todo) {
    console.log(todo)
    console.log(err)
    res.send(todo)
  })
  });
app.get('/suma/:numero1/:numero2' , function (req, res) {
  console.log(req.params.numero1)
console.log(req.params.numero2)
console.log (''+funciones.suma(+req.params.numero1, +req.params.numero2))// esto es solo para que me muestre el resultyado en la consola de node
res.send(''+funciones.suma(+req.params.numero1, +req.params.numero2))

});

app.get('/user/:id', function (req, res) {
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

app.delete('/users/:id', function (req, res) {
  console.log('hola1')
mysql.deleteusers(req.params.id,  function (err, todo) {
    console.log(todo)
    console.log(err)
    res.send(todo)
  })
  });

app.post('/users', function (req, res) {
  var nombreUsuario = req.body.nombre
  var apellidoUsuario = req.body.apellido
  var contraseñaUsuario = req.body.contraseña
  var idiomaUsuario = req.body.idioma
  var edadUsuario = req.body.edad
  var activoUsuario= req.body.activo
  console.log(nombreUsuario,apellidoUsuario,contraseñaUsuario, idiomaUsuario,edadUsuario,activoUsuario)
  mysql.createUsers(nombreUsuario,apellidoUsuario, contraseñaUsuario, idiomaUsuario,edadUsuario,activoUsuario, function (err, respuesta) {
    res.send(respuesta)
  })
  });


app.put('/users/:id', function (req, res) {
  console.log('hola1')


mysql.updateUsers(req.params.id, req.body.nombre,req.body.apellido,req.body.contraseña,req.body.idioma,req.body.edad,req.body.activo, function (err, todo) {
    console.log(todo)
    res.send(todo)
  })
  });

app.get('/users/:id', function (req, res) {
  console.log(req.params.id)
  mysql.getUsers(req.params.id, function(err, usuarios) {
    console.log(usuarios)
    res.send(usuarios)
  })
  });

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});