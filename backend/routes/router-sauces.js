const express = require('express');

const router = express.Router();
const sauceCtrl = require('../controllers/sauces');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const idCtrl = require('../middleware/id-validator');

router.get("/:id", auth, sauceCtrl.getSauceById);
router.get("/",  auth, sauceCtrl.getAllSauces);
router.post("/",  auth,multer, sauceCtrl.createSauce);
router.put("/:id", auth, idCtrl, multer, sauceCtrl.modifySauce);
router.delete("/:id", auth, idCtrl, sauceCtrl.deleteSauce);
router.post("/:id/like", auth, sauceCtrl.sauceLikes);

module.exports = router;