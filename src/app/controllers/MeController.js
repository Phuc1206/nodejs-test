
const Course = require('../models/Course');
class MeController {
  storedCourses(req, res, next) {
    Course.find({})
    .then(courses => {
      courses = courses.map(courses => courses.toObject())
      res.render('me/stored-courses',{courses: courses});
    })
  .catch(next)
  }
  trash(req,res,next){
    Course.findWithDeleted({deleted: true})
    .then(courses => {
      courses = courses.map(courses => courses.toObject())
      res.render('me/trash-courses',{courses: courses});
    })
    .catch(next)
  }
  
}
module.exports = new MeController();
