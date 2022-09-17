"use strict";

const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/index");

router.get("/restaurants", ctrl.readRestaurants);

module.exports = router;
