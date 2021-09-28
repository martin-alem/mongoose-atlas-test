require("dotenv").config();

const express = require("express");
const methodOverride = require("method-override");
const mongoose = require("mongoose");


const app = express();
const db = mongoose.connection;


const PORT = process.env.PORT || 3000;

const MONGODB_URL = process.env.MONGODB_URL;

mongoose.connect(MONGODB_URL, {
    useNewURLParser: true,
    useUnifiedTopology: true,
});

db.on("error", error => console.error(error.message));
db.on("connected", () => console.log("Connected to MongoDB"));
db.on("disconnected", () => console.log("disconnected from MongoDB"));


app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(methodOverride("_method"));


app.get("/", (req, res) => {
    res.status(200).json({ "message": "Express server up and running.." });
});

app.listen(PORT, () => {
    console.log(`Express server is listening on port ${PORT}`);
})