const express = require ('express');
const fs = require('fs');
const users = require ('./MOCK_DATA.json');

const app = express();
const port = 3000;
//middle ware
app.use(express.urlencoded({extended : false}));

//routes
//get users
app.get("/users",(req,res) => {
    const html = `
    <ul>
    ${users.map(user => `<li>${user.first_name}</li>`).join("")}

    </ul>
    `;
    res.send(html);
})
//rest api of users

app.get("/api/users" , (req, res) => {
    return res.json(users);
});

app
.route("/api/users/:id")
 .get((req,res)=>{
    const id = Number(req.params.id);
    const user = users.find ((user) =>user.id ===id);
    return res.json(user);
})
.patch((req,res)=>{
    //edit user with id
    return res.json ({status: "pending"});
})
.delete((req,res)=>{
    //delete user with id
    return res.json ({status: "pending"});
})
app.post("/api/users",(req,res) => {
   const body = req.body;
   users.push (body);
    return res.json({status:"pending"});
})

app.listen(port,() =>console.log (`server started at port :${port}`))
