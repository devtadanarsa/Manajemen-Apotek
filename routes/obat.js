//membuat variable router dengan require atau export variabel express
//dan menggunakan metode router
const router = require("express").Router();
const { route } = require(".");
//export controller yang ingin dipakai
const obatController = require("../controllers/obatController");

router.get("/", obatController.viewObat);
router.get("/jenis/:jenisObat", obatController.viewObatByJenis);
router.get("/nama/:namaObat", obatController.viewObatByNama);
router.get("/id/:id", obatController.viewDetailObat);
router.post("/id/:id", obatController.addPemasok);
router.post("/", obatController.addObat);
router.put("/", obatController.editObat);
router.put("/id/:idObat", obatController.editPemasok)
router.delete("/:id", obatController.deleteObat);
router.delete("/id/:idObat/:idPemasok", obatController.deletePemasok);
module.exports = router;