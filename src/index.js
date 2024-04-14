const path = require('path');
const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

const sortMiddleware = require('./app/middlewares/sortMiddleware');

const route = require('./routes');
const db = require('./config/db');

db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use(sortMiddleware);

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
  helpers: {
    sum:(a,b)=>{return a+b},
    sortable: (field, sort)=>{
      const sortType = field === sort.column ? sort.type : 'default';
      const icons = {
        default: 'fa-solid fa-sort',
        desc: 'fa-solid fa-sort-up',
        asc:  'fa-solid fa-sort-down',
      }
      const types = {
        default: 'desc',
        desc:    'asc',
        asc:     'desc',
      }

      const icon = icons[sort.type]
      const type = types[sort.type]

      return `<a href="?_sort&column=${field}&type=${type}">
                <i class="${icon}"></i>
              </a>`
    }
}
  
}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'resources/views'));

route(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
