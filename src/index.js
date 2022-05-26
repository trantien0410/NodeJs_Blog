const express = require("express");
const morgan = require("morgan");
const methodOverride = require('method-override');
const path = require("path");
const app = express();
const port = 3000;

const route = require("./routes");
const db = require("./config/db");

// Connect to DB
db.connect();
//--------------------------------------------//

app.use(express.static(path.join(__dirname, "public")));
const exphbs = require("express-handlebars");
const hbs = exphbs.create({
  extname: ".hbs",
  helpers: {
    // Function to do basic mathematical operation in handlebar
    math: function (lvalue, operator, rvalue) {
      lvalue = parseFloat(lvalue);
      rvalue = parseFloat(rvalue);
      return {
        "+": lvalue + rvalue,
        "-": lvalue - rvalue,
        "*": lvalue * rvalue,
        "/": lvalue / rvalue,
        "%": lvalue % rvalue,
      }[operator];
    },
  },
});
// TEMPLATE ENGINE
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources","views")); // cách mình tìm đến file, hệ điều hành window

app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(express.json());

app.use(methodOverride('_method'));
//console.log('PATH: ', path.join(__dirname, 'resources/views')) //xem đường dẫn

//
//HTTP logger
// app.use(morgan('combined'));

//Route init
route(app);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
