//intiliazing
const express = require('express')
const app=express()
const mysql=require('mysql')
const bodyParser= require('body-parser')
const methodOverride = require('method-override')
var user = [{userName:"",emailId:"",password:"",phoneNo:"",dateTime:""}]; 

//middleware
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static('./'))
app.use(methodOverride('_method'));
app.set("view engine", "ejs");

//listening to the port 3000 and server gets created.
app.listen(3000,()=>{						
	console.log("Server is up")
})

//connecting to mysql database
function getConnection(){				
	return mysql.createConnection({
		host:'localhost',
		user:'root',
		database:'db_intern'
	})
}

//get request, will show html form page.
app.get("/", (req, res) => {			
 	res.render("fe",{fe:user,message:"",message1:""})
}); 

//get request for printinig the userdata table.
app.get("/show",(req,res)=>{			
	console.log("Responding to root route");
	const conn=getConnection()
	conn.query("SELECT * FROM userdata",(err,rows,fields)=>{
		console.log("fetched")
		res.json(rows)
	})
})

//post request for inserting into userdata table.
app.post('/insert',(req,res)=>{			
	const created = new Date()   		//creating instance of date.
	console.log("trying to insert");
	const query1="SELECT * FROM userdata where emailId=?"
	getConnection().query(query1,[req.body.email],(err1,results1,fields1)=>{
		if(err1){
			res.sendStatus(500)
			return
		}
		else if(results1.length==0)		//insert if no data exists with same email_id(primary key).
		{
			const query="INSERT INTO userdata values(?,?,?,?,?)"
			const conn=getConnection()
			conn.query(query,[req.body.name,req.body.password,req.body.email,req.body.phno,created],(err,results,fields)=>{
			if(err){					
				console.log("insertion error")
				res.sendStatus(500)
				return
			}
			console.log("inserted successfully")
			res.redirect("/")
			})
		}
		else							//update if already exists.
		{
			const conn=getConnection()
			const query="UPDATE userdata set userName=? ,password=? ,phoneNo=?,dateTime=? where emailId=?"
			conn.query(query,[req.body.name,req.body.password,req.body.phno,created,req.body.email],(err,results,fields)=>{
			if(err){
				console.log("updation error")
				res.sendStatus(500)
				return
			}
			console.log("updated successfully")
			res.redirect("/")
			})
		}
	})
})

//get request for search basesd on email_id.
app.get('/search',(req,res)=>{			
	console.log("trying to search");
	const query="SELECT * FROM userdata where emailId=?"
	getConnection().query(query,[req.body.email_sh],(err,rows,fields)=>{
		if(err){
			console.log("no result found")
			res.sendStatus(500)
			return
		}
		else if(rows.length==0)
		{
			res.render("fe",{fe:user,message:"no records found!",message1:""})
			return
		}
		else
		{
		res.render("fe",{fe:rows,message:"one record found",message1:""})

     	}
	})
})

//delete request for delete based on email_id.
app.delete('/delete',(req,res)=>{				
	console.log("trying to delete");
	const query="DELETE FROM userdata where emailId=?"
	getConnection().query(query,[req.body.email_sh],(err,results,fields)=>{
		if(err){
			console.log("no result found")
			res.sendStatus(500)
			return
		}
		res.render("fe",{fe:user,message:"",message1:'number of rows deleted:'+ results.affectedRows})
	})
})
