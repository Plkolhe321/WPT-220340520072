
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());


const bodyParser = require('body-parser');

let dbparams = {
	host: 'localhost',
	user: 'root',
	database: 'cdacjuhu2',
	password: 'cdac',
	port: 3306
};

const mysql = require('mysql2');
const con = mysql.createConnection(dbparams);




app.use(express.static('abc'));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
//whether you want nested objects support  or not



// var result;

// app.post('/poc1', function (req, res) {
	
// 		console.log("reading input " + req.body.v1 +  "  second " + req.body.v2)
		
//     	var xyz ={ v1:37, v2:35};
//         res.send(xyz);
//     });



app.get('/addBook', function (req, res) {
    
		let input ={a: req.query.x,b : req.query.y,c : req.query.z};

        console.log("reading input " + input.a +" "+ input.b +" "+ input.c);
		let output = true;
    	con.query('insert into book values(?,?,?)',[input.a,input.b,input.c],(error,rows)=>{
			if(error){
				console.log("Error happened "+error);
			}else if(rows.affectedRows > 0){
				output = true;
			}
			res.send(output);
		});

	});

	app.get('/getBook', function (req, res) {
    
		let input = req.query.x;

        console.log("reading input " + input);
		let output = {status:true, bookdetails:{bookid:0, bookname:"", price: 0}};
    	con.query('select * from book where bookid=?',[input],(error,rows)=>{
			if(error){
				console.log("Error happened "+error);
			}else if(rows.length > 0){
				output.status = true;
				output.bookdetails = rows[0];
			}
			res.send(output);
		});

	});

	app.get('/getAllBook', function (req, res) {
    
		// let input = req.query.x;

        console.log("reading input " + input);
		let output = {bookdetails:{bookid:0, bookname:"", price: 0}};
    	con.query('select * from book',[],(error,rows)=>{
			if(error){
				console.log("Error happened "+error);
			}else if(rows.length > 0){
				output= rows;
			}
			res.send(output);
		});

	});

app.listen(8081, function () {
    console.log("server listening at port 8081...");
});