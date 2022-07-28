const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const contentsRouter = require('./routes/contents');
const verifyToken = require('./middleware/verify-token');
const postRouter = require('./routes/posts');
const recipeRouter = require('./routes/recipe');
const measureRouter = require('./routes/measure');

const app = express();

// cors settings
const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
}

// imort db
const db = require('./helper/db')();
// import config
const config = require('./config');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('api_secret_key', config.secret_key);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/v1/contents', contentsRouter);
app.use('/auth/', verifyToken); // middleware
app.use('/api/v1/users', cors(corsOptions), usersRouter); // ? => /auth/ 
app.use('/auth/api/v1/posts', postRouter);
app.use('/auth/api/v1/recipes', recipeRouter);
app.use('/auth/api/v1/measures', measureRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
