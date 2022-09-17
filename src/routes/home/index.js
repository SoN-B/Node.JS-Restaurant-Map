"use strict";

const { application } = require("express");
const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/index");

router.get("/", (req, res) => {
    res.render("index");
});
// router.get("/dummy", ctrl.test);

router.get("/restaurants", ctrl.readRestaurants);

module.exports = router;
