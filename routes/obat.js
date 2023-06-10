//membuat variable router dengan require atau export variabel express
//dan menggunakan metode router
const router = require("express").Router();
const { route } = require(".");
//export controller yang ingin dipakai
const obatController = require("../controllers/obatController");

router.get("/", obatController.viewObat);
router.post("/", obatController.addObat);
router.put("/", obatController.editObat);
router.delete("/:id", obatController.deleteObat);

module.exports = router;