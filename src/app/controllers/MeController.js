const res = require("express/lib/response");
const Course = require("../models/Course.");


class MeController {
    //[GET] /me/stored/musics
    storedMusics(req, res, next) {
        Course.find({})
        .then(courses => res.render("me/stored-musics",{courses}))
        .catch(next);
    }
}

module.exports = new MeController();
