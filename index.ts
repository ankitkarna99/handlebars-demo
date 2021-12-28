import express from "express";
import { engine } from "express-handlebars";
import flash from "connect-flash";
import session from "express-session";

const app = express();

app.engine("hbs", engine({ extname: "hbs" }));
app.set("view engine", "hbs");
app.set("views", "./views");

app.use(
  session({
    cookie: { maxAge: 1000 },
    secret: "MYSECRET",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(flash());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.locals.url = req.originalUrl;
  app.locals.success = req.flash("success");
  app.locals.error = req.flash("error");
  next();
});

app.post("/login", (req, res) => {
  if (!req.body.email) {
    req.flash("error", "Email is required.");
    return res.redirect("back");
  }
  res.json({});
});

app.get("/login", (req, res) => {
  res.render("modules/login/login", {
    layout: "login.layout.hbs",
    name: "Ankit",
    colors: ["red", "blue", "green"],
    persons: [
      {
        name: "ankit",
      },
      { name: "Susmita" },
    ],
    profile: {
      age: 5,
    },
  });
});

app.listen(4200, () => {
  console.log("App listening on http://localhost:4200");
});
