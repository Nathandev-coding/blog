const express = require("express");
const app = express();
const cors = require("cors");


// Routes
const PageRoutes = require("./routes/pageRoutes");
const UsersRoutes = require("./routes/usersRoutes");

app.use(cors());
app.use(express.json());


app.use("/", PageRoutes);
app.use("/api/users", UsersRoutes);

app.use("/uploads", express.static("src/uploads"));
//fichier statique
app.use(express.static('src/public'));



module.exports =app;