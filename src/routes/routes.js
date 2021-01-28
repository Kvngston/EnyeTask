const express = require('express')
const router = express.Router();
const routesController = require('../controller/routesController')

router.get('/', ((req, res) => {
    res.json("Welcome");
}))

router.get("/api/rates", routesController.getRates)

module.exports = router