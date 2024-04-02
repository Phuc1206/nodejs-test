
const Course = require('../models/Course');
class MeController {
  storedCourses(req, res, next) {
    Promise.all([Course.find({}),Course.countDocumentsWithDeleted({deleted:true})])
    .then(([courses, deleteCount]) =>{
        courses = courses.map(courses => courses.toObject());
        res.render('me/stored-courses',{courses: courses,deleteCount});
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
