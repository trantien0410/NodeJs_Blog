const res = require("express/lib/response");
const Course = require("../models/Course.");


class MeController {
    //[GET] /me/stored/musics
    storedMusics(req, res, next) {

        Promise.all([Course.find({}), Course.countDocumentsDeleted()])
            .then(([courses, deleteCount])=>res.render("me/stored-musics", {
                deleteCount, courses })
            )
            .catch(next);

        // Course.countDocumentsDeleted()
        //   .then((deleteCount) => {
        //     console.log(deleteCount);
        //   })
        //   .catch(() => {});

        // Course.find({})
        //   .then((courses) => res.render("me/stored-musics", { courses }))
        //   .catch(next);
    }

    //[GET] /me/trashbin/musics
    trashbinMusics(req, res, next) {
        Course.findDeleted({})
        .then((courses) => res.render("me/trashbin-musics",{courses}))
        .catch(next);
    }
}

module.exports = new MeController();
