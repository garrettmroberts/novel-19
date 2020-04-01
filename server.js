const express = require("express");
const exphbs = require("express-handlebars");

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.static("public"));

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

app.get("/", (req, res) => res.render("index"));

app.listen(PORT, () => console.log("Server listening on http://localhost:" + PORT));