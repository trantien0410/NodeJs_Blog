const res = require("express/lib/response");
const Course = require("../models/Course.");


class CourseController {
    //[GET] /courses/:slug
    show(req, res, next) {
        Course.findOne({ slug: req.params.slug })
        .then(course =>
            res.render('courses/show', {course})
        )
        .catch(next);
    }

    //[GET] /courses/create
    create(req, res, next) {
        res.render("courses/create");
    }

    //[Post] /courses/store
    store(req, res, next) {
        // res.json(req.body)
        const formData = req.body;
        formData.slug = `${formData.name}`
        formData.image = `https://img.youtube.com/vi/${formData.videoID}/sddefault.jpg`;
        const course = new Course(formData);
        course.save()
        .then(() => res.redirect('/'))
        .catch(error => {

        });
    }
     //[GET] /courses/:id/edit
    edit(req, res, next) {
        Course.findById({ _id: req.params.id }) 
        .then(courses => res.render("courses/edit",{courses}))
        .catch(next);
    }
    //[PUT] /courses/:id
    update(req, res, next){
        // res.json(req.body)
        const formData = req.body;
        formData.image`https://img.youtube.com/vi/${formData.videoID}/sddefault.jpg`;
        
        Course.updateOne({ _id:req.params.id } ,formData)
        .then(()=>res.redirect('/me/stored/musics'))
        .catch(next);
    }

    //[DELETE] /courses/:id
    delete(req, res, next){
        Course.delete({ _id:req.params.id })
        .then(() => res.redirect('back'))
        .catch(next);
    }

    //[PATCH] /courses/:id/restore
    restore(req, res, next){
        Course.restore({ _id:req.params.id })
        .then(() => res.redirect('back'))
        .catch(next);
    }
}

module.exports = new CourseController();
