const express = require('express');

const router = express.Router();
const authCtrl = require('../controllers/users');
const passwordCtrl = require('../middleware/password');

router.post("/signup", passwordCtrl, authCtrl.userToDatabase);
router.post("/login", authCtrl.userLogin);

module.exports = router;