module.exports = app => {
    const users = require("../controllers/admin.controller.js");

    var router = require("express").Router();
 
    //ManageUsers CRUD Functionality for Admin User
    //Routes for admin functionality and creating, updating and deleting users.

    //Create a new user
    router.post("/", users.create);

    //Retrieve all Users
    router.get("/", users.findAll);

    //Retrieve a single user by id
    router.get("/:id", users.findOne);

    //update a user with id 
    router.put("/:id", users.update);

    //remove a user with id 
    router.delete("/:id",users.delete);

    app.use('/v1/users', router);

    return users;
};