
const Course = require('../models/Course');
class MeController {
  storedCourses(req, res, next) {
    let CourseQuery = Course.find({});
    
    // if(req.query.hasOwnProperty('_sort')){
    //   CourseQuery = CourseQuery.sort({
    //     [req.query.column] : req.query.type
    //   })
    // }
    
    Promise.all([CourseQuery,Course.countDocumentsWithDeleted({deleted:true})])
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
