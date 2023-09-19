"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = require("./database");
const path = require("path");
const mysql = require("mysql");
const app = (0, express_1.default)();
const cors = require("cors");
const multer = require("multer");
const port = 5200;
const upload = multer();
app.use(cors());
app.use(express_1.default.json());
app.get("/data", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const searchPara = ((_a = req.query.mainSearch) === null || _a === void 0 ? void 0 : _a.toString()) || "";
    const data = yield (0, database_1.getEntries)({ searchPara: "" }).then(data => data[0]);
    res.json(data);
}));
app.get("/product", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const searchPara = ((_b = req.query.mainSearch) === null || _b === void 0 ? void 0 : _b.toString()) || "";
    console.log(searchPara);
    const data = yield (0, database_1.getEntries)({ searchPara: "" }).then(data => data[0]);
    console.log(data);
    res.json(data);
}));
app.post("/orders", upload.none(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
}));
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
app.get("/basket/randomArticles", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categories = yield (0, database_1.getRandom)();
    res.send(categories);
}));
