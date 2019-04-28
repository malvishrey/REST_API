const express = require('express')
const app=express()
const mysql=require('mysql')
const bodyParser= require('body-parser')
const methodOverride = require('method-override')
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static('./'))
app.use(methodOverride('_method'));
function getConnection(){				//connecting to mysql database
	return mysql.createConnection({
		host:'localhost',
		user:'root',
		database:'db_intern'
	})

}

const created = new Date()   			//creating instance of date.
app.set("view engine", "ejs");
var user = [{user_name:"",email_id:"",password:"",phn_no:"",time:""}]; 
//app.set("views", __dirname + "/views"); 
app.get("/", (req, res) => {			//get request, will show html form page.
 	res.render("fe",{fe:user,message:"",message1:""})
}); 

app.get("/show",(req,res)=>{			//get request for printinig the userdata table.
	console.log("Responding to root route");
	const conn=getConnection()
	conn.query("SELECT * FROM userdata",(err,rows,fields)=>{
		console.log("fetched")
		res.json(rows)
	})
})
app.post('/insert',(req,res)=>{			//post request for inserting into userdata table.
	console.log("trying to insert");
	const query2="SELECT * FROM userdata where email_id=?"
	getConnection().query(query2,[req.body.email],(err1,results1,fields1)=>{
		if(err1){
			res.sendStatus(500)
			return
		}
		else if(results1.length==0)		//insert if no data exists with same email_id(primary key).
		{
			const query1="INSERT INTO userdata values(?,?,?,?,?)"
			const conn=getConnection()
			conn.query(query1,[req.body.name,req.body.password,req.body.email,req.body.phno,created],(err,results,fields)=>{
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
			const query1="UPDATE userdata set user_name=? ,password=? ,phn_no=?,time=? where email_id=?"
			conn.query(query1,[req.body.name,req.body.password,req.body.phno,created,req.body.email],(err,results,fields)=>{
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
	//res.send("firstname" + req.body.name)	
})
app.get('/search',(req,res)=>{			//get request for search basesd on email_id.
	console.log("trying to search");
	const query1="SELECT * FROM userdata where email_id=?"
	getConnection().query(query1,[req.body.email_sh],(err,rows,fields)=>{
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
		//res.render('fe',{items:rows})
	//	res.render("")
	})
	//res.send("firstname" + req.body.name)	
})
app.delete('/delete',(req,res)=>{				//delete request for delete based on email_id.
	console.log("trying to delete");
	const query1="DELETE FROM userdata where email_id=?"
	getConnection().query(query1,[req.body.email_sh],(err,results,fields)=>{
		if(err){
			console.log("no result found")
			res.sendStatus(500)
			return
		}
		res.render("fe",{fe:user,message:"",message1:'Deleted Row(s):'+ results.affectedRows})
		//res.render('fe',{items:rows})
	//	res.render("")
	})
	//res.send("firstname" + req.body.name)	
})
app.listen(3000,()=>{						//listening to the port 3000 and server gets created.
	console.log("Server is up")
	console.log(created)
})
