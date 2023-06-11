const router = require("express").Router();

const loginController = require("../controllers/loginController");

router.get("/", loginController.viewLogin);
router.post("/", loginController.identifyUser);

module.exports = router;