const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

///TODO Add Middleware
module.exports = function(app) {
    app.use(function(req,res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/v1/test/all", controller.allAccess);

    app.get(
      "/v1/test/user",
      [authJwt.verifyToken],
      controller.userBoard
    );
  
    app.get(
      "/v1/test/admin",
      [authJwt.verifyToken, authJwt.isAdmin],
      controller.adminBoard
    );
  };