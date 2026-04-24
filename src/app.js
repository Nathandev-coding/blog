const express = require("express");
const app = express();
const cors = require("cors");


// Routes
const PageRoutes = require("./routes/pageRoutes");

app.use(cors());
app.use(express.json());


app.use("/", PageRoutes);


//fichier statique
app.use(express.static('src/public'));



module.exports =app;