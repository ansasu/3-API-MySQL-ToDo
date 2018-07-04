var mysql = require('mysql')

var con = mysql.createConnection({
  host: "localhost",
  port: "3307",
  user: "root",
  password: "123456",
  // database: "todo"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");

  con.query("CREATE DATABASE IF NOT EXISTS todo", function (err, result) {
    //if (err) throw err;
      console.log("Database created todo");

    createTodoTable(function() {
      console.log('TERMINADO')
    })
  });
});

function createTodoTable(callback) {
  var sql = "CREATE TABLE IF NOT EXISTS todo.todo (id INT AUTO_INCREMENT PRIMARY KEY, nombre VARCHAR(255), realizado BOOLEAN)";
  con.query(sql, function (err, result) {
    //if (err) throw err;
    seedTodoTable(function() {
      return callback()
    })
  });
}

function seedTodoTable(callback) {
  getTodoList(function(err, result) {
    if (result.length === 0) {
      var todoList = [[
        'Realizar la compra', false
      ],[
        'Sacar al perro', false
      ],[
        'Coger cita medico', true
      ]]
      var sql = "INSERT INTO todo.todo (nombre, realizado) VALUES ?";
      con.query(sql, [todoList], function (err, result) {
        if (err) throw err;
        console.log("database fetched!");
        return callback()
      });
    } else {
      return callback()
    }
  })
}

function getTodoList(callback) {
  con.query("SELECT * FROM todo.todo", function (err, result, fields) {
    if (err) return callback(err);
    console.log(result);
    return callback(null, result)
  });
}

function getTodo(id, callback) {
  con.query("SELECT * FROM todo.todo WHERE id= " + id, function (err, result, fields) {
    if (err) return callback(err);
    return callback(null, result)
  });
}

function getTodosRealizados(callback) {
  con.query("SELECT * FROM todo.todo WHERE realizado= 1", function (err, result, fields) {
    if (err) return callback(err);
    return callback(null, result)
  });
}


function createTodo(nombre, realizado, callback) {
  con.query("INSERT INTO todo.todo (nombre, realizado) VALUES ('"+ nombre + "'," + realizado + ")", function (err, result, fields) {
    if (err) return callback(err);
    return callback(null, result)
 });
}

function updateTodo(id,nombre, realizado, callback) {
  var sentencia="UPDATE todo.todo SET nombre='"+ nombre +"', realizado= "+ realizado +" WHERE id="+id
    console.log(sentencia)
  con.query (sentencia, function (err, result, fields) {
    if (err) return callback(err);
    return callback(null, result)
 });
}

function deleteTodo(id,callback) {
  var sentencia="DELETE FROM todo.todo WHERE  id="+id
  console.log (sentencia)
   con.query (sentencia, function (err, result, fields) {
    console.log('bien')
    if (err) return callback(err);
    return callback(null, result)
 });
}

function cambiarARealizado(callback) {
  var sentencia= "UPDATE todo.todo SET realizado=1 WHERE realizado=0"
  console.log(sentencia)
  con.query(sentencia, function (err, result, fields) {
    if (err) return callback(err);
    return callback(null, result)
  });
}

function getuser(id, callback) {
  con.query("SELECT * FROM user.user WHERE id= " + id, function (err, result, fields) {
    if (err) return callback(err);
    return callback(null, result)
  });
}

function createUser(id,nombre,apellido,contraseña,idioma,edad,activo,callback) {
  var sentencia = "INSERT INTO user.user (id,nombre,apellido,contraseña,idioma,edad,activo) VALUES ("+id+",'"+nombre+"','"+apellido+"','"+contraseña+"','"+idioma+"',"+edad+","+activo+")"
  console.log(sentencia)
  con.query(sentencia, function (err, result, fields) {
    if (err) return callback(err);
    return callback(null, result)
 });
}

function updateUser(id, nombre, apellido, contraseña, idioma, edad, activo, callback) {
  var sentencia="UPDATE user.user SET nombre='"+nombre+"',apellido='"+apellido+"',contraseña='"+contraseña+"',idioma='"+idioma+"',edad="+edad+",activo="+activo+" WHERE id="+id
    console.log(sentencia)
  con.query (sentencia, function (err, result, fields) {
    if (err) return callback(err);
    return callback(null, result)
 });
}

function deleteUser(id,callback) {
  var sentencia="DELETE FROM user.user WHERE  id="+id
  console.log (sentencia)
   con.query (sentencia, function (err, result, fields) {
    console.log('bien')
    if (err) return callback(err);
    return callback(null, result)
 });
}

function mediauser(id, callback) {
  con.query("SELECT * FROM user.user WHERE id= " + id, function (err, result, fields) {
    if (err) return callback(err);
    return callback(null, result)
  });
}

function getUsersPromedio(callback) {
  con.query("SELECT AVG edad FROM users.users WHERE edad= 1", function (err, result, fields) {
    if (err) return callback(err);
    return callback(null, result)
  });
}




module.exports = {
    getTodoList,
    getTodo,
    getTodosRealizados,
    createTodo,
    updateTodo,
    deleteTodo,
    cambiarARealizado,
    getuser,
    createUser,
    updateUser,
    deleteUser,
    getUsersPromedio,
}
