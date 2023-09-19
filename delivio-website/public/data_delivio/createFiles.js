const { json } = require("stream/consumers");

function createFiles(callback, filename = "output.txt", dirName="/data_delivio/result") {
	const fs = require("node:fs");

	fs.readFile(filename, (err, data) => {
		if (err) throw err;
		callback(dirName, data);
	});
}

createFiles((dirName, data) => {
	const path = require("node:path");
	const new_data_s =  String(data);
	const new_data_arr = new_data_s.split("\n");
	
	
	const result = [];
	const fs = require("node:fs");
	
		
	for(const entry of new_data_arr) {
		const new_entry = path.join(dirName, entry);
		result.push(new_entry);
	}
	const map = new Map();

	for(const entry in new_data_arr) {
		const id = 	new_data_arr[entry].replace(/\_\_\d{1,}\.png/,"");
		map.set(id, [])
		const output = map.get(id)
		output.push(result[entry])
		
	}

	fs.readFile("./data_set/final.json", (err, data) => {
		if(err) {
			console.log(err);
		}

		const res_json = JSON.parse(data);
		for(const entry of res_json) {
			entry.image = map.get(entry.id) == null ? "default" : map.get(entry.id)[0]
		}

		fs.writeFile("finalfilegood.json",JSON.stringify(res_json), err => {
			if(err) throw err;
		});
	});
});
