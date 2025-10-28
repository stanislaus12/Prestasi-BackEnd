const express = require("express");
const router = express.Router();
const prestasiController = require("../controllers/prestasi");

router.post("/get", prestasiController.getPrestasi);
router.post("/add", prestasiController.addPrestasi);
router.post("/edit", prestasiController.editPrestasi);
router.post("/delete", prestasiController.deletePrestasi);
router.post("/search", prestasiController.searchPrestasi);

module.exports = router;
