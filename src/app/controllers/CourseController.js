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
      .then(() =>{res.redirect(`/courses/${course.slug}`)})
      .catch(next)
      
    }
    restore(req, res,next){
      Course.restore({_id: req.params._id})
      .then(()=>res.redirect('/me/stored/courses'))
      .catch(next)
    }
    updatecourse(req, res, next){
      Course.findById(req.params._id).then((Course) =>{
        Course = Course.toObject()
        res.render(('courses/edit'),{Course: Course});})
      .catch(next)
    }
    update(req, res, next) {
      
      Course.updateOne({_id: req.params._id}, req.body)
      
      .then(()=>{
        res.redirect('/me/stored/courses')}
      )
      
      .catch(next)
    }
    delete(req, res,next){
      Course.delete({_id:req.params._id})
      .then(()=>res.redirect('/me/stored/courses'))
      .catch(next)
    }
    destroy(req, res, next){
      Course.deleteOne({_id:req.params._id})
      .then(()=>res.redirect('/me/stored/courses'))
      .catch(next)
    }
}
module.exports = new CourseController();
