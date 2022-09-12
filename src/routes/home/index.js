"use strict";

const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/index");

router.get("/", (req, res) => {
    res.render("index");
});
router.get("/dummy", ctrl.test);

router.get("/students", ctrl.readStudents);
// router.post("/students", ctrl.createStudents);

module.exports = router;
