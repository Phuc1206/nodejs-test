const { response } = require('express');
const Course = require('../models/Course');
class CourseController {
  show(req, res, next) {
    Course.findOne({slug: req.params.slug})
    .then(Course =>{
        Course = Course.toObject()
        res.render('courses/show', {Course: Course});})
    .catch(next)
  }
  index(req, res, next) {
    Course.find({})
    .then(courses => { 
      courses = courses.map(courses => courses.toObject())
        res.render('home',{
        courses: courses
    });})
      .catch(next)
          
    }
    create(req, res, next) {
      res.render('courses/create');
    }
    store(req, res,next){
      const fromData = req.body;
      fromData.image = `https://img.youtube.com/vi/${req.body.videoId}/default.jpg`
      const course = new Course(fromData);
      course.save()
      res.send('saved')
      
    }
}
module.exports = new CourseController();
