const express = require("express");
const router = express.Router();

const meController = require("../app/controllers/MeController");



router.get("/stored/musics", meController.storedMusics);
router.get("/trashbin/musics", meController.trashbinMusics);


module.exports = router;
