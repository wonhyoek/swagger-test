const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const low = require("lowdb");

const PORT = process.env.PORT || 5000;

const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("db.json");
const db = new low(adapter);

db.defaults({books: []}).write();

const app = express();

app.db = db;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));