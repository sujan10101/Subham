const express = require("express");
const mongodb = require("./server/db");
const app = express();
const methodOverride = require('method-override');
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const { adminAuth, userAuth } = require("./middleware/auth.js");
const newsandevents = require("./model/newsandevents");
const newsandevent = require('./auth/newsandevent/auth');
const PORT = 5000;

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/auth", require("./auth/UserAuth/route"));
app.use("/api/auth", require("./auth/equipment/route"));
app.set("view engine", "ejs");
app.set('views', __dirname + '/views',);
app.use(express.static('./public'))
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
mongodb();
//ejs routes
app.get("/", (req, res) => res.render("./main/home"));
app.get("/register", (req, res) => res.render("register"));
app.get("/login", (req, res) => res.render("login"));
app.get("/admin", adminAuth, (req, res) => res.render("./adminpanel/admin"));
app.get("/basic", userAuth, (req, res) => res.render("user"));
app.use(newsandevent);
app.get("/carpentery-lab", (req, res) =>{
  res.render("./main/machines/carpentary");
  
})
app.get("/electronic-lab", (req, res) =>{
  res.render("./main/machines/electronic");
})

app.get("/news-and-events", async(req, res) =>{
  try {
    const news = await newsandevents.find({});

    res.render("./main/newsandevents",{news});
}

catch (e) {
    req.flash('error', 'oops,something went wrong');
    res.redirect('/error');
}

});

app.get("/logout", (req, res) => {
    res.cookie("jwt", "", { maxAge: "1" })
    res.redirect("/")
  })

  const server = app.listen(PORT, () => {
    console.log(`Server Connected at Port ${PORT}`);
});
// Handling Error
process.on("unhandledRejection", (err) => {
    console.log(`An error occurred: ${err.message}`);
    server.close(() => process.exit(1));
});

