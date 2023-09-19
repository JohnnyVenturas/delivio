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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandom = exports.getEntryCategory = exports.getCategories = exports.insertOrder = exports.insertData = exports.getEntries = void 0;
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
function getEntries({ searchPara }) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield pool.query("SELECT * FROM DelivioFierForjatBun WHERE category \
		LIKE CONCAT('%', ? , '%') OR id LIKE CONCAT('%', ?, '%')	\
		OR NAME LIKE CONCAT('%', ?, '%');", [searchPara, searchPara, searchPara]);
        return result;
    });
}
exports.getEntries = getEntries;
function insertData({ id, length, height, section, roundSection, price, name, category, }) {
    return __awaiter(this, void 0, void 0, function* () {
        let goodSection;
        if (section == null) {
            goodSection = `ø${roundSection}`;
        }
        else {
            goodSection = `${section}`;
        }
        console.log(goodSection);
        const img = `/data_delivio/result/${id}.png`;
        const insert = yield pool.query("\
INSERT INTO DelivioFierForjatBun (id, length, height, section,category ,PRICE, NAME, image)\
VALUES (?,?,?,?,?,?,?,?);", [id, length, height, goodSection, category, price, name, img]);
    });
}
exports.insertData = insertData;
function insertOrder(orderData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const clientEmail = orderData.orderClientInfo.email;
            const orderId = orderData.orderId;
            const userData = yield pool.query("SELECT * FROM client_table WHERE id = ?", [clientEmail]);
            if (userData == null) {
                yield pool.query("INSERT INTO client_table (email, password_hash, orders) \
											 VALUES (?, ?, ?) \
											 ", [clientEmail, {}, { orderId: orderData }]);
                return;
            }
            const orders = userData.orders;
            yield pool.query("\
										 UPDATE client_table\
										 SET orders = ?\
										 WHERE email = ?;\
										 ", [JSON.stringify(orders), clientEmail]);
        }
        catch (err) {
            console.error("We have an error in insertOrder", err);
        }
    });
}
exports.insertOrder = insertOrder;
function getCategories() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const categories = yield pool.query("SELECT DISTINCT category FROM DelivioFierForjatBun;");
            return categories[0];
        }
        catch (err) {
            console.error("We have an error in getCategories", err);
        }
    });
}
exports.getCategories = getCategories;
function getEntryCategory({ searchPara }) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield pool.query("SELECT * FROM DelivioFierForjatBun WHERE category=?", [
            searchPara,
        ]);
        return result[0];
    });
}
exports.getEntryCategory = getEntryCategory;
function getRandom() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const categories = yield pool.query("\
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
																				");
            return categories[0];
        }
        catch (err) {
            console.error("We have an error in getCategories", err);
        }
    });
}
exports.getRandom = getRandom;
