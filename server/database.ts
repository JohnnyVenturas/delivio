import { ClientEntryII, OrderEntryII } from "./database.d";
const mysql = require("mysql2");

const pool = mysql
	.createPool({
		connectionLimit: 10,
		host: "localhost",
		user: "root",
		password: "bogdan123",
		database: "mysql",
	})
	.promise();

export async function getEntries({ searchPara }: { searchPara: string }) {
	const result = await pool.query(
		"SELECT * FROM DelivioFierForjatBun WHERE category \
		LIKE CONCAT('%', ? , '%') OR id LIKE CONCAT('%', ?, '%')	\
		OR NAME LIKE CONCAT('%', ?, '%');",
		[searchPara, searchPara, searchPara]
	);
	return result;
}

export async function insertData({
	id,
	length,
	height,
	section,
	roundSection,
	price,
	name,
	category,
}: {
	[key: string]: string | undefined;
}) {
	let goodSection;
	if (section == null) {
		goodSection = `ø${roundSection}`;
	} else {
		goodSection = `${section}`;
	}
	console.log(goodSection);
	const img = `/data_delivio/result/${id}.png`;
	const insert = await pool.query(
		"\
INSERT INTO DelivioFierForjatBun (id, length, height, section,category ,PRICE, NAME, image)\
VALUES (?,?,?,?,?,?,?,?);",
		[id, length, height, goodSection, category, price, name, img]
	);
}

export async function insertOrder(orderData: OrderEntryII) {
	try {
		const clientEmail = orderData.orderClientInfo.email;
		const orderId = orderData.orderId;
		const userData: ClientEntryII | undefined = await pool.query(
			"SELECT * FROM client_table WHERE id = ?",
			[clientEmail]
		);

		if (userData == null) {
			await pool.query(
				"INSERT INTO client_table (email, password_hash, orders) \
											 VALUES (?, ?, ?) \
											 ",
				[clientEmail, {}, { orderId: orderData }]
			);
			return;
		}
		const orders = userData.orders;

		await pool.query(
			"\
										 UPDATE client_table\
										 SET orders = ?\
										 WHERE email = ?;\
										 ",
			[JSON.stringify(orders), clientEmail]
		);
	} catch (err) {
		console.error("We have an error in insertOrder", err);
	}
}

export async function getCategories() {
	try {
		const categories = await pool.query("SELECT DISTINCT category FROM DelivioFierForjatBun;");
		return categories[0];
	} catch (err) {
		console.error("We have an error in getCategories", err);
	}
}

export async function getEntryCategory({ searchPara }: { searchPara: string }) {
	const result = await pool.query("SELECT * FROM DelivioFierForjatBun WHERE category=?", [
		searchPara,
	]);
	return result[0];
}
export async function getRandom() {
	try {
		const categories = await pool.query(
			"\
				WITH distinct_categories AS (\
						SELECT DISTINCT category\
							FROM DelivioFierForjatBun\
				)\
				SELECT d.category, t.image\
				FROM distinct_categories d\
				JOIN DelivioFierForjatBun t\
				ON d.category = t.category\
				ORDER BY RAND()\
				LIMIT 8;\
				\
																				"
		);
		return categories[0];
	} catch (err) {
		console.error("We have an error in getCategories", err);
	}
}
