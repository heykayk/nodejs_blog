const Course = require('../models/Course');
const { mongooseToObject } = require('../util/mongo');

class CourseController {
    //[GET] /

    // [GET] /khoa-hoc/:slug
    show(req, res, next) {
        Course.findOne({ slug: req.params.slug })
            .then((course) => {
                res.render('courses/show', {
                    course: mongooseToObject(course),
                });
            })
            .catch(next);
    }

    // [GET] /khoa-hoc/create
    create(req, res, next) {
        res.render('courses/create');
    }


    // [GET] /khoa-hoc/:_id/edit
    edit(req, res, next){
        Course.findOne({_id: req.params._id})
            .then(course => {
                res.render('courses/edit', {
                    course: mongooseToObject(course)
                })
            })
            .catch(next)
    }

    // [PUT] /khoa-hoc/:_id
    update(req, res, next){
        Course.updateOne({_id: req.params._id} , req.body)
            .then(() => {
                res.redirect('/me/stored/courses');
            })
            .catch(next)
    }

    // [DELETE] /khoa-hoc/:_id
    delete(req, res, next){
        Course.deleteOne({_id: req.params._id})
            .then(() => {
                res.redirect('back');
            })
            .catch(next)
    }


    // [POST] /khoa-hoc/store
    store(req, res, next) {
        const course = new Course(req.body);
        course.image = `https://img.youtube.com/vi/${course.videoId}/sddefault.jpg`;
        course
            .save()
            .then(() => res.redirect('/'))
            .catch((error) => {});
    }
}

module.exports = new CourseController();