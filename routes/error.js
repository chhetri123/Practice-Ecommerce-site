const express = require("express");
router = express.Router();

const { error } = require("../controllers/error");

router.use(error);

module.exports = router;
