"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path = require("path");
const mysql = require("mysql");
const app = (0, express_1.default)();
const port = 5200;
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "bogdan123",
    database: "mysql",
});
connection.connect();
app.get("/", (req, res) => {
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
