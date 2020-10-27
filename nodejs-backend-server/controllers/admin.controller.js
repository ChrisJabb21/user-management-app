const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;

/*Admin user specific controller
controller CRUD requests for Admin functionality and part of website where role is Admin
includes validation and response status exception handling.
*/


//Create and save a user
exports.create = (req, res) => {

    //Check if all required fields are not empty for creating a user.
    if(!req.body.username ||!req.body.email || !req.body.password){
        res.status(400).send({
            message: "Content can not be empty"
        });
        return;
    }

    //create user object with request body parameters.
    const user = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
    //,role: req.body.role
    };

    //Save to database and error handle promises.
    User.create(user)
    .then(data => {
            res.send(data);
        })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "some error occurred trying to create user."
        });
    });
};
//find a user by userId FindOne getUserById
exports.findOne = (req, res) => {
 const id = req.params.id;

 User.findByPk(id)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: "Error occurred trying to retrieve User with id=" + id
        });
    });
};


//Retrieve all users from the database.
exports.findAll = (req, res) => {
const username = req.query.username;
var condition = username ? { title: { [Op.like]: `%${username}%` } } : null;
    User.findAll({ where: condition})
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Users."
        });
      });
};

// Update a users info and role by the id in the request 
exports.update = (req, res) => {
    const id = req.params.id;

    User.update(req.body, {
         where: { id: id } 
        })
         .then(num => {
            if(num == 1) {
                res.send({
                    message: "User update successfull"
                });
            } else {
                res.send({
                  message: `Cannot update user with id=${id}. Check if User exists or if the req.body is empty!`
                        });
                    }
                })
                .catch(err =>  {
                    res.status(500).send({
                        message: "An error occurred updating User with id=" + id
                    });
                });
        };

//delete a user or DeleteUser
exports.delete = (req, res) => {
    const id = req.params.id; 

    User.destroy({
        where: { id: id }
    })
      .then(num => {
          if(num == 1) {
              res.send({
                  message: "User has been successfully deleted!"
              });
          } else {
              res.send({
                  message: `Cannot delete User with id=${id}. User was not found!`
              });
          }
      })
      .catch(err => {
        res.status(500).send({
            message: "Could not delete User with id=" + id
        });
    });

  };
        

//delete user details