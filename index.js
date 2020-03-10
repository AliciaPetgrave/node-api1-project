const express = require("express")
const shortid = require("shortid")

const server = express()

let users = [{
    name:"",
    bio:"",
    id: "",
}]

server.use(express.json())

const PORT = 5000
server.listen(PORT, () => 
console.log(`\n ** API running on http://localhost:${PORT} **\n`)
)

//POST request
server.post("/api/users", (req, res) => {
    const usersInfo = req.body
    usersInfo.id = shortid.generate()

    //error
    if (!usersInfo.name  || !usersInfo.bio ){
    res.status(400).json({errorMessage: "Please provide name and bio for the user."})
    }

    //save error
    if (usersInfo.name === undefined || usersInfo.bio === undefined){
    res.status(500).json({errorMessage: "There was an error while saving the user to the database"})
    }

    else {
        users.push(usersInfo)
    res.status(201).json(usersInfo)
    }
})

//GET request
server.get("/api/users", (req, res) => {
    
    //error
    if (users.name == undefined || users.bio == undefined){
    res.status(500).json({errorMessage: "The users information could not be retrieved."})
    }

    else {
        res.status(201).json(users)
    }
})

//GET by id
server.get('/api/users/:id', (req, res) => {
    res.status(200).json({users: "get user by id successful!"})

    //can't find user
    res.status(404).json({message: "The user with the specified ID does not exist"})

    //error
    res.status(500).json({errorMessage: "The user information could not be retrieved."})
})

//DELETE by id
server.delete('/api/users/:id', (req, res) => {
    res.status(200).json({users: "delete user by id successful!"})

    //can't find user
    res.status(404).json({message: "The user with the specified ID does not exist."})

    //error
    res.status(500).json({errorMessage: "The user could not be removed"})
})

//PATCH by id
server.patch('/api/users/:id', (req, res) => {
    res.status(200).json({users: "successful"})

    //cant find user
    res.status(404).json({message: "The user with the specified ID foes not exist"})

    //bad request
    res.status(400).json({errorMessage: "Please provide name and bio for the user"})

    //error
    res.status(500).json({errorMessage: "The user information could not be modified."})
})
