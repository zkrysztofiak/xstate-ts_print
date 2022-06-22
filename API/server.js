const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
const host = 'localhost';
const port = 4001;
const dbFile = 'db.json';

let arrDB;
let AUTO_INCREMENT;

fs.readFile(
	dbFile,
	'utf8',
	(readFileCallback = (err, data) => {
		if (err) {
			console.log(err);
		} else {
			arrDB = JSON.parse(data); //now it an object
			AUTO_INCREMENT = arrDB.sort((a, b) => a.id - b.id)[arrDB.length - 1].id + 1;
		}
	})
);
const writeDB = async (arrDB) => {
	const data = JSON.stringify(arrDB, null, '\t');
	await fs.writeFileSync(dbFile, data, (err) => {
		if (err) {
			console.log(err);
			return false;
		} else {
			console.log('JSON data is saved.');
			return true;
		}
	});
};
const whitelist = ['https://bw20.gkpge.pl', 'http://localhost', 'http://localhost:3000'];
const corsOptions = {
	origin: function (origin, callback) {
		origin = origin || 'http://localhost'; // workaround, test origin='undefined'
		if (whitelist.indexOf(origin) !== -1) {
			callback(null, true);
		} else {
			callback(new Error('WoP.js Not allowed by CORS for: ' + origin));
		}
	},
	credentials: true,
};
app.use(cors(corsOptions));

// prettier-ignore
app.use((req, res, next) => { console.log( `-- ${new Date().toISOString().slice(0, 19).replace('T', ' ')} ${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}` );
	next();
});

app.get('/', (req, res) => {
	res.send('Hello, give me the route !');
});

const filterByValue = (str2find) => {
	const str2findLowCase = str2find.toLowerCase();
	return arrDB.filter((obj) => Object.keys(obj).some((k) => ('' + obj[k]).toLowerCase().includes(str2findLowCase)));
};

app.get('/WoP', (req, res) => {
	const reqPerPage = parseInt(req.query.perPage || 5);
	const offset = ((req.query.page || 1) - 1) * reqPerPage; // 0, 10, 20 - FROM id >= offset ---- TO id < offset+reqPerPage
	const rqsS = req.query.searchString || '';
	const arrFiltered = rqsS ? filterByValue(rqsS) : arrDB;
	const count = arrFiltered.length;
	const arrFilteredSliced = arrFiltered.slice(offset, offset + reqPerPage);
	// prettier-ignore
	return res.status(200).send({ totalItems: count, ...{ itemsCurrentPage: arrFilteredSliced } });
	// res.json(arrDB);
});

app.get('/WoP/:id', (req, res) => {
	try {
		const id = req.params.id;
		let obj = arrDB.find((obj) => obj.id == id);
		if (obj) {
			console.log(obj);
			return res.status(200).send(obj);
		}
		console.log('/WoP/:id sent 404 not found:', id);
		res.status(404).send('WoP not found');
	} catch (e) {
		console.log(e);
	}
});

app.listen(port, host, () => console.log(`API listening on: http://${host}:${port}`));

// nodemon server.js --ignore db.json

// netstat -ano -p tcp |find "4001"
// taskkill /PID 44464 /F
