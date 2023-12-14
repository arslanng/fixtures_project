const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const app = express();
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const methodOverride = require("method-override");

const pageRouter = require("./routes/pageRouter");
const furnitureRouter = require("./routes/furnitureRouter");
const userRouter = require("./routes/userRouter");
const categoryRouter = require("./routes/categoryRouter");
const orderRouter = require("./routes/orderRouter");

mongoose
  .connect("mongodb://localhost/fixtures-db")
  .then(() => console.log("DB Connected"));

global.userIN = null;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(
  session({
    secret: "keyboard_cat_rambo",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: "mongodb://localhost/fixtures-db" }),
  })
);
app.use(flash());
app.use((req, res, next) => {
  res.locals.flashMessages = req.flash();
  next();
});
app.use(
  methodOverride("_method", {
    methods: ["POST", "GET"],
  })
);

app.use("*", (req, res, next) => {
  userIN = req.session.userID;
  next();
});
app.use("/", pageRouter);
app.use("/furnitures", furnitureRouter);
app.use("/users", userRouter);
app.use("/categories", categoryRouter);
app.use("/orders", orderRouter);

const port = 3000;
app.listen(port, () => {
  console.log(`app started on port ${port}`);
});
