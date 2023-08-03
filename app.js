var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require("dotenv").config();

const mongoose = require('mongoose');
require("dotenv").config();

var indexRouter = require('./routes/index');
var newindexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var insertarRouter = require('./routes/insertar');
var modificarRouter = require('./routes/modificar');
var consultarRouter = require('./routes/consultar');
var eliminarRouter = require('./routes/eliminar');



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/index', newindexRouter);
app.use('/users', usersRouter);
app.use('/insertar',insertarRouter)
app.use('/modificar',modificarRouter)
app.use('/consultar',consultarRouter)
app.use('/eliminar',eliminarRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.gidrqhw.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;

mongoose.connect(uri,
  {
      useNewUrlParser: true, useUnifiedTopology: true
  })
  .then(()=> console.log('BASE DE DATOS CONECTADA CON EXITO'))
  .catch((err) => {
    console.error('ERROR AL CONECTARSE A MONGODB ATLAS:', err);
  });

app.listen(app.get('port'),()=>{
    console.log("Servidor uniciado en el puerto ",app.get('port'))
});


module.exports = app;
