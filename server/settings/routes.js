const usersController = require("../controllers/usersController");

module.exports = (app) => {
    app.route("/users").get(usersController.users);
};
