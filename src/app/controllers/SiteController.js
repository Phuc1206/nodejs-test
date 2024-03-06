const { response } = require('express');
const Course = require('../models/Course');
class SiteController {
  index(req, res, next) {
    Course.find({})
    .then(courses => { 
      courses = courses.map(courses => courses.toObject())
      res.render('home',{
      courses: courses
    });})
      .catch(next)
          
    }
    // req.render('home');
  
  search(req, res) {
    res.render('search');
  }
}
module.exports = new SiteController();
