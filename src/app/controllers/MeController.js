
const Course = require('../models/Course');
class MeController {
  storedCourses(req, res, next) {
    let CourseQuery = Course.find({});
    
    
    
    Promise.all([Course.find({}).sortable(req),Course.countDocumentsWithDeleted({deleted:true})])
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
