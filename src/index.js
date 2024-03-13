const path = require('path');
const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

const route = require('./routes');
const db = require('./config/db');

db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use(methodOverride('_method'))
app.use(
  express.urlencoded({
    extended: true,
  }),
);
//HTTP logger
// app.use(morgan('combined'))

//Templates engine
app.engine('.hbs', handlebars.engine({ 
  extname: '.hbs' ,
  helpers: {sum:(a,b)=>{return a+b}}
}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'resources/views'));

route(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
