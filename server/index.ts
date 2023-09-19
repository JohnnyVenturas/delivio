import express, { Request, Response } from "express";
import { getCategories, getEntries, getRandom } from "./database";

const path = require("path");
const mysql = require("mysql");
const app = express();
const cors = require("cors");
const multer = require("multer");

const port = 5200;
const upload = multer();

app.use(cors());
app.use(express.json());
app.get("/data", async (req : Request, res : Response) => {
		
	const searchPara = req.query.mainSearch?.toString() || "";
	const data = await getEntries({searchPara:""}).then(data=>data[0]);
	res.json(data);
})
app.get("/product", async (req : Request, res : Response) => {
	const searchPara =req.query.mainSearch?.toString() || "";
	console.log(searchPara);
	const data = await getEntries({searchPara:""}).then(data => data[0]);
	console.log(data);
	res.json(data);
});

app.post("/orders",upload.none() ,async (req : Request, res : Response) => {
});
app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});

app.get("/basket/randomArticles", async(req: Request, res : Response) => {
		const categories = await getRandom();
		res.send(categories);
})

